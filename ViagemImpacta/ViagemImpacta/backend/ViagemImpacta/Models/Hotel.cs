namespace ViagemImpacta.Models
{
    public class Hotel
    {
        public int HotelId { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Location { get; set; }
        public List<Room> Rooms { get; set; }
        public string Image { get; set; }
        //public ICollection<PackageImage> PackageImages { get; set; }
        public bool Wifi { get; set; }
        public bool Parking { get; set; }
        public int Stars { get; set; }
        public bool Gym { get; set; }
        public bool Restaurant { get; set; }
    }
}
