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
                        .ToList()))
                .ForMember(dest => dest.ImageUrls,
                    opt => opt.MapFrom(src => src.ImageUrls ?? new List<string>()));

            // Mapeia HotelDto para Hotel (para criação/atualização via API)
            CreateMap<HotelDto, Hotel>()
                .ForMember(dest => dest.Rooms, opt => opt.Ignore()) // Rooms são gerenciados separadamente
                .ForMember(dest => dest.ImageUrls,
                    opt => opt.MapFrom(src => src.ImageUrls ?? new List<string>()));

      }


    }
}
