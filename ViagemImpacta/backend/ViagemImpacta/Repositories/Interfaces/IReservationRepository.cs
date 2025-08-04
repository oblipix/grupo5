using System.Linq.Expressions;
using ViagemImpacta.Models;
using ViagemImpacta.Models.Enums;

namespace ViagemImpacta.Repositories.Interfaces
{
    public interface IReservationRepository : IRepository<Reservation>
    {
        Task<IEnumerable<Reservation>> GetReservationsByUserIdAsync(int userId);
        Task<IEnumerable<Reservation>> GetReservationsByHotelIdAsync(int hotelId);
        Task<IEnumerable<Reservation>> GetReservationsByRoomIdAsync(int roomId);
        Task<bool> IsRoomAvailableAsync(int roomId, DateTime checkIn, DateTime checkOut, int? excludeReservationId = null);
        Task<IEnumerable<Reservation>> GetConflictingReservationsAsync(int roomId, DateTime checkIn, DateTime checkOut);
        Task<Reservation?> GetReservationWithDetailsAsync(int reservationId);
        Task<IEnumerable<Reservation>> GetReservationsByDateRangeAsync(DateTime startDate, DateTime endDate);

        // Novos métodos para validação por tipo de quarto
        Task<int> GetOccupiedRoomCountByTypeAsync(int hotelId, RoomType roomType, DateTime checkIn, DateTime checkOut, int? excludeReservationId = null);
        Task<bool> IsRoomTypeAvailableAsync(int hotelId, RoomType roomType, DateTime checkIn, DateTime checkOut, int? excludeReservationId = null);

        Task<IEnumerable<Reservation>> GetAllReservationsAsync();
        Task<Reservation?> GetReservationById(int id);
    }
}
