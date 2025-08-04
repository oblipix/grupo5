using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.DTO.UserDTO;
using ViagemImpacta.Services.Implementations;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Controllers.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public AuthController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }
    

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<dynamic>> LoginAsync([FromBody] LoginAuthDto loginAuthDTO)
        {
            if (loginAuthDTO == null || string.IsNullOrEmpty(loginAuthDTO.Email) || string.IsNullOrEmpty(loginAuthDTO.Password))
            {
                return BadRequest("Email e senha são obrigatórios.");
            }
            var user = await _userService.GetUserByEmail(loginAuthDTO.Email);
            if (user == null)
            {
                return NotFound("Usuário não encontrado.");
            }
            loginAuthDTO.Role = user.Role.ToString(); // Define a role do usuário no DTO

            if (!BCrypt.Net.BCrypt.Verify(loginAuthDTO.Password, user.Password))
            {
                return Unauthorized("Email ou senha inválidos.");
            }
            if (!user.Active)
            {
                return Unauthorized("Usuário desativado.");
            }
            var token = TokensService.GenerateToken(user);
            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized("Falha ao gerar token.");
            }
            loginAuthDTO.Password = string.Empty; // Limpa a senha do DTO para segurança
            return new
            {
                token = token,
                user = new
                {
                    UserId = user.UserId,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Cpf=user.Cpf,
                    Phone=user.Phone,
                    Role = user.Role

                }
            };
        }

        [HttpPost]
        [Route("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody]ForgotPasswordDto dto)
        {
            //Recebe o email
            var user = await _userService.GetUserByEmail(dto.Email);
     
            if (user == null || !user.Active){
                return NotFound("Usuário não encontrado ou inativo.");
            }

            //Gera token
            var token = Guid.NewGuid().ToString();
            var expiration = DateTime.UtcNow.AddHours(1);

            //Salva token no banco com validade de 1 hora
            await _userService.SavePasswordResetToken(user.UserId, token, expiration);

            //AJEITAR ESSA PORTA AQUI
            //resetar-senha está certo?
            var link = $"http://localhost:5173/reset-password/{token}";

            //Envia email com link de recuperação
            await _userService.SendPasswordRecoveryEmail(user, link);

            return Ok("Instruções de redefinição enviadas por email");
        }

        [HttpPost]
        [Route("reset-password")]
        public async Task<IActionResult> ResetPassword ([FromBody]ResetPasswordDto dto)
        {
            // Recebe token + nova senha
            var resetToken = await _userService.GetPasswordResetToken(dto.Token);
            if (resetToken == null || resetToken.Expiration < DateTime.UtcNow)
            {
                return BadRequest("Token inválido ou expirado");
            }

            var user = await _userService.GetUserByIdAsync(resetToken.UserId);
            if (user == null || !user.Active)
            {
                return NotFound("Usuário inválido");
            }

            // Atualiza a senha do usuário
            user.Password = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            await _userService.UpdateUserPassword(user);

            //invalida ou apaga o token
            await _userService.InvalidatePasswordResetToken(dto.Token);

            return Ok("Senha atualizada com sucesso");
        }
    }
}
