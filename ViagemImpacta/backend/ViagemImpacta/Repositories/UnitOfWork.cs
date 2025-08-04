using ViagemImpacta.Data;
using ViagemImpacta.Repositories.Interfaces;
using ViagemImpacta.Repositories.Implementations;
using Microsoft.Extensions.Logging;

namespace ViagemImpacta.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AgenciaDbContext _context;
        private readonly ILoggerFactory _loggerFactory;
        public IUserRepository Users { get; private set; }
        public IHotelRepository Hotels { get; private set; }
        public IReservationRepository Reservations { get; private set; }
        public IRoomRepository Rooms { get; private set; }
        public ITravellerRepository Travellers { get; private set; }
        public IPasswordResetTokenRepository PasswordResetTokens { get; set; }
        public IPromotionRepository Promotions { get; private set; }
        public IRoomsPromotionalRepository RoomsPromotions { get; private set; }
        public UnitOfWork(AgenciaDbContext context, ILoggerFactory loggerFactory)
        {
            _context = context;
            _loggerFactory = loggerFactory;
            Users = new UserRepository(_context);
            Hotels = new HotelRepository(_context, _loggerFactory.CreateLogger<HotelRepository>());
            Reservations = new ReservationRepository(_context);
            Rooms = new RoomRepository(_context);
            Travellers = new TravellerRepository(_context);
            PasswordResetTokens = new PasswordResetTokenRepository(_context);
            Promotions = new PromotionRepository(_context);
            RoomsPromotions = new RoomsPromotionRepository(_context);
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
