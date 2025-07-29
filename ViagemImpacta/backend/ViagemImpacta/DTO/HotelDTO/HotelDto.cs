namespace ViagemImpacta.DTO.HotelDTO
{
    public class HotelDto
    {
        public int HotelId { get; set; }
        public string? Name { get; set; }
        public string? HotelAddress { get; set; }
        public string? City { get; set; }
        public int Stars { get; set; }
        public int RoomCount { get; set; }
        public bool Gym { get; set; }
        public bool Restaurant { get; set; }
        public bool Bar { get; set; }
        public bool RoomService { get; set; }
        public string? Phone { get; set; }
        public bool Accessibility { get; set; }
        public bool WarmPool { get; set; }
        public bool Theater { get; set; }
        public bool Garden { get; set; }
        public bool PetFriendly { get; set; }
        public bool Pool { get; set; }
        public bool BreakfastIncludes { get; set; }
        public bool Wifi { get; set; }
        public bool Parking { get; set; }
    }
}