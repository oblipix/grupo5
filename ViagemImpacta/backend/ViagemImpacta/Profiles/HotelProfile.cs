using AutoMapper;
using ViagemImpacta.DTO.HotelDTO;
using ViagemImpacta.Models;

namespace ViagemImpacta.Profiles
{
    public class HotelProfile : Profile
    {
        public HotelProfile()
        {
            CreateMap<Hotel, HotelDto>()
            .ForMember(dest => dest.RoomCount, 
            opt => opt.MapFrom(src => src.Rooms.Sum(r => r.TotalRooms)));


            // Mapeamento bidirecional para Hotel
            CreateMap<Hotel, Hotel>()
                .ForMember(dest => dest.HotelId, opt => opt.Ignore())
                .ForMember(dest => dest.Rooms, opt => opt.Ignore()); // Rooms são tratados separadamente

            // Mapeamento bidirecional para Room
            CreateMap<Room, Room>()
                .ForMember(dest => dest.RoomId, opt => opt.Condition(src => src.RoomId > 0))
                .ForMember(dest => dest.Hotel, opt => opt.Ignore());



        //    // 📋 ENTITY → RESPONSE
        //    CreateMap<Hotel, HotelResponse>()
        //        .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.HotelId))
        //        .ForMember(dest => dest.HasWifi, opt => opt.MapFrom(src => src.Wifi))
        //        .ForMember(dest => dest.HasParking, opt => opt.MapFrom(src => src.Parking))
        //        .ForMember(dest => dest.HasGym, opt => opt.MapFrom(src => src.Gym))
        //        .ForMember(dest => dest.HasRestaurant, opt => opt.MapFrom(src => src.Restaurant));

        //    // 📋 ENTITY → LIST RESPONSE
        //    CreateMap<Hotel, HotelListResponse>()
        //        .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.HotelId))
        //        .ForMember(dest => dest.HasWifi, opt => opt.MapFrom(src => src.Wifi))
        //        .ForMember(dest => dest.HasParking, opt => opt.MapFrom(src => src.Parking));
        }


    }
}
