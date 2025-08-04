using AutoMapper;
using ViagemImpacta.DTO.Promotion;
using ViagemImpacta.Models;

namespace ViagemImpacta.Profiles
{
    public class PromotionProfile : Profile
    {
        public PromotionProfile() {

            CreateMap<CreatePromotionDTO, Promotion>();
        
        }
    }
}
