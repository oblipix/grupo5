using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
using ViagemImpacta.DTO.UserDTO;
using ViagemImpacta.Models;
using ViagemImpacta.ViewModels;

namespace ViagemImpacta.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<User>> SearchClientUsers(string search, int skip, int take);
        Task<IEnumerable<User>> ListAllClients(int skip, int take);
        Task<IEnumerable<User>> ListAllEmployees(int skip, int take);
        Task<User> CreateUser(CreateUserDto createUserDTO);
        Task<User?> GetUserById(int id);
        Task<User> UpdateUser(UpdateUserDto updateUserDTO);
        Task<bool> DeleteUser(int id);
        Task<User?> GetUserByEmail(string email);
        Task<User?> ValidateUserAsync(ReadUserLoginDTO dto);
        Task<User> CreateManagementAcess(CreateEmployeeViewModel employeeDTO);


    }
}
