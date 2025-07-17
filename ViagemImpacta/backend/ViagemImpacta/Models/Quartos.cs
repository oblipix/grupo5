using ViagemImpacta.Models.Enums;

namespace ViagemImpacta.Models
{
    public class Quartos
    {
        public int QuartosId { get; set; }
        public string? Name { get; set; }
        public int QuantidadeHospedes { get; set; }
        public int HotelId { get; set; }
        public Hotel? Hotel { get; set; }
        public TipoQuarto Tipo { get; set; }
        public int Capacidade { get; set; }
        public string? Image { get; set; }
        public decimal PrecoMedioDiaria { get; set; }
        public bool Disponivel { get; set; }
        public bool PCD { get; set; }
    }
}
