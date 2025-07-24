using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.DTO.TravelPackage;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Controllers.ApiControllers
{
    /// <summary>
    /// Controller para gerenciar pacotes de viagem
    /// Usa DTOs organizados por entidade para melhor estruturação
    /// </summary>
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
        /// US08 - Listar pacotes com filtros opcionais
        /// </summary>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<TravelPackageListResponse>>> GetPackages(
            [FromQuery] string? destination = null,
            [FromQuery] decimal? minPrice = null,
            [FromQuery] decimal? maxPrice = null,
            [FromQuery] DateTime? startDate = null,
            [FromQuery] DateTime? endDate = null,
            [FromQuery] bool? promotion = null,
            [FromQuery] int skip = 0,
            [FromQuery] int take = 10)
        {
            if (take > 100) take = 100;
            if (skip < 0) skip = 0;
            
            if (minPrice.HasValue && maxPrice.HasValue && minPrice > maxPrice)
                return BadRequest("Preço mínimo não pode ser maior que o máximo");
                
            if (startDate.HasValue && endDate.HasValue && startDate > endDate)
                return BadRequest("Data de início não pode ser maior que data final");

            var packages = await _travelPackageService.GetPackagesWithFiltersAsync(
                destination, minPrice, maxPrice, startDate, endDate, promotion, skip, take);

            return Ok(packages);
        }

        /// <summary>
        /// US09 - Visualizar detalhes específicos de um pacote
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<TravelPackageResponse>> GetPackage(int id)
        {
            if (id <= 0) 
                return BadRequest("ID deve ser um número positivo");

            var package = await _travelPackageService.GetPackageByIdAsync(id);
            
            if (package == null) 
                return NotFound($"Pacote com ID {id} não encontrado");
                
            return Ok(package);
        }

        /// <summary>
        /// Buscar pacotes por termo livre
        /// </summary>
        [HttpGet("search")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<TravelPackageListResponse>>> SearchPackages(
            [FromQuery] string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                return BadRequest("Termo de busca é obrigatório");
                
            if (searchTerm.Length < 2)
                return BadRequest("Termo de busca deve ter pelo menos 2 caracteres");

            var packages = await _travelPackageService.SearchPackagesAsync(searchTerm);
            
            return Ok(packages);
        }

        
    }
}

