using ViagemImpacta.Repositories.Interfaces;

namespace GerenciadorDeProjetos.Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
       IUserRepository Users { get; }

        Task<bool> CommitAsync();

    }
}
