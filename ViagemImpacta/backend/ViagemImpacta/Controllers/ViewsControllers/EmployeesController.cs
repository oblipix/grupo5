using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.Services.Interfaces;
using ViagemImpacta.DTO.UserDTO;

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
            // Corrigido para ListAllClients
            var users = await _userService.ListAllClients(skip, take);
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

        // GET: Employees/Edit/5
        public async Task<IActionResult> Edit(int id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            // Mapeia User para UpdateUserDTO
            var dto = new UpdateUserDTO
            {
                UserId = user.UserId,
                Email = user.Email,
                FirstName = user.FirstName ?? string.Empty,
                LastName = user.LastName ?? string.Empty,
                Phone = user.Phone,
                Photo = user.Photo,
                Cpf = user.Cpf
                // Adicione outros campos se necessário
            };
            return View(dto);
        }

        // POST: Employees/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(UpdateUserDTO updateUserDTO)
        {
            if (!ModelState.IsValid)
            {
                return View(updateUserDTO);
            }
            try
            {
                await _userService.UpdateUser(updateUserDTO);
                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(string.Empty, ex.Message);
                return View(updateUserDTO);
            }
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




