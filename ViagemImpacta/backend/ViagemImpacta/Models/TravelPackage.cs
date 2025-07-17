namespace ViagemImpacta.Models
{
    public class TravelPackage
    {
        public int TravelPackageId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public decimal Value { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataFinal { get; set; }
        public int TotalVagas { get; set; }
        public bool Active { get; set; }
        public bool Promocao { get; set; }

        public List<Quarto> Quartos { get; set; }

        public List<Reservation> Reservations { get; set; }
        public List<Review> Reviews { get; set; }
    }
}
