using ViagemImpacta.Models;

namespace ViagemImpacta.Services.Interfaces
{
    public interface ITravelPackageService
    {
        Task<IEnumerable<TravelPackage>> GetAllPackagesAsync();
        Task<TravelPackage?> GetPackageByIdAsync(int id);
        Task<IEnumerable<TravelPackage>> GetPackagesWithFiltersAsync(
            string? destination = null,
            decimal? minPrice = null,
            decimal? maxPrice = null,
            DateTime? startDate = null,
            DateTime? endDate = null,
            bool? promotion = null,
            int skip = 0,
            int take = 10
        );
        Task<IEnumerable<TravelPackage>> SearchPackagesAsync(string searchTerm);
        Task<TravelPackage> CreatePackageAsync(TravelPackage package, List<int> hotelIds);
        Task<bool> UpdatePackageAsync(TravelPackage package, List<int> hotelIds);
        Task<bool> DeletePackageAsync(int id);
    }
}