using ApiCatalogo.Repositories;
using ViagemImpacta.Models;

namespace ViagemImpacta.Repositories.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<IEnumerable<User>> GetAllClients(int skip, int take);

        Task<User?> GetUserById(int id);

        Task<bool> SetUserDisabled(int id);

        Task<bool> AlreadyEmailExist(string email);

        Task<User?> GetUserByEmail(string email);

        // COPILOT FEZ
        Task<IEnumerable<User>> SearchClientUsers(string search, int skip, int take);
    }
}
