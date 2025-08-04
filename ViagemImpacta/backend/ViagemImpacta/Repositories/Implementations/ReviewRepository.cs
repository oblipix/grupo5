using ViagemImpacta.Models;
using ViagemImpacta.Repositories.Interfaces;
using ViagemImpacta.Data;
using Microsoft.EntityFrameworkCore;

namespace ViagemImpacta.Repositories.Implementations
{
    public class ReviewRepository : Repository<Review>, IReviewRepository
    {
        private readonly AgenciaDbContext _context;
        public ReviewRepository(AgenciaDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Review>> GetReviewsByHotelIdAsync(int hotelId)
        {
            return await _context.Reviews.Where(r => r.HotelId == hotelId).ToListAsync();
        }

        public async Task<IEnumerable<Review>> GetReviewsByUserIdAsync(int userId)
        {
            return await _context.Reviews.Where(r => r.UserId == userId).ToListAsync();
        }
    }
}
