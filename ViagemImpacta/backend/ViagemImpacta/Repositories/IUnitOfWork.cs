namespace ViagemImpacta.Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IHotelRepository Hotels { get; }
        ITravelPackageRepository TravelPackages { get; }
        IUserRepository Users { get; }

        Task<bool> CommitAsync();
    }
}