using System;
using System.Collections.Generic;

namespace ViagemImpacta.DTOs
{
    public class TravelPackageDto
    {
        public int TravelPackageId { get; set; }
        public string? Title { get; set; }
        public string? Destination { get; set; }
        public decimal Price { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Description { get; set; }
        public bool Active { get; set; }
        public bool Promotion { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<string> HotelNames { get; set; } = new();
        public List<HotelDto> Hotels { get; set; } = new();
    }
}