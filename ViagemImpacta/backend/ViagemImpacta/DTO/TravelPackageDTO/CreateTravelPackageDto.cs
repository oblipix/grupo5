using System.ComponentModel.DataAnnotations;

namespace ViagemImpacta.DTO.TravelPackageDTO;

public class CreateTravelPackageDto
{
    [Required]
    public string Title { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public decimal Price { get; set; }
    public DateTime StartDate { get; set; } 
    public DateTime EndDate { get; set; }
}
