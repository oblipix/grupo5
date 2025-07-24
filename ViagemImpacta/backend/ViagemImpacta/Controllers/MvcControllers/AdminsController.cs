using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces;
using ViagemImpacta.ViewModels;

namespace ViagemImpacta.Controllers.ViewsControllers
{
    public class AdminsController : Controller
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public AdminsController(ILogger<HomeController> logger, IMapper mapper, IUserService userService)
        {
            _mapper = mapper;
            _userService = userService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Dashboard()
        {
            return View();
        }
        /*
        [HttpPost, ActionName("Index")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(ReadAdminViewModel model)
        {
            if (!ModelState.IsValid) return View(model);

            try
            {
                var dto = _mapper.Map<ReadUserLoginDto>(model);
                //var user = await _userService.ValidateUserAsync(dto);

                //if (user == null) return View(user);

                return RedirectToAction(nameof(Dashboard));
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(string.Empty, $"Erro ao fazer login: {ex.Message}");
                return View(model);
            }

        }
        */
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [Route("management-access")]
        public async Task<ActionResult<User>> CreateManagementAcess([FromBody] CreateEmployeeViewModel employeeDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (employeeDTO == null)
                return BadRequest("Usuário não pode ser nulo.");

            try
            {
                var user = await _userService.CreateManagementAcess(employeeDTO);
                var userDto = _mapper.Map<CreateEmployeeViewModel>(user);
                return CreatedAtAction("Index", "Users", new { id = user.UserId }, userDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
