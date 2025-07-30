using Microsoft.Extensions.Options;
using Stripe;
using System.Text.Json;
using ViagemImpacta.Setup;

namespace ViagemImpacta.Services.Implementations
{
    public class StripeService
    {
        public readonly StripeModel _model;

        public StripeService(IOptions<StripeModel> model)
        {
            _model = model.Value;
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
    }
}
