using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using ViagemImpacta.DTO.UserDTO;
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

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            try
            {
                var user = await _userService.GetUserById(id);
                if (user == null)
                    return NotFound($"Usuário com ID {id} não encontrado.");

                var userDto = _mapper.Map<UserDto>(user);
                return Ok(userDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }

        [HttpPost]
        [Route("createUser")]
        public async Task<ActionResult<UserDto>> CreateUser([FromBody] CreateUserDto CreateUserDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (CreateUserDTO == null)
                return BadRequest("Usuário não pode ser nulo.");

            try
            {
                var user = await _userService.CreateUser(CreateUserDTO);
                var userDto = _mapper.Map<UserDto>(user);
                return CreatedAtAction(nameof(GetUser), new { id = user.UserId }, userDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<UserDto>> UpdateUser(int id, [FromBody] UpdateUserDto dto)
        {
            // Validações iniciais
            if (dto == null)
                return BadRequest("Dados do usuário são obrigatórios.");
                
            if (id != dto.UserId)
                return BadRequest("ID do usuário na URL não confere com o ID no corpo da requisição.");

            if (!ModelState.IsValid)
            {
                var errors = ModelState
                    .SelectMany(x => x.Value.Errors)
                    .Select(x => x.ErrorMessage)
                    .ToList();
                    
                return BadRequest(new { 
                    message = "Dados inválidos", 
                    errors = errors 
                });
            }

            try
            {
                Console.WriteLine($"Recebido UpdateUser para ID: {id}");
                Console.WriteLine($"DTO: {System.Text.Json.JsonSerializer.Serialize(dto)}");
                
                var updatedUser = await _userService.UpdateUser(dto);
                var userDto = _mapper.Map<UserDto>(updatedUser);
                
                Console.WriteLine($"Usuário atualizado com sucesso: {updatedUser.UserId}");
                return Ok(userDto);
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"ArgumentException: {ex.Message}");
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine($"InvalidOperationException: {ex.Message}");
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception geral: {ex.Message}");
                Console.WriteLine($"StackTrace: {ex.StackTrace}");
                return StatusCode(500, $"Erro interno do servidor: {ex.Message}");
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
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers([FromQuery] int skip = 0, [FromQuery] int take = 10)
        {
            try
            {
                var users = await _userService.ListAllClients(skip, take);
                var userDtos = _mapper.Map<IEnumerable<UserDto>>(users);
                return Ok(userDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }
    }   
}
