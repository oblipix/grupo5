using System.ComponentModel.DataAnnotations;

namespace ViagemImpacta.ViewModels
{
    public class ReadAdminViewModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
