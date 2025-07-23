namespace ViagemImpacta.DTO.UserDTO;

public class LoginAuthDto
{
    public string Email { get; set; }
    public string Password { get; set; }

    public string Role { get; set; } // Adicionando a propriedade Role
}