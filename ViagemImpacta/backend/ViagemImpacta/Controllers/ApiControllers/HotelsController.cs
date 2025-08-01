
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

      
        public HotelsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _hotelMappingService = hotelMappingService;
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

        [HttpGet("search")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<HotelDto>>> SearchHotels(
            [FromQuery(Name = "destino")] string? destination,
            [FromQuery(Name = "hospedes")] int? guests,
            [FromQuery(Name = "precoMin")] decimal? minPrice,
            [FromQuery(Name = "precoMax")] decimal? maxPrice,
            [FromQuery] int? stars,
            [FromQuery(Name = "tipoQuarto")] string? roomType,
            [FromQuery(Name = "amenities")] string? amenities,
            [FromQuery(Name = "comodidades")] string? comodidades,
            [FromQuery] string? checkIn,
            [FromQuery] string? checkOut)
        {
            // Aceita tanto 'amenities' quanto 'comodidades' como parâmetro
            var amenitiesParam = !string.IsNullOrEmpty(amenities) ? amenities : comodidades;

            // DEBUG: loga TODOS os parâmetros recebidos do frontend
            Console.WriteLine("[DEBUG][backend] ===== PARÂMETROS RECEBIDOS =====");
            Console.WriteLine($"[DEBUG][backend] destino: '{destination}'");
            Console.WriteLine($"[DEBUG][backend] hospedes: {guests}");
            Console.WriteLine($"[DEBUG][backend] precoMin: {minPrice}");
            Console.WriteLine($"[DEBUG][backend] precoMax: {maxPrice}");
            Console.WriteLine($"[DEBUG][backend] stars: {stars}");
            Console.WriteLine($"[DEBUG][backend] tipoQuarto: '{roomType}'");
            Console.WriteLine($"[DEBUG][backend] amenities: '{amenities}'");
            Console.WriteLine($"[DEBUG][backend] comodidades: '{comodidades}'");
            Console.WriteLine($"[DEBUG][backend] checkIn: '{checkIn}'");
            Console.WriteLine($"[DEBUG][backend] checkOut: '{checkOut}'");
            Console.WriteLine($"[DEBUG][backend] amenitiesParam usado: '{amenitiesParam}'");
            Console.WriteLine("[DEBUG][backend] ================================");

            var hotels = await _unitOfWork.Hotels.SearchHotelsAsync(
                destination,
                minPrice,
                maxPrice,
                stars,
                roomType,
                amenitiesParam,
                guests,
                checkIn,
                checkOut
            );

            // Usa o HotelMappingService para aplicar lógica de negócio e mapeamento
            var hotelDtos = _hotelMappingService.MapHotelsToDto(hotels, guests);

            Console.WriteLine($"[DEBUG][backend] HotelMappingService processou {hotelDtos.Count()} hotéis com filtro guests: {guests}");

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


