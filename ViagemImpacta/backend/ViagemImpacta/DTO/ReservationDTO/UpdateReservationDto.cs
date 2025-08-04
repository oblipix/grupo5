using ViagemImpacta.Models;

namespace ViagemImpacta.DTO.ReservationDTO
{
    public class UpdateReservationDto
    {
        public int ReservationId { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public int RoomId { get; set; }
        public string? Description { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime UpdatedAt { get; set; }
        public ICollection<Travellers>? Travellers { get; set; }
    }
}
