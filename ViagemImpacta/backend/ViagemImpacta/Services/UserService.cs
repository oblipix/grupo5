using GerenciadorDeProjetos.Repositories.Interfaces;
using ViagemImpacta.Models;

namespace ViagemImpacta.Services
{
    public class UserService
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<User>> ListAllClients(int skip, int take)
        {
            return await _unitOfWork.Users
                .GetAllClientUsersWithPagination(skip, take);
        }
    }
}
