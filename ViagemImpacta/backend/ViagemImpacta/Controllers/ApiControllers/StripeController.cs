using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;
using ViagemImpacta.DTO.ReservationDTO;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories;

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
            Console.WriteLine($"=== STRIPE CHECKOUT DEBUG ===");
            Console.WriteLine($"Received checkout request for reservation ID: {id}");

            if (id <= 0)
            {
                Console.WriteLine("Invalid reservation ID received");
                return BadRequest("ID da reserva é obrigatório e deve ser maior que zero");
            }

            Console.WriteLine("Searching for reservation in database...");
            var result = await _unitOfWork.Reservations.GetByIdAsync(id);
            
            if (result == null) 
            {
                Console.WriteLine($"Reservation with ID {id} not found in database");
                return BadRequest($"Reserva com ID {id} não encontrada");
            }

            Console.WriteLine($"Reservation found: {result.ReservationId}");
            Console.WriteLine("Mapping reservation to DTO...");
            var res = _mapper.Map<ReservationDto>(result);
            
            if (res == null)
            {
                Console.WriteLine("Failed to map reservation to DTO");
                return BadRequest("Erro ao processar dados da reserva");
            }

            Console.WriteLine($"Mapped reservation - Total Price: {res.TotalPrice}, User: {res.UserName}");

            Console.WriteLine("Configuring Stripe...");
            StripeConfiguration.ApiKey = _model.SecretKey;

            var amountInCents = (long)(res.TotalPrice * 100);
            Console.WriteLine($"Amount in cents: {amountInCents}");
            
            Console.WriteLine("Creating Stripe customer...");
            var customerOptions = new CustomerCreateOptions
            {
                Name = res.UserName,
                Email = res.UserEmail,
            };

            var customerService = new CustomerService();
            var customer = customerService.Create(customerOptions);
            Console.WriteLine($"Stripe customer created: {customer.Id}");
            
            Console.WriteLine("Creating Stripe session options...");
            var options = new SessionCreateOptions
            {
                Customer = customer.Id,
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
            Console.WriteLine($"Error in checkout: {ex.Message}");
            return BadRequest(ex.Message);
        }
    }
}
