using AutoMapper;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;
using System.Net;
using System.Net.Mail;
using ViagemImpacta.DTO.ReservationDTO;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories;
using ViagemImpacta.Services.Interfaces;
using ViagemImpacta.Setup;

namespace ViagemImpacta.Services.Implementations
{
    public class ReservationService : IReservationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly SmtpOptions _smtpOptions;
        private readonly StripeModel _model;
        private readonly StripeService _stripeService;

        public ReservationService(IUnitOfWork unitOfWork, IMapper mapper, IOptions<SmtpOptions> smtpOptions,
            IOptions<StripeModel> model, StripeService stripeService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _smtpOptions = smtpOptions.Value;
            _model = model.Value;
            _stripeService = stripeService;
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

        public async Task<bool> CancelReservationAsync(int reservationId)
        {
            var reservation = await _unitOfWork.Reservations.GetReservationById(reservationId);
            if (reservation == null) return false;

            if (reservation.IsConfirmed && !string.IsNullOrEmpty(reservation.PaymentIntentId))
            {
                GiveRefund(reservation.PaymentIntentId);
            }

            reservation.IsCanceled = true;
            reservation.UpdatedAt = DateTime.UtcNow;
            Console.WriteLine(reservation);
            await _unitOfWork.CommitAsync();
            return true;
        }
        public async Task<bool> ConfirmReservationAsync(string sessionId)
        {
            StripeConfiguration.ApiKey = _model.SecretKey;
            var service = new SessionService();
            var session = await service.GetAsync(sessionId);
            var reservationId = session.Metadata["reservationId"];
            if (!int.TryParse(reservationId, out int Id))
            {
                return false;
            }

            var reservation = await _unitOfWork.Reservations.GetReservationById(Id);
            if (reservation == null)
                return false;   

            reservation.IsConfirmed = true;
            reservation.UpdatedAt = DateTime.Now;
            reservation.PaymentIntentId = session.PaymentIntentId;

            _unitOfWork.Reservations.Update(reservation);
            await _unitOfWork.CommitAsync();
            await SendEmailAsync(reservation.User);
            
            return true;
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
                    reservations = reservations.Where(r => r.IsConfirmed && !r.IsCanceled);
                else if (status == "pendentes")
                    reservations = reservations.Where(r => !r.IsConfirmed && !r.IsCanceled);
                else if (status == "canceladas")
                    reservations = reservations.Where(r => r.IsCanceled);
            }

            return reservations;
        }

        private async Task SendEmailAsync(User user)
        {
            var smtpClient = new SmtpClient(_smtpOptions.Host)
            {
                Port = _smtpOptions.Port,
                Credentials = new NetworkCredential(_smtpOptions.User, _smtpOptions.Pass),
                EnableSsl = true

            };

            var emailBody = $@"
                <h1>Parabéns, {user.FirstName}!</h1>
                <p>Sua reserva foi confirmada com sucesso!</p>
                <p>Agora você pode acessar nossa plataforma e aproveitar todos os benefícios.</p>
                <p>Você pode acessar sua conta usando o email: {user.Email}</p>
                <p>Atenciosamente,<br>Equipe Tripz</p>";

            var mensagem = new MailMessage
            {
                From = new MailAddress(_smtpOptions.From),
                Subject = "Confirmação de Cadastro",
                Body = emailBody,
                IsBodyHtml = true
            };

            mensagem.To.Add(user.Email);

            await smtpClient.SendMailAsync(mensagem);
        }

        public async Task<Reservation> UpdateAsync(UpdateReservationDto dto)
        {
            var reservation = await _unitOfWork.Reservations.GetByIdAsync(dto.ReservationId);

            _mapper.Map(dto, reservation);

            await _unitOfWork.Reservations.UpdateAsync(reservation);
            await _unitOfWork.CommitAsync();
            return reservation;
        }

        private async void GiveRefund(string paymentId)
        {
            StripeConfiguration.ApiKey = _model.SecretKey;
            var refund = new RefundService();
            var service = await refund.CreateAsync(new RefundCreateOptions
            {
                PaymentIntent = paymentId,
            });
        }

        public async Task SendPaymentLinkToUserEmail(Reservation reservation)
        {
            var smtpClient = new SmtpClient(_smtpOptions.Host)
            {
                Port = _smtpOptions.Port,
                Credentials = new NetworkCredential(_smtpOptions.User, _smtpOptions.Pass),
                EnableSsl = true
            };

            var url = await _stripeService.CreateCheckout(reservation);

            var emailBody = $@"
                <h1Olá, {reservation.User?.FirstName}!</h1>
                <p>Aqui está o link de pagamento da sua nova reserva</p>
                <p>Link de pagamento: <a href=""{url}"">Clique Aqui</a>.</p>
                <p>VocÊ terá 45 minutos para efetuar o pagamento</p>
                <p>Atenciosamente,<br>Equipe Tripz</p>";

            var mensagem = new MailMessage
            {
                From = new MailAddress(_smtpOptions.From),
                Subject = "Link de Pagamento da Reserva - Tripz",
                Body = emailBody,
                IsBodyHtml = true
            };

            mensagem.To.Add(reservation.User.Email);

            try
            {
                await smtpClient.SendMailAsync(mensagem);
            }
            catch (SmtpException ex)
            {
                Console.WriteLine($"Erro ao enviar e-mail: {ex.Message}");
                throw;
            }
        }
    }
}