using ViagemImpacta.DTO.HotelDTO;
using ViagemImpacta.Models;

namespace ViagemImpacta.Services.Interfaces
{
    public interface IHotelMappingService
    {
        IEnumerable<HotelDto> MapHotelsToDto(IEnumerable<Hotel> hotels, int? guests = null);
        HotelDto MapHotelToDto(Hotel hotel, int? guests = null);
    }
}
