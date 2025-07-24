using System.ComponentModel.DataAnnotations;
using ViagemImpacta.Models.Enums;

namespace ViagemImpacta.ViewModels
{
    public class CreateEmpolyeeViewModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public Roles Roles { get; set; }
    }
}
