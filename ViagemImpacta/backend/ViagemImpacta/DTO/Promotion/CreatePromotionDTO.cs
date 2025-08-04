using System.ComponentModel.DataAnnotations;
using ViagemImpacta.Models;

namespace ViagemImpacta.DTO.Promotion
{
    public class CreatePromotionDTO
    {

        [Required (ErrorMessage = "Promotion Title is required.")]
        [MaxLength(100, ErrorMessage = "Promotion Title cannot exceed 100 characters.")]
        public string TitlePromotion { get; set; }
        [Required(ErrorMessage = "Promotion Description is required.")]
        [MaxLength(500, ErrorMessage = "Promotion Description cannot exceed 500 characters.")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Start Date is required.")]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "End Date is required.")]  
        public DateTime EndDate { get; set; }
        
        [Required(ErrorMessage = "Check-In Date is required.")]
        public DateTime CheckIn { get; set; }
        [Required(ErrorMessage = "Check-Out Date is required.")]
        public DateTime CheckOut { get; set; }

        [Required(ErrorMessage = "Hotel ID is required.")]
        public int HotelId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}

