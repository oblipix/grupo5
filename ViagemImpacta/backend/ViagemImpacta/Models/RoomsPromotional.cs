using System.ComponentModel.DataAnnotations;
using ViagemImpacta.Models.Enums;

namespace ViagemImpacta.Models
{
    public class RoomsPromotional
    {

        public int RoomPromotionalId { get; set; }

        public int HotelId { get; set; }
        public Hotel? Hotel { get; set; }

        public RoomType TypeName { get; set; }

        public int TotalRoomsAvailable { get; set; } //quantidade total de quartos desse tipo no 
        public int TotalRoomsReserved { get; set; } //quantidade de quartos reservados desse tipo no hotel


        [Range(1, 4, ErrorMessage = "Capacidade deve ser entre 1 e 4 pessoas")]
        public int Capacity { get; set; }


        public int PromotionId { get; set; }

        public bool active { get; set; } = true;

    }
}
