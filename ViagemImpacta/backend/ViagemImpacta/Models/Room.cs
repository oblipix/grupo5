using System.ComponentModel.DataAnnotations;
using ViagemImpacta.Models.Enums;

namespace ViagemImpacta.Models
{
    public class Room
    {
        public int RoomId { get; set; }
        
        [Required(ErrorMessage = "Nome do quarto é obrigatório")]
        [StringLength(100, ErrorMessage = "Nome deve ter no máximo 100 caracteres")]
        public string Name { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Hotel é obrigatório")]
        public int HotelId { get; set; }
        
        // Propriedade de navegação - não precisa de validação
        public Hotel? Hotel { get; set; }
        
        [Required(ErrorMessage = "Tipo do quarto é obrigatório")]
        public RoomType Type { get; set; }
        
        [Required(ErrorMessage = "Capacidade é obrigatória")]
        [Range(1, 20, ErrorMessage = "Capacidade deve ser entre 1 e 20 pessoas")]
        public int Capacity { get; set; }
        
        [Required(ErrorMessage = "Preço médio diário é obrigatório")]
        [Range(0.01, 10000.00, ErrorMessage = "Preço deve ser maior que zero")]
        [DataType(DataType.Currency)]
        public decimal AverageDailyPrice { get; set; }
        
        // Campo não-nulo com valor padrão
        public bool Available { get; set; } = true;
    }
}
