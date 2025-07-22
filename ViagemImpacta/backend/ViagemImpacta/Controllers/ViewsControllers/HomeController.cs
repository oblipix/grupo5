using System.Diagnostics;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.DTO.UserDTO;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces;
using ViagemImpacta.ViewModels;

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

    /*
    - TELA DO ADMIN NA VIEW INDEX 
    - CONTROLLER TELA GET E POST DO INDEX
    - DTO DO LOGIN DO ADMIN > E-MAIL E SENHA   || FEITO
    - FAZER O MAPPER || FEITO
    - REPOSITORY DA AUTENTICAÇÃO || FEITO
    - SERVICE DA AUTENTICAÇÃO
     */
    public IActionResult Index()
    {
        return View();
    }

    [HttpPost, ActionName("Index")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(ReadAdminViewModel model)
    {
        if (!ModelState.IsValid) return View(model);

        try
        {
            var dto = _mapper.Map<ReadUserLoginDTO>(model);
            var user = await _userService.ValidateUserAsync(dto);

            if (user == null) return View(user);

            return RedirectToAction(nameof(Index), "Users");
        }
        catch (Exception ex)
        {
            // FAZER UMA EXCEÇÃO
            _logger.LogError(ex.Message);
            return View(model);
        }

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