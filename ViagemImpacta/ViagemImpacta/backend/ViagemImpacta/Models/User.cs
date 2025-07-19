using System.Data;
using Microsoft.AspNetCore.Mvc.ViewEngines;

namespace ViagemImpacta.Models
{
    public class User
    {
        public long UserId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
        public int Age { get; set; }
        public string Photo { get; set; }
        public string Cpf { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime DisabledAt { get; set; }
        public bool Active { get; set; }

        public List<Review>? Reviews { get; set; }

        public List<Reservation>? Reservations { get; set; }
    }
}
