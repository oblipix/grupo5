namespace ViagemImpacta.DTO.ReservationBookDTO
{
    public class CreateUpdateReservationBookDto
    {
        public int ReservationBookId { get; set; } // Adicionado para suportar edição
        public string? Title { get; set; }
        public string? Description { get; set; }
        public decimal FinalPrice { get; set; }
        public bool Active { get; set; } = true;
        public bool Promotion { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public string? Destination { get; set; }
        public List<int> SelectedHotelIds { get; set; } = new();
    }
}