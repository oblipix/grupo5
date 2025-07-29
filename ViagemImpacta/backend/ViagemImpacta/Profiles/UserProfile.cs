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
            CreateMap<User, UpdateUserViewModel>();
            CreateMap<UpdateUserViewModel, UpdateUserDto>();

            CreateMap<CreateEmpolyeeViewModel, CreateUserDto>();
           
            CreateMap<CreateUserDto, User>();

            CreateMap<UpdateUserDto, User>()
                .ForMember(dest => dest.UserId, opt => opt.Ignore())
                .ForMember(dest => dest.Password, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.Active, opt => opt.Ignore())
                .ForMember(dest => dest.Role, opt => opt.Ignore());

            CreateMap<User, UserDto>();
            CreateMap<CreateEmployeeViewModel, User>();
            CreateMap<User, CreateUserDto>();

       
        }
    }
    
}
