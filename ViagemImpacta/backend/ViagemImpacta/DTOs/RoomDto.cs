namespace ViagemImpacta.Mappings
{
    internal class RoomDto
    {
		public int RoomId { get; set; }
		public string? Name { get; set; }
		public int Capacity { get; set; }
		public decimal AverageDailyPrice { get; set; }
	}
}