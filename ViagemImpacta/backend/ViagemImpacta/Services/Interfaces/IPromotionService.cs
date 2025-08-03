using ViagemImpacta.DTO.Promotion;
using ViagemImpacta.Models;

namespace ViagemImpacta.Services.Interfaces
{
    public interface IPromotionService
    {
        Task<Promotion?> CreatePromotionAsync(CreatePromotionDTO createpromotiondto);

    }
}
