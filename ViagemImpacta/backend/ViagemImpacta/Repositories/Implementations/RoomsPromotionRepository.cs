using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories.Interfaces;

namespace ViagemImpacta.Repositories.Implementations
{
    public class RoomsPromotionRepository : Repository<RoomsPromotional>, IRoomsPromotionalRepository
    {
        private readonly AgenciaDbContext _context;

        public RoomsPromotionRepository(AgenciaDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<RoomsPromotional?> GetRoomPromotionalByIdAsync(int idRoomPromotional)
        {
            return await _context.RoomsPromotional
                .FirstOrDefaultAsync(RP => RP.RoomPromotionalId == idRoomPromotional);
        }

        public async Task<bool> RoomsAvailableAsync(int PromotionId)
        {
            var roomsAvailable = await _context.RoomsPromotional
                .Where(RP => RP.active)
                .FirstOrDefaultAsync(RP => RP.PromotionId == PromotionId);

            if (roomsAvailable.TotalRoomsReserved < roomsAvailable.TotalRoomsAvailable)
            {
                return true;
            }
            else
            {
                return false;
            }


        }
    }
}
