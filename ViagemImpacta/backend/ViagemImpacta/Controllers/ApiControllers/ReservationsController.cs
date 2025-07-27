using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ViagemImpacta.DTO.ReservationDTO;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Controllers.ApiControllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationService _reservationService;

        public ReservationsController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        /// <summary>
        /// Criar uma nova reserva
        /// </summary>
        /// <param name="createReservationDto">Dados da reserva</param>
        /// <returns>Reserva criada</returns>
        [HttpPost]
        [ProducesResponseType(typeof(ReservationResponseDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<ReservationResponseDto>> CreateReservation([FromBody] CreateReservationDto createReservationDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var reservation = await _reservationService.CreateReservationAsync(createReservationDto);
                return CreatedAtAction(nameof(GetReservation), new { id = reservation.ReservationId }, reservation);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno do servidor", details = ex.Message });
            }
        }

        /// <summary>
        /// Buscar reserva por ID
        /// </summary>
        /// <param name="id">ID da reserva</param>
        /// <returns>Detalhes da reserva</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ReservationResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ReservationResponseDto>> GetReservation(int id)
        {
            try
            {
                var reservation = await _reservationService.GetReservationByIdAsync(id);
                if (reservation == null)
                {
                    return NotFound(new { message = "Reserva não encontrada" });
                }

                return Ok(reservation);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno do servidor", details = ex.Message });
            }
        }

        /// <summary>
        /// Buscar reservas de um usuário
        /// </summary>
        /// <param name="userId">ID do usuário</param>
        /// <returns>Lista de reservas do usuário</returns>
        [HttpGet("user/{userId}")]
        [ProducesResponseType(typeof(IEnumerable<ReservationResponseDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<ReservationResponseDto>>> GetReservationsByUser(int userId)
        {
            try
            {
                var reservations = await _reservationService.GetReservationsByUserIdAsync(userId);
                return Ok(reservations);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno do servidor", details = ex.Message });
            }
        }

        /// <summary>
        /// Buscar reservas de um hotel
        /// </summary>
        /// <param name="hotelId">ID do hotel</param>
        /// <returns>Lista de reservas do hotel</returns>
        [HttpGet("hotel/{hotelId}")]
        [ProducesResponseType(typeof(IEnumerable<ReservationResponseDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<ReservationResponseDto>>> GetReservationsByHotel(int hotelId)
        {
            try
            {
                var reservations = await _reservationService.GetReservationsByHotelIdAsync(hotelId);
                return Ok(reservations);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno do servidor", details = ex.Message });
            }
        }

        /// <summary>
        /// Confirmar uma reserva
        /// </summary>
        /// <param name="id">ID da reserva</param>
        /// <returns>Status da operação</returns>
        [HttpPut("{id}/confirm")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> ConfirmReservation(int id)
        {
            try
            {
                var result = await _reservationService.ConfirmReservationAsync(id);
                if (!result)
                {
                    return NotFound(new { message = "Reserva não encontrada" });
                }

                return Ok(new { message = "Reserva confirmada com sucesso" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno do servidor", details = ex.Message });
            }
        }

        /// <summary>
        /// Cancelar uma reserva
        /// </summary>
        /// <param name="id">ID da reserva</param>
        /// <param name="userId">ID do usuário (para validação)</param>
        /// <returns>Status da operação</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> CancelReservation(int id, [FromQuery] int userId)
        {
            try
            {
                var result = await _reservationService.CancelReservationAsync(id, userId);
                if (!result)
                {
                    return NotFound(new { message = "Reserva não encontrada ou você não tem permissão para cancelá-la" });
                }

                return Ok(new { message = "Reserva cancelada com sucesso" });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno do servidor", details = ex.Message });
            }
        }

        /// <summary>
        /// Verificar disponibilidade de um quarto
        /// </summary>
        /// <param name="roomId">ID do quarto</param>
        /// <param name="checkIn">Data de check-in</param>
        /// <param name="checkOut">Data de check-out</param>
        /// <returns>Status de disponibilidade</returns>
        [HttpGet("availability")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> CheckRoomAvailability([FromQuery] int roomId, [FromQuery] DateTime checkIn, [FromQuery] DateTime checkOut)
        {
            try
            {
                if (checkOut <= checkIn)
                {
                    return BadRequest(new { message = "Data de check-out deve ser posterior ao check-in" });
                }

                var isAvailable = await _reservationService.IsRoomAvailableAsync(roomId, checkIn, checkOut);
                return Ok(new { 
                    roomId = roomId,
                    checkIn = checkIn,
                    checkOut = checkOut,
                    available = isAvailable,
                    message = isAvailable ? "Quarto disponível" : "Quarto não disponível para o período"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno do servidor", details = ex.Message });
            }
        }
    }
}