using System.Collections.Generic;

namespace ViagemImpacta.DTOs
{
    public class HotelDto
    {
        public int HotelId { get; set; }
        public string? Name { get; set; }
        public string? Location { get; set; }
        public int Stars { get; set; }
        public int RoomCount { get; set; }
    }
}