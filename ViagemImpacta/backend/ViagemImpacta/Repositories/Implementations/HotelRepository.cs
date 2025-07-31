using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories.Interfaces;
using ViagemImpacta.Models.Enums;

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
        public async Task<IEnumerable<Hotel>> SearchHotelsAsync(
    string? destination,
    decimal? minPrice,
    decimal? maxPrice,
    int? stars,
    string? roomType,
    string? amenities
)
        {
            // DEBUG TEMPORÁRIO: mostra todos os parâmetros recebidos
            Console.WriteLine("[DEBUG][backend][HotelRepository][TEMP] Parâmetros recebidos:");
            Console.WriteLine($"destination={destination}, minPrice={minPrice}, maxPrice={maxPrice}, stars={stars}, roomType={roomType}, amenities={amenities}");
            var query = _context.Hotels.Include(h => h.Rooms).AsQueryable();

            if (!string.IsNullOrEmpty(destination))
            {
                string loc = destination.ToLower();
                query = query.Where(h =>
                    (!string.IsNullOrEmpty(h.Description) && h.Description.ToLower().Contains(loc)) ||
                    (!string.IsNullOrEmpty(h.City) && h.City.ToLower().Contains(loc)) ||
                    (!string.IsNullOrEmpty(h.HotelAddress) && h.HotelAddress.ToLower().Contains(loc))
                );
            }

            if (stars.HasValue)
                query = query.Where(h => h.Stars == stars.Value);

            if (!string.IsNullOrEmpty(roomType) && Enum.TryParse<RoomType>(roomType, true, out var parsedType))
                query = query.Where(h => h.Rooms.Any(r => r.TypeName == parsedType));

            if (minPrice.HasValue)
                query = query.Where(h => h.Rooms.Any(r => r.AverageDailyPrice >= minPrice.Value));

            if (maxPrice.HasValue)
                query = query.Where(h => h.Rooms.Any(r => r.AverageDailyPrice <= maxPrice.Value));

            if (!string.IsNullOrEmpty(amenities))
            {
                var amenityList = amenities.Split(',');
                foreach (var amenity in amenityList)
                {
                    var trimmed = amenity.Trim().ToLower();
                    // Mapeamento dos nomes do frontend (português) para backend (inglês)
                    switch (trimmed)
                    {
                        case "wifi": query = query.Where(h => h.Wifi); break;
                        case "parking": case "estacionamento": query = query.Where(h => h.Parking); break;
                        case "gym": case "academia": query = query.Where(h => h.Gym); break;
                        case "restaurant": case "restaurante": query = query.Where(h => h.Restaurant); break;
                        case "bar": query = query.Where(h => h.Bar); break;
                        case "roomservice": case "serviço de quarto": case "servico de quarto": query = query.Where(h => h.RoomService); break;
                        case "accessibility": case "acessibilidade": query = query.Where(h => h.Accessibility); break;
                        case "warmpool": case "piscina aquecida": query = query.Where(h => h.WarmPool); break;
                        case "theater": case "sala de cinema": query = query.Where(h => h.Theater); break;
                        case "garden": case "jardim amplo": query = query.Where(h => h.Garden); break;
                        case "petfriendly": case "aceita animais": query = query.Where(h => h.PetFriendly); break;
                        case "pool": case "piscina": query = query.Where(h => h.Pool); break;
                        case "breakfastincludes": case "café da manhã incluso": case "cafe da manha incluso": query = query.Where(h => h.BreakfastIncludes); break;
                            // Adicione outros aliases se necessário
                    }
                }
            }

            return await query.ToListAsync();
        }

    }




}
