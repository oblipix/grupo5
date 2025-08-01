using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.DTO.ReservationDTO;
using ViagemImpacta.DTO.RoomDTO;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories;
using ViagemImpacta.Services.Interfaces;
using ViagemImpacta.ViewModels;

namespace ViagemImpacta.Controllers.MvcControllers;

public class ReservationsController : Controller
{
    private readonly IReservationService _reservationService;
    private readonly IMapper _mapper;
    private readonly IHotelService _hotelService; // Adicionado para o carregamento dos hotéis

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
            var reservationViewModel = _mapper.Map<UpdateReservationViewModel>(reservation);
           
            var hotels = await _hotelService.GetAllHotelsAsync();
            ViewBag.Hotels = new Microsoft.AspNetCore.Mvc.Rendering.SelectList(hotels, "HotelId", "Name", reservation.HotelId); 

            var selectedHotel = hotels.FirstOrDefault(h => h.HotelId == reservation.HotelId);
            var rooms = selectedHotel != null && selectedHotel.Rooms != null ? selectedHotel.Rooms : new List<RoomDto>();
            ViewBag.Rooms = new Microsoft.AspNetCore.Mvc.Rendering.SelectList(rooms, "RoomId", "TypeName", reservation.RoomId);

            return View(reservationViewModel);
        }
        catch (Exception ex)
        {
            ModelState.AddModelError(string.Empty, $"Erro ao atualizar reserva: {ex.Message}");
            return View(nameof(Edit));
        }
    }

    [HttpPost]
    public async Task<IActionResult> Edit(int id, UpdateReservationViewModel reservation)
    {
        if (id != reservation.ReservationId) return BadRequest();
        if (!ModelState.IsValid) return View(reservation);

        try
        {
            var dto = _mapper.Map<UpdateReservationDto>(reservation);
            await _reservationService.UpdateAsync(dto);
            return RedirectToAction(nameof(Index));
        }
        catch (Exception ex)
        {
            ModelState.AddModelError(string.Empty, $"Erro ao atualizar usuário: {ex.Message}");
            return View(reservation);
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

    // AINDA EM IMPLEMENTAÇÃO
    public async Task<IActionResult> Delete(int id)
    {
        var reservation = await _reservationService.GetReservationByIdAsync(id);
        if (reservation == null) return NotFound();
        return View(reservation);
    }

    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        try
        {
            var reservation = await _reservationService.GetReservationByIdAsync(id);
            if (reservation == null) return NotFound();

            //var result = await _reservationService.CancelReservationAsync(id);
            //if (!result != null) return BadRequest("Erro ao cancelar a reserva.");

            return RedirectToAction(nameof(Index));
        }
        catch (Exception ex)
        {
            ModelState.AddModelError(string.Empty, $"Erro ao cancelar reserva: {ex.Message}");
            return View("Delete");
        }
    }
}
