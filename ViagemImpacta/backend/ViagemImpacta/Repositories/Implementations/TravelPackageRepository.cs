using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories.Interfaces;

namespace ViagemImpacta.Repositories.Implementations
{
    public class TravelPackageRepository : Repository<TravelPackage>, ITravelPackageRepository
    {
        private readonly AppDbContext _appDbContext;

        public TravelPackageRepository(AppDbContext appDbContext) : base(appDbContext) 
        {
            _appDbContext = appDbContext;
        }
    }
}
