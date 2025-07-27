using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ViagemImpacta.DTO;
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
            // Garantir que todos os quartos tenham Available = true se não foi definido
            foreach (var room in hotel.Rooms)
            {
                if (room.Available == default)
                {
                    room.Available = true;
                }
                room.HotelId = hotel.HotelId; // Garantir que o HotelId seja definido
            }

            await _unitOfWork.Hotels.AddAsync(hotel);
            await _unitOfWork.CommitAsync();
            return hotel;
        }

        public async Task UpdateHotelAsync(Hotel hotel)
        {
            var existingHotel = await _unitOfWork.Hotels.GetAsync(h => h.HotelId == hotel.HotelId, include: h => h.Include(r => r.Rooms));
            if (existingHotel == null) return;

            // Atualizar propriedades do hotel
            _mapper.Map(hotel, existingHotel);

            // Remover quartos que não existem mais
            var roomsToRemove = existingHotel.Rooms.Where(dbRoom => !hotel.Rooms.Any(formRoom => formRoom.RoomId == dbRoom.RoomId)).ToList();
            foreach (var room in roomsToRemove) 
            {
                existingHotel.Rooms.Remove(room);
            }

            // Atualizar ou adicionar quartos
            foreach (var formRoom in hotel.Rooms)
            {
                // Garantir que Available tenha valor válido
                if (formRoom.Available == default)
                {
                    formRoom.Available = true;
                }
                
                formRoom.HotelId = hotel.HotelId; // Garantir que o HotelId seja definido

                var dbRoom = existingHotel.Rooms.FirstOrDefault(r => r.RoomId == formRoom.RoomId);
                if (dbRoom != null)
                {
                    // Atualizar quarto existente
                    _mapper.Map(formRoom, dbRoom);
                }
                else
                {
                    // Adicionar novo quarto
                    existingHotel.Rooms.Add(formRoom);
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

        public async Task<IEnumerable<HotelDto>> GetHotelsWithFiltersAsync(string? hotelAddress, int? minStars, int? maxPrice, int? guestCount)
        {
            var hotels = await _unitOfWork.Hotels.GetAllAsync(include: q => q.Include(h => h.Rooms));
            if (!string.IsNullOrEmpty(hotelAddress))
                hotels = hotels.Where(h => h.HotelAddress != null && h.HotelAddress.Contains(hotelAddress, StringComparison.OrdinalIgnoreCase));
            if (minStars.HasValue)
                hotels = hotels.Where(h => h.Stars >= minStars.Value);

            return _mapper.Map<IEnumerable<HotelDto>>(hotels);
        }
    }
}