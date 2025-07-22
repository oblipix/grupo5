using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using ViagemImpacta.DTO.UserDTO;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Implementations;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Controllers.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper; 

        public UsersController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper; 
        }


        [HttpPost]
        [Authorize]
        public async Task<ActionResult<UserDTO>> CreateUser([FromBody] CreateUserDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (dto == null)
                return BadRequest("Usuário não pode ser nulo.");

            try
            {
                var user = await _userService.CreateUser(dto);
                var userDto = _mapper.Map<UserDTO>(user);
                return CreatedAtAction(nameof(GetUser), new { id = user.UserId }, userDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<UserDTO>> GetUser(int id)
        {
            try
            {
                var user = await _userService.GetUserById(id);
                if (user == null)
                    return NotFound($"Usuário com ID {id} não encontrado.");

                var userDto = _mapper.Map<UserDTO>(user);
                return Ok(userDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<UserDTO>> UpdateUser(long id, [FromBody] UpdateUserDTO dto)
        {
            if (dto == null || id != dto.UserId || !ModelState.IsValid)
                return BadRequest("Requisição inválida.");

            try
            {
                var updatedUser = await _userService.UpdateUser(dto);
                var userDto = _mapper.Map<UserDTO>(updatedUser);
                return Ok(userDto);
            }
            catch (Exception ex)
            {
                // Trate todas as exceções igual, retornando BadRequest com a mensagem
                return BadRequest($"Erro ao atualizar usuário: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteUser(int id)
        {
            try
            {
                var deleted = await _userService.DeleteUser(id);
                if (!deleted)
                    return NotFound($"Usuário com ID {id} não encontrado.");

                return NoContent(); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAllUsers([FromQuery] int skip = 0, [FromQuery] int take = 10)
        {
            try
            {
                var users = await _userService.ListAllClients(skip, take);
                var userDtos = _mapper.Map<IEnumerable<UserDTO>>(users);
                return Ok(userDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }

        [HttpPost]
        [Route("login")]

        public async Task<ActionResult<dynamic>> LoginAsync ([FromBody]LoginAuthDTO loginAuthDTO)
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
