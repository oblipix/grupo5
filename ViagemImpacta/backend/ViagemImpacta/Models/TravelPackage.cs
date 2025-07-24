namespace ViagemImpacta.Models
{
    public class TravelPackage
    {
        public int TravelPackageId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public bool Active { get; set; }
        public bool Promotion { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string? Destination { get; set; }
        //TODO:
        //lista de hoteis
        public ICollection<Hotel> Hotels { get; set; } = new List<Hotel>();

        //rooms -> TravelPackage pode ser n:n e o Hotel = tabela intermediária

        //public ICollection<Reservation> Reservations { get; set; }
        //public ICollection<Review> Reviews { get; set; }
    }
}
