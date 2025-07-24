using ViagemImpacta.Repositories.Interfaces;

namespace ViagemImpacta.Repositories.Implementations
{
    using ViagemImpacta.Data;
    using ViagemImpacta.Models;

    public class HotelRepository : Repository<Hotel>
    {
        private readonly AppDbContext _context;

        public HotelRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
