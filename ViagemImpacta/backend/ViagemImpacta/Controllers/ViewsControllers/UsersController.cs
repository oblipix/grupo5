using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.Repositories;

namespace ViagemImpacta.Controllers.ViewsControllers
{
    public class UsersController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public UsersController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
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
            var users = await _unitOfWork.Users
                .GetAllClientUsersWithPagination(skip, take);
            return View(users);
        }

        public async Task<IActionResult> Details(int id)
        {
            var user = await _unitOfWork.Users.GetUserById(id);
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
            var user = await _unitOfWork.Users.GetUserById(id);
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
            var user = await _unitOfWork.Users.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            var result = await _unitOfWork.Users.SetUserDisabled(id);
            if (!result)
            {
                return BadRequest("Erro ao desativar o usuário.");
            }
            await _unitOfWork.CommitAsync();
            return RedirectToAction(nameof(Index));

        }
    }
}
