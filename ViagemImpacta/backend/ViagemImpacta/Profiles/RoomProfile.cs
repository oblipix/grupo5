using AutoMapper;
using ViagemImpacta.DTO.RoomDTO;
using ViagemImpacta.Models;

namespace ViagemImpacta.Profiles
{
    public class RoomProfile : Profile
    {
        public RoomProfile() 
        {
            CreateMap<Room, RoomDto>()
                .ForMember(dest => dest.TypeName, opt => opt.MapFrom(src => src.TypeName.ToString()));
        }
    }
}
