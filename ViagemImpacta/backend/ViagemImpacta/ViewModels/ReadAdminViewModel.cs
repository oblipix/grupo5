using System.ComponentModel.DataAnnotations;

namespace ViagemImpacta.ViewModels
{
    public class ReadAdminViewModel
    {
        [Required(ErrorMessage = "O campo e-mail é obrigatório.")]
        public string Email { get; set; }
        [Required(ErrorMessage = "O campo senha é obrigatório.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
