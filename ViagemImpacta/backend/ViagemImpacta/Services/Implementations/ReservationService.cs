using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using System.Collections;
using ViagemImpacta.DTO.ReservationDTO;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Services.Implementations
{
    public class ReservationService : IReservationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ReservationService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Reservation> CreateReservationAsync(CreateReservationDto createReservationDto)
        {
            // Validações de negócio
            await ValidateReservationAsync(createReservationDto);

            // Buscar entidades relacionadas
            var user = await _unitOfWork.Users.GetByIdAsync(createReservationDto.UserId);
            if (user == null)
                throw new ArgumentException("Usuário não encontrado");

            var room = await _unitOfWork.Rooms.GetByIdAsync(createReservationDto.RoomId);
            if (room == null)
                throw new ArgumentException("Quarto não encontrado");

            var hotel = await _unitOfWork.Hotels.GetByIdAsync(createReservationDto.HotelId);
            if (hotel == null)
                throw new ArgumentException("Hotel não encontrado");

            // Validar capacidade do quarto
            if (createReservationDto.NumberOfGuests > room.Capacity)
                throw new ArgumentException($"Número de hóspedes ({createReservationDto.NumberOfGuests}) excede a capacidade do quarto ({room.Capacity})");

            // Validar número de viajantes
            if (createReservationDto.Travellers.Count != createReservationDto.NumberOfGuests)
                throw new ArgumentException("Número de viajantes deve ser igual ao número de hóspedes");

            // NOVA VALIDAÇÃO: Verificar disponibilidade por tipo de quarto
            var isRoomTypeAvailable = await _unitOfWork.Reservations.IsRoomTypeAvailableAsync(
                createReservationDto.HotelId,
                room.TypeName,
                createReservationDto.CheckIn,
                createReservationDto.CheckOut);

            if (!isRoomTypeAvailable)
            {
                var occupiedRooms = await _unitOfWork.Reservations.GetOccupiedRoomCountByTypeAsync(
                    createReservationDto.HotelId,
                    room.TypeName,
                    createReservationDto.CheckIn,
                    createReservationDto.CheckOut);
                
                throw new InvalidOperationException(
                    $"Não há quartos do tipo {room.TypeName} disponíveis para o período solicitado. " +
                    $"Total de quartos ocupados: {occupiedRooms}/{room.TotalRooms}");
            }


            // Calcular preço total
            var totalDays = (createReservationDto.CheckOut - createReservationDto.CheckIn).Days;
            var totalPrice = room.AverageDailyPrice * totalDays;

            // Mapear DTO para entidade
            var reservation = _mapper.Map<Reservation>(createReservationDto);
            reservation.TotalPrice = totalPrice;

            // Criar viajantes
            var travellers = _mapper.Map<List<Travellers>>(createReservationDto.Travellers);

            // Adicionar reserva
            await _unitOfWork.Reservations.AddAsync(reservation);
            await _unitOfWork.CommitAsync();

            // Associar viajantes à reserva e adicionar
            foreach (var traveller in travellers)
            {
                traveller.ReservationId = reservation.ReservationId;
                await _unitOfWork.Travellers.AddAsync(traveller);
            }

            await _unitOfWork.CommitAsync();

            // Buscar reserva com detalhes para retorno
            var createdReservation = await _unitOfWork.Reservations.GetReservationWithDetailsAsync(reservation.ReservationId);
            return createdReservation;
        }

        public async Task<Reservation?> GetReservationByIdAsync(int reservationId)
        {
            var reservation = await _unitOfWork.Reservations.GetReservationWithDetailsAsync(reservationId);
            return reservation;
        }

        public async Task<IEnumerable<Reservation>> GetReservationsByUserIdAsync(int userId)
        {
            var reservations = await _unitOfWork.Reservations.GetReservationsByUserIdAsync(userId);
            return reservations;
        }

        public async Task<IEnumerable<Reservation>> GetReservationsByHotelIdAsync(int hotelId)
        {
            var reservations = await _unitOfWork.Reservations.GetReservationsByHotelIdAsync(hotelId);
            return reservations;
        }

        public async Task<bool> CancelReservationAsync(int reservationId, int userId)
        {
            var reservation = await _unitOfWork.Reservations.GetByIdAsync(reservationId);
            if (reservation == null || reservation.UserId != userId)
                return false;

            // Verificar se pode cancelar (ex: não pode cancelar no mesmo dia do check-in)
            if (reservation.CheckIn <= DateTime.Today)
                throw new InvalidOperationException("Não é possível cancelar reservas no dia do check-in ou após");

            _unitOfWork.Reservations.Remove(reservation);
            return await _unitOfWork.CommitAsync();
        }

        public async Task<bool> ConfirmReservationAsync(int reservationId)
        {
            var reservation = await _unitOfWork.Reservations.GetByIdAsync(reservationId);
            if (reservation == null)
                return false;

            reservation.IsConfirmed = true;
            reservation.UpdatedAt = DateTime.Now;
            
            _unitOfWork.Reservations.Update(reservation);
            return await _unitOfWork.CommitAsync();
        }

        public async Task<bool> IsRoomAvailableAsync(int roomId, DateTime checkIn, DateTime checkOut)
        {
            return await _unitOfWork.Reservations.IsRoomAvailableAsync(roomId, checkIn, checkOut);
        }

        private async Task ValidateReservationAsync(CreateReservationDto dto)
        {
            // Validar datas
            if (!dto.IsValidDateRange())
                throw new ArgumentException("Data de check-out deve ser posterior ao check-in e check-in deve ser hoje ou no futuro");

            // Validar se há pelo menos um viajante
            if (dto.Travellers == null || !dto.Travellers.Any())
                throw new ArgumentException("Deve haver pelo menos um viajante");

            // Validar CPFs únicos
            var cpfs = dto.Travellers.Select(t => t.Cpf).ToList();
            if (cpfs.Count != cpfs.Distinct().Count())
                throw new ArgumentException("CPFs dos viajantes devem ser únicos");

            // Validar se entidades existem
            var userExists = await _unitOfWork.Users.GetByIdAsync(dto.UserId) != null;
            if (!userExists)
                throw new ArgumentException("Usuário não encontrado");

            var roomExists = await _unitOfWork.Rooms.GetByIdAsync(dto.RoomId) != null;
            if (!roomExists)
                throw new ArgumentException("Quarto não encontrado");

            var hotelExists = await _unitOfWork.Hotels.GetByIdAsync(dto.HotelId) != null;
            if (!hotelExists)
                throw new ArgumentException("Hotel não encontrado");
        }

        public async Task<IEnumerable<Reservation>> GetFilteredReservation(DateTime? checkin, DateTime? checkout, string search, string status)
        {
            if (!checkin.HasValue && !checkout.HasValue && string.IsNullOrWhiteSpace(search) && string.IsNullOrWhiteSpace(status))
            {
                return await _unitOfWork.Reservations.GetAllReservationsAsync();
            }

            var reservations = await _unitOfWork.Reservations.GetAllReservationsAsync();

            if (checkin.HasValue)
                reservations = reservations.Where(r => r.CheckIn.Date >= checkin.Value.Date);

            if (checkout.HasValue)
                reservations = reservations.Where(r => r.CheckOut.Date <= checkout.Value.Date);

            if (!string.IsNullOrWhiteSpace(search))
            {
                var searchLower = search.ToLower();
                reservations = reservations.Where(r =>
                    (r.User != null && ((r.User.FirstName + " " + r.User.LastName).ToLower().Contains(searchLower))) ||
                    (r.Hotel != null && r.Hotel.Name != null && r.Hotel.Name.ToLower().Contains(searchLower))
                );
            }

            if (!string.IsNullOrWhiteSpace(status))
            {
                if (status == "confirmadas")
                    reservations = reservations.Where(r => r.IsConfirmed);
                else if (status == "nao-confirmadas")
                    reservations = reservations.Where(r => !r.IsConfirmed);
            }

            return reservations;
        }

    }
}