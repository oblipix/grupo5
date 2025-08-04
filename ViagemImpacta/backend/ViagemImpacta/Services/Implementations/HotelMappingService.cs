using AutoMapper;
using ViagemImpacta.DTO.HotelDTO;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Services.Implementations
{
    public class HotelMappingService : IHotelMappingService
    {
        private readonly IMapper _mapper;

        public HotelMappingService(IMapper mapper)
        {
            _mapper = mapper;
        }

        public IEnumerable<HotelDto> MapHotelsToDto(IEnumerable<Hotel> hotels, int? guests = null)
        {
            return hotels.Select(hotel => MapHotelToDto(hotel, guests)).ToList();
        }

        public HotelDto MapHotelToDto(Hotel hotel, int? guests = null)
        {
            // Aplica filtro de quartos baseado no número de hóspedes
            var filteredHotel = ApplyGuestFilter(hotel, guests);

            // Mapeia usando AutoMapper simples
            var hotelDto = _mapper.Map<HotelDto>(filteredHotel);

            return hotelDto;
        }

        private static Hotel ApplyGuestFilter(Hotel hotel, int? guests)
        {
            // Se não há filtro de guests, retorna o hotel original
            if (!guests.HasValue || guests.Value <= 0)
            {
                return hotel;
            }

            // Cria uma cópia do hotel com quartos filtrados
            var filteredHotel = new Hotel
            {
                HotelId = hotel.HotelId,
                Name = hotel.Name,
                HotelAddress = hotel.HotelAddress,
                City = hotel.City,
                Stars = hotel.Stars,
                Gym = hotel.Gym,
                Restaurant = hotel.Restaurant,
                Bar = hotel.Bar,
                RoomService = hotel.RoomService,
                Phone = hotel.Phone,
                Accessibility = hotel.Accessibility,
                WarmPool = hotel.WarmPool,
                Theater = hotel.Theater,
                Garden = hotel.Garden,
                PetFriendly = hotel.PetFriendly,
                Pool = hotel.Pool,
                BreakfastIncludes = hotel.BreakfastIncludes,
                Wifi = hotel.Wifi,
                Parking = hotel.Parking,
                Description = hotel.Description
            };

            // Filtra quartos baseado na capacidade de hóspedes
            var filteredRooms = hotel.Rooms?.Where(r => r.Capacity >= guests.Value).ToList() ?? new List<Room>();

            filteredHotel.Rooms = filteredRooms;

            return filteredHotel;
        }
    }
}
