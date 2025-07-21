using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.Models;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    /*
    - TELA DO ADMIN NA VIEW INDEX 
    - CONTROLLER TELA GET E POST DO INDEX
    - DTO DO LOGIN DO ADMIN > E-MAIL E SENHA  
    - FAZER O MAPPER
    - REPOSITORY DA AUTENTICAÇÃO
    - SERVICE DA AUTENTICAÇÃO
     */
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}