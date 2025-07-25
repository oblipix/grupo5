using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.DTO.ReservationBook;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Controllers.ApiControllers
{
    /// <summary>
    /// Controller para gerenciar pacotes de viagem
    /// Usa DTOs organizados por entidade para melhor estruturação
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationBooksController : ControllerBase
    {
        private readonly IReservationBookService _reservationBookService;

        public ReservationBooksController(IReservationBookService reservationBookService)
        {
            _reservationBookService = reservationBookService;
        }

        /// <summary>
        /// US08 - Listar pacotes com filtros opcionais
        /// </summary>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<ReservationBookListResponse>>> GetPackages(
            [FromQuery] string? destination = null,
            [FromQuery] decimal? minPrice = null,
            [FromQuery] decimal? maxPrice = null,
            [FromQuery] DateTime? checkIn = null,
            [FromQuery] DateTime? checkOut = null,
            [FromQuery] bool? promotion = null,
            [FromQuery] int skip = 0,
            [FromQuery] int take = 10)
        {
            if (take > 100) take = 100;
            if (skip < 0) skip = 0;
            
            if (minPrice.HasValue && maxPrice.HasValue && minPrice > maxPrice)
                return BadRequest("Preço mínimo não pode ser maior que o máximo");
                
            if (checkIn.HasValue && checkOut.HasValue && checkIn > checkOut)
                return BadRequest("Data de check-in não pode ser maior que data de check-out");

            var packages = await _reservationBookService.GetPackagesWithFiltersAsync(
                destination, minPrice, maxPrice, checkIn, checkOut, promotion, skip, take);

            return Ok(packages);
        }

        /// <summary>
        /// US09 - Visualizar detalhes específicos de um pacote
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ReservationBookResponse>> GetPackage(int id)
        {
            if (id <= 0) 
                return BadRequest("ID deve ser um número positivo");

            var package = await _reservationBookService.GetPackageByIdAsync(id);
            
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
        public async Task<ActionResult<IEnumerable<ReservationBookListResponse>>> SearchPackages(
            [FromQuery] string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                return BadRequest("Termo de busca é obrigatório");

            if (searchTerm.Length < 2)
                return BadRequest("Termo de busca deve ter pelo menos 2 caracteres");

            var packages = await _reservationBookService.SearchPackagesAsync(searchTerm);
            
            return Ok(packages);
        }

        
    }
}

