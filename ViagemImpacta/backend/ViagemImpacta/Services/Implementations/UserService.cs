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

        public async Task<User?> GetUserByIdAsync(int id)
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

            // Caminho absoluto ou relativo da imagem
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "banner-tripz.png");

            var emailBody = $@"
                <img src=""cid:logoTripz"" alt=""Logo Tripz"" style=""width:600px; height:auto; display:block; margin-bottom: 20px;"" />

                <h1>Bem-vindo(a) à Tripz, {user.FirstName}! 🌟</h1>

                <p>Seu cadastro foi realizado com sucesso e agora você faz parte da nossa comunidade de viajantes!</p>
                <p>Com sua conta, você poderá:</p>
                <ul>
                    <li>Reservar viagens de forma rápida e segura</li>
                    <li>Acessar promoções exclusivas</li>
                    <li>Receber dicas personalizadas de roteiros</li>
                </ul>

                <p>Para acessar sua conta, use este e-mail: <strong>{user.Email}</strong></p>

                <p style='text-align: center; margin-top: 20px;'>
                  <a href='https://tripz.com/login' style='
                    background-color: #1e90ff;
                    color: white;
                    padding: 12px 24px;
                    text-align: left;
                    text-decoration: none;
                    border-radius: 6px;
                    font-weight: bold;'>
                    Acessar minha conta
                  </a>
                </p>
                <p>Qualquer dúvida, nossa equipe está pronta para te ajudar. <a href='https://tripz.com/ajuda'>Fale com a gente</a>.</p>
                <p>Boas viagens! 🌍<br><strong>Equipe Tripz</strong></p>";

            var mensagem = new MailMessage
            {
                From = new MailAddress(_smtpOptions.From),
                Subject = "Confirmação de Cadastro",
                Body = emailBody,
                IsBodyHtml = true
            };

            mensagem.To.Add(user.Email);

            // Cria o LinkedResource para a imagem
            var logo = new LinkedResource(imagePath)
            {
                ContentId = "logoTripz"
            };

            // Cria o AlternateView e adiciona o LinkedResource
            var htmlView = AlternateView.CreateAlternateViewFromString(emailBody, null, "text/html");
            htmlView.LinkedResources.Add(logo);
            mensagem.AlternateViews.Add(htmlView);

            await smtpClient.SendMailAsync(mensagem);
        }

        //salva token no banco
        public async Task SavePasswordResetToken(int userId, string token, DateTime expiration)
        {
            var resetToken = new PasswordResetToken
            {
                UserId = userId,
                Token = token,
                Expiration = expiration, //DateTime.UtcNow.AddHours(1)
                Used = false
            };

            await _unitOfWork.PasswordResetTokens.SaveTokenAsync(resetToken);
            await _unitOfWork.CommitAsync();
        }

        //envia email com o link
        public async Task SendPasswordRecoveryEmail(User user, string token)
        {
            //para evitar enviar um email para um email não cadastrado
            var foundUser = await _unitOfWork.Users.GetUserByEmail(user.Email);
            if (foundUser == null) return;

            var smtpClient = new SmtpClient(_smtpOptions.Host)
            {
                Port = _smtpOptions.Port,
                Credentials = new NetworkCredential(_smtpOptions.User, _smtpOptions.Pass),
                EnableSsl = true
            };

           
            var emailBody = $@"
                <h1>Recuperação de senha</h1>
                <p>Olá, {foundUser.FirstName}!</p>
                <p>Para redefinir sua senha, clique no link abaixo:</p>
                <p><a href='{token}'>Redefinir senha</a></p>
                <p>Se você não solicitou, ignore este e-mail.</p>";

            var mensagem = new MailMessage
            {
                From = new MailAddress(_smtpOptions.From),
                Subject = "Recuperação de senha",
                Body = emailBody,
                IsBodyHtml = true
            };

            mensagem.To.Add(foundUser.Email);

            await smtpClient.SendMailAsync(mensagem);
        }

        //busca o token válido
        public async Task<PasswordResetToken?> GetPasswordResetToken(string token)
        {
            return await _unitOfWork.PasswordResetTokens.GetByTokenAsync(token);
        }

        //invalida o token (marca como usado)
        public async Task InvalidatePasswordResetToken(string token)
        {
            var resetToken = await _unitOfWork.PasswordResetTokens.GetByTokenAsync(token);
            if (resetToken != null)
            {
                resetToken.Used = true;
                await _unitOfWork.PasswordResetTokens.InvalidateTokenAsync(resetToken);
                await _unitOfWork.CommitAsync();
            }
        }

        public async Task UpdateUserPassword (User user)
        {
            await _unitOfWork.Users.UpdateAsync(user);
            await _unitOfWork.CommitAsync ();
        }
    }
}