namespace ViagemImpacta.Models
{
    public class Reservation
    {
        public int ReservationId { get; set; }
        public int TravelPackageId { get; set; }
        public TravelPackage? TravelPackage { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public DateTime ReservationDate { get; set; }
        public bool IsConfirmed { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        //campo cancelado (data e boolean)
    }
}
