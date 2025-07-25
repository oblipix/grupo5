using System.ComponentModel.DataAnnotations;

namespace ViagemImpacta.DTO.ReservationBookDTO;

public class CreateReservationBookDto
{
    [Required]
    public string Title { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public decimal FinalPrice { get; set; }
    public DateTime CheckIn { get; set; } 
    public DateTime CheckOut { get; set; }
}
