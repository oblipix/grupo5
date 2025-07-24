using AutoMapper;
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
        }
    }
}
