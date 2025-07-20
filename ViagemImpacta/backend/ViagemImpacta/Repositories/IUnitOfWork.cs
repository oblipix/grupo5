using ViagemImpacta.Repositories.Interfaces;

namespace ViagemImpacta.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository Users { get; }
        ITravelPackageRepository TravelPackages { get; }

        Task<bool> CommitAsync();
    }
}
