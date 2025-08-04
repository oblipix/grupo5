
using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories;
using AutoMapper;
using ViagemImpacta.DTO.HotelDTO;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Controllers.ApiControllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class HotelsController : ControllerBase
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IHotelService _hotelService;

        public HotelsController(IUnitOfWork unitOfWork, IMapper mapper, IHotelService hotelService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _hotelService = hotelService;
        }


        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<HotelDto>>> GetAllHotels()
        {
            var hotels = await _unitOfWork.Hotels.GetAllHotelsWithRoomsAsync();
            var hotelDtos = _mapper.Map<IEnumerable<HotelDto>>(hotels);
            return Ok(hotelDtos);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<HotelDto>> GetHotel(int id)
        {

            if (id <= 0)
                return BadRequest("ID deve ser maior que zero");


            var hotel = await _unitOfWork.Hotels.GetHotelWithRoomsAsync(id);
            var hotelDto = _mapper.Map<HotelDto>(hotel);


            if (hotel == null)
                return NotFound($"Hotel com ID {id} não encontrado");


            return Ok(hotelDto);
        }




        [HttpGet("search")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<HotelDto>>> SearchHotels(
            [FromQuery] string? destination,
            [FromQuery] int? guests,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice,
            [FromQuery] int? stars,
            [FromQuery] string? roomType,
            [FromQuery] string? amenities,
            [FromQuery] string? checkIn,
            [FromQuery] string? checkOut)
        {
            // Usar repository para busca completa (incluindo datas e room types)
            var hotels = await _unitOfWork.Hotels.SearchHotelsAsync(
                destination,
                minPrice,
                maxPrice,
                stars,
                roomType,
                amenities,
                guests,
                checkIn,
                checkOut
            );

            var hotelDtos = _mapper.Map<IEnumerable<HotelDto>>(hotels);
            return Ok(hotelDtos);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<HotelDto>> CreateHotel([FromBody] HotelDto hotelDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var hotel = _mapper.Map<Hotel>(hotelDto);
            var createdHotel = await _hotelService.CreateHotelAsync(hotel);
            var resultDto = _mapper.Map<HotelDto>(createdHotel);

            return CreatedAtAction(nameof(GetHotel), new { id = createdHotel.HotelId }, resultDto);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<HotelDto>> UpdateHotel(int id, [FromBody] HotelDto hotelDto)
        {
            if (id != hotelDto.HotelId)
                return BadRequest("ID na URL não corresponde ao ID do hotel");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingHotel = await _hotelService.GetHotelByIdAsync(id);
            if (existingHotel == null)
                return NotFound($"Hotel com ID {id} não encontrado");

            var hotel = _mapper.Map<Hotel>(hotelDto);
            await _hotelService.UpdateHotelAsync(hotel);

            var updatedHotel = await _hotelService.GetHotelWithRoomsAsync(id);
            var resultDto = _mapper.Map<HotelDto>(updatedHotel);

            return Ok(resultDto);
        }
    }
}


