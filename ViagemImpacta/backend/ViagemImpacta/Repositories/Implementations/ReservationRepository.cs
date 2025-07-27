using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories.Interfaces;

namespace ViagemImpacta.Repositories.Implementations
{
    public class ReservationRepository : Repository<Reservation>, IReservationRepository
    {
        private readonly AgenciaDbContext _context;

        public ReservationRepository(AgenciaDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Reservation>> GetReservationsByUserIdAsync(int userId)
        {
            return await _context.Reservations
                .Include(r => r.User)
                .Include(r => r.Room)
                .Include(r => r.Hotel)
                .Include(r => r.Travellers)
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<Reservation>> GetReservationsByHotelIdAsync(int hotelId)
        {
            return await _context.Reservations
                .Include(r => r.User)
                .Include(r => r.Room)
                .Include(r => r.Hotel)
                .Include(r => r.Travellers)
                .Where(r => r.HotelId == hotelId)
                .OrderByDescending(r => r.CheckIn)
                .ToListAsync();
        }

        public async Task<IEnumerable<Reservation>> GetReservationsByRoomIdAsync(int roomId)
        {
            return await _context.Reservations
                .Include(r => r.User)
                .Include(r => r.Room)
                .Include(r => r.Hotel)
                .Include(r => r.Travellers)
                .Where(r => r.RoomId == roomId)
                .OrderByDescending(r => r.CheckIn)
                .ToListAsync();
        }

        public async Task<bool> IsRoomAvailableAsync(int roomId, DateTime checkIn, DateTime checkOut, int? excludeReservationId = null)
        {
            var conflictingReservations = await _context.Reservations
                .Where(r => r.RoomId == roomId && 
                           r.IsConfirmed &&
                           (excludeReservationId == null || r.ReservationId != excludeReservationId) &&
                           ((r.CheckIn < checkOut && r.CheckOut > checkIn)))
                .AnyAsync();

            return !conflictingReservations;
        }

        public async Task<IEnumerable<Reservation>> GetConflictingReservationsAsync(int roomId, DateTime checkIn, DateTime checkOut)
        {
            return await _context.Reservations
                .Include(r => r.User)
                .Include(r => r.Room)
                .Include(r => r.Hotel)
                .Where(r => r.RoomId == roomId && 
                           r.IsConfirmed &&
                           ((r.CheckIn < checkOut && r.CheckOut > checkIn)))
                .ToListAsync();
        }

        public async Task<Reservation?> GetReservationWithDetailsAsync(int reservationId)
        {
            return await _context.Reservations
                .Include(r => r.User)
                .Include(r => r.Room)
                .Include(r => r.Hotel)
                .Include(r => r.Travellers)
                .FirstOrDefaultAsync(r => r.ReservationId == reservationId);
        }

        public async Task<IEnumerable<Reservation>> GetReservationsByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            return await _context.Reservations
                .Include(r => r.User)
                .Include(r => r.Room)
                .Include(r => r.Hotel)
                .Include(r => r.Travellers)
                .Where(r => r.CheckIn >= startDate && r.CheckOut <= endDate)
                .OrderBy(r => r.CheckIn)
                .ToListAsync();
        }
    }
}
