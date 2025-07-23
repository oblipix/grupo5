using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories.Interfaces;

namespace ViagemImpacta.Repositories.Implementations
{
    public class HotelRepository : Repository<Hotel>, IHotelRepository
    {
        public HotelRepository(AgenciaDbContext context) : base(context)
        {
        }
    }
}