using System.ComponentModel.DataAnnotations;
using ViagemImpacta.Models.Enums;

namespace ViagemImpacta.DTO.UserDTO
{
    public class CreateUserDto
    {
        [Required(ErrorMessage = "Email é obrigatório.")]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", ErrorMessage = "Email inválido.")]
        [StringLength(100, ErrorMessage = "O email deve ter no máximo 100 caracteres")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Senha é obrigatório.")]
        [MinLength(6, ErrorMessage = "A senha deve ter pelo menos 6 caracteres.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Primeiro Nome é obrigatório.")]
        [RegularExpression(@"^[A-Za-zÀ-ÿ\s]+$", ErrorMessage = "Não é aceito o uso de caracteres especiais ou números")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Sobrenome é obrigatório.")]
        [RegularExpression(@"^[A-Za-zÀ-ÿ\s]+$", ErrorMessage = "Não é aceito o uso de caracteres especiais ou números")]
        public string LastName { get; set; }

        public Roles roles { get; set; } = Roles.User;

    }
}
