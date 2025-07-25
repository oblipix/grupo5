using AutoMapper;
using ViagemImpacta.Models;
using ViagemImpacta.DTO.ReservationBook;

namespace ViagemImpacta.Mappings.Profiles
{
    /// <summary>
    /// ?? AUTOMAPPER PROFILE - ReservationBook
    /// 
    /// Profile específico para mapeamentos relacionados a pacotes de viagem.
    /// Segue o princípio de responsabilidade única (SRP).
    /// 
    /// ?? RESPONSABILIDADES:
    /// - Mapeamentos ReservationBook ? ReservationBookRequest
    /// - Mapeamentos ReservationBook ? ReservationBookResponse
    /// - Mapeamentos ReservationBook ? ReservationBookListResponse
    /// </summary>
    public class ReservationBookProfile : Profile
    {
        public ReservationBookProfile()
        {
            ConfigureReservationBookMappings();
        }

        /// <summary>
        /// Configurações de mapeamento para ReservationBook
        /// </summary>
        private void ConfigureReservationBookMappings()
        {
            // ?? ENTITY ? RESPONSE (Detalhes completos)
            CreateMap<ReservationBook, ReservationBookResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ReservationBookId))
                .ForMember(dest => dest.IsPromotion, opt => opt.MapFrom(src => src.Promotion))
                .ForMember(dest => dest.Hotels, opt => opt.MapFrom(src => src.Hotels));

            // ?? ENTITY ? LIST RESPONSE (Performance otimizada)
            CreateMap<ReservationBook, ReservationBookListResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ReservationBookId))
                .ForMember(dest => dest.IsPromotion, opt => opt.MapFrom(src => src.Promotion))
                .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => 
                    src.Hotels != null && src.Hotels.Any() 
                        ? src.Hotels.First().Image 
                        : string.Empty));

            // ?? REQUEST ? ENTITY (Para criação)
            CreateMap<ReservationBookRequest, ReservationBook>()
                .ForMember(dest => dest.ReservationBookId, opt => opt.Ignore()) // Gerado pelo banco
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