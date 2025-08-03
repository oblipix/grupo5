using ViagemImpacta.Data;
using ViagemImpacta.Repositories.Interfaces;

namespace ViagemImpacta.Repositories.Implementations
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AgenciaDbContext _context;
        public IUserRepository Users { get; private set; }
        public IHotelRepository Hotels { get; private set; }
        public IReservationRepository Reservations { get; private set; }
        public IRoomRepository Rooms { get; private set; }
        public ITravellerRepository Travellers { get; private set; }
        public IPromotionRepository Promotions { get; private set; }
        public IRoomsPromotionalRepository RoomsPromotions { get; private set; }
        public UnitOfWork(AgenciaDbContext context)
        {
            _context = context;
            Users = new UserRepository(_context);
            Hotels = new HotelRepository(_context);
            Reservations = new ReservationRepository(_context);
            Rooms = new RoomRepository(_context);
            Travellers = new TravellerRepository(_context);
            Promotions = new PromotionRepository(_context);
            RoomsPromotions = new RoomsPromotionalRepository(_context);
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
