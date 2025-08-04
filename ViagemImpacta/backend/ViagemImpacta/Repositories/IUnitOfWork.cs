using ViagemImpacta.Repositories.Interfaces;

namespace ViagemImpacta.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository Users { get; }
        IHotelRepository Hotels { get; }
        IReservationRepository Reservations { get; }
        IRoomRepository Rooms { get; }
        ITravellerRepository Travellers { get; }
        IPasswordResetTokenRepository PasswordResetTokens { get; }

        Task<bool> CommitAsync();
    }
}
