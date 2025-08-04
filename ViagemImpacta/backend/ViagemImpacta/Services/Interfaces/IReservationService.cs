using ViagemImpacta.DTO.ReservationDTO;
using ViagemImpacta.Models;

namespace ViagemImpacta.Services.Interfaces
{
    public interface IReservationService
    {
        Task<Reservation> CreateReservationAsync(CreateReservationDto createReservationDto);
        Task<Reservation?> GetReservationByIdAsync(int reservationId);
        Task<IEnumerable<Reservation>> GetReservationsByUserIdAsync(int userId);
        Task<IEnumerable<Reservation>> GetReservationsByHotelIdAsync(int hotelId);
        Task<bool> CancelReservationAsync(int reservationId);
        Task<bool> ConfirmReservationAsync(string sessionId);
        Task<bool> IsRoomAvailableAsync(int roomId, DateTime checkIn, DateTime checkOut);
        Task<IEnumerable<Reservation>> GetFilteredReservation(DateTime? checkin, DateTime? checkout, string search, string status);
        Task<Reservation> UpdateAsync(UpdateReservationDto dto);
        Task SendPaymentLinkToUserEmail(Reservation reservation);
    }
}