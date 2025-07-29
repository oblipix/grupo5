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

            var result = await _unitOfWork.Reservations.GetByIdAsync(id);
            var res = _mapper.Map<ReservationResponseDto>(result);
            if (result == null) return BadRequest();

           

            StripeConfiguration.ApiKey = _model.SecretKey;

            var amountInCents = (long)(res.TotalPrice * 100); 
            var customerOptions = new CustomerCreateOptions
            {
                Name = res.UserName,
                Email = res.UserEmail,
            };

            var customerService = new CustomerService();
            var customer = customerService.Create(customerOptions);
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
                                Name = res.HotelName,
                                //Alguns campos como "Descrição" e "Imagem" estão faltando pois não existe nas entidades
                            }
                        },
                        Quantity = 1,
                    }
                },
                Mode = "payment",
                PaymentMethodTypes = ["card", "boleto"],
                SuccessUrl = "https://localhost:7054/success",
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
