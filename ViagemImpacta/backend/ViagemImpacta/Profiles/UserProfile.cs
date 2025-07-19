using AutoMapper;
using ViagemImpacta.DTO;
using ViagemImpacta.Models;

namespace ViagemImpacta.Profiles
{
    public class UserProfile : Profile
    {

        public UserProfile()
        {
            CreateMap<CreateUserDTO, User>();
            //CreateMap<User, UserReturnInfosDTO>();
        }
    }
}
