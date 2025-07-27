using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ViagemImpacta.Data;
using ViagemImpacta.Profiles;
using ViagemImpacta.Repositories;
using ViagemImpacta.Repositories.Implementations;
using ViagemImpacta.Repositories.Interfaces;
using ViagemImpacta.Services.Implementations;
using ViagemImpacta.Services.Interfaces;
using Settings = ViagemImpacta.Settings;

var builder = WebApplication.CreateBuilder(args);
var key = Encoding.ASCII.GetBytes(Settings.Secret);
// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Viagem Impacta API",
        Version = "v1",
        Description = "API para gerenciamento de pacotes de viagem"
    });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
})
.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
{
    options.LoginPath = "/Admins/Index";
    options.AccessDeniedPath = "/Admins/AccessDenied";
});

builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddDbContext<AgenciaDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ViagemImpactConnection")));

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IHotelService, HotelService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IReservationService, ReservationService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>) );
builder.Services.AddAutoMapper(typeof(HotelProfile).Assembly, typeof(UserProfile).Assembly, typeof(ReservationProfile).Assembly);

builder.Services.AddHttpContextAccessor();

// 🎯 AutoMapper - DEMONSTRANDO TODAS AS ALTERNATIVAS
#region AutoMapper Configuration Options

// ✅ OPÇÃO 1: EXPLÍCITO (Controle total - sua abordagem atual)
//builder.Services.AddAutoMapper(typeof(ReservationBookProfile), 
//                               typeof(HotelProfile), 
//                               typeof(UserProfile));

// ✅ OPÇÃO 2: ASSEMBLY ESPECÍFICO (RECOMENDADO - automático mas controlado)
builder.Services.AddAutoMapper(typeof(HotelProfile).Assembly, typeof(UserProfile).Assembly);

// ⚠️ OPÇÃO 3: TODOS OS ASSEMBLIES (CUIDADO - pode incluir profiles externos)
//builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// ✅ OPÇÃO 4: MÚLTIPLOS ASSEMBLIES ESPECÍFICOS (Para projetos maiores)
//builder.Services.AddAutoMapper(
//    typeof(ReservationBookProfile).Assembly,  // Assembly atual
//    typeof(SomeExternalProfile).Assembly    // Outro assembly se houver
//);

// ✅ OPÇÃO 5: COM CONFIGURAÇÃO PERSONALIZADA
//builder.Services.AddAutoMapper(cfg =>
//{
//    cfg.AddProfile<ReservationBookProfile>();
//    cfg.AddProfile<HotelProfile>();
//    cfg.AddProfile<UserProfile>();
//    // Configurações globais aqui se necessário
//}, typeof(ReservationBookProfile).Assembly);

#endregion

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

// ✅ SWAGGER: Configurar middleware do Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Viagem Impacta API v1");
        c.RoutePrefix = "swagger"; // Acesso via: https://localhost:xxxx/swagger
    });
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors();
app.MapControllers();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Admins}/{action=Index}/{id?}");

app.Run();
