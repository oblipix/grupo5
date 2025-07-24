using AutoMapper;
using ViagemImpacta.DTO;
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
