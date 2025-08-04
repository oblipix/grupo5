using System.ComponentModel.DataAnnotations;

namespace ViagemImpacta.DTO
{
    public class CreateReviewDto
    {
        [Required(ErrorMessage = "HotelId é obrigatório")]
        public int HotelId { get; set; }
        
        [Required(ErrorMessage = "Rating é obrigatório")]
        [Range(1, 5, ErrorMessage = "Rating deve estar entre 1 e 5")]
        public int Rating { get; set; }
        
        [Required(ErrorMessage = "Comment é obrigatório")]
        [StringLength(500, MinimumLength = 5, ErrorMessage = "Comentário deve ter entre 5 e 500 caracteres")]
        public string Comment { get; set; } = string.Empty;
    }
}
