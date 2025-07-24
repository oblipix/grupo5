using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<ActionResult<UserDto>> UpdateUser(long id, [FromBody] UpdateUserDto dto)
        {
            if (dto == null || id != dto.UserId || !ModelState.IsValid)
                return BadRequest("Requisição inválida.");

            try
            {
                var updatedUser = await _userService.UpdateUser(dto);
                var userDto = _mapper.Map<UserDto>(updatedUser);
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
