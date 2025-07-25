using ViagemImpacta.DTO.ReservationBookDTO;
using ViagemImpacta.Models;

namespace ViagemImpacta.Services.Interfaces
{
    public interface IReservationBookServiceView
    {
        Task<IEnumerable<ReservationBookDto>> GetAllPackagesAsync();

        Task<ReservationBookDto?> GetPackageByIdAsync(int id);

        Task<ReservationBook> CreatePackageAsync(ReservationBook package, List<int> hotelIds);

        Task<bool> UpdatePackageAsync(ReservationBook package, List<int> hotelIds);

        Task<bool> DeletePackageAsync(int id);

        Task<IEnumerable<Hotel>> GetAllHotelsAsync();

        Task<IEnumerable<ReservationBookDto>> SearchPackagesAsync(string searchTerm);

        Task<IEnumerable<ReservationBookDto>> GetPackagesWithFiltersAsync(string? destination, decimal? minPrice, decimal? maxPrice, DateTime? checkIn, DateTime? checkOut, bool? promotion, int skip, int take);
    }
}
