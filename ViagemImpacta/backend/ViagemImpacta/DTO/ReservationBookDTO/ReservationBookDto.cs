using ViagemImpacta.DTO;

namespace ViagemImpacta.DTO.ReservationBookDTO
{
    public class ReservationBookDto
    {
        public int ReservationBookId { get; set; }
        public string? Title { get; set; }
        public string? Destination { get; set; }
        public decimal FinalPrice { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public string? Description { get; set; }
        public bool Active { get; set; }
        public bool Promotion { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<string> HotelNames { get; set; } = new();
        public List<HotelDto> Hotels { get; set; } = new();
    }
}