using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;
using ViagemImpacta.Repositories;
using ViagemImpacta.Services.Implementations;
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
    private readonly StripeService _stripeService;

    public StripeController(IOptions<StripeModel> model, IUnitOfWork unitOfWork, IMapper mapper, IReservationService reservationService, StripeService stripeService)
    {
        _model = model.Value;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _reservationService = reservationService;
        _stripeService = stripeService;
    }

    [HttpPost("checkout")]
    public async Task<IActionResult> Checkout(int id)
    {
        try
        {
            var result = await _unitOfWork.Reservations.GetReservationById(id);
            if (result == null) return BadRequest($"Reserva com ID {id} não encontrada");

            var url = _stripeService.CreateCheckout(result);
            return Ok(new { url });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("confirm-reservation")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public async Task<IActionResult> ConfirmReservation(string sessionId)
    {
        try
        {
            await _reservationService.ConfirmReservationAsync(sessionId);
            return Ok("Reserva confirmada com sucesso!");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
