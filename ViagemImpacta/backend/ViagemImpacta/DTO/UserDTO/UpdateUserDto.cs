using System.ComponentModel.DataAnnotations;

namespace ViagemImpacta.DTO.UserDTO
{
    public class UpdateUserDto
    {
        [Required]
        public int UserId { get; set; }

        [Required(ErrorMessage = "O email é Obrigatório")]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", ErrorMessage = "Email inválido.")]
        [StringLength(100, ErrorMessage = "O email deve ter no máximo 100 caracteres")]
        public string Email { get; set; }
        
        [Required(ErrorMessage = "Primeiro Nome é obrigatório.")]
        [RegularExpression(@"^[A-Za-zÀ-ÿ\s]+$", ErrorMessage = "Não é aceito o uso de caracteres especiais ou números")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Sobrenome é obrigatório.")]
        [RegularExpression(@"^[A-Za-zÀ-ÿ\s]+$", ErrorMessage = "Não é aceito o uso de caracteres especiais ou números")]
        public string LastName { get; set; }

        // Campos Opcionais
        // Falta ver a questao do Passowrd 

        [StringLength(11, MinimumLength = 11, ErrorMessage = "O número de celular deve conter 11 digitos")]
        [RegularExpression(@"^\d+$", ErrorMessage = "O telefone deve conter apenas números (DDD + número) sem espaço ou caracteres especiais ex: 81999998888")]
        public string? Phone { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? Photo { get; set; }
        [RegularExpression(@"^\d{11}$", ErrorMessage = "O CPF deve conter exatamente 11 dígitos, sem pontos ou traços.")]
        public string? Cpf { get; set; }
    }
}
