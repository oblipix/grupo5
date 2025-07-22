namespace ViagemImpacta.Dtos
{
    public class TravelPackageDto
    {
        public int TravelPackageId { get; set; }
        public string? Title { get; set; }
        public string? Destination { get; set; }
        public decimal Price { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool Active { get; set; }
        public List<string> HotelNames { get; set; } = new List<string>();
    }
}