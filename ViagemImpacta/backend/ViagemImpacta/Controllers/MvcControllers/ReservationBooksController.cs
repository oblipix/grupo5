using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using ViagemImpacta.DTO.ReservationBookDTO;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Controllers;

[Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme, Roles = "Admin")]
public class ReservationBooksController : Controller
{
    private readonly IReservationBookServiceView _packageService;

    public ReservationBooksController(IReservationBookServiceView packageService)
    {
        _packageService = packageService;
    }

    // GET: /ReservationBooks
    public async Task<IActionResult> Index()
    {
        var allPackages = await _packageService.GetAllPackagesAsync();
        return View(allPackages);
    }

    // GET: ReservationBooks/Details/5
    public async Task<IActionResult> Details(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var reservationBook = await _packageService.GetPackageByIdAsync(id.Value);
        if (reservationBook == null)
        {
            return NotFound();
        }

        return View(reservationBook);
    }

    // GET: ReservationBooks/Create
    public async Task<IActionResult> Create()
    {
        ViewBag.Hotels = new MultiSelectList(await _packageService.GetAllHotelsAsync(), "HotelId", "Name");
        return View(new CreateUpdateReservationBookDto());
    }

    // POST: ReservationBooks/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(CreateUpdateReservationBookDto dto)
    {
        if (dto.SelectedHotelIds == null || !dto.SelectedHotelIds.Any())
        {
            ModelState.AddModelError("SelectedHotelIds", "Você deve selecionar ao menos um hotel.");
        }

        if (ModelState.IsValid)
        {
            var package = new ReservationBook
            {
                Title = dto.Title,
                Description = dto.Description,
                FinalPrice = dto.FinalPrice,
                CheckIn = dto.CheckIn,
                CheckOut = dto.CheckOut,
                Destination = dto.Destination,
                Active = dto.Active,
                Promotion = dto.Promotion
            };
            await _packageService.CreatePackageAsync(package, dto.SelectedHotelIds);
            return RedirectToAction(nameof(Index));
        }

        ViewBag.Hotels = new MultiSelectList(await _packageService.GetAllHotelsAsync(), "HotelId", "Name", dto.SelectedHotelIds);
        return View(dto);
    }

    // GET: ReservationBooks/Edit/5
    public async Task<IActionResult> Edit(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var reservationBook = await _packageService.GetPackageByIdAsync(id.Value);
        if (reservationBook == null)
        {
            return NotFound();
        }

        var selectedHotelIds = reservationBook.Hotels.Select(h => h.HotelId).ToList();
        ViewBag.Hotels = new MultiSelectList(await _packageService.GetAllHotelsAsync(), "HotelId", "Name", selectedHotelIds);

        // Map ReservationBookDto to CreateUpdateReservationBookDto
        var editDto = new CreateUpdateReservationBookDto
        {
            ReservationBookId = reservationBook.ReservationBookId,
            Title = reservationBook.Title,
            Description = reservationBook.Description,
            FinalPrice = reservationBook.FinalPrice,
            CheckIn = reservationBook.CheckIn,
            CheckOut = reservationBook.CheckOut,
            Destination = reservationBook.Destination,
            Active = reservationBook.Active,
            Promotion = reservationBook.Promotion,
            SelectedHotelIds = selectedHotelIds
        };

        return View(editDto);
    }

    // POST: ReservationBooks/Edit/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, CreateUpdateReservationBookDto dto)
    {
        if (id != dto.ReservationBookId)
        {
            return NotFound();
        }

        if (dto.SelectedHotelIds == null || !dto.SelectedHotelIds.Any())
        {
            ModelState.AddModelError("SelectedHotelIds", "Você deve selecionar ao menos um hotel.");
        }

        if (ModelState.IsValid)
        {
            var package = new ReservationBook
            {
                ReservationBookId = dto.ReservationBookId,
                Title = dto.Title,
                Description = dto.Description,
                FinalPrice = dto.FinalPrice,
                CheckIn = dto.CheckIn,
                CheckOut = dto.CheckOut,
                Destination = dto.Destination,
                Active = dto.Active,
                Promotion = dto.Promotion
            };
            await _packageService.UpdatePackageAsync(package, dto.SelectedHotelIds);
            return RedirectToAction(nameof(Index));
        }

        ViewBag.Hotels = new MultiSelectList(await _packageService.GetAllHotelsAsync(), "HotelId", "Name", dto.SelectedHotelIds);
        return View(dto);
    }

    // GET: ReservationBooks/Delete/5
    public async Task<IActionResult> Delete(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var reservationBook = await _packageService.GetPackageByIdAsync(id.Value);
        if (reservationBook == null)
        {
            return NotFound();
        }

        return View(reservationBook); // reservationBook é ReservationBookDto
    }

    // POST: ReservationBooks/Delete/5
    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        await _packageService.DeletePackageAsync(id);
        return RedirectToAction(nameof(Index));
    }
}