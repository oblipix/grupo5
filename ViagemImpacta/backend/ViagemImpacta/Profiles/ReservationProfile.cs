using AutoMapper;
using ViagemImpacta.DTO.ReservationDTO;
using ViagemImpacta.DTO.TravellerDTO;
using ViagemImpacta.Models;
using ViagemImpacta.ViewModels;

namespace ViagemImpacta.Profiles
{
    public class ReservationProfile : Profile
    {
        public ReservationProfile()
        {

            // Reservation mappings
            CreateMap<CreateReservationDto, Reservation>()
                .ForMember(dest => dest.ReservationId, opt => opt.Ignore())
                //.ForMember(dest => dest.ReservationDate, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(dest => dest.IsConfirmed, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(dest => dest.TotalPrice, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.Room, opt => opt.Ignore())
                .ForMember(dest => dest.Hotel, opt => opt.Ignore())
                .ForMember(dest => dest.Travellers, opt => opt.Ignore());

            CreateMap<Reservation, ReservationDto>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => $"{src.User!.FirstName} {src.User.LastName}"))
                .ForMember(dest => dest.UserEmail, opt => opt.MapFrom(src => src.User!.Email))
                .ForMember(dest => dest.RoomType, opt => opt.MapFrom(src => src.Room!.TypeName))
                .ForMember(dest => dest.HotelName, opt => opt.MapFrom(src => src.Hotel!.Name))
                .ForMember(dest => dest.TotalDays, opt => opt.MapFrom(src => (src.CheckOut - src.CheckIn).Days))
                .ForMember(dest => dest.Travellers, opt => opt.MapFrom(src => src.Travellers));

            CreateMap<Reservation, UpdateReservationViewModel>();

            CreateMap<Reservation, UpdateReservationDto>();

            CreateMap<UpdateReservationViewModel, CreateReservationDto>();

            CreateMap<UpdateReservationViewModel, UpdateReservationDto>();

            CreateMap<CreateReservationDto, Reservation>();

            CreateMap<UpdateReservationDto, Reservation>()
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow));

            // Traveller mappings
            CreateMap<CreateTravellerDto, Travellers>()
                .ForMember(dest => dest.TravellersId, opt => opt.Ignore())
                .ForMember(dest => dest.ReservationId, opt => opt.Ignore())
                .ForMember(dest => dest.Reservation, opt => opt.Ignore());

            CreateMap<Travellers, TravellerDto>();

            CreateMap<Travellers, CreateTravellerDto>();
        }
    }
}