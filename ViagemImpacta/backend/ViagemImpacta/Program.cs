using ApiCatalogo.Repositories;
using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.Repositories;
using ViagemImpacta.Services;
using ViagemImpacta.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

Console.WriteLine("PROGRAMA7!");

// Add services to the container.
builder.Services.AddControllersWithViews();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ViagemImpactConnection")));

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<ITravelPackageService, TravelPackageService>();
builder.Services.AddScoped<IUserService, UserService>(); // ADICIONE ESTA LINHA

// Configure AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

//Autenticacao JWT  
// builder.Services.AddAuthorization();
// builder.Services.AddAuthentication("Bearer").AddJwtBearer();

// Marcelo : Foi adicionado esse HttpContext para visualização da paginação na página Index
builder.Services.AddHttpContextAccessor();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
Console.WriteLine("Teste Programmmmmmm");

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.MapControllerRoute(
   name: "default",
   pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
