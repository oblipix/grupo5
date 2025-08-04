using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ViagemImpacta.Models
{
    public class Hotel
    {
        public int HotelId { get; set; }

        [Required(ErrorMessage = "Nome do hotel é obrigatório")]
        [StringLength(200, ErrorMessage = "Nome deve ter no máximo 200 caracteres")]
        public string? Name { get; set; }

        [Phone(ErrorMessage = "Telefone inválido")]
        public string? Phone { get; set; }

        [StringLength(300, ErrorMessage = "Endereço deve ter no máximo 300 caracteres")]
        public string? HotelAddress { get; set; }

        public ICollection<Room> Rooms { get; set; } = new List<Room>(); // Coleção de navegação

        public bool Wifi { get; set; }
        public bool Parking { get; set; }

        [Required(ErrorMessage = "Cidade é obrigatória")]
        [StringLength(100, ErrorMessage = "Cidade deve ter no máximo 100 caracteres")]
        public string City { get; set; } = string.Empty;

        [Range(1, 5, ErrorMessage = "Estrelas devem ser entre 1 e 5")]
        public int Stars { get; set; }

        //BENEFICIOS ----------------

        public bool Gym { get; set; }
        public bool Restaurant { get; set; }
        public bool Bar { get; set; }
        public bool RoomService { get; set; }

        public bool Accessibility { get; set; }
        public bool WarmPool { get; set; }
        public bool Theater { get; set; }
        public bool Garden { get; set; }
        public bool PetFriendly { get; set; }
        public bool Pool { get; set; }
        public bool BreakfastIncludes { get; set; }

        [StringLength(500, ErrorMessage = "Descrição deve ter no máximo 500 caracteres")]
        public string? Description { get; set; }

        // IMAGES ----------------
        /// <summary>
        /// Lista de URLs das imagens do hotel. A primeira imagem será usada como imagem principal.
        /// Cada URL deve ter no máximo 500 caracteres.
        /// </summary>
        public List<string> ImageUrls { get; set; } = new List<string>();
    }
}

