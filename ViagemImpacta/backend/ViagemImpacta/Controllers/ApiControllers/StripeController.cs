using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;
using ViagemImpacta.DTO.ReservationDTO;
using ViagemImpacta.Repositories;
using ViagemImpacta.Services.Interfaces;
using ViagemImpacta.Setup;

namespace ViagemImpacta.Controllers.ApiControllers;

[ApiController]
[Route("api/[controller]")]
public class StripeController : ControllerBase
{
    private readonly StripeModel _model;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IReservationService _reservationService;

    public StripeController(IOptions<StripeModel> model, IUnitOfWork unitOfWork, IMapper mapper, IReservationService reservationService)
    {
        _model = model.Value;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _reservationService = reservationService;
    }

    [HttpPost("/checkout")]
    public async Task<IActionResult> Checkout(int id)
    {
        try
        {
            var result = await _unitOfWork.Reservations.GetByIdAsync(id);

            if (result == null) return BadRequest($"Reserva com ID {id} não encontrada");

            var res = _mapper.Map<ReservationDto>(result);

            StripeConfiguration.ApiKey = _model.SecretKey;

            var amountInCents = (long)(res.TotalPrice * 100);
            var options = new SessionCreateOptions
            {
                Currency = "BRL",
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            UnitAmount = amountInCents,
                            Currency = "BRL",
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = string.IsNullOrWhiteSpace(res.HotelName) ? "Reserva de Hotel" : res.HotelName,
                            }
                        },
                        Quantity = 1,
                    }
                },
                Metadata = new Dictionary<string, string>
                {
                    { "reservationId", res.ReservationId.ToString() },
                },
                Mode = "payment",
                PaymentMethodTypes = ["card", "boleto"],
                SuccessUrl = "http://localhost:5173/confirm-reservation?session_id={CHECKOUT_SESSION_ID}",
                CancelUrl = "http://localhost:5173/hoteis",
                ExpiresAt = DateTime.UtcNow + TimeSpan.FromMinutes(45),
            };
            var service = new SessionService();
            var session = service.Create(options);
            return Ok(new { url = session.Url });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }


    }

    [HttpGet("/confirm-reservation")]
    public async Task<IActionResult> ConfirmReservation(string sessionId)
    {
        try
        {
            StripeConfiguration.ApiKey = _model.SecretKey;
            var service = new SessionService();
            var session = await service.GetAsync(sessionId);
            var reservationId = session.Metadata["reservationId"];
            if (!int.TryParse(reservationId, out int Id))
            {
                return BadRequest();
            }

            await _reservationService.ConfirmReservationAsync(Id);
            return Ok("Reserva confirmada com sucesso!");


        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
