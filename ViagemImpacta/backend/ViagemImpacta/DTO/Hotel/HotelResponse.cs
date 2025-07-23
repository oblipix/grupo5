namespace ViagemImpacta.DTO.Hotel
{
    /// <summary>
    /// ?? Response para Hotel (dentro de pacotes ou independente)
    /// </summary>
    public class HotelResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public int Stars { get; set; }
        public bool HasWifi { get; set; }
        public bool HasParking { get; set; }
        public bool HasGym { get; set; }
        public bool HasRestaurant { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
    }

    /// <summary>
    /// ?? Response para listagem de hotéis (dados resumidos)
    /// </summary>
    public class HotelListResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public int Stars { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public bool HasWifi { get; set; }
        public bool HasParking { get; set; }
    }
}