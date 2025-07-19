namespace ViagemImpacta.Models
{
    public class TravelPackage
    {
        public int TravelPackageId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public decimal Value { get; set; }
       
        public int TotalSeats { get; set; }
        public bool Active { get; set; }
        public bool Promotion { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        
        public List<Room> Rooms { get; set; }

        public List<Reservation> Reservations { get; set; }
        public List<Review> Reviews { get; set; }
    }
}
