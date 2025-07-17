namespace ViagemImpacta.Models
{
    public class Reservation
    {
        public int ReservationId { get; set; }
        public int PackageId { get; set; }
        public TravelPackage? Packaged { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public DateTime ReservationDate { get; set; }
        public bool IsConfirmed { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
}
