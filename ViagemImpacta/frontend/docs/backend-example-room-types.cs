// Exemplo de controller para tipos de quarto no backend (C#/.NET)
// RoomTypesController.cs

using Microsoft.AspNetCore.Mvc;

namespace ViagemImpacta.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomTypesController : ControllerBase
    {
        private readonly IRoomTypeService _roomTypeService;

        public RoomTypesController(IRoomTypeService roomTypeService)
        {
            _roomTypeService = roomTypeService;
        }

        // GET: api/room-types
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoomTypeDto>>> GetRoomTypes()
        {
            try
            {
                var roomTypes = await _roomTypeService.GetAllRoomTypesAsync();
                return Ok(roomTypes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno do servidor", error = ex.Message });
            }
        }

        // GET: api/room-types/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<RoomTypeDto>> GetRoomType(int id)
        {
            try
            {
                var roomType = await _roomTypeService.GetRoomTypeByIdAsync(id);
                
                if (roomType == null)
                {
                    return NotFound(new { message = "Tipo de quarto não encontrado" });
                }

                return Ok(roomType);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno do servidor", error = ex.Message });
            }
        }
    }

    // DTO para tipos de quarto
    public class RoomTypeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal BasePrice { get; set; }
        public int MaxOccupancy { get; set; }
        public List<string> Features { get; set; } = new List<string>();
    }
}
