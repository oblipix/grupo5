using ViagemImpacta.Models;

namespace ViagemImpacta.Repositories.Interfaces
{
    public interface IRoomRepository : IRepository<Room>
    {
        Task<IEnumerable<Room>> GetRoomsByHotelIdAsync(int hotelId);
        Task<IEnumerable<Room>> GetAvailableRoomsAsync(int hotelId, DateTime checkIn, DateTime checkOut);
        Task<Room?> GetRoomWithHotelAsync(int roomId);
    }
}