using ViagemImpacta.DTO.TravellerDTO;
using ViagemImpacta.Models;

namespace ViagemImpacta.ViewModels;

public class UpdateReservationViewModel
{
    public int ReservationId { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public DateTime CheckIn { get; set; }
    public DateTime CheckOut { get; set; }
    public int RoomId { get; set; }
    public Room? Room { get; set; }
    public int HotelId { get; set; }
    public Hotel? Hotel { get; set; }
    public string? Description { get; set; }
    public decimal TotalPrice { get; set; }
    public DateTime UpdatedAt { get; set; }
    public List<CreateTravellerDto> Travellers { get; set; } = new();
}
