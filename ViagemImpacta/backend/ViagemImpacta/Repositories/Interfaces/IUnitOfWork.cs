using ViagemImpacta.Repositories.Interfaces;

namespace GerenciadorDeProjetos.Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository Users { get; }
        ITravelPackageRepository TravelPackages { get; }
        IHotelRepository Hotels { get; }

        Task<bool> CommitAsync();
    }
}
