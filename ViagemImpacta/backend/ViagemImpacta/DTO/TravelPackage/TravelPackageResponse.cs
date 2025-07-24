namespace ViagemImpacta.DTO.TravelPackage
{
    /// <summary>
    /// ?? Response para detalhes completos de um pacote de viagem
    /// Usado em: GET /api/travelpackages/{id}
    /// </summary>
    public class TravelPackageResponse
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Destination { get; set; }
        public decimal Price { get; set; }
        public bool IsPromotion { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<Hotel.HotelResponse>? Hotels { get; set; }
    }

    /// <summary>
    /// ?? Response para listagem de pacotes (dados resumidos)
    /// Usado em: GET /api/travelpackages (com paginação)
    /// </summary>
    public class TravelPackageListResponse
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Destination { get; set; }
        public decimal Price { get; set; }
        public bool IsPromotion { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? ImageUrl { get; set; }
    }
}