namespace ViagemImpacta.DTO.RoomDTO
{
    internal class RoomDto
    {
		public int RoomId { get; set; }
		public string TypeName { get; set; } = string.Empty;
		public int TotalRooms { get; set; }
		public int Capacity { get; set; }
		public decimal AverageDailyPrice { get; set; }
	}
}