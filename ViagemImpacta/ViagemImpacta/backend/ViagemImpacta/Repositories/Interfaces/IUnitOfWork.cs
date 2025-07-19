using ViagemImpacta.Repositories.Interfaces;

namespace GerenciadorDeProjetos.Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
       

        Task<int> CommitAsync();

    }
}
