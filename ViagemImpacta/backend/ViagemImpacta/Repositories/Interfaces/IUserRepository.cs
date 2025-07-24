using ViagemImpacta.Models;

namespace ViagemImpacta.Repositories.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<IEnumerable<User>> GetAllClients(int skip, int take);
        Task<IEnumerable<User>> GetAllEmployees(int skip, int take);
        Task<bool> AlreadyEmailExist(string email);
        Task<User?> GetUserByEmail(string email);
        Task<IEnumerable<User>> SearchClientUsers(string search, int skip, int take);
    }
}