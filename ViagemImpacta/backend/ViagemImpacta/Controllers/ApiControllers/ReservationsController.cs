using AutoMapper;
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
        private readonly IMapper _mapper;

        public ReservationsController(IReservationService reservationService, IMapper mapper)
        {
            _reservationService = reservationService;
            _mapper = mapper;
        }

        /// <summary>
        /// Criar uma nova reserva
        /// </summary>
        /// <param name="createReservationDto">Dados da reserva</param>
        /// <returns>Reserva criada</returns>
        [HttpPost]
        public async Task<ActionResult<ReservationDto>> CreateReservation([FromBody] CreateReservationDto createReservationDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (createReservationDto == null)
                {
                    return BadRequest("Dados da reserva não podem ser nulos");
                }

                var reservation = await _reservationService.CreateReservationAsync(createReservationDto);
                var reservationDto = _mapper.Map<ReservationDto>(reservation);
                return CreatedAtAction(nameof(GetReservation), new { id = reservation.ReservationId }, reservationDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        /// <summary>
        /// Buscar reserva por ID
        /// </summary>
        /// <param name="id">ID da reserva</param>
        /// <returns>Detalhes da reserva</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<ReservationDto>> GetReservation(int id)
        {
            try
            {
                if (id <= 0)
                    return BadRequest( $"Reserva com ID {id} não encontrada");

                var reservation = await _reservationService.GetReservationByIdAsync(id);
                if (reservation == null)
                    return NotFound($"Reserva com ID {id} não encontrada");

                var reservationDto = _mapper.Map<ReservationDto>(reservation);
                return Ok(reservationDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }

        /// <summary>
        /// Buscar reservas de um usuário
        /// </summary>
        /// <param name="userId">ID do usuário</param>
        /// <returns>Lista de reservas do usuário</returns>
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<ReservationDto>>> GetReservationsByUser(int userId)
        {
            try
            {
                if (userId <= 0)
                    return BadRequest($"ID do usuário inválido: {userId}" );

                var reservations = await _reservationService.GetReservationsByUserIdAsync(userId);
                var reservationDto = _mapper.Map<IEnumerable<ReservationDto>>(reservations);
                return Ok(reservationDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }

        /// <summary>
        /// Buscar reservas de um hotel
        /// </summary>
        /// <param name="hotelId">ID do hotel</param>
        /// <returns>Lista de reservas do hotel</returns>
        [HttpGet("hotel/{hotelId}")]
        public async Task<ActionResult<IEnumerable<ReservationDto>>> GetReservationsByHotel(int hotelId)
        {
            try
            {
                if (hotelId <= 0)
                    return BadRequest($"ID do hotel inválido: {hotelId}");

                var reservations = await _reservationService.GetReservationsByHotelIdAsync(hotelId);
                var reservationDto = _mapper.Map<IEnumerable<ReservationDto>>(reservations);
                return Ok(reservationDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }

        /// <summary>
        /// Confirmar uma reserva
        /// </summary>
        /// <param name="id">ID da reserva</param>
        /// <returns>Status da operação</returns>
        /// 

        //[HttpPut("{id}/confirm")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public async Task<ActionResult> ConfirmReservation(int id)
        //{
        //    try
        //    {
        //        var result = await _reservationService.ConfirmReservationAsync(id);
        //        if (!result)
        //        {
        //            return NotFound(new { message = "Reserva não encontrada" });
        //        }

        //        return Ok(new { message = "Reserva confirmada com sucesso" });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new { message = "Erro interno do servidor", details = ex.Message });
        //    }
        //}

        /// <summary>
        /// Cancelar uma reserva
        /// </summary>
        /// <param name="id">ID da reserva</param>
        /// <param name="userId">ID do usuário (para validação)</param>
        /// <returns>Status da operação</returns>
        /// 

        //[HttpDelete("{id}")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public async Task<ActionResult> CancelReservation(int id, [FromQuery] int userId)
        //{
        //    try
        //    {
        //        var result = await _reservationService.CancelReservationAsync(id, userId);
        //        if (!result)
        //        {
        //            return NotFound(new { message = "Reserva não encontrada ou você não tem permissão para cancelá-la" });
        //        }

        //        return Ok(new { message = "Reserva cancelada com sucesso" });
        //    }
        //    catch (InvalidOperationException ex)
        //    {
        //        return BadRequest(new { message = ex.Message });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new { message = "Erro interno do servidor", details = ex.Message });
        //    }
        //}

        /// <summary>
        /// Verificar disponibilidade de um quarto
        /// </summary>
        /// <param name="roomId">ID do quarto</param>
        /// <param name="checkIn">Data de check-in</param>
        /// <param name="checkOut">Data de check-out</param>
        /// <returns>Status de disponibilidade</returns>
        /// 

        //[HttpGet("availability")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //public async Task<ActionResult> CheckRoomAvailability([FromQuery] int roomId, [FromQuery] DateTime checkIn, [FromQuery] DateTime checkOut)
        //{
        //    try
        //    {
        //        if (checkOut <= checkIn)
        //        {
        //            return BadRequest(new { message = "Data de check-out deve ser posterior ao check-in" });
        //        }

        //        var isAvailable = await _reservationService.IsRoomAvailableAsync(roomId, checkIn, checkOut);
        //        return Ok(new { 
        //            roomId = roomId,
        //            checkIn = checkIn,
        //            checkOut = checkOut,
        //            available = isAvailable,
        //            message = isAvailable ? "Quarto disponível" : "Quarto não disponível para o período"
        //        });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new { message = "Erro interno do servidor", details = ex.Message });
        //    }
        //}
    }
}