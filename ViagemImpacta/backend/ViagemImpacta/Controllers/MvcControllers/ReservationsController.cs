using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces;
using System.Linq; // Necessário para .Where
using System;

namespace ViagemImpacta.Controllers.MvcControllers
{
    public class ReservationsController : Controller
    {
        private readonly IReservationService _reservationService;

        public ReservationsController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        public async Task<ActionResult> Index(DateTime? checkin, DateTime? checkout, string search, string status)
        {
            try
            {
                var filteredList = await _reservationService.GetFilteredReservation(checkin, checkout, search, status);

                return View(filteredList.ToList());
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
