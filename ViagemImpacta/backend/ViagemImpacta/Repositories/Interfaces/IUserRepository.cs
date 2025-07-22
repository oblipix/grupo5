using ApiCatalogo.Repositories;
using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.DTO.UserDTO;
using ViagemImpacta.Models;

namespace ViagemImpacta.Repositories.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<IEnumerable<User>> GetAllClientUsersWithPagination(int skip, int take);

        Task<User?> GetUserById(int id);

        Task<bool> SetUserDisabled(int id);

        Task<bool> AlreadyEmailExist(string email);

        Task<User?> GetUserByEmail(string email);
    }
}
