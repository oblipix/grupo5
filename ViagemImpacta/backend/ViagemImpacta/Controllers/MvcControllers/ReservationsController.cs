using AutoMapper;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using ViagemImpacta.DTO.ReservationDTO;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces;
using ViagemImpacta.ViewModels;

namespace ViagemImpacta.Controllers.MvcControllers;

[Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme, Roles = "Admin, Attendant")]
public class ReservationsController : Controller
{
    private readonly IReservationService _reservationService;
    private readonly IMapper _mapper;
    private readonly IHotelService _hotelService;

    public ReservationsController(IReservationService reservationService, IMapper mapper, IHotelService hotelService)
    {
        _reservationService = reservationService;
        _mapper = mapper;
        _hotelService = hotelService;
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

    public async Task<IActionResult> Edit(int id)
    {
        try
        {
            var reservation = await _reservationService.GetReservationByIdAsync(id);
            if (reservation == null) return NotFound();

            ViewBag.IsConfirmed = reservation.IsConfirmed;

            var hotel = await _hotelService.GetHotelWithRoomsAsync(reservation.HotelId);

            ViewBag.Rooms = hotel?.Rooms;

            var reservationViewModel = _mapper.Map<UpdateReservationViewModel>(reservation);

            return View(reservationViewModel);
        }
        catch (Exception ex)
        {
            ModelState.AddModelError(string.Empty, $"Erro ao atualizar reserva: {ex.Message}");
            return View(nameof(Edit));
        }
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, UpdateReservationViewModel res)
    {
        if (id != res.ReservationId) return BadRequest();
        if (!ModelState.IsValid) return View(res);

        try
        {
            var reservation = await _reservationService.GetReservationByIdAsync(id);
            if(reservation == null) return NotFound();

            var numberOfGuests = res.Travellers?.Count ?? 0;
            
            if (reservation?.TotalPrice != res.TotalPrice)
            {
                await _reservationService.CancelReservationAsync(id);

                var createDTO = _mapper.Map<CreateReservationDto>(res);
                createDTO.NumberOfGuests = numberOfGuests;
                var newReservation = await _reservationService.CreateReservationAsync(createDTO);
                 
                await _reservationService.SendPaymentLinkToUserEmail(newReservation);
            }
            else
            {
                var updateDTO = _mapper.Map<UpdateReservationDto>(res);
                await _reservationService.UpdateAsync(updateDTO);
            }
            return RedirectToAction(nameof(Index));
        }
        catch (Exception ex)
        {
            ModelState.AddModelError(string.Empty, $"Erro ao atualizar reserva: {ex.Message}");
            return View(res);
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

    public async Task<IActionResult> Cancel(int id)
    {
        var reservation = await _reservationService.GetReservationByIdAsync(id);
        if (reservation == null) return NotFound();
        return View(reservation);
    }

    [HttpPost, ActionName("Cancel")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> CancelReservation(int id)
    {
        try
        {
            await _reservationService.CancelReservationAsync(id);
            return RedirectToAction(nameof(Index));
        }
        catch (Exception ex)
        {
            ModelState.AddModelError(string.Empty, $"Erro ao cancelar reserva: {ex.Message}");
            return View("Delete");
        }
    }
    public async Task<ActionResult> ReservationsByUser(int id)
    {
        try
        {
            var reservationsByUser = await _reservationService.GetReservationsByUserIdAsync(id);
            return View(reservationsByUser);
        }
        catch (Exception ex)
        {
            ModelState.AddModelError(string.Empty, $"Erro ao carregar detalhes do usuário: {ex.Message}");
            return View(null);
        }
    }
}
