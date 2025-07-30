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


            //TODO: Colocar apenas os quartos disponiveis para a data
            
            // Mapeia Hotel para HotelDto, incluindo:
            // - RoomCount: soma dos quartos
            // - LowestRoomPrice: menor preço entre todos os quartos vinculados
            CreateMap<Hotel, HotelDto>()
                .ForMember(dest => dest.RoomCount, 
            opt => opt.MapFrom(src => src.Rooms.Sum(r => r.TotalRooms)))
                .ForMember(dest => dest.LowestRoomPrice,
            opt => opt.MapFrom(src => src.Rooms != null && src.Rooms.Any()
                ? src.Rooms.Min(r => r.AverageDailyPrice)
                : (decimal?)null));

      }


    }
}
