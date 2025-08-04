namespace ViagemImpacta.Models
{
    public class Reservation
    {
        public int ReservationId { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int RoomId { get; set; }
        public Room? Room { get; set; } 
        public int HotelId { get; set; }
        public Hotel? Hotel { get; set; }
        public string? Description { get; set; }
        public decimal TotalPrice { get; set; }
        public string? PaymentIntentId { get; set; }
        public bool IsConfirmed { get; set; }
        public bool IsCanceled { get; set; } = false;

        public ICollection<Travellers>? Travellers { get; set; }
    }
}