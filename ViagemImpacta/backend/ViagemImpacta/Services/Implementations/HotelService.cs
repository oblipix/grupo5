using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Services.Implementations
{
    public class HotelService : IHotelService
    {
        private readonly AgenciaDbContext _context;

        public HotelService(AgenciaDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Hotel>> GetAllHotelsAsync()
        {
            return await _context.Hotels.Include(h => h.Rooms).ToListAsync();
        }

        public async Task<Hotel?> GetHotelByIdAsync(int id)
        {
            return await _context.Hotels
                .Include(h => h.Rooms)
                .FirstOrDefaultAsync(h => h.HotelId == id);
        }

        public async Task<IEnumerable<Hotel>> GetHotelsWithFiltersAsync(string? location, int? minStars, bool? hasWifi, bool? hasParking)
        {
            var query = _context.Hotels.AsQueryable();

            if (!string.IsNullOrEmpty(location))
            {
                query = query.Where(h => h.Location.Contains(location));
            }

            if (minStars.HasValue)
            {
                query = query.Where(h => h.Stars >= minStars.Value);
            }

            if (hasWifi.HasValue)
            {
                query = query.Where(h => h.Wifi == hasWifi.Value);
            }

            if (hasParking.HasValue)
            {
                query = query.Where(h => h.Parking == hasParking.Value);
            }

            return await query.Include(h => h.Rooms).ToListAsync();
        }

        public async Task<Hotel> CreateHotelAsync(Hotel hotel)
        {
            _context.Hotels.Add(hotel);
            await _context.SaveChangesAsync();
            return hotel;
        }

        public async Task UpdateHotelAsync(Hotel hotel)
        {
            var existingHotel = await _context.Hotels
                .Include(h => h.Rooms)
                .FirstOrDefaultAsync(h => h.HotelId == hotel.HotelId);

            if (existingHotel == null)
            {
                return;
            }

            _context.Entry(existingHotel).CurrentValues.SetValues(hotel);

            var formRoomIds = hotel.Rooms.Select(r => r.RoomId).ToHashSet();

            var roomsToRemove = existingHotel.Rooms
                .Where(dbRoom => !formRoomIds.Contains(dbRoom.RoomId))
                .ToList();

            _context.Rooms.RemoveRange(roomsToRemove);

            foreach (var formRoom in hotel.Rooms)
            {
                if (formRoom.RoomId > 0)
                {
                    var dbRoom = existingHotel.Rooms.FirstOrDefault(r => r.RoomId == formRoom.RoomId);
                    if (dbRoom != null)
                    {
                        _context.Entry(dbRoom).CurrentValues.SetValues(formRoom);
                    }
                }
                else
                {
                    existingHotel.Rooms.Add(formRoom);
                }
            }

            await _context.SaveChangesAsync();
        }
        

        public async Task<bool> DeleteHotelAsync(int id)
        {
            var hotel = await _context.Hotels.FindAsync(id);
            if (hotel == null)
            {
                return false; 
            }

            _context.Hotels.Remove(hotel);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<Hotel> GetHotelWithRoomsAsync(int hotelId)
        {
            return await _context.Hotels
                .Include(h => h.Rooms)
                .FirstOrDefaultAsync(h => h.HotelId == hotelId);
        }
    }
}