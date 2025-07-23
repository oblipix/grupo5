using GerenciadorDeProjetos.Repositories;
using GerenciadorDeProjetos.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.Mappings.Profiles;
using ViagemImpacta.Services;
using ViagemImpacta.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Adicionar serviços do Swagger
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

builder.Services.AddDbContext<AgenciaDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ViagemImpactConnection")));

// APENAS UnitOfWork - Ele gerencia todos os repositories
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

//Services
builder.Services.AddScoped<ITravelPackageService, TravelPackageService>();

// Marcelo : Foi adicionado esse HttpContext para visualização da paginação na página Index
builder.Services.AddHttpContextAccessor();

// 🎯 AutoMapper - DEMONSTRANDO TODAS AS ALTERNATIVAS
#region AutoMapper Configuration Options

// ✅ OPÇÃO 1: EXPLÍCITO (Controle total - sua abordagem atual)
//builder.Services.AddAutoMapper(typeof(TravelPackageProfile), 
//                               typeof(HotelProfile), 
//                               typeof(UserProfile));

// ✅ OPÇÃO 2: ASSEMBLY ESPECÍFICO (RECOMENDADO - automático mas controlado)
builder.Services.AddAutoMapper(typeof(TravelPackageProfile).Assembly);

// ⚠️ OPÇÃO 3: TODOS OS ASSEMBLIES (CUIDADO - pode incluir profiles externos)
//builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// ✅ OPÇÃO 4: MÚLTIPLOS ASSEMBLIES ESPECÍFICOS (Para projetos maiores)
//builder.Services.AddAutoMapper(
//    typeof(TravelPackageProfile).Assembly,  // Assembly atual
//    typeof(SomeExternalProfile).Assembly    // Outro assembly se houver
//);

// ✅ OPÇÃO 5: COM CONFIGURAÇÃO PERSONALIZADA
//builder.Services.AddAutoMapper(cfg =>
//{
//    cfg.AddProfile<TravelPackageProfile>();
//    cfg.AddProfile<HotelProfile>();
//    cfg.AddProfile<UserProfile>();
//    // Configurações globais aqui se necessário
//}, typeof(TravelPackageProfile).Assembly);

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
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
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

app.UseAuthorization();

app.UseCors();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
