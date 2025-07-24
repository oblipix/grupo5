using ViagemImpacta.DTO.TravelPackageDTO;
using ViagemImpacta.Models;

namespace ViagemImpacta.Services.Interfaces
{
    public interface ITravelPackageService
    {
        Task<IEnumerable<TravelPackageDto>> GetAllPackagesAsync();
        Task<TravelPackageDto?> GetPackageByIdAsync(int id);
        Task<TravelPackage> CreatePackageAsync(TravelPackage package, List<int> hotelIds);
        Task<bool> UpdatePackageAsync(TravelPackage package, List<int> hotelIds);
        Task<bool> DeletePackageAsync(int id);
        Task<IEnumerable<Hotel>> GetAllHotelsAsync();
        Task<IEnumerable<TravelPackageDto>> SearchPackagesAsync(string searchTerm);
        Task<IEnumerable<TravelPackageDto>> GetPackagesWithFiltersAsync(string? destination, decimal? minPrice, decimal? maxPrice, DateTime? startDate, DateTime? endDate, bool? promotion, int skip, int take);
    }
}