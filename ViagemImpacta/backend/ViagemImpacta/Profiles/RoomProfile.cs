using AutoMapper;
using ViagemImpacta.Mappings;
using ViagemImpacta.Models;

namespace ViagemImpacta.Profiles
{
    public class RoomProfile : Profile
    {
        public RoomProfile() 
        {
            CreateMap<Room, RoomDto>();
        }
    }
}
