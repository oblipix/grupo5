using ViagemImpacta.Models;

namespace ViagemImpacta.Repositories.Interfaces
{

    public interface IHotelRepository : IRepository<Hotel>
    {

        Task<IEnumerable<Hotel>> GetHotelsByStarsAsync(int stars);


        Task<IEnumerable<Hotel>> GetHotelsWithAmenitiesAsync(bool wifi, bool parking, bool gym);


        Task<Hotel?> GetHotelWithRoomsAsync(int id);


        Task<IEnumerable<Hotel>> GetAllHotelsWithRoomsAsync();
    }
}
