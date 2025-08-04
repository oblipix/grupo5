using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.Repositories.Interfaces;
using ViagemImpacta.Repositories;

namespace ViagemImpacta.Controllers.ApiControllers
{
    /// <summary>
    /// ⚠️ CONTROLLER TEMPORÁRIO PARA DEBUG
    /// Este controller deve ser removido em produção.
    /// Os testes foram movidos para ViagemImpacta.Tests/Controllers/DebugControllerTests.cs
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class DebugController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public DebugController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Endpoint para testar o sistema de debug do Fail-Fast
        /// ⚠️ REMOVER EM PRODUÇÃO - Usar testes unitários em ViagemImpacta.Tests
        /// </summary>
        [HttpGet("test-failfast")]
        public async Task<IActionResult> TestFailFast(
            [FromQuery] string? destination,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice,
            [FromQuery] int? stars,
            [FromQuery] string? roomType,
            [FromQuery] string? amenities,
            [FromQuery] int? guests,
            [FromQuery] string? checkIn,
            [FromQuery] string? checkOut)
        {
            var results = await _unitOfWork.Hotels.SearchHotelsAsync(
                destination, minPrice, maxPrice, stars, roomType,
                amenities, guests, checkIn, checkOut);

            return Ok(new
            {
                Message = "⚠️ DEBUG ENDPOINT - Check logs for debug information. Use unit tests instead!",
                ResultCount = results.Count(),
                Timestamp = DateTime.UtcNow,
                Parameters = new
                {
                    destination,
                    minPrice,
                    maxPrice,
                    stars,
                    roomType,
                    amenities,
                    guests,
                    checkIn,
                    checkOut
                }
            });
        }
    }
}
