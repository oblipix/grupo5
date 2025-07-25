using AutoMapper;
using ViagemImpacta.DTO.ReservationBook;
using ViagemImpacta.DTO.ReservationBookDTO;
using ViagemImpacta.Models;

namespace ViagemImpacta.Profiles
{
    public class ReservationBookProfile : Profile
    {
        public ReservationBookProfile() 
        {
            CreateMap<ReservationBook, ReservationBookDto>()
                .ForMember(dest => dest.HotelNames, 
                opt => opt.MapFrom(src => src.Hotels.Select(h => h.Name)))
                .ForMember(dest => dest.Hotels, 
                opt => opt.MapFrom(src => src.Hotels));

            CreateMap<CreateUpdateReservationBookDto, ReservationBook>();


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
