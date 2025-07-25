using System.Linq.Expressions;
using ViagemImpacta.Models;

namespace ViagemImpacta.Repositories.Interfaces
{
    public interface IReservationBookRepository : IRepository<ReservationBook>
    {
        // ✅ Métodos específicos e simples
        Task<IEnumerable<ReservationBook>> GetActivePackagesAsync();
        Task<ReservationBook?> GetPackageWithDetailsAsync(int id);
        
        // ✅ Filtros básicos separados
        Task<IEnumerable<ReservationBook>> GetPackagesByPriceRangeAsync(decimal? minPrice, decimal? maxPrice);
        Task<IEnumerable<ReservationBook>> GetPackagesByDateRangeAsync(DateTime? checkIn, DateTime? checkOut);
        Task<IEnumerable<ReservationBook>> GetPackagesByDestinationAsync(string destination);
        Task<IEnumerable<ReservationBook>> GetPromotionalPackagesAsync();
        
        // ✅ Busca e paginação separadas
        Task<IEnumerable<ReservationBook>> SearchPackagesAsync(string searchTerm);
        Task<IEnumerable<ReservationBook>> GetPackagesWithPaginationAsync(int skip, int take);
        
        // ✅ OU manter um método genérico mais limpo
        Task<IEnumerable<ReservationBook>> GetPackagesAsync(
            Expression<Func<ReservationBook, bool>>? predicate = null,
            int skip = 0,
            int take = 50);
    }
}
