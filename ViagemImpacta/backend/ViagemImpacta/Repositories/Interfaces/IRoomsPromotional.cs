using ViagemImpacta.Models;

namespace ViagemImpacta.Repositories.Interfaces
{
    public interface IRoomsPromotional 
    {
        Task<bool> RoomsAvailableAsync(int PromotionId);
        Task<RoomsPromotional?> GetRoomPromotionalByIdAsync(int idRoomPromotional);

    }
}
