namespace ViagemImpacta.Models
{
    public class TravelPackage
    {
        public int TravelPackageId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public bool Active { get; set; } //TRANSFORMAR DE ALGUMA FORMA EM AUTOMÁTICO 
        //public bool Promotion { get; set; } //FALTA OTIMIZAR ESSA IDEIA!!
        public DateTime StartDate { get; set; } //ACHO QUE DEVERIA SER DATEONLY
        public DateTime EndDate { get; set; } //ACHO QUE DEVERIA SER DATEONLY
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        
        public List<Room> Rooms { get; set; }
        public List<Reservation> Reservations { get; set; }
        public List<Review> Reviews { get; set; }
    }
}
