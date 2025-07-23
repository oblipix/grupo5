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
            CreateMap<User, UpdateUserViewModel>();
            CreateMap<UpdateUserViewModel, UpdateUserDTO>();

            CreateMap<ReadUserLoginDTO, User>();
            
            CreateMap<CreateUserDTO, User>();
            CreateMap<UpdateUserDTO, User>()
                .ForAllMembers(opts => opts.Condition(
                    (src, dest, srcMember) => srcMember != null
                ));
            CreateMap<User, UserDTO>();
                //CreateMap<User, UserReturnInfosDTO>();
        }
    }
}
