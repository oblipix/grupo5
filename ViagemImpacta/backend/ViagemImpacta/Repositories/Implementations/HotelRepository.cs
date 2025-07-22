using ViagemImpacta.Repositories.Interfaces;

namespace ViagemImpacta.Repositories.Implementations
{
    using ViagemImpacta.Data;
    using ViagemImpacta.Models;

    public class HotelRepository : Repository<Hotel>, IHotelRepository
    {
        public HotelRepository(AgenciaDbContext context) : base(context)
        {
        }
    }
}
