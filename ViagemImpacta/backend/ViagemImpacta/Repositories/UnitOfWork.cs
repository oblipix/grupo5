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
        public IHotelRepository Hotels { get; private set; } // Adicionar

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
            Users = new UserRepository(_context);
            TravelPackages = new TravelPackageRepository(_context);
            Hotels = new HotelRepository(_context); // Adicionar
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