using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.DTO.UserDTO;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Implementations;
using ViagemImpacta.Services.Interfaces;
using ViagemImpacta.ViewModels;

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
        public async Task<ActionResult<dynamic>> LoginAsync([FromBody] LoginAuthDTO loginAuthDTO)
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
                    Role = user.Role

                }
            };
        }
    }
}
