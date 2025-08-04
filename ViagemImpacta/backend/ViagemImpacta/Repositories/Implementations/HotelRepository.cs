using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories.Interfaces;
using ViagemImpacta.Models.Enums;

namespace ViagemImpacta.Repositories.Implementations
{

    public class HotelRepository : Repository<Hotel>, IHotelRepository
    {

        private new AgenciaDbContext _context;
        private readonly ILogger<HotelRepository> _logger;


        public HotelRepository(AgenciaDbContext context, ILogger<HotelRepository> logger) : base(context)
        {
            _context = context;
            _logger = logger;
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
                .AsNoTracking()
                .Include(h => h.Rooms)
                .FirstOrDefaultAsync(h => h.HotelId == id);
        }


        public async Task<IEnumerable<Hotel>> GetAllHotelsWithRoomsAsync()
        {
            return await _context.Hotels
                .AsNoTracking()
                .Include(h => h.Rooms)
                .ToListAsync();
        }

        public async Task<IEnumerable<Hotel>> SearchHotelsAsync(
            string? destination,
            decimal? minPrice,
            decimal? maxPrice,
            int? stars,
            string? roomType,
            string? amenities,
            int? guests,
            string? checkIn,
            string? checkOut)
        {
            var stopwatch = Stopwatch.StartNew();
            var validationResults = new List<string>();

            // 🚀 FAIL-FAST: Validações no início para evitar processamento desnecessário

            // Validação de preços
            if (minPrice.HasValue && minPrice.Value < 0)
            {
                var reason = $"MinPrice negative: {minPrice.Value}";
                validationResults.Add(reason);
                LogFailFast("NegativeMinPrice", reason, stopwatch.ElapsedMilliseconds);
                return Enumerable.Empty<Hotel>();
            }

            if (maxPrice.HasValue && maxPrice.Value < 0)
            {
                var reason = $"MaxPrice negative: {maxPrice.Value}";
                validationResults.Add(reason);
                LogFailFast("NegativeMaxPrice", reason, stopwatch.ElapsedMilliseconds);
                return Enumerable.Empty<Hotel>();
            }

            if (minPrice.HasValue && maxPrice.HasValue && minPrice.Value > maxPrice.Value)
            {
                var reason = $"MinPrice ({minPrice.Value}) > MaxPrice ({maxPrice.Value})";
                validationResults.Add(reason);
                LogFailFast("InvalidPriceRange", reason, stopwatch.ElapsedMilliseconds);
                return Enumerable.Empty<Hotel>();
            }

            // Validação de estrelas (hotéis têm 1-5 estrelas)
            if (stars.HasValue && (stars.Value < 1 || stars.Value > 5))
            {
                var reason = $"Invalid stars: {stars.Value} (must be 1-5)";
                validationResults.Add(reason);
                LogFailFast("InvalidStars", reason, stopwatch.ElapsedMilliseconds);
                return Enumerable.Empty<Hotel>();
            }

            // Validação de hóspedes
            if (guests.HasValue && guests.Value <= 0)
            {
                var reason = $"Invalid guests: {guests.Value} (must be > 0)";
                validationResults.Add(reason);
                LogFailFast("InvalidGuests", reason, stopwatch.ElapsedMilliseconds);
                return Enumerable.Empty<Hotel>();
            }

            // Validação de datas
            if (!string.IsNullOrWhiteSpace(checkIn) && !string.IsNullOrWhiteSpace(checkOut))
            {
                if (!DateTime.TryParse(checkIn, out var checkInDate) ||
                    !DateTime.TryParse(checkOut, out var checkOutDate) ||
                    checkOutDate <= checkInDate ||
                    checkInDate < DateTime.Today) // Não pode reservar no passado
                {
                    var reason = $"Invalid dates: CheckIn={checkIn}, CheckOut={checkOut}";
                    validationResults.Add(reason);
                    LogFailFast("InvalidDates", reason, stopwatch.ElapsedMilliseconds);
                    return Enumerable.Empty<Hotel>();
                }
            }

            // Se chegou até aqui, todas as validações passaram
            LogValidationsPassed(stopwatch.ElapsedMilliseconds);

            var query = _context.Hotels.AsNoTracking().Include(h => h.Rooms).AsQueryable();            // Filtro por destino
            if (!string.IsNullOrWhiteSpace(destination))
            {
                var searchTerm = destination.ToLowerInvariant();
                query = query.Where(h =>
                    (h.Description != null && h.Description.ToLower().Contains(searchTerm)) ||
                    (h.City != null && h.City.ToLower().Contains(searchTerm)) ||
                    (h.HotelAddress != null && h.HotelAddress.ToLower().Contains(searchTerm)));
            }

            // ✅ OTIMIZAÇÃO: Filtro por preço aplicado no banco de dados
            if (minPrice.HasValue || maxPrice.HasValue)
            {
                if (minPrice.HasValue)
                {
                    query = query.Where(h => h.Rooms.Any(r => r.AverageDailyPrice >= minPrice.Value));
                }
                if (maxPrice.HasValue)
                {
                    query = query.Where(h => h.Rooms.Any(r => r.AverageDailyPrice <= maxPrice.Value));
                }
            }

            // Filtro por estrelas
            if (stars.HasValue)
            {
                query = query.Where(h => h.Stars == stars.Value);
            }

            var hotels = await query.ToListAsync();

            // ✅ PÓS-PROCESSAMENTO: Aplicar filtros específicos de preço nos quartos após carregar
            if (minPrice.HasValue || maxPrice.HasValue)
            {
                var filteredHotels = new List<Hotel>();

                foreach (var hotel in hotels)
                {
                    var filteredRooms = hotel.Rooms
                        .Where(r => (!minPrice.HasValue || r.AverageDailyPrice >= minPrice.Value) &&
                                   (!maxPrice.HasValue || r.AverageDailyPrice <= maxPrice.Value))
                        .ToList();

                    if (filteredRooms.Any())
                    {
                        // Cria uma cópia do hotel com apenas quartos na faixa de preço
                        var hotelCopy = new Hotel
                        {
                            HotelId = hotel.HotelId,
                            Name = hotel.Name,
                            Description = hotel.Description,
                            HotelAddress = hotel.HotelAddress,
                            City = hotel.City,
                            Stars = hotel.Stars,
                            Wifi = hotel.Wifi,
                            Parking = hotel.Parking,
                            Gym = hotel.Gym,
                            Restaurant = hotel.Restaurant,
                            Bar = hotel.Bar,
                            Pool = hotel.Pool,
                            RoomService = hotel.RoomService,
                            Accessibility = hotel.Accessibility,
                            PetFriendly = hotel.PetFriendly,
                            WarmPool = hotel.WarmPool,
                            Theater = hotel.Theater,
                            Garden = hotel.Garden,
                            BreakfastIncludes = hotel.BreakfastIncludes,
                            ImageUrls = hotel.ImageUrls, // 🖼️ CORREÇÃO: Copiar URLs das imagens
                            Rooms = filteredRooms
                        };
                        filteredHotels.Add(hotelCopy);
                    }
                }

                hotels = filteredHotels;
            }

            //  CORREÇÃO: Filtro por tipo de quarto específico (aplicado após carregar)
            if (!string.IsNullOrWhiteSpace(roomType))
            {
                if (Enum.TryParse<RoomType>(roomType, true, out var parsedType))
                {
                    var filteredHotels = new List<Hotel>();

                    foreach (var hotel in hotels)
                    {
                        // Filtra apenas quartos do tipo específico solicitado
                        var roomsOfRequestedType = hotel.Rooms
                            .Where(r => r.TypeName == parsedType)
                            .ToList();

                        if (roomsOfRequestedType.Any())
                        {
                            // Cria uma cópia do hotel com apenas os quartos do tipo solicitado
                            var hotelCopy = new Hotel
                            {
                                HotelId = hotel.HotelId,
                                Name = hotel.Name,
                                Description = hotel.Description,
                                HotelAddress = hotel.HotelAddress,
                                City = hotel.City,
                                Stars = hotel.Stars,
                                Wifi = hotel.Wifi,
                                Parking = hotel.Parking,
                                Gym = hotel.Gym,
                                Restaurant = hotel.Restaurant,
                                Bar = hotel.Bar,
                                Pool = hotel.Pool,
                                RoomService = hotel.RoomService,
                                Accessibility = hotel.Accessibility,
                                PetFriendly = hotel.PetFriendly,
                                WarmPool = hotel.WarmPool,
                                Theater = hotel.Theater,
                                Garden = hotel.Garden,
                                BreakfastIncludes = hotel.BreakfastIncludes,
                                ImageUrls = hotel.ImageUrls, // 🖼️ CORREÇÃO: Copiar URLs das imagens
                                Rooms = roomsOfRequestedType
                            };
                            filteredHotels.Add(hotelCopy);
                        }
                    }

                    hotels = filteredHotels;
                }
            }

            // Filtro por amenidades
            if (!string.IsNullOrWhiteSpace(amenities))
            {
                var amenityList = amenities.Split(',').Select(a => a.Trim()).ToList();
                foreach (var amenity in amenityList)
                {
                    var trimmedAmenity = amenity.Trim().ToLowerInvariant();

                    switch (trimmedAmenity)
                    {
                        case "wifi":
                            hotels = hotels.Where(h => h.Wifi).ToList();
                            break;
                        case "parking":
                        case "estacionamento":
                            hotels = hotels.Where(h => h.Parking).ToList();
                            break;
                        case "gym":
                        case "academia":
                            hotels = hotels.Where(h => h.Gym).ToList();
                            break;
                        case "restaurant":
                        case "restaurante":
                            hotels = hotels.Where(h => h.Restaurant).ToList();
                            break;
                        case "bar":
                            hotels = hotels.Where(h => h.Bar).ToList();
                            break;
                        case "roomService":
                        case "serviço de quarto":
                        case "servico de quarto":
                            hotels = hotels.Where(h => h.RoomService).ToList();
                            break;
                        case "accessibility":
                        case "acessibilidade":
                            hotels = hotels.Where(h => h.Accessibility).ToList();
                            break;
                        case "warmPool":
                        case "piscina aquecida":
                            hotels = hotels.Where(h => h.WarmPool).ToList();
                            break;
                        case "theater":
                        case "sala de cinema":
                            hotels = hotels.Where(h => h.Theater).ToList();
                            break;
                        case "garden":
                        case "jardim amplo":
                            hotels = hotels.Where(h => h.Garden).ToList();
                            break;
                        case "petFriendly":
                        case "aceita animais":
                            hotels = hotels.Where(h => h.PetFriendly).ToList();
                            break;
                        case "pool":
                        case "piscina":
                            hotels = hotels.Where(h => h.Pool).ToList();
                            break;
                        case "breakfastIncludes":
                        case "café da manhã incluso":
                        case "cafe da manha incluso":
                            hotels = hotels.Where(h => h.BreakfastIncludes).ToList();
                            break;
                    }
                }
            }

            // Filtro por capacidade de hóspedes (já validado no início)
            if (guests.HasValue)
            {
                hotels = hotels.Where(h => h.Rooms.Any(r => r.Capacity >= guests.Value)).ToList();
            }

            // ✅ OTIMIZAÇÃO: Filtro por disponibilidade de datas (query otimizada)
            if (!string.IsNullOrWhiteSpace(checkIn) && !string.IsNullOrWhiteSpace(checkOut))
            {
                var checkInDate = DateTime.Parse(checkIn);
                var checkOutDate = DateTime.Parse(checkOut);

                // Busca todas as reservas conflitantes de uma vez
                var allRoomIds = hotels.SelectMany(h => h.Rooms).Select(r => r.RoomId).ToList();

                var conflictingReservations = await _context.Reservations
                    .Where(r => allRoomIds.Contains(r.RoomId) &&
                               r.IsConfirmed &&
                               r.CheckIn < checkOutDate &&
                               r.CheckOut > checkInDate)
                    .GroupBy(r => r.RoomId)
                    .Select(g => new { RoomId = g.Key, Count = g.Count() })
                    .ToDictionaryAsync(x => x.RoomId, x => x.Count);

                var filteredHotels = new List<Hotel>();

                foreach (var hotel in hotels)
                {
                    var availableRooms = new List<Room>();

                    foreach (var room in hotel.Rooms)
                    {
                        var conflictCount = conflictingReservations.GetValueOrDefault(room.RoomId, 0);

                        if (conflictCount < room.TotalRooms)
                        {
                            availableRooms.Add(room);
                        }
                    }

                    if (availableRooms.Any())
                    {
                        // Cria uma cópia do hotel com apenas quartos disponíveis
                        var hotelCopy = new Hotel
                        {
                            HotelId = hotel.HotelId,
                            Name = hotel.Name,
                            Description = hotel.Description,
                            HotelAddress = hotel.HotelAddress,
                            City = hotel.City,
                            Stars = hotel.Stars,
                            Wifi = hotel.Wifi,
                            Parking = hotel.Parking,
                            Gym = hotel.Gym,
                            Restaurant = hotel.Restaurant,
                            Bar = hotel.Bar,
                            Pool = hotel.Pool,
                            RoomService = hotel.RoomService,
                            Accessibility = hotel.Accessibility,
                            PetFriendly = hotel.PetFriendly,
                            WarmPool = hotel.WarmPool,
                            Theater = hotel.Theater,
                            Garden = hotel.Garden,
                            BreakfastIncludes = hotel.BreakfastIncludes,
                            ImageUrls = hotel.ImageUrls, // 🖼️ CORREÇÃO: Copiar URLs das imagens
                            Rooms = availableRooms
                        };
                        filteredHotels.Add(hotelCopy);
                    }
                }

                hotels = filteredHotels;
            }

            // Log de sucesso com métricas
            stopwatch.Stop();
            LogSearchSuccess(hotels.Count(), stopwatch.ElapsedMilliseconds, destination, minPrice, maxPrice, stars, guests);

            return hotels;
        }

        // 📊 MÉTODOS DE DEBUG - Performance otimizada
        private void LogFailFast(string validationType, string reason, long elapsedMs)
        {
            _logger.LogWarning("🚀 FAIL-FAST: {ValidationType} | Reason: {Reason} | Time: {ElapsedMs}ms | Status: BLOCKED",
                validationType, reason, elapsedMs);
        }

        private void LogValidationsPassed(long elapsedMs)
        {
            _logger.LogInformation("✅ VALIDATIONS: All passed | Time: {ElapsedMs}ms | Status: PROCEEDING", elapsedMs);
        }

        private void LogSearchSuccess(int resultCount, long elapsedMs, string? destination, decimal? minPrice, decimal? maxPrice, int? stars, int? guests)
        {
            _logger.LogInformation("🎯 SEARCH: Success | Results: {ResultCount} | Time: {ElapsedMs}ms | Filters: [Dest: {Destination}, Price: {MinPrice}-{MaxPrice}, Stars: {Stars}, Guests: {Guests}]",
                resultCount, elapsedMs, destination ?? "Any", minPrice?.ToString() ?? "Any", maxPrice?.ToString() ?? "Any", stars?.ToString() ?? "Any", guests?.ToString() ?? "Any");
        }

    }




}
