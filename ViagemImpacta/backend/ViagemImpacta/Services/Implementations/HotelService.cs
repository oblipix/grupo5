using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ViagemImpacta.DTO.HotelDTO;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories;

namespace ViagemImpacta.Services.Interfaces
{
    public class HotelService : IHotelService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public HotelService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<HotelDto>> GetAllHotelsAsync()
        {
            var hotels = await _unitOfWork.Hotels.GetAllAsync(include: q => q.Include(h => h.Rooms));
            return _mapper.Map<IEnumerable<HotelDto>>(hotels);
        }

        public async Task<Hotel?> GetHotelWithRoomsAsync(int hotelId)
        {
            return await _unitOfWork.Hotels.GetAsync(h => h.HotelId == hotelId, include: q => q.Include(h => h.Rooms));
        }

        public async Task<Hotel?> GetHotelByIdAsync(int hotelId)
        {
            return await _unitOfWork.Hotels.GetAsync(h => h.HotelId == hotelId);
        }

        public async Task<Hotel> CreateHotelAsync(Hotel hotel)
        {
            // Primeiro, criar o hotel para obter o ID
            var hotelToCreate = new Hotel
            {
                Name = hotel.Name,
                Phone = hotel.Phone,
                HotelAddress = hotel.HotelAddress,
                City = hotel.City,
                Stars = hotel.Stars,
                Wifi = hotel.Wifi,
                Parking = hotel.Parking,
                Gym = hotel.Gym,
                Restaurant = hotel.Restaurant,
                Bar = hotel.Bar,
                RoomService = hotel.RoomService,
                Accessibility = hotel.Accessibility,
                WarmPool = hotel.WarmPool,
                Theater = hotel.Theater,
                Garden = hotel.Garden,
                PetFriendly = hotel.PetFriendly,
                Pool = hotel.Pool,
                BreakfastIncludes = hotel.BreakfastIncludes,
                Description = hotel.Description,
                ImageUrls = hotel.ImageUrls ?? new List<string>()
            };

            await _unitOfWork.Hotels.AddAsync(hotelToCreate);
            await _unitOfWork.CommitAsync();

            // Agora processar os quartos - apenas criar registros para tipos com quantidade > 0
            var roomsToCreate = new List<Room>();

            foreach (var roomConfig in hotel.Rooms)
            {
                if (roomConfig.TotalRooms > 0)
                {
                    var roomToCreate = new Room
                    {
                        HotelId = hotelToCreate.HotelId,
                        TypeName = roomConfig.TypeName,
                        TotalRooms = roomConfig.TotalRooms,
                        Capacity = roomConfig.Capacity,
                        AverageDailyPrice = roomConfig.AverageDailyPrice
                    };

                    roomsToCreate.Add(roomToCreate);
                }
            }

            // Adicionar os quartos configurados
            if (roomsToCreate.Any())
            {
                foreach (var room in roomsToCreate)
                {
                    await _unitOfWork.Rooms.AddAsync(room);
                }
                await _unitOfWork.CommitAsync();
            }

            // Retornar o hotel criado com os quartos
            return await GetHotelWithRoomsAsync(hotelToCreate.HotelId) ?? hotelToCreate;
        }

        public async Task UpdateHotelAsync(Hotel hotel)
        {
            var existingHotel = await _unitOfWork.Hotels.GetAsync(h => h.HotelId == hotel.HotelId, include: h => h.Include(r => r.Rooms));
            if (existingHotel == null) return;

            // Atualizar propriedades do hotel (exceto quartos)
            existingHotel.Name = hotel.Name;
            existingHotel.Phone = hotel.Phone;
            existingHotel.HotelAddress = hotel.HotelAddress;
            existingHotel.City = hotel.City;
            existingHotel.Stars = hotel.Stars;
            existingHotel.Wifi = hotel.Wifi;
            existingHotel.Parking = hotel.Parking;
            existingHotel.Gym = hotel.Gym;
            existingHotel.Restaurant = hotel.Restaurant;
            existingHotel.Bar = hotel.Bar;
            existingHotel.RoomService = hotel.RoomService;
            existingHotel.Accessibility = hotel.Accessibility;
            existingHotel.WarmPool = hotel.WarmPool;
            existingHotel.Theater = hotel.Theater;
            existingHotel.Garden = hotel.Garden;
            existingHotel.PetFriendly = hotel.PetFriendly;
            existingHotel.Pool = hotel.Pool;
            existingHotel.BreakfastIncludes = hotel.BreakfastIncludes;
            existingHotel.Description = hotel.Description;
            existingHotel.ImageUrls = hotel.ImageUrls ?? new List<string>();

            // Processar quartos com nova lógica
            foreach (var roomConfig in hotel.Rooms)
            {
                var existingRoom = existingHotel.Rooms.FirstOrDefault(r => r.TypeName == roomConfig.TypeName);

                if (roomConfig.TotalRooms > 0)
                {
                    if (existingRoom != null)
                    {
                        // Atualizar quarto existente
                        existingRoom.TotalRooms = roomConfig.TotalRooms;
                        existingRoom.Capacity = roomConfig.Capacity;
                        existingRoom.AverageDailyPrice = roomConfig.AverageDailyPrice;
                    }
                    else
                    {
                        // Criar novo quarto para este tipo
                        var newRoom = new Room
                        {
                            HotelId = hotel.HotelId,
                            TypeName = roomConfig.TypeName,
                            TotalRooms = roomConfig.TotalRooms,
                            Capacity = roomConfig.Capacity,
                            AverageDailyPrice = roomConfig.AverageDailyPrice
                        };
                        existingHotel.Rooms.Add(newRoom);
                    }
                }
                else if (existingRoom != null)
                {
                    // Remover quarto se quantidade for 0
                    existingHotel.Rooms.Remove(existingRoom);
                }
            }

            _unitOfWork.Hotels.Update(existingHotel);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteHotelAsync(int hotelId)
        {
            var hotel = await _unitOfWork.Hotels.GetAsync(h => h.HotelId == hotelId);
            if (hotel == null) return;

            _unitOfWork.Hotels.Remove(hotel);
            await _unitOfWork.CommitAsync();
        }

        public async Task<IEnumerable<HotelDto>> GetHotelsWithFiltersAsync(string? hotelAddress, int? minStars, int? minPrice, int? maxPrice, int? guestCount)
        {
            var hotels = await _unitOfWork.Hotels.GetAllAsync(include: q => q.Include(h => h.Rooms));
            if (!string.IsNullOrEmpty(hotelAddress))
                hotels = hotels.Where(h => h.HotelAddress != null && h.HotelAddress.Contains(hotelAddress, StringComparison.OrdinalIgnoreCase));
            if (minStars.HasValue)
                hotels = hotels.Where(h => h.Stars >= minStars.Value);

            if (minPrice.HasValue || maxPrice.HasValue)
            {
                foreach (var hotel in hotels)
                {
                    // Filtrar quartos com base no preço mínimo e máximo
                    hotel.Rooms = hotel.Rooms
                        .Where(r =>
                            (!minPrice.HasValue || r.AverageDailyPrice >= minPrice.Value) &&
                            (!maxPrice.HasValue || r.AverageDailyPrice <= maxPrice.Value)
                        ).ToList();
                }
            }

            return _mapper.Map<IEnumerable<HotelDto>>(hotels);
        }
    }
}