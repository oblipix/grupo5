namespace ViagemImpacta.DTO.TravellerDTO
{
        public class TravellerDto
        {
            public int TravellersId { get; set; }
            public string FirstName { get; set; } = string.Empty;
            public string LastName { get; set; } = string.Empty;
            public string Cpf { get; set; } = string.Empty;
            public string FullName => $"{FirstName} {LastName}";
        }
    }

