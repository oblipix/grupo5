using ViagemImpacta.Models;

namespace ViagemImpacta.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> ListAllClients(int skip, int take);
    }
}
