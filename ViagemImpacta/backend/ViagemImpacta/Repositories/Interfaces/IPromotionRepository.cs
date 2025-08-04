using ViagemImpacta.Models;

namespace ViagemImpacta.Repositories.Interfaces
{
    public interface IPromotionRepository : IRepository<Promotion>
    {
        Task<IEnumerable<Promotion>> GetActivePromotionsAsync();
        Task<IEnumerable<Promotion>> GetPromotionsByHotelIdAsync(int hotelId);
        Task<Promotion?> GetPromotionByIdAsync(int promotionId);
    }
}
