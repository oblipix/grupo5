namespace ViagemImpacta.DTO.ReservationBook
{
    /// <summary>
    /// ?? Response para detalhes completos de um pacote de viagem
    /// Usado em: GET /api/reservationbooks/{id}
    /// </summary>
    public class ReservationBookResponse
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Destination { get; set; }
        public decimal FinalPrice { get; set; }
        public bool IsPromotion { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public List<Hotel.HotelResponse>? Hotels { get; set; }
    }

    /// <summary>
    /// ?? Response para listagem de pacotes (dados resumidos)
    /// Usado em: GET /api/reservationbooks (com paginação)
    /// </summary>
    public class ReservationBookListResponse
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Destination { get; set; }
        public decimal FinalPrice { get; set; }
        public bool IsPromotion { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public string? ImageUrl { get; set; }
    }
}