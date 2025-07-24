using ViagemImpacta.DTO.Response;
using ViagemImpacta.DTO.TravelPackage;

namespace ViagemImpacta.Services.Interfaces
{
    public interface ITravelPackageService
    {
        // ✅ CORRETO: Service retorna DTOs organizados por entidade
        Task<IEnumerable<TravelPackageListResponse>> GetAllPackagesAsync();
        Task<TravelPackageResponse?> GetPackageByIdAsync(int id);
        
        // ✅ Service com DTOs e defaults de negócio
        Task<TravelPackage> CreatePackageAsync(TravelPackage package, List<int> hotelIds);
        Task<bool> UpdatePackageAsync(TravelPackage package, List<int> hotelIds);
        Task<bool> DeletePackageAsync(int id);
        Task<IEnumerable<Hotel>> GetAllHotelsAsync();
     
        Task<IEnumerable<TravelPackageListResponse>> GetPackagesWithFiltersAsync(
            string? destination = null,     
            decimal? minPrice = null,       
            decimal? maxPrice = null,       
            DateTime? startDate = null,     
            DateTime? endDate = null,       
            bool? promotion = null,         
            int skip = 0,                  
            int take = 10);                 
         
        Task<IEnumerable<TravelPackageListResponse>> SearchPackagesAsync(string searchTerm);
        
       
    }
}
