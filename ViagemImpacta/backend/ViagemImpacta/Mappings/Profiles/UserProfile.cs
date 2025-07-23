using AutoMapper;
using ViagemImpacta.Models;
using ViagemImpacta.DTO.User;

namespace ViagemImpacta.Mappings.Profiles
{
    /// <summary>
    /// ?? AUTOMAPPER PROFILE - User
    /// 
    /// Profile específico para mapeamentos relacionados a usuários.
    /// Foco na segurança e privacidade dos dados.
    /// 
    /// ?? RESPONSABILIDADES:
    /// - Mapeamentos User ? UserResponse (sem dados sensíveis)
    /// - Mapeamentos User ? UserListResponse
    /// - Configurações de segurança e privacidade
    /// </summary>
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            ConfigureUserMappings();
        }

        /// <summary>
        /// Configurações de mapeamento para User
        /// </summary>
        private void ConfigureUserMappings()
        {
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