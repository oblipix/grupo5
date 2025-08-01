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
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _hotelService = hotelService;
        }

  
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<HotelDto>>> GetAllHotels()
        {
            var hotelDtos = await _hotelService.GetAllHotelsAsync();
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

            var hotel = await _hotelService.GetHotelWithRoomsAsync(id);
            
            if (hotel == null)
                return NotFound($"Hotel com ID {id} não encontrado");

            var hotelDto = _mapper.Map<HotelDto>(hotel);
            return Ok(hotelDto);
        }


        [HttpGet("stars/{stars}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<HotelDto>>> GetHotelsByStars(int stars)
        {

            if (stars < 1 || stars > 5) 
                return BadRequest("Estrelas devem ser entre 1 e 5");

            var hotels = await _unitOfWork.Hotels.GetHotelsByStarsAsync(stars);
            var hotelDtos = _mapper.Map<IEnumerable<HotelDto>>(hotels);


            return Ok(hotelDtos);
        }


        [HttpGet("amenities")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<HotelDto>>> GetHotelsWithAmenities(
            [FromQuery] bool wifi = false,     
            [FromQuery] bool parking = false,   
            [FromQuery] bool gym = false)       
        {

            var hotels = await _unitOfWork.Hotels.GetHotelsWithAmenitiesAsync(wifi, parking, gym);
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
