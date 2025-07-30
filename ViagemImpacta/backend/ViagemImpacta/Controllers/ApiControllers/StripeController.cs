using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;
using ViagemImpacta.DTO.ReservationDTO;
using ViagemImpacta.Repositories;
using ViagemImpacta.Setup;

namespace ViagemImpacta.Controllers.ApiControllers;

[ApiController]
[Route("api/[controller]")]
public class StripeController : ControllerBase
{
    private readonly StripeModel _model;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public StripeController(IOptions<StripeModel> model, IUnitOfWork unitOfWork, IMapper mapper)
    {
        _model = model.Value;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
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
                Mode = "payment",
                PaymentMethodTypes = ["card", "boleto"],
                SuccessUrl = "http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}",
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
}
