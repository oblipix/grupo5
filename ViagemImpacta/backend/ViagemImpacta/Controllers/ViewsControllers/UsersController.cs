using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.Repositories;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Controllers.ViewsControllers
{
    public class UsersController : Controller
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }
        /*
         TODO: 
        - Na página principal, deve listar todos os usuários (CLIENTES) cadastrados no banco de dados
        - Limite no número de listagem (10 por página?) -> PARA O FRONT, da pra ser dinâmico com botões alternativos de 10, 20, 50 (talvez)
        - Barra/Input de busca de usuários por (ALGUMA COISA) 
        - Botões de detalhar, ver avaliações, ver reservas, ver pacotes
         */

        public async Task<IActionResult> Index([FromQuery] int skip = 0, [FromQuery] int take = 10)
        {
            var users = await _userService.ListAllClients(skip, take);
            return View(users);
        }

        public async Task<IActionResult> Details(int id)
        {
            var user = await _userService.GetUserById(id);
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
            var user = await _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            var result = await _userService.DeleteUser(id);
            if (!result)
            {
                return BadRequest("Erro ao desativar o usuário.");
            }
            return RedirectToAction(nameof(Index));

        }
    }
}
