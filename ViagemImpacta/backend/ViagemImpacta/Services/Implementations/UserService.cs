using ViagemImpacta.Models;
using ViagemImpacta.Repositories;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Services.Implementations
{
    public class UserService : IUserService
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
