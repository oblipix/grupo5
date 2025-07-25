using AutoMapper;
using ViagemImpacta.DTO.User;
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
                .ForMember(dest => dest.UserId, opt => opt.Ignore())
                .ForMember(dest => dest.Password, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.Active, opt => opt.Ignore())
                .ForMember(dest => dest.Role, opt => opt.Ignore());

            CreateMap<User, UserDto>();
            CreateMap<CreateEmployeeViewModel, User>();
            CreateMap<User, CreateUserDto>();

            // ? MAPEAMENTO SEGURO: User ? UserResponse (SEM dados sensíveis)
            CreateMap<User, UserResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => $"{src.FirstName} {src.LastName}"))
                // Dados sensíveis são deliberadamente ignorados:
                // - Password não é mapeado (segurança)
                // - CPF não é mapeado (privacidade)
                // - Phone pode ser sensível dependendo do contexto
                .ForMember(dest => dest.Photo, opt => opt.MapFrom(src => src.Photo))
                .ForMember(dest => dest.Active, opt => opt.MapFrom(src => src.Active));

            // ? MAPEAMENTO PARA LISTAGEM
            CreateMap<User, UserListResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => $"{src.FirstName} {src.LastName}"))
                .ForMember(dest => dest.Active, opt => opt.MapFrom(src => src.Active));
        }
    }
    
}
