using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories.Interfaces;

namespace ViagemImpacta.Repositories.Implementations
{
    public class TravelPackageRepository : Repository<TravelPackage>, ITravelPackageRepository
    {
        public TravelPackageRepository(AgenciaDbContext context) : base(context)
        {
        }
    }
}