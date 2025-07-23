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
            
            CreateMap<CreateUserDTO, User>();

            CreateMap<UpdateUserDTO, User>()
                .ForMember(dest => dest.UserId, opt => opt.Ignore())
                .ForMember(dest => dest.Password, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.Active, opt => opt.Ignore())
                .ForMember(dest => dest.Role, opt => opt.Ignore());

            CreateMap<User, UserDTO>();

            CreateMap<CreateEmployeeViewModel, User>();
          

            CreateMap<User, CreateUserDTO>();
        }
    }
}
