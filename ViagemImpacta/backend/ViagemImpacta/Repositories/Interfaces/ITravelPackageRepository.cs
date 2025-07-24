using System.Linq.Expressions;
using ApiCatalogo.Repositories;
using ViagemImpacta.Models;

namespace ViagemImpacta.Repositories.Interfaces
{
    public interface ITravelPackageRepository : IRepository<TravelPackage>
    {
        // ✅ Métodos específicos e simples
        Task<IEnumerable<TravelPackage>> GetActivePackagesAsync();
        Task<TravelPackage?> GetPackageWithDetailsAsync(int id);
        
        // ✅ Filtros básicos separados
        Task<IEnumerable<TravelPackage>> GetPackagesByPriceRangeAsync(decimal? minPrice, decimal? maxPrice);
        Task<IEnumerable<TravelPackage>> GetPackagesByDateRangeAsync(DateTime? startDate, DateTime? endDate);
        Task<IEnumerable<TravelPackage>> GetPackagesByDestinationAsync(string destination);
        Task<IEnumerable<TravelPackage>> GetPromotionalPackagesAsync();
        
        // ✅ Busca e paginação separadas
        Task<IEnumerable<TravelPackage>> SearchPackagesAsync(string searchTerm);
        Task<IEnumerable<TravelPackage>> GetPackagesWithPaginationAsync(int skip, int take);
        
        // ✅ OU manter um método genérico mais limpo
        Task<IEnumerable<TravelPackage>> GetPackagesAsync(
            Expression<Func<TravelPackage, bool>>? predicate = null,
            int skip = 0,
            int take = 50);
    }
}
