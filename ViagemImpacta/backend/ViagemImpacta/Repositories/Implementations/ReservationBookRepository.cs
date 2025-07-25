using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories.Interfaces;

namespace ViagemImpacta.Repositories.Implementations
{
    public class ReservationBookRepository : Repository<ReservationBook>, IReservationBookRepository
    {
        private readonly AgenciaDbContext _context;

        public ReservationBookRepository(AgenciaDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ReservationBook>> GetActivePackagesAsync()
        {
            return await _context.ReservationBooks
                .Where(p => p.Active)
                .Include(p => p.Hotels)
                .Include(p => p.Reviews)
                .ToListAsync();
        }

        public async Task<ReservationBook?> GetPackageWithDetailsAsync(int id)
        {
            return await _context.ReservationBooks
                .Where(p => p.Active && p.ReservationBookId == id)
                .Include(p => p.Hotels)
                .Include(p => p.Reviews)
                .FirstOrDefaultAsync();
        }

        // ✅ CORRIGIR: Implementar conforme interface (2 parâmetros)
        public async Task<IEnumerable<ReservationBook>> GetPackagesByDateRangeAsync(
            DateTime? checkIn, 
            DateTime? checkOut)
        {
            var query = _context.ReservationBooks
                .Include(p => p.Hotels)
                .Where(p => p.Active);

            if (checkIn.HasValue)
                query = query.Where(p => p.CheckIn >= checkIn.Value);
                
            if (checkOut.HasValue)
                query = query.Where(p => p.CheckOut <= checkOut.Value);

            return await query.ToListAsync();
        }

        // ✅ ADICIONAR: Métodos faltando
        public async Task<IEnumerable<ReservationBook>> GetPackagesByPriceRangeAsync(decimal? minPrice, decimal? maxPrice)
        {
            var query = _context.ReservationBooks.Where(p => p.Active);

            if (minPrice.HasValue)
                query = query.Where(p => p.FinalPrice >= minPrice.Value);
            
            if (maxPrice.HasValue)
                query = query.Where(p => p.FinalPrice <= maxPrice.Value);

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<ReservationBook>> GetPackagesByDestinationAsync(string destination)
        {
            return await _context.ReservationBooks
                .Where(p => p.Active && p.Destination != null && p.Destination.Contains(destination))
                .Include(p => p.Hotels)
                .ToListAsync();
        }

        public async Task<IEnumerable<ReservationBook>> GetPromotionalPackagesAsync()
        {
            return await _context.ReservationBooks
                .Where(p => p.Active && p.Promotion)
                .Include(p => p.Hotels)
                .ToListAsync();
        }

        public async Task<IEnumerable<ReservationBook>> SearchPackagesAsync(string searchTerm)
        {
            return await _context.ReservationBooks
                .Include(p => p.Hotels)
                .Where(p => p.Active &&
                    (p.Title!.Contains(searchTerm) ||
                     p.Description!.Contains(searchTerm)))
                .ToListAsync();
        }

        public async Task<IEnumerable<ReservationBook>> GetPackagesWithPaginationAsync(int skip, int take)
        {
            return await _context.ReservationBooks
                .Where(p => p.Active)
                .Include(p => p.Hotels)
                .Skip(skip)
                .Take(take)
                .ToListAsync();
        }

        public async Task<IEnumerable<ReservationBook>> GetPackagesAsync(
            Expression<Func<ReservationBook, bool>>? predicate = null,
            int skip = 0,
            int take = 50)
        {
            var query = _context.ReservationBooks
                .Include(p => p.Hotels)
                .Where(p => p.Active);

            if (predicate != null)
                query = query.Where(predicate);

            return await query.Skip(skip).Take(take).ToListAsync();
        }

        // ✅ MANTER: Método original com 4 parâmetros (caso seja necessário)
        public async Task<IEnumerable<ReservationBook>> GetPackagesByDateRangeDetailedAsync(
            DateTime? minCheckIn, 
            DateTime? maxCheckIn,
            DateTime? minCheckOut, 
            DateTime? maxCheckOut)
        {
            var query = _context.ReservationBooks
                .Include(p => p.Hotels)
                .Where(p => p.Active);

            if (minCheckIn.HasValue)
                query = query.Where(p => p.CheckIn >= minCheckIn.Value);
            
            if (maxCheckIn.HasValue)
                query = query.Where(p => p.CheckIn <= maxCheckIn.Value);
                
            if (minCheckOut.HasValue)
                query = query.Where(p => p.CheckOut >= minCheckOut.Value);
                
            if (maxCheckOut.HasValue)
                query = query.Where(p => p.CheckOut <= maxCheckOut.Value);

            return await query.ToListAsync();
        }
    }
}
