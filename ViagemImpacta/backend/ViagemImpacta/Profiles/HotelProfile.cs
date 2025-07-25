using AutoMapper;
using ViagemImpacta.DTO;
using ViagemImpacta.DTO.Hotel;
using ViagemImpacta.Models;

namespace ViagemImpacta.Profiles
{
    public class HotelProfile : Profile
    {
        public HotelProfile() 
        {
            CreateMap<Hotel, HotelDto>()
                .ForMember(dest => dest.RoomCount, 
                opt => opt.MapFrom(src => src.Rooms.Count));


            // ?? ENTITY ? RESPONSE
            CreateMap<Hotel, HotelResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.HotelId))
                .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.Image))
                .ForMember(dest => dest.HasWifi, opt => opt.MapFrom(src => src.Wifi))
                .ForMember(dest => dest.HasParking, opt => opt.MapFrom(src => src.Parking))
                .ForMember(dest => dest.HasGym, opt => opt.MapFrom(src => src.Gym))
                .ForMember(dest => dest.HasRestaurant, opt => opt.MapFrom(src => src.Restaurant));

            // ?? ENTITY ? LIST RESPONSE
            CreateMap<Hotel, HotelListResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.HotelId))
                .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.Image))
                .ForMember(dest => dest.HasWifi, opt => opt.MapFrom(src => src.Wifi))
                .ForMember(dest => dest.HasParking, opt => opt.MapFrom(src => src.Parking));
        }
    }
}
