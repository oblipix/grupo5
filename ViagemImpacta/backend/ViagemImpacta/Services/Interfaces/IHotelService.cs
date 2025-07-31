using ViagemImpacta.DTO.HotelDTO;
using ViagemImpacta.Models;

namespace ViagemImpacta.Services.Interfaces
{
    public interface IHotelService
    {
        Task<IEnumerable<HotelDto>> GetAllHotelsAsync();
        Task<Hotel?> GetHotelWithRoomsAsync(int hotelId);
        Task<Hotel?> GetHotelByIdAsync(int hotelId);
        Task<Hotel> CreateHotelAsync(Hotel hotel);
        Task UpdateHotelAsync(Hotel hotel);
        Task DeleteHotelAsync(int hotelId);
        Task<IEnumerable<HotelDto>> GetHotelsWithFiltersAsync(string? hotelAddress, int? minStars, int? minPrice, int? maxPrice, int? guestCount);
    }
}