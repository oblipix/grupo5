using System.ComponentModel.DataAnnotations;

namespace ViagemImpacta.DTO.UserDTO;

public class LoginAuthDto
{
    [Required(ErrorMessage = "Email é obrigatório.")]
    [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", ErrorMessage = "Email inválido.")]
    [StringLength(100, ErrorMessage = "O email deve ter no máximo 100 caracteres")]
    public string Email { get; set; }
    [Required(ErrorMessage = "Senha é obrigatório.")]
    [MinLength(6, ErrorMessage = "A senha deve ter pelo menos 6 caracteres.")]
    public string Password { get; set; }
    public string? Role { get; set; }
}