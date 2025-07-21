using ViagemImpacta.Models;

namespace ViagemImpacta.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<User>> ListAllClients(int skip, int take);
    }
}
