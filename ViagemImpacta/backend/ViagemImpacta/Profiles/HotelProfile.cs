using AutoMapper;
using ViagemImpacta.DTO.HotelDTO;
using ViagemImpacta.Models;

namespace ViagemImpacta.Profiles
{
    public class HotelProfile : Profile
    {
        public HotelProfile()
        {
           
       

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
            : (decimal?)null))
    .ForMember(dest => dest.Rooms,
    opt => opt.MapFrom(src => src.Rooms
        .OrderBy(r => r.AverageDailyPrice)
        .Take(1)
        .ToList()));

      }


    }
}
