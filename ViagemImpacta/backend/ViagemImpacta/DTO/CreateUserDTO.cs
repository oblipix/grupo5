using System.ComponentModel.DataAnnotations;

namespace ViagemImpacta.DTO
{
    public class CreateUserDTO
    {
        [Required(ErrorMessage = "Email é obrigatório.")]
        
        public string Email { get; set; }

        [Required(ErrorMessage = "Senha é obrigatório.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Primeiro Nome é obrigatório.")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Sobrenome é obrigatório.")]
        public string LastName { get; set; }

    }
}
