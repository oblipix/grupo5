using AutoMapper;
using ViagemImpacta.DTOs;
using ViagemImpacta.Models;
using System.Linq;

namespace ViagemImpacta.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Hotel, HotelDto>()
                .ForMember(dest => dest.RoomCount, opt => opt.MapFrom(src => src.Rooms.Count));
            CreateMap<Room, RoomDto>();

            CreateMap<TravelPackage, TravelPackageDto>()
                .ForMember(dest => dest.HotelNames, opt => opt.MapFrom(src => src.Hotels.Select(h => h.Name)))
                .ForMember(dest => dest.Hotels, opt => opt.MapFrom(src => src.Hotels));
            CreateMap<CreateUpdateTravelPackageDto, TravelPackage>();
        }
    }
}