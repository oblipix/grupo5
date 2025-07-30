using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using ViagemImpacta.Models.Enums;

namespace ViagemImpacta.Models
{
    public class Room
    {
        public int RoomId { get; set; }

        [Required(ErrorMessage = "Hotel é obrigatório")]
        public int HotelId { get; set; }

        // Propriedade de navegação - não precisa de validação
        public Hotel? Hotel { get; set; }

        [Required(ErrorMessage = "Tipo do quarto é obrigatório")]
        public RoomType TypeName { get; set; }

        [Required]
        public int TotalRooms { get; set; } //quantidade total de quartos desse tipo no hotel


        [Required(ErrorMessage = "Capacidade é obrigatória")]
        [Range(1, 4, ErrorMessage = "Capacidade deve ser entre 1 e 4 pessoas")]
        public int Capacity { get; set; }

        [Required(ErrorMessage = "Preço médio diário é obrigatório")]
        [Range(0.01, 10000.00, ErrorMessage = "Preço deve ser maior que zero")]
        [DataType(DataType.Currency)]
        public decimal AverageDailyPrice { get; set; }
        public string Description { get; set; } = string.Empty;
       
       
    }
}
