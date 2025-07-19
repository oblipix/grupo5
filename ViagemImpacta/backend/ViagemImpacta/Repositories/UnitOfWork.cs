using ViagemImpacta.Data;
using ViagemImpacta.Repositories.Implementations;
using ViagemImpacta.Repositories.Interfaces;

namespace ViagemImpacta.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;
        public IUserRepository Users { get; private set; }
        public ITravelPackageRepository TravelPackages { get; private set; }

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
            Users = new UserRepository(_context);
            TravelPackages = new TravelPackageRepository(_context);
        }

        // Marcelo: Troquei para <bool> por ser mais semântico, mas a ideia é a mesma.
        public async Task<bool> CommitAsync()
        {
            /*
             - O Método SaveChanges e SaveChangesAsync retorna o número de entidades que foram afetadas no banco de dados.
            Ex.: Se eu altero o nome de dois usuários ao mesmo tempo, são 2 commits que o SaveChanges faz no banco de dados, logo o retorno é 2.
             */
            return await _context.SaveChangesAsync() > 0;
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
