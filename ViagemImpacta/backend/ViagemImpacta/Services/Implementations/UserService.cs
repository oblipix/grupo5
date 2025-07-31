using AutoMapper;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;
using ViagemImpacta.DTO.UserDTO;
using ViagemImpacta.Models;
using ViagemImpacta.Models.Enums;
using ViagemImpacta.Repositories;
using ViagemImpacta.Services.Interfaces;
using ViagemImpacta.Setup;

namespace ViagemImpacta.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly TimeZoneInfo BrazilTimeZone = TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time");
        private readonly SmtpOptions _smtpOptions;

        public UserService(IUnitOfWork unitOfWork, IMapper mapper, IOptions<SmtpOptions> smtpOptions)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _smtpOptions = smtpOptions.Value;
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
            user.Password = BCrypt.Net.BCrypt.HashPassword(createUserDTO.Password);
            user.Active = true;
            user.CreatedAt = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, BrazilTimeZone);

            await _unitOfWork.Users.AddAsync(user);
            await _unitOfWork.CommitAsync();
            
            await SendEmailAsync(user);

            return user;
        }

        public async Task<User> CreateManagementAccess(CreateUserDto dto)
        {            
            if (await _unitOfWork.Users.AlreadyEmailExist(dto.Email))
            {
                // VER COMO SERÁ TRATADO NO FRONT
                throw new InvalidOperationException("Já existe um usuário com este email.");
            }

            var user = _mapper.Map<User>(dto);
            user.Password = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            user.Active = true;

            if (dto.roles == Roles.Admin) user.Role = dto.roles;
            else if (dto.roles == Roles.Attendant) user.Role = dto.roles;

            user.CreatedAt = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, BrazilTimeZone);

            await _unitOfWork.Users.AddAsync(user);
            await _unitOfWork.CommitAsync();
            
            return user;
        }

        public async Task<User?> GetUserById(int id)
        {
            if (id <= 0) return null;
            var user = await _unitOfWork.Users.GetByIdAsync(id);
            // CORREÇÃO: Só retorna se o usuário existir E estiver ativo
            if (user == null || !user.Active) return null;
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
            existingUser.UpdatedAt = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, BrazilTimeZone);

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

        private async Task SendEmailAsync(User user)
        {
            var smtpClient = new SmtpClient(_smtpOptions.Host)
            {
                Port = _smtpOptions.Port,
                Credentials = new NetworkCredential(_smtpOptions.User, _smtpOptions.Pass),
                EnableSsl = true

            };

            var emailBody = $@"
                <h1>Bem-vindo(a) {user.FirstName}!</h1>
                <p>Seu cadastro foi realizado com sucesso!</p>
                <p>Agora você pode acessar nossa plataforma e aproveitar todos os benefícios.</p>
                <p>Você pode acessar sua conta usando o email: {user.Email}</p>
                <p>Atenciosamente,<br>Equipe Tripz</p>";

            var mensagem = new MailMessage
            {
                From = new MailAddress(_smtpOptions.From),
                Subject = "Confirmação de Cadastro",
                Body = emailBody,
                IsBodyHtml = true
            };

            mensagem.To.Add(user.Email);

            await smtpClient.SendMailAsync(mensagem);
        }
    }
}