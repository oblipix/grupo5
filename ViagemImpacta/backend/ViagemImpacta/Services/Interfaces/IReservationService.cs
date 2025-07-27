using ViagemImpacta.DTO.ReservationDTO;

namespace ViagemImpacta.Services.Interfaces
{
    public interface IReservationService
    {
        Task<ReservationResponseDto> CreateReservationAsync(CreateReservationDto createReservationDto);
        Task<ReservationResponseDto?> GetReservationByIdAsync(int reservationId);
        Task<IEnumerable<ReservationResponseDto>> GetReservationsByUserIdAsync(int userId);
        Task<IEnumerable<ReservationResponseDto>> GetReservationsByHotelIdAsync(int hotelId);
        Task<bool> CancelReservationAsync(int reservationId, int userId);
        Task<bool> ConfirmReservationAsync(int reservationId);
        Task<bool> IsRoomAvailableAsync(int roomId, DateTime checkIn, DateTime checkOut);
    }
}