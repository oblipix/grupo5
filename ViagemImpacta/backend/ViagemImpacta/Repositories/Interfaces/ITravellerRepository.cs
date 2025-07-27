using ViagemImpacta.Models;

namespace ViagemImpacta.Repositories.Interfaces
{
    public interface ITravellerRepository : IRepository<Travellers>
    {
        Task<IEnumerable<Travellers>> GetTravellersByReservationIdAsync(int reservationId);
    }
}