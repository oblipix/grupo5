using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
using ViagemImpacta.DTO.UserDTO;
using ViagemImpacta.Models;

namespace ViagemImpacta.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<User>> ListAllClients(int skip, int take);
        Task<User> CreateUser(CreateUserDTO createUserDTO);
        Task<User?> GetUserById(int id);
        Task<User> UpdateUser(UpdateUserDTO updateUserDTO);
        Task<bool> DeleteUser(int id);
        Task<User?> GetUserByEmail(string email);
        Task<User?> ValidateUserAsync(ReadUserLoginDTO dto);


    }
}
