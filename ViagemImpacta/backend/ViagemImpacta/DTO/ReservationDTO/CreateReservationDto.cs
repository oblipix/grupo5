using System.ComponentModel.DataAnnotations;
using ViagemImpacta.DTO.TravellerDTO;

namespace ViagemImpacta.DTO.ReservationDTO
{
    public class CreateReservationDto
    {
        [Required(ErrorMessage = "ID do usuário é obrigatório")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "ID do quarto é obrigatório")]
        public int RoomId { get; set; }

        [Required(ErrorMessage = "ID do hotel é obrigatório")]
        public int HotelId { get; set; }

        [Required(ErrorMessage = "Data de check-in é obrigatória")]
        [DataType(DataType.Date)]
        public DateTime CheckIn { get; set; }

        [Required(ErrorMessage = "Data de check-out é obrigatória")]
        [DataType(DataType.Date)]
        public DateTime CheckOut { get; set; }

        [Range(1, 20, ErrorMessage = "Número de hóspedes deve ser entre 1 e 20")]
        public int NumberOfGuests { get; set; }

        [StringLength(500, ErrorMessage = "Solicitações especiais devem ter no máximo 500 caracteres")]
        public string? SpecialRequests { get; set; }

        [Required(ErrorMessage = "Lista de viajantes é obrigatória")]
        [MinLength(1, ErrorMessage = "Deve haver pelo menos um viajante")]
        public List<CreateTravellerDto> Travellers { get; set; } = new();

        // Validação customizada
        public bool IsValidDateRange()
        {
            return CheckOut > CheckIn && CheckIn >= DateTime.Today;
        }
    }
}