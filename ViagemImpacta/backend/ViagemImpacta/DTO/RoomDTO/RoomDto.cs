namespace ViagemImpacta.DTO.RoomDTO
{
    public class RoomDto
{
    public int RoomId { get; set; }
    public int HotelId { get; set; }
    public string? TypeName { get; set; }
    public int TotalRooms { get; set; }
    public int Capacity { get; set; }
    public decimal AverageDailyPrice { get; set; }
    public string Description { get; set; } = string.Empty;
}
}