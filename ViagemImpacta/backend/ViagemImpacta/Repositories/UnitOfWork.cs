using ViagemImpacta.Data;
using ViagemImpacta.Repositories.Interfaces;

namespace ViagemImpacta.Repositories.Implementations
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AgenciaDbContext _context;
        public IUserRepository Users { get; private set; }
        public IHotelRepository Hotels { get; private set; }

        public UnitOfWork(AgenciaDbContext context)
        {
            _context = context;
            Users = new UserRepository(_context);
            Hotels = new HotelRepository(_context);
        }

        public async Task<bool> CommitAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
