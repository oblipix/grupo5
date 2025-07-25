namespace ViagemImpacta.Models
{
    public class ReservationBook
    {
        public int ReservationBookId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public decimal FinalPrice { get; set; }
       
        public bool Active { get; set; }
        public bool Promotion { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public string? Destination { get; set; }

        //TODO:
        //lista de hoteis
        public List<Hotel> Hotels { get; set; } = new List<Hotel>();

        //rooms -> ReservationBook pode ser n:n e o Hotel = tabela intermediária

        public ICollection<Reservation> Reservations { get; set; }
        public ICollection<Review> Reviews { get; set; }
    }
}
