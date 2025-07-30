using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories;
using AutoMapper;
using ViagemImpacta.DTO.HotelDTO;

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
    }

}
