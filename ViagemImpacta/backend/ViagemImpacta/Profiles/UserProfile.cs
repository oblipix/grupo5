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
            CreateMap<ReadAdminViewModel, ReadUserLoginDto>();
            CreateMap<User, UpdateUserViewModel>();
            CreateMap<UpdateUserViewModel, UpdateUserDto>();

            CreateMap<CreateEmpolyeeViewModel, CreateUserDto>();

            CreateMap<ReadUserLoginDto, User>();
            
            CreateMap<CreateUserDto, User>();
            CreateMap<UpdateUserDto, User>()
                .ForAllMembers(opts => opts.Condition(
                    (src, dest, srcMember) => srcMember != null
                ));
            CreateMap<User, UserDto>();
            //CreateMap<User, UserReturnInfosDTO>();
        }
    }
}
