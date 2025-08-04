using ViagemImpacta.DTO.UserDTO;
using ViagemImpacta.Models;

namespace ViagemImpacta.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<User>> SearchClientUsers(string search, int skip, int take);
        Task<IEnumerable<User>> ListAllClients(int skip, int take);
        Task<IEnumerable<User>> ListAllEmployees(int skip, int take);
        Task<User> CreateUser(CreateUserDto createUserDTO);
        Task<User?> GetUserByIdAsync(int id);
        Task<User> UpdateUser(UpdateUserDto updateUserDTO);
        Task<bool> DeleteUser(int id);
        Task<User?> GetUserByEmail(string email);
        Task<User> CreateManagementAccess(CreateUserDto dto);

        //Métodos para recuperação de senha de usuário
        Task SavePasswordResetToken(int userId, string token, DateTime expiration);
        Task SendPasswordRecoveryEmail(User user, string token);
        Task<PasswordResetToken?> GetPasswordResetToken(string token);
        Task InvalidatePasswordResetToken(string token);
        Task UpdateUserPassword(User user);
    }
}
