using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.DTO;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Controllers.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService; // Use a INTERFACE

        public UsersController(IUserService userService) // Use a INTERFACE
        {
            _userService = userService;
        }

        [HttpGet("teste")]
        public ActionResult Get()
        {
            
            return Ok("Hello World!");
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser([FromBody] CreateUserDTO dto)
        {
            Console.WriteLine("Chegou no Controller");

            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (dto == null)
                {
                    return BadRequest("Usuário não pode ser nulo.");
                }

                var user = await _userService.CreateUser(dto);
                return CreatedAtAction(nameof(GetUser), new { id = user.UserId }, user);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao criar usuário: {ex.Message}");
            }
        }

        // Adicione este método para o CreatedAtAction funcionar
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(long id)
        {
            // Implementar depois
            return Ok();
        }
    }
}
