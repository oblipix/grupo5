using ViagemImpacta.Models.Enums;

namespace ViagemImpacta.ViewModels;

public class UpdateUserViewModel
{
    public int UserId { get; set; }
    public string Email { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Phone { get; set; }
    public string? Cpf { get; set; }
    public DateOnly? BirthDate { get; set; }
}
