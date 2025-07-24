using AutoMapper;
using ViagemImpacta.Models;
using ViagemImpacta.DTO.TravelPackage;

namespace ViagemImpacta.Mappings.Profiles
{
    /// <summary>
    /// ?? AUTOMAPPER PROFILE - TravelPackage
    /// 
    /// Profile específico para mapeamentos relacionados a pacotes de viagem.
    /// Segue o princípio de responsabilidade única (SRP).
    /// 
    /// ?? RESPONSABILIDADES:
    /// - Mapeamentos TravelPackage ? TravelPackageRequest
    /// - Mapeamentos TravelPackage ? TravelPackageResponse
    /// - Mapeamentos TravelPackage ? TravelPackageListResponse
    /// </summary>
    public class TravelPackageProfile : Profile
    {
        public TravelPackageProfile()
        {
            ConfigureTravelPackageMappings();
        }

        /// <summary>
        /// Configurações de mapeamento para TravelPackage
        /// </summary>
        private void ConfigureTravelPackageMappings()
        {
            // ? ENTITY ? RESPONSE (Detalhes completos)
            CreateMap<TravelPackage, TravelPackageResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.TravelPackageId))
                .ForMember(dest => dest.IsPromotion, opt => opt.MapFrom(src => src.Promotion))
                .ForMember(dest => dest.Hotels, opt => opt.MapFrom(src => src.Hotels));

            // ? ENTITY ? LIST RESPONSE (Performance otimizada)
            CreateMap<TravelPackage, TravelPackageListResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.TravelPackageId))
                .ForMember(dest => dest.IsPromotion, opt => opt.MapFrom(src => src.Promotion))
                .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => 
                    src.Hotels != null && src.Hotels.Any() 
                        ? src.Hotels.First().Image 
                        : string.Empty));

            // ? REQUEST ? ENTITY (Para criação)
            CreateMap<TravelPackageRequest, TravelPackage>()
                .ForMember(dest => dest.TravelPackageId, opt => opt.Ignore()) // Gerado pelo banco
                .ForMember(dest => dest.Promotion, opt => opt.MapFrom(src => src.IsPromotion))
                .ForMember(dest => dest.Active, opt => opt.MapFrom(src => true))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => DateTime.Now))
                // Ignorar relacionamentos (configurados separadamente)
                .ForMember(dest => dest.Hotels, opt => opt.Ignore())
                .ForMember(dest => dest.Reviews, opt => opt.Ignore())
                .ForMember(dest => dest.Reservations, opt => opt.Ignore());
        }
    }
}