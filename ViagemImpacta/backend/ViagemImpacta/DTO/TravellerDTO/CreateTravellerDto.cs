using System.ComponentModel.DataAnnotations;

namespace ViagemImpacta.DTO.TravellerDTO
{
    public class CreateTravellerDto
    {
        [Required(ErrorMessage = "Nome é obrigatório")]
        [StringLength(50, ErrorMessage = "Nome deve ter no máximo 50 caracteres")]
        public string FirstName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Sobrenome é obrigatório")]
        [StringLength(50, ErrorMessage = "Sobrenome deve ter no máximo 50 caracteres")]
        public string LastName { get; set; } = string.Empty;

        [Required(ErrorMessage = "CPF é obrigatório")]
        [StringLength(11, MinimumLength = 11, ErrorMessage = "CPF deve conter exatamente 11 dígitos")]
        [RegularExpression(@"^\d{11}$", ErrorMessage = "CPF deve conter apenas números")]
        public string Cpf { get; set; } = string.Empty;
    }
}
