using ApiCatalogo.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories.Interfaces;

namespace ViagemImpacta.Repositories
{
    public class TravelPackageRepository : Repository<TravelPackage>, ITravelPackageRepository
    {
        private readonly AgenciaDbContext _context;

        public TravelPackageRepository(AgenciaDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TravelPackage>> GetActivePackagesAsync()
        {
            return await _context.TravelPackages
                .Where(p => p.Active)
                .Include(p => p.Hotels)
                .Include(p => p.Reviews)
                .ToListAsync();
        }

        public async Task<TravelPackage?> GetPackageWithDetailsAsync(int id)
        {
            return await _context.TravelPackages
                .Where(p => p.Active && p.TravelPackageId == id)
                .Include(p => p.Hotels)
                .Include(p => p.Reviews)
                .FirstOrDefaultAsync();
        }

        // ✅ CORRIGIR: Implementar conforme interface (2 parâmetros)
        public async Task<IEnumerable<TravelPackage>> GetPackagesByDateRangeAsync(
            DateTime? startDate, 
            DateTime? endDate)
        {
            var query = _context.TravelPackages
                .Include(p => p.Hotels)
                .Where(p => p.Active);

            if (startDate.HasValue)
                query = query.Where(p => p.StartDate >= startDate.Value);
                
            if (endDate.HasValue)
                query = query.Where(p => p.EndDate <= endDate.Value);

            return await query.ToListAsync();
        }

        // ✅ ADICIONAR: Métodos faltando
        public async Task<IEnumerable<TravelPackage>> GetPackagesByPriceRangeAsync(decimal? minPrice, decimal? maxPrice)
        {
            var query = _context.TravelPackages.Where(p => p.Active);

            if (minPrice.HasValue)
                query = query.Where(p => p.Price >= minPrice.Value);
            
            if (maxPrice.HasValue)
                query = query.Where(p => p.Price <= maxPrice.Value);

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<TravelPackage>> GetPackagesByDestinationAsync(string destination)
        {
            return await _context.TravelPackages
                .Where(p => p.Active && p.Destination != null && p.Destination.Contains(destination))
                .Include(p => p.Hotels)
                .ToListAsync();
        }

        public async Task<IEnumerable<TravelPackage>> GetPromotionalPackagesAsync()
        {
            return await _context.TravelPackages
                .Where(p => p.Active && p.Promotion)
                .Include(p => p.Hotels)
                .ToListAsync();
        }

        public async Task<IEnumerable<TravelPackage>> SearchPackagesAsync(string searchTerm)
        {
            return await _context.TravelPackages
                .Include(p => p.Hotels)
                .Where(p => p.Active &&
                    (p.Title!.Contains(searchTerm) ||
                     p.Description!.Contains(searchTerm)))
                .ToListAsync();
        }

        public async Task<IEnumerable<TravelPackage>> GetPackagesWithPaginationAsync(int skip, int take)
        {
            return await _context.TravelPackages
                .Where(p => p.Active)
                .Include(p => p.Hotels)
                .Skip(skip)
                .Take(take)
                .ToListAsync();
        }

        public async Task<IEnumerable<TravelPackage>> GetPackagesAsync(
            Expression<Func<TravelPackage, bool>>? predicate = null,
            int skip = 0,
            int take = 50)
        {
            var query = _context.TravelPackages
                .Include(p => p.Hotels)
                .Where(p => p.Active);

            if (predicate != null)
                query = query.Where(predicate);

            return await query.Skip(skip).Take(take).ToListAsync();
        }

        // ✅ MANTER: Método original com 4 parâmetros (caso seja necessário)
        public async Task<IEnumerable<TravelPackage>> GetPackagesByDateRangeDetailedAsync(
            DateTime? minStartDate, 
            DateTime? maxStartDate,
            DateTime? minEndDate, 
            DateTime? maxEndDate)
        {
            var query = _context.TravelPackages
                .Include(p => p.Hotels)
                .Where(p => p.Active);

            if (minStartDate.HasValue)
                query = query.Where(p => p.StartDate >= minStartDate.Value);
            
            if (maxStartDate.HasValue)
                query = query.Where(p => p.StartDate <= maxStartDate.Value);
                
            if (minEndDate.HasValue)
                query = query.Where(p => p.EndDate >= minEndDate.Value);
                
            if (maxEndDate.HasValue)
                query = query.Where(p => p.EndDate <= maxEndDate.Value);

            return await query.ToListAsync();
        }
    }
}
