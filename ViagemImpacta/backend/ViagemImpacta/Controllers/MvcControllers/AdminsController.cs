using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ViagemImpacta.DTO.UserDTO;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Implementations;
using ViagemImpacta.Services.Interfaces;
using ViagemImpacta.ViewModels;

namespace ViagemImpacta.Controllers.ViewsControllers;

public class AdminsController : Controller
{
    private readonly IUserService _userService;
    private readonly AuthService _authService;

    public AdminsController(IUserService userService, AuthService authService)
    {
        _userService = userService;
        _authService = authService;
    }

    public IActionResult Index()
    {
        return View();
    }

    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme, Roles = "Admin")]
    public IActionResult Dashboard()
    {
        var claims = User.Claims.Select(c => $"{c.Type} = {c.Value}").ToList();
        foreach (var claim in claims)
        {
            Console.WriteLine(claim);
        }

        return View();
    }

    [HttpPost, ActionName("Index")]
    public async Task<ActionResult<User>> Login(ReadAdminViewModel model)
    {
        if (!ModelState.IsValid) return View(model);

        try
        {
            var admin = await _userService.GetUserByEmail(model.Email);
            if (admin == null || !BCrypt.Net.BCrypt.Verify(model.Password, admin.Password))
            {
                ModelState.AddModelError("", "E-mail ou senha inválidos.");
                return View(model);
            }

            _authService.AuthenticationWithCookies(admin);

            return RedirectToAction("Dashboard");
        }
        catch (Exception ex)
        {
            ModelState.AddModelError(string.Empty, $"Erro ao fazer login: {ex.Message}");
            return View(model);
        }
    }
}
