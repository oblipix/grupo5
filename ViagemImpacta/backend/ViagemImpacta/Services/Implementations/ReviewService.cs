using ViagemImpacta.Models;
using ViagemImpacta.Repositories;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Services.Implementations
{
    public class ReviewService : IReviewService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ReviewService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Review> CreateReviewAsync(Review review)
        {
            await _unitOfWork.Reviews.AddAsync(review);
            await _unitOfWork.CommitAsync();
            await UpdateHotelRatingAsync(review.HotelId);
            return review;
        }

        public async Task<Review?> GetReviewByIdAsync(int reviewId)
        {
            return await _unitOfWork.Reviews.GetByIdAsync(reviewId);
        }

        public async Task<IEnumerable<Review>> GetReviewsByHotelIdAsync(int hotelId)
        {
            return await _unitOfWork.Reviews.GetReviewsByHotelIdAsync(hotelId);
        }

        public async Task<IEnumerable<Review>> GetReviewsByUserIdAsync(int userId)
        {
            return await _unitOfWork.Reviews.GetReviewsByUserIdAsync(userId);
        }

        public async Task<Review> UpdateReviewAsync(Review review)
        {
            _unitOfWork.Reviews.Update(review);
            await _unitOfWork.CommitAsync();
            await UpdateHotelRatingAsync(review.HotelId);
            return review;
        }

        public async Task<bool> DeleteReviewAsync(int reviewId)
        {
            var review = await _unitOfWork.Reviews.GetByIdAsync(reviewId);
            if (review == null) return false;
            var hotelId = review.HotelId;
            _unitOfWork.Reviews.Remove(review);
            await _unitOfWork.CommitAsync();
            await UpdateHotelRatingAsync(hotelId);
            return true;
        }

        private async Task UpdateHotelRatingAsync(int hotelId)
        {
            var reviews = await _unitOfWork.Reviews.GetReviewsByHotelIdAsync(hotelId);
            float avg = 0;
            if (reviews.Any())
                avg = (float)reviews.Average(r => r.Rating);
            var hotel = await _unitOfWork.Hotels.GetByIdAsync(hotelId);
            if (hotel != null)
            {
                hotel.Rating = avg;
                _unitOfWork.Hotels.Update(hotel);
                await _unitOfWork.CommitAsync();
            }
        }
    }
}
