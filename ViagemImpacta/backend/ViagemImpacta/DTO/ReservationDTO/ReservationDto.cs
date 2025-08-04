using ViagemImpacta.DTO.TravellerDTO;
using ViagemImpacta.Models.Enums;


// VERIFICAR SE ESTÁ SENDO UTILIZADO!!
namespace ViagemImpacta.DTO.ReservationDTO
{
    public class ReservationDto
    {
        public int ReservationId { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string UserEmail { get; set; } = string.Empty;
        public int RoomId { get; set; }
        public RoomType RoomType { get; set; }
        public int HotelId { get; set; }
        public string HotelName { get; set; } = string.Empty;
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public DateTime ReservationDate { get; set; }
        public bool IsConfirmed { get; set; }
        public decimal TotalPrice { get; set; }
        public int NumberOfGuests { get; set; }
        public string? SpecialRequests { get; set; }
        public int TotalDays { get; set; }
        public List<TravellerDto> Travellers { get; set; } = new();
    }

    
}