using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Scripting;
using ViagemImpacta.DTO.UserDTO;
using ViagemImpacta.Models;
using ViagemImpacta.Models.Enums;
using ViagemImpacta.Repositories;
using ViagemImpacta.Services.Interfaces;
using ViagemImpacta.ViewModels;

namespace ViagemImpacta.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<User>> ListAllClients(int skip, int take)
        {
            var users = await _unitOfWork.Users.GetAllClientUsersWithPagination(skip, take);

            return users;
        }
        
        public async Task<User> CreateUser(CreateUserDTO createUserDTO)
        {
            if (await _unitOfWork.Users.AlreadyEmailExist(createUserDTO.Email))
            {
                throw new InvalidOperationException("Já existe um usuário com este email.");
            }

            var user = _mapper.Map<User>(createUserDTO);
            user.Password = BCrypt.Net.BCrypt.HashPassword(createUserDTO.Password);
            user.Active = true;

            var brazilTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time"));
            user.CreatedAt = new DateTime(brazilTime.Year, brazilTime.Month, brazilTime.Day, brazilTime.Hour, brazilTime.Minute, brazilTime.Second);
            
            await _unitOfWork.Users.AddAsync(user);
            await _unitOfWork.CommitAsync();
            
            return user;
        }

        public async Task<User> CreateManagementAcess(CreateEmployeeViewModel employeeDTO)
        {            
            if (await _unitOfWork.Users.AlreadyEmailExist(employeeDTO.Email))
            {
                throw new InvalidOperationException("Já existe um usuário com este email.");
            }

            var user = _mapper.Map<User>(employeeDTO);
            user.Password = BCrypt.Net.BCrypt.HashPassword(employeeDTO.Password);
            user.Active = true;

            if (employeeDTO.roles == Roles.Admin)
            {
                user.Role = employeeDTO.roles;
            } else if (employeeDTO.roles == Roles.Attendant)
                user.Role = employeeDTO.roles;



            var brazilTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time"));
            user.CreatedAt = new DateTime(brazilTime.Year, brazilTime.Month, brazilTime.Day, brazilTime.Hour, brazilTime.Minute, brazilTime.Second);

            await _unitOfWork.Users.AddAsync(user);
            await _unitOfWork.CommitAsync();
            
            return user;
        }


        public async Task<User?> GetUserById(int id)
        {
            if (id <= 0)
                return null;

            var user = await _unitOfWork.Users.GetByIdAsync(id);
    
            // CORREÇÃO: Só retorna se o usuário existir E estiver ativo
            if (user == null || !user.Active)
                return null;
        
            return user;
        }

        public async Task<User> UpdateUser(UpdateUserDTO updateUserDTO)
        {
            if (updateUserDTO == null || updateUserDTO.UserId <= 0)
            {
                throw new ArgumentException("Dados inválidos para atualização do usuário.");
            }
            

                // Busca o usuário existente
                var existingUser = await _unitOfWork.Users.GetByIdAsync(updateUserDTO.UserId);
            if (existingUser == null)
            {
                throw new ArgumentException("Usuário não encontrado.");
            }

            // Verifica email duplicado (apenas se foi alterado)
            if (existingUser.Email != updateUserDTO.Email &&
                await _unitOfWork.Users.AlreadyEmailExist(updateUserDTO.Email))
            {
                throw new InvalidOperationException("Já existe um usuário com este email.");
            }

            // AutoMapper mapeia apenas propriedades não-nulas do DTO para o usuário existente
            _mapper.Map(updateUserDTO, existingUser);
            var brazilTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time"));
            existingUser.UpdatedAt = new DateTime(brazilTime.Year, brazilTime.Month, brazilTime.Day, brazilTime.Hour, brazilTime.Minute, brazilTime.Second);

            // Atualiza no repositório
            await _unitOfWork.Users.UpdateAsync(existingUser);
            await _unitOfWork.CommitAsync();

            return existingUser;
        }

        public async Task<bool> DeleteUser(int id)
        {
            if (id <= 0)
                return false;

            var user = await _unitOfWork.Users.GetByIdAsync(id);
            if (user == null)
                return false;

            // Soft delete - desativa o usuário
            user.Active = false;
            user.DisabledAt = DateTime.UtcNow;

            await _unitOfWork.Users.UpdateAsync(user);
            await _unitOfWork.CommitAsync();

            return true;
        }

        public async Task<User?> GetUserByEmail(string email)
        {
            if (string.IsNullOrEmpty(email))
                return null;

            return await _unitOfWork.Users.GetUserByEmail(email);
        }

        public async Task<User?> ValidateUserAsync(ReadUserLoginDTO dto)
        {
            var user = await _unitOfWork.Users.GetUserByEmail(dto.Email.ToLower().Trim());
            if (user == null || user.Password != dto.Password) return null;
            return user;
        }

       
        
    }
}