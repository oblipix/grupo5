using ApiCatalogo.Repositories;
using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Controllers.ApiControllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TravelPackagesController : ControllerBase
    {
        private readonly ITravelPackageService _travelPackageService;

        public TravelPackagesController(ITravelPackageService travelPackageService)
        {
            _travelPackageService = travelPackageService;
        }

        /// <summary>
        /// US08 - Listar pacotes com filtros
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TravelPackage>>> GetPackages(
            [FromQuery] string? destination = null,
            [FromQuery] decimal? minPrice = null,
            [FromQuery] decimal? maxPrice = null,
            [FromQuery] DateTime? startDate = null,
            [FromQuery] DateTime? endDate = null,
            [FromQuery] bool? promotion = null,
            [FromQuery] int skip = 0,
            [FromQuery] int take = 10)
        {
            var packages = await _travelPackageService.GetPackagesWithFiltersAsync(
                destination, minPrice, maxPrice, startDate, endDate, promotion, skip, take);

            return Ok(packages);
        }

        /// <summary>
        /// US09 - Visualizar detalhes do pacote
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<TravelPackage>> GetPackage(int id)
        {
            var package = await _travelPackageService.GetPackageByIdAsync(id);
            if (package == null) return NotFound();
            return Ok(package);
        }

        /// <summary>
        /// Busca por termo livre
        /// </summary>
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<TravelPackage>>> SearchPackages(
            [FromQuery] string searchTerm)
        {
            

            var packages = await _travelPackageService.SearchPackagesAsync(searchTerm);
            return Ok(packages);
        }
    }
}

