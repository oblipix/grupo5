using AutoMapper;
using ViagemImpacta.DTO.TravelPackageDTO;
using ViagemImpacta.Models;

namespace ViagemImpacta.Profiles
{
    public class TravelPackageProfile : Profile
    {
        public TravelPackageProfile() 
        {
            CreateMap<TravelPackage, TravelPackageDto>()
                .ForMember(dest => dest.HotelNames, 
                opt => opt.MapFrom(src => src.Hotels.Select(h => h.Name)))
                .ForMember(dest => dest.Hotels, 
                opt => opt.MapFrom(src => src.Hotels));

            CreateMap<CreateUpdateTravelPackageDto, TravelPackage>();
        }
    }
}
