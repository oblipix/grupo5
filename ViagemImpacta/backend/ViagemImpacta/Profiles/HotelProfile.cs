using AutoMapper;
using ViagemImpacta.DTO.HotelDTO;
using ViagemImpacta.DTO.RoomDTO;
using ViagemImpacta.Models;

namespace ViagemImpacta.Profiles
{
    public class HotelProfile : Profile
    {
        public HotelProfile()
        {
            CreateMap<Hotel, HotelDto>()
                .ForMember(dest => dest.RoomCount,
                    opt => opt.MapFrom(src => src.Rooms != null ? src.Rooms.Sum(r => r.TotalRooms) : 0))
                .ForMember(dest => dest.LowestRoomPrice,
                    opt => opt.MapFrom(src => src.Rooms != null && src.Rooms.Any()
                        ? src.Rooms.Min(r => r.AverageDailyPrice)
                        : (decimal?)null))
                .ForMember(dest => dest.Rooms,
                    opt => opt.MapFrom(src => src.Rooms != null
                        ? src.Rooms.OrderBy(r => r.AverageDailyPrice).ToList()
                        : new List<Room>()))
                .ForMember(dest => dest.MaxRoomPrice,
                    opt => opt.MapFrom(src => src.Rooms != null && src.Rooms.Any()
                        ? src.Rooms.Max(r => r.AverageDailyPrice)
                        : (decimal?)null));
        }
    }
}
