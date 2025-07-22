using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories.Interfaces;

namespace ViagemImpacta.Repositories.Implementations
{
    public class TravelPackageRepository : Repository<TravelPackage>, ITravelPackageRepository
    {
        private readonly AgenciaDbContext _appDbContext;

        public TravelPackageRepository(AgenciaDbContext appDbContext) : base(appDbContext) 
        {
            _appDbContext = appDbContext;
        }
    }
}
