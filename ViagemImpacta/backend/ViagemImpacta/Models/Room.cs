using ViagemImpacta.Models.Enums;

namespace ViagemImpacta.Models
{
        public class Room
        {
            public int RoomId { get; set; }
            public string Name { get; set; }
            public int HotelId { get; set; }
            public Hotel Hotel { get; set; }
            public RoomType Type { get; set; }
            public int Capacity { get; set; }
            public decimal AverageDailyPrice { get; set; }
            public bool Available { get; set; }
    }
  }
