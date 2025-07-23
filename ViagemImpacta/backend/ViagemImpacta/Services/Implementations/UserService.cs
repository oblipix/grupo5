using AutoMapper;
using Microsoft.CodeAnalysis.Scripting;
using ViagemImpacta.DTO.UserDTO;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories;
using ViagemImpacta.Repositories.Interfaces;

using ViagemImpacta.Services.Interfaces;

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

        public async Task<IEnumerable<User>> SearchClientUsers(string search, int skip, int take)
        {
            return await _unitOfWork.Users.SearchClientUsers(search, skip, take);
        }

        public async Task<IEnumerable<User>> ListAllClients(int skip, int take)
        {
            var users = await _unitOfWork.Users.GetAllClients(skip, take);
            return users;
        }

        public async Task<IEnumerable<User>> ListAllEmployees(int skip, int take)
        {
            var users = await _unitOfWork.Users.GetAllEmployees(skip, take);
            return users;
        }

        public async Task<User> CreateUser(CreateUserDto createUserDTO)
        {
            if (await _unitOfWork.Users.AlreadyEmailExist(createUserDTO.Email))
            {
                throw new InvalidOperationException("Já existe um usuário com este email.");
            }

            var user = _mapper.Map<User>(createUserDTO);
            Console.WriteLine(user.Password);
            user.Password = BCrypt.Net.BCrypt.HashPassword(createUserDTO.Password);
            Console.WriteLine(user.Password);
            user.Active = true;
            user.CreatedAt = DateTime.UtcNow;

            if(createUserDTO.Roles == Models.Enums.Roles.Admin)
            {
                user.Role = Models.Enums.Roles.Admin; // Define o papel como Admin se especificado
            }
            else{
                user.Role = Models.Enums.Roles.User;
            }

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

        public async Task<User> UpdateUser(UpdateUserDto updateUserDTO)
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
            existingUser.UpdatedAt = DateTime.UtcNow;

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
    }
}