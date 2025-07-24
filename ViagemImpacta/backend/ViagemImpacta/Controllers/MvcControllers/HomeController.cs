using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly IMapper _mapper;
    private readonly IUserService _userService;

    public HomeController(ILogger<HomeController> logger, IMapper mapper, IUserService userService)
    {
        _logger = logger;
        _mapper = mapper;
        _userService = userService;
    }

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