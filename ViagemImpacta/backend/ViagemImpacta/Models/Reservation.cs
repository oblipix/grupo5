namespace ViagemImpacta.Models
{
    public class Reservation
    {
        public int ReservationId { get; set; }
        public int ReservationBookId { get; set; }
        public ReservationBook? ReservationBook { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public DateTime ReservationDate { get; set; }
        public bool IsConfirmed { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        //campo cancelado (data e boolean)
    }
}
