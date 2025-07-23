using System;
using System.Collections.Generic;

namespace ViagemImpacta.DTOs
{
    public class CreateUpdateTravelPackageDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public bool Active { get; set; } = true;
        public bool Promotion { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Destination { get; set; }
        public List<int> SelectedHotelIds { get; set; } = new();
    }
}