using AutoMapper;
using ViagemImpacta.DTO.UserDTO;
using ViagemImpacta.Models;
using ViagemImpacta.ViewModels;

namespace ViagemImpacta.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<ReadAdminViewModel, ReadUserLoginDTO>();
            CreateMap<ReadUserLoginDTO, User>();
        }
    }
}
