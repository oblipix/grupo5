using System.ComponentModel.DataAnnotations;

namespace ViagemImpacta.Models
{
    public class Travellers
    {
        public int TravellersId { get; set; }

        [Required]
        public string FirstName { get; set; } 

        [Required] 
        public string LastName { get; set; } 

        [Required]
        public string Cpf { get; set; } 


        // Relacionamento com Reservation (obrigatório)
        public int ReservationId { get; set; }
        public Reservation Reservation { get; set; } 


    }
}
