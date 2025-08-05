using ViagemImpacta.Models;

namespace ViagemImpacta.Services.Interfaces
{
    public interface IReviewService
    {
        Task<Review> CreateReviewAsync(Review review);
        Task<Review?> GetReviewByIdAsync(int reviewId);
        Task<IEnumerable<Review>> GetReviewsByHotelIdAsync(int hotelId);
        Task<IEnumerable<Review>> GetReviewsByUserIdAsync(int userId);
        Task<Review?> GetUserReviewForHotelAsync(int userId, int hotelId);
        Task<Review> UpdateReviewAsync(Review review);
        Task<bool> DeleteReviewAsync(int reviewId);
    }
}
