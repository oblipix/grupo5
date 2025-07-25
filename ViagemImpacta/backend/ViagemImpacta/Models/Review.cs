using ViagemImpacta.Models.Enums;

namespace ViagemImpacta.Models
{
    public class Review
    {
        public int ReviewId { get; set; }
        public int ReservationBookId { get; set; }
        public ReservationBook? ReservationBook { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public string? Comment { get; set; }
        public int Rating { get; set; }
        public DateTime CreatedAt { get; set; }
        public ReviewStatus Status { get; set; }
    }
}
