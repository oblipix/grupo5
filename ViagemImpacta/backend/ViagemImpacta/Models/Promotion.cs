namespace ViagemImpacta.Models
{
    public class Promotion
    {
        public int PromotionId { get; set; }

        public string TitlePromotion { get; set; }
        public string Description { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }

        public int HotelId { get; set; }
        public Hotel? Hotel { get; set; }

        public decimal FinalPrice { get; set; }
        public decimal OriginalPrice { get; set; }
        public decimal DiscountPercentage { get; set; } = 0.15m;

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int RoomsPromotionalId { get; set; }
        public RoomsPromotional? RoomsPromotional { get; set; }
    }
}
