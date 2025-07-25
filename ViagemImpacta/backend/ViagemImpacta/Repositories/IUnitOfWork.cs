using ViagemImpacta.Repositories.Interfaces;

namespace ViagemImpacta.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository Users { get; }
        IReservationBookRepository ReservationBooks { get; }
        IHotelRepository Hotels { get; }

        Task<bool> CommitAsync();
    }
}
