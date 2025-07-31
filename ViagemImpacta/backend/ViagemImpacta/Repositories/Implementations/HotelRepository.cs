using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories.Interfaces;

namespace ViagemImpacta.Repositories.Implementations
{

    public class HotelRepository : Repository<Hotel>, IHotelRepository
    {

        private readonly AgenciaDbContext _context;


        public HotelRepository(AgenciaDbContext context) : base(context)
        {
            _context = context;
        }


        public async Task<IEnumerable<Hotel>> GetHotelsByStarsAsync(int stars)
        {
            // 🎯 QUERY LINQ OTIMIZADA
            // Where() cria filtro SQL
            // ToListAsync() materializa e retorna dados
            return await _context.Hotels
                .Where(h => h.Stars == stars)
                .ToListAsync();
        }


        public async Task<IEnumerable<Hotel>> GetHotelsWithAmenitiesAsync(bool wifi, bool parking, bool gym)
        {

            return await _context.Hotels
                .Where(h => (!wifi || h.Wifi) &&
                           (!parking || h.Parking) &&
                           (!gym || h.Gym))
                .ToListAsync();
        }
       
        public async Task<Hotel?> GetHotelWithRoomsAsync(int id)
        {
            return await _context.Hotels
                .Include(h => h.Rooms)
                .FirstOrDefaultAsync(h => h.HotelId == id);
        }

      
        public async Task<IEnumerable<Hotel>> GetAllHotelsWithRoomsAsync()
        {
            return await _context.Hotels
                .Include(h => h.Rooms)
                .ToListAsync();
        }
    }

   
}
