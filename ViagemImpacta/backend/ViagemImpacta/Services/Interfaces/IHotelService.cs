using ViagemImpacta.Models;

namespace ViagemImpacta.Services.Interfaces
{
    public interface IHotelService
    {
        Task<IEnumerable<Hotel>> GetAllHotelsAsync();
        Task<Hotel?> GetHotelByIdAsync(int id);
        Task<IEnumerable<Hotel>> GetHotelsWithFiltersAsync(string? location, int? minStars, bool? hasWifi, bool? hasParking);
        Task<Hotel> CreateHotelAsync(Hotel hotel);
        Task<bool> UpdateHotelAsync(int id, Hotel hotel);
        Task<bool> DeleteHotelAsync(int id);
    }
}