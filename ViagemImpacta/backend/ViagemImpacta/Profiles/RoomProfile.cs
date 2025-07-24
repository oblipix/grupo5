using AutoMapper;
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
