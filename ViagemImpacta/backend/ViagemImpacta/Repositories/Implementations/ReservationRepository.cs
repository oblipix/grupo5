using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Models.Enums;
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

        public IQueryable<Reservation> GetReservationWithUserRoomAndHotel()
        {
            return _context.Reservations
                    .Include(r => r.User)
                    .Include(r => r.Room)
                    .Include(r => r.Hotel);
        }

        public async Task<Reservation?> GetReservationById(int id)
        {
            return await GetReservationWithUserRoomAndHotel().FirstOrDefaultAsync(r => r.ReservationId == id);
        }

        public async Task<IEnumerable<Reservation>> GetReservationsByUserIdAsync(int userId)
        {
            return await GetReservationWithUserRoomAndHotel()
                .Include(r => r.Travellers)
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<Reservation>> GetReservationsByHotelIdAsync(int hotelId)
        {
            return await GetReservationWithUserRoomAndHotel()
                .Include(r => r.Travellers)
                .Where(r => r.HotelId == hotelId)
                .OrderByDescending(r => r.CheckIn)
                .ToListAsync();
        }

        public async Task<IEnumerable<Reservation>> GetReservationsByRoomIdAsync(int roomId)
        {
            return await GetReservationWithUserRoomAndHotel()
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
            return await GetReservationWithUserRoomAndHotel()
                .Where(r => r.RoomId == roomId && 
                           r.IsConfirmed &&
                           ((r.CheckIn < checkOut && r.CheckOut > checkIn)))
                .ToListAsync();
        }

        public async Task<Reservation?> GetReservationWithDetailsAsync(int reservationId)
        {
            return await GetReservationWithUserRoomAndHotel()
                .Include(r => r.Travellers)
                .FirstOrDefaultAsync(r => r.ReservationId == reservationId);
        }

        public async Task<IEnumerable<Reservation>> GetReservationsByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            return await GetReservationWithUserRoomAndHotel()
                .Include(r => r.Travellers)
                .Where(r => r.CheckIn >= startDate && r.CheckOut <= endDate)
                .OrderBy(r => r.CheckIn)
                .ToListAsync();
        }

        public async Task<int> GetOccupiedRoomCountByTypeAsync(int hotelId, RoomType roomType, DateTime checkIn, DateTime checkOut, int? excludeReservationId = null)
        {
            return await _context.Reservations
                .Include(r => r.Room)
                .Where(r => r.HotelId == hotelId &&
                           r.Room!.TypeName == roomType &&
                           r.IsConfirmed &&
                           (excludeReservationId == null || r.ReservationId != excludeReservationId) &&
                           ((r.CheckIn < checkOut && r.CheckOut > checkIn)))
                .CountAsync();
        }

        public async Task<bool> IsRoomTypeAvailableAsync(int hotelId, RoomType roomType, DateTime checkIn, DateTime checkOut, int? excludeReservationId = null)
        {
            // Buscar o total de quartos deste tipo no hotel
            var totalRoomsOfType = await _context.Rooms
                .Where(r => r.HotelId == hotelId && r.TypeName == roomType)
                .Select(r => r.TotalRooms)
                .FirstOrDefaultAsync();

            if (totalRoomsOfType == 0)
                return false; // Não há quartos deste tipo no hotel

            // Contar quantos quartos deste tipo estão ocupados no período
            var occupiedRooms = await GetOccupiedRoomCountByTypeAsync(hotelId, roomType, checkIn, checkOut, excludeReservationId);
    
            // Verificar se há pelo menos um quarto disponível
            return occupiedRooms < totalRoomsOfType;
        }

        public async Task<IEnumerable<Reservation>> GetAllReservationsAsync()
        {
            return await GetReservationWithUserRoomAndHotel().ToListAsync();
        }
    }
}
