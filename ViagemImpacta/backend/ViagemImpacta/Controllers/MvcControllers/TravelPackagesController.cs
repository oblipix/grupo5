using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using ViagemImpacta.DTO.TravelPackageDTO;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Controllers;

[Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme, Roles = "Admin")]
public class TravelPackagesController : Controller
{
    private readonly ITravelPackageService _packageService;

    public TravelPackagesController(ITravelPackageService packageService)
    {
        _packageService = packageService;
    }

    // GET: /TravelPackages
    public async Task<IActionResult> Index()
    {
        var allPackages = await _packageService.GetAllPackagesAsync();
        return View(allPackages);
    }

    // GET: TravelPackages/Details/5
    public async Task<IActionResult> Details(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var travelPackage = await _packageService.GetPackageByIdAsync(id.Value);
        if (travelPackage == null)
        {
            return NotFound();
        }

        return View(travelPackage);
    }

    // GET: TravelPackages/Create
    public async Task<IActionResult> Create()
    {
        ViewBag.Hotels = new MultiSelectList(await _packageService.GetAllHotelsAsync(), "HotelId", "Name");
        return View(new ViagemImpacta.DTO.TravelPackageDTO.CreateUpdateTravelPackageDto());
    }

    // POST: TravelPackages/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(CreateUpdateTravelPackageDto dto)
    {
        if (dto.SelectedHotelIds == null || !dto.SelectedHotelIds.Any())
        {
            ModelState.AddModelError("SelectedHotelIds", "Você deve selecionar ao menos um hotel.");
        }

        if (ModelState.IsValid)
        {
            var package = new TravelPackage
            {
                Title = dto.Title,
                Description = dto.Description,
                Price = dto.Price,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
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

    // GET: TravelPackages/Edit/5
    public async Task<IActionResult> Edit(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var travelPackage = await _packageService.GetPackageByIdAsync(id.Value);
        if (travelPackage == null)
        {
            return NotFound();
        }

        var selectedHotelIds = travelPackage.Hotels.Select(h => h.HotelId).ToList();
        ViewBag.Hotels = new MultiSelectList(await _packageService.GetAllHotelsAsync(), "HotelId", "Name", selectedHotelIds);

        // Map TravelPackageDto to CreateUpdateTravelPackageDto
        var editDto = new ViagemImpacta.DTO.TravelPackageDTO.CreateUpdateTravelPackageDto
        {
            TravelPackageId = travelPackage.TravelPackageId,
            Title = travelPackage.Title,
            Description = travelPackage.Description,
            Price = travelPackage.Price,
            StartDate = travelPackage.StartDate,
            EndDate = travelPackage.EndDate,
            Destination = travelPackage.Destination,
            Active = travelPackage.Active,
            Promotion = travelPackage.Promotion,
            SelectedHotelIds = selectedHotelIds
        };

        return View(editDto);
    }

    // POST: TravelPackages/Edit/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, CreateUpdateTravelPackageDto dto)
    {
        if (id != dto.TravelPackageId)
        {
            return NotFound();
        }

        if (dto.SelectedHotelIds == null || !dto.SelectedHotelIds.Any())
        {
            ModelState.AddModelError("SelectedHotelIds", "Você deve selecionar ao menos um hotel.");
        }

        if (ModelState.IsValid)
        {
            var package = new TravelPackage
            {
                TravelPackageId = dto.TravelPackageId,
                Title = dto.Title,
                Description = dto.Description,
                Price = dto.Price,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
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

    // GET: TravelPackages/Delete/5
    public async Task<IActionResult> Delete(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var travelPackage = await _packageService.GetPackageByIdAsync(id.Value);
        if (travelPackage == null)
        {
            return NotFound();
        }

        return View(travelPackage); // travelPackage é TravelPackageDto
    }

    // POST: TravelPackages/Delete/5
    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        await _packageService.DeletePackageAsync(id);
        return RedirectToAction(nameof(Index));
    }
}