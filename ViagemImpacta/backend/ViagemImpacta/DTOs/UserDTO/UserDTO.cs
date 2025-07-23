namespace ViagemImpacta.DTO.UserDTO
{
    public class UserDTO
    {
        public int UserId { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }



        // Campos Opcionais

           public string? Phone { get; set; }
           public DateOnly? BirthDate { get; set; }
           public string? Photo { get; set; } 
           public string? Cpf { get; set; }
           public bool Active { get; set; }

        


        
    }
}
