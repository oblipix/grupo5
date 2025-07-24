using ViagemImpacta.DTO.TravelPackage;
using ViagemImpacta.Models;

namespace ViagemImpacta.Services.Interfaces
{
    public interface ITravelPackageService
    {
        // ✅ CORRETO: Service retorna DTOs organizados por entidade
        Task<IEnumerable<TravelPackageListResponse>> GetAllPackagesAsync();
        Task<TravelPackageResponse?> GetPackageByIdAsync(int id);
             
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
