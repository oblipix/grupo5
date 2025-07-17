namespace ViagemImpacta.Models
{
    public class Hotel
    {
        public int HotelId { get; set; }
        public string Name { get; set; }
        public string Telefone { get; set; }
        public string Local { get; set; }
        public List<Quarto> Quartos { get; set; }
        public string Image { get; set; }
        public ICollection<PackageImage> PackageImages { get; set; }
        public bool Wifi { get; set; }
        public bool Estacionamento { get; set; }
        public int Estrelas { get; set; }
        public bool Academia { get; set; }
        public bool Restaurante { get; set; }
    }
}
