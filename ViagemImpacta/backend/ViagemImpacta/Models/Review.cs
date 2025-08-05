using ViagemImpacta.Models.Enums;

namespace ViagemImpacta.Models
{
    public class Review
    {
        public int ReviewId { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public int HotelId { get; set; }
        public Hotel? Hotel { get; set; }
        public string? Comment { get; set; }
        public int Rating { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
