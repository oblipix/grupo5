using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Controllers.ViewsControllers
{
    public class EmployeesController : Controller
    {

        private readonly IUserService _userService;

        public EmployeesController(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<IActionResult> Index([FromQuery] int skip = 0, [FromQuery] int take = 10)
        {
            var users = await _userService.GetAllEmployees(skip, take);
            return View(users);
        }

        public async Task<IActionResult> Details(int id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return View(user);
        }


        public IActionResult Create()
        {

            return View();
        }

        public IActionResult Edit()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Edit()
        {
            return View();
        }

        public async Task<IActionResult> Delete(int id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return View(user);
        }
        //jcdckdj
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var deleted = await _userService.DeleteUser(id);
            if (!deleted)
            {
                return NotFound($"Funcionário com ID {id} não encontrado.");
            }
            return RedirectToAction(nameof(Index));
        }
    }
}




