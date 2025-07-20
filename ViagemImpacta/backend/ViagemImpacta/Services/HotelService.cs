using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Services
{
    public class HotelService : IHotelService
    {
        private readonly AppDbContext _context;

        public HotelService(AppDbContext context)
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

        public async Task<bool> UpdateHotelAsync(int id, Hotel hotel)
        {
            if (id != hotel.HotelId)
            {
                return false; 
            }

            var existingHotel = await _context.Hotels.FindAsync(id);
            if (existingHotel == null)
            {
                return false; 
            }

            _context.Entry(existingHotel).CurrentValues.SetValues(hotel);

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;
            }
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
    }
}