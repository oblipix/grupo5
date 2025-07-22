using ApiCatalogo.Repositories;
using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.Models;

namespace ViagemImpacta.Controllers.ApiControllers
{


    [ApiController]
    [Route("api/[controller]")]
    public class HotelsController : ControllerBase
    {
        private readonly IRepository<Hotel> _repository;

        public HotelsController(IRepository<Hotel> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hotel>>> GetAllHotels()
        {
            var hotels = await _repository.GetAllAsync();
            return Ok(hotels);
        }
    }
}
