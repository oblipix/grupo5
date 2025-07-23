using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.Models;
using ViagemImpacta.DTO.UserDTO;
using ViagemImpacta.Services.Interfaces;
using AutoMapper;
using ViagemImpacta.ViewModels;

namespace ViagemImpacta.Controllers.ViewsControllers
{
    public class UsersController : Controller
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UsersController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        public async Task<IActionResult> Index(
            [FromQuery] int skip = 0,
            [FromQuery] int take = 10,
            [FromQuery] string search = "")
        {
            try
            {
                IEnumerable<User> users;

                if (!string.IsNullOrWhiteSpace(search))
                {
                    users = await _userService.SearchClientUsers(search, skip, take);
                }
                else
                {
                    users = await _userService.ListAllClients(skip, take);
                }
                return View(users);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(string.Empty, $"Erro ao carregar usuários: {ex.Message}");
                return View(Enumerable.Empty<User>());
            }
        }

        public async Task<IActionResult> Details(int id)
        {
            try
            {
                var user = await _userService.GetUserById(id);
                if (user == null) return NotFound();
                return View(user);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(string.Empty, $"Erro ao carregar detalhes do usuário: {ex.Message}");
                return View(null);
            }
        }

        public async Task<IActionResult> Edit(int id)
        {
            try
            {
                var user = await _userService.GetUserById(id);
                if (user == null) return NotFound();

                var userViewModel = _mapper.Map<UpdateUserViewModel>(user);
                return View(userViewModel);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(string.Empty, $"Erro ao carregar funcionário: {ex.Message}");
                return View(nameof(Edit)); // Verificar essa lógica
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, UpdateUserViewModel user)
        {
            if (id != user.UserId) return BadRequest();
            if (!ModelState.IsValid) return View(user);
 
            try
            {
                var dto = _mapper.Map<UpdateUserDto>(user);
                await _userService.UpdateUser(dto);
                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(string.Empty, $"Erro ao atualizar usuário: {ex.Message}");
                return View(user);
            }
        }

        public async Task<IActionResult> Delete(int id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null) return NotFound();

            return View(user);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            try
            {
                var user = await _userService.GetUserById(id);
                if (user == null) return NotFound();

                var result = await _userService.DeleteUser(id);
                if (!result) return BadRequest("Erro ao desativar o usuário.");

                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(string.Empty, $"Erro ao excluir funcionário: {ex.Message}");
                return View("Delete");
            }
        }
    }
}
