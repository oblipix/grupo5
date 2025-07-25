using AutoMapper;
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
        }
    }
}
