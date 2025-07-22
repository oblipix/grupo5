using ViagemImpacta.DTO.UserDTO;
using ViagemImpacta.Models;
using ViagemImpacta.ViewModels;

namespace ViagemImpacta.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<User>> ListAllClients(int skip, int take);

        Task<User?> ValidateUserAsync(ReadUserLoginDTO dto);
    }
}
