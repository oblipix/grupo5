using ViagemImpacta.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ViagemImpacta.Repositories.Interfaces
{
    public interface IReviewRepository : IRepository<Review>
    {
        Task<IEnumerable<Review>> GetReviewsByHotelIdAsync(int hotelId);
        Task<IEnumerable<Review>> GetReviewsByUserIdAsync(int userId);
    }
}
