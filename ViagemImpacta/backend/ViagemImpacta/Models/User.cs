using System.ComponentModel.DataAnnotations;
using System.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using ViagemImpacta.Models.Enums;

namespace ViagemImpacta.Models;

public class User
{
    public int UserId { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? Phone { get; set; } //Minimo 10, Max 12
   // public DateOnly BirthDate { get; set; }
    public string? Photo { get; set; }
    public string? Cpf { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DisabledAt { get; set; }
    public bool Active { get; set; }

    public Roles Role { get; set; } 

    //    public ICollection<Review>? Reviews { get; set; }

    //    public ICollection<Reservation>? Reservations { get; set; }
}

/*
 * Marcelo : Mudanças que eu fiz
 * 
 * - O CAMPO IDADE PODERIA SER UM MÉTODO QUE CALCULA O ANO ATUAL - O ANO DE NASCIMENTO
 * - A DATA CREATEDAT DEVERIA SE INICIAR COM O DATETIME.NOW;
 * - DISABLED MUDARÁ DE ACORDO COM O ACTIVE ATRAVÉS DE UM MÉTODO SERVICE
 * - O CAMPO USERNAME FOI ALTERADO PARA NAME
*/