using System.Collections.Generic;

namespace ViagemImpacta.DTO
{
    public class HotelDto
    {
        public int HotelId { get; set; }
        public string? Name { get; set; }
        public string? HotelAddress { get; set; }
        public int Stars { get; set; }
        public int RoomCount { get; set; }
    }
}