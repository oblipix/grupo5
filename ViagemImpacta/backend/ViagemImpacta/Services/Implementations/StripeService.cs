using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;
using System.Text.Json;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories;
using ViagemImpacta.Setup;

namespace ViagemImpacta.Services.Implementations
{
    public class StripeService
    {
        public readonly StripeModel _model;
        private readonly IUnitOfWork _unitOfWork;

        public StripeService(IOptions<StripeModel> model, IUnitOfWork unitOfWork)
        {
            _model = model.Value;
            _unitOfWork = unitOfWork;
        }

        public decimal GetBalance()
        {
            StripeConfiguration.ApiKey = _model.SecretKey;

            var options = new BalanceGetOptions();
            var service = new BalanceService();
            var balance = service.Get(options).ToJson();
            
            var doc = JsonDocument.Parse(balance);
            var pending = doc.RootElement.GetProperty("pending");
            var amount = pending[0].GetProperty("amount").GetDecimal();

            decimal actualBalance = amount / 100; 

            return actualBalance;
        }

        public async Task<string> CreateCheckout(Reservation result)
        {
            StripeConfiguration.ApiKey = _model.SecretKey;

            var amountInCents = (long)(result.TotalPrice * 100);
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
                                Name = result.Hotel?.Name,
                                Description = result.Hotel?.Description,
                                Images = [ result.Hotel.ImageUrls[0] ]
                            }
                        },
                        Quantity = 1,
                    }
                },
                Metadata = new Dictionary<string, string>
                {
                    { "reservationId", result.ReservationId.ToString() },
                },
                Mode = "payment",
                PaymentMethodTypes = ["card", "boleto"],
                SuccessUrl = "http://localhost:5173/confirm-reservation?session_id={CHECKOUT_SESSION_ID}",
                CancelUrl = "http://localhost:5173/hoteis",
                ExpiresAt = DateTime.UtcNow + TimeSpan.FromMinutes(45),
            };

            var service = new SessionService();
            var session = service.Create(options);
            return session.Url;
        }
    }
}
