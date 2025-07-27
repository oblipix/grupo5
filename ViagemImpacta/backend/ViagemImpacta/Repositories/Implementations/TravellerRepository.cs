using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories.Interfaces;

namespace ViagemImpacta.Repositories.Implementations
{
    public class TravellerRepository : Repository<Travellers>, ITravellerRepository
    {
        private readonly AgenciaDbContext _context;

        public TravellerRepository(AgenciaDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Travellers>> GetTravellersByReservationIdAsync(int reservationId)
        {
            return await _context.Set<Travellers>()
                .Where(t => t.ReservationId == reservationId)
                .ToListAsync();
        }
    }
}