using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories;

namespace ViagemImpacta.Controllers.ApiControllers;

[ApiController]
[Route("api/[controller]")]
public class StripeController : ControllerBase
{
    private readonly StripeModel _model;
    private readonly IUnitOfWork _unitOfWork;

    public StripeController(IOptions<StripeModel> model, IUnitOfWork unitOfWork)
    {
        _model = model.Value;
        _unitOfWork = unitOfWork;
    }

    [HttpPost("/checkout")]
    public async Task<IActionResult> Checkout(int id)
    {
        try
        {
            var res = await _unitOfWork.Reservations.GetByIdAsync(id);
            if (res == null) return BadRequest();

            var firstName = res.User.FirstName;
            var lastName = res.User.LastName;

            StripeConfiguration.ApiKey = _model.SecretKey;

            var amountInCents = (long)(res.TotalPrice * 100);
            var customerOptions = new CustomerCreateOptions
            {
                Name = $"{firstName} {lastName}",
                Email = res.User.Email,
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
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = res.Hotel.Name,
                                //Alguns campos como "Descrição" e "Imagem" estão faltando pois não existe nas entidades
                            }
                        },
                        Quantity = 1,
                    }
                },
                Mode = "payment",
                PaymentMethodTypes = ["card", "boleto"],
                SuccessUrl = "https://localhost:7054/success",
                ExpiresAt = DateTime.UtcNow + TimeSpan.FromHours(2),
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
