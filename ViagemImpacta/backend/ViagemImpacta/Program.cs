using ApiCatalogo.Repositories;
using GerenciadorDeProjetos.Repositories;
using GerenciadorDeProjetos.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NuGet.Configuration;
using System.Text;
using ViagemImpacta.Controllers;
using ViagemImpacta.Data;
using ViagemImpacta.Services;
using ViagemImpacta.Services.Interfaces;
using ViagemImpacta;
using Settings = ViagemImpacta.Settings;

var builder = WebApplication.CreateBuilder(args);

var key = Encoding.ASCII.GetBytes(Settings.Secret);
// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddAuthentication(x =>
    {
        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(x =>
    {
        x.RequireHttpsMetadata = false;
        x.SaveToken = true;
        x.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ViagemImpactConnection")));

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<ITravelPackageService, TravelPackageService>();
builder.Services.AddScoped<IHotelService, HotelService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddHttpContextAccessor();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{

    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();


    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }
};

    app.UseHttpsRedirection();
    app.UseStaticFiles();

    app.UseRouting();



    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();

    app.MapControllerRoute(
       name: "default",
       pattern: "{controller=Home}/{action=Index}/{id?}");

    app.Run();
