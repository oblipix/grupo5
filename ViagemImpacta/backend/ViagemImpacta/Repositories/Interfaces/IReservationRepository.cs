using ViagemImpacta.Models;

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
    }
}
