using System.ComponentModel.DataAnnotations;

namespace ViagemImpacta.Dtos
{
    public class CreateUpdateTravelPackageDto
    {
        public int TravelPackageId { get; set; } // Usado na edição

        [Required(ErrorMessage = "O título é obrigatório.")]
        [StringLength(100)]
        public string? Title { get; set; }

        public string? Description { get; set; }

        [Required(ErrorMessage = "O preço é obrigatório.")]
        [Range(0.01, 100000.00, ErrorMessage = "O preço deve ser maior que zero.")]
        public decimal Price { get; set; }

        public bool Active { get; set; } = true;
        public bool Promotion { get; set; }

        [Required(ErrorMessage = "A data de início é obrigatória.")]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "A data de término é obrigatória.")]
        public DateTime EndDate { get; set; }

        public string? Destination { get; set; }

        // Lista para receber os IDs dos hotéis selecionados no formulário
        [Required(ErrorMessage = "Selecione ao menos um hotel.")]
        public List<int> SelectedHotelIds { get; set; } = new List<int>();
    }
}