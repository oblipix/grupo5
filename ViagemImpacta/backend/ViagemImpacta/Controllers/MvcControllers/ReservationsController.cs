using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Controllers.MvcControllers
{
    public class ReservationsController : Controller
    {
        private readonly IReservationService _reservationService;

        public ReservationsController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        public async Task<ActionResult> Index()
        {
            try
            {
                var reservationList = await _reservationService.GetAllReservations();
                return View(reservationList);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(string.Empty, $"Erro ao carregar lista de reservas: {ex.Message}");
                return View(nameof(Index));
            }
        }

        public async Task<ActionResult<Reservation>> Details(int id)
        {
            try
            {
                if (id == null) return NotFound();

                var reservation = await _reservationService.GetReservationByIdAsync(id);
                if (reservation == null) return NotFound();

                return View(reservation);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(string.Empty, $"Erro ao carregar reserva: {ex.Message}");
                return View(nameof(Index));
            }
        }
    }
}
