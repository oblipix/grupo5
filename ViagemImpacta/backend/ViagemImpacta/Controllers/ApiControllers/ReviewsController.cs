using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces;
using ViagemImpacta.DTO;

namespace ViagemImpacta.Controllers.ApiControllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Requer autenticação para todos os endpoints
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewService _reviewService;

        public ReviewsController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpPost]
        public async Task<ActionResult<Review>> Create([FromBody] CreateReviewDto reviewDto)
        {
            Console.WriteLine($"Recebido DTO: {System.Text.Json.JsonSerializer.Serialize(reviewDto)}");
            Console.WriteLine($"ModelState.IsValid: {ModelState.IsValid}");
            
            if (!ModelState.IsValid)
            {
                Console.WriteLine("ModelState errors:");
                foreach (var error in ModelState)
                {
                    Console.WriteLine($"Key: {error.Key}, Errors: {string.Join(", ", error.Value.Errors.Select(e => e.ErrorMessage))}");
                }
                return BadRequest(ModelState);
            }

            // Extrai o UserId do token JWT
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized("Token de usuário inválido");
            }

            // Cria o objeto Review a partir do DTO
            var review = new Review
            {
                HotelId = reviewDto.HotelId,
                Rating = reviewDto.Rating,
                Comment = reviewDto.Comment,
                UserId = userId,
                CreatedAt = DateTime.UtcNow
            };

            try
            {
                var created = await _reviewService.CreateReviewAsync(review);
                return CreatedAtAction(nameof(GetById), new { id = created.ReviewId }, created);
            }
            catch (InvalidOperationException ex)
            {
                // Trata especificamente o caso de review duplicada
                return Conflict(new { message = ex.Message });
            }
        }

        [HttpGet("hotel/{hotelId}")]
        public async Task<ActionResult<IEnumerable<Review>>> GetByHotel(int hotelId)
        {
            var reviews = await _reviewService.GetReviewsByHotelIdAsync(hotelId);
            return Ok(reviews);
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Review>>> GetByUser(int userId)
        {
            var reviews = await _reviewService.GetReviewsByUserIdAsync(userId);
            return Ok(reviews);
        }

        [HttpGet("user-hotel-review/{hotelId}")]
        public async Task<ActionResult<Review>> GetUserHotelReview(int hotelId)
        {
            // Extrai o UserId do token JWT
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized("Token de usuário inválido");
            }

            // Busca se o usuário já tem uma review para este hotel
            var existingReview = await _reviewService.GetUserReviewForHotelAsync(userId, hotelId);
            
            if (existingReview == null)
            {
                return NotFound("Usuário ainda não avaliou este hotel");
            }

            return Ok(existingReview);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetById(int id)
        {
            var review = await _reviewService.GetReviewByIdAsync(id);
            if (review == null) return NotFound();
            return Ok(review);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Review>> Update(int id, [FromBody] Review review)
        {
            if (id != review.ReviewId) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var updated = await _reviewService.UpdateReviewAsync(review);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _reviewService.DeleteReviewAsync(id);
            if (!result) return NotFound();
            return Ok();
        }
    }
}
