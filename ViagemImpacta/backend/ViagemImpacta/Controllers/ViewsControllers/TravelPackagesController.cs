using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Controllers
{
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
            return View(new ViagemImpacta.DTOs.CreateUpdateTravelPackageDto());
        }

        // POST: TravelPackages/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(ViagemImpacta.DTOs.CreateUpdateTravelPackageDto dto)
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

            return View(travelPackage);
        }

        // POST: TravelPackages/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, TravelPackage package, [FromForm] List<int> SelectedHotelIds)
        {
            if (id != package.TravelPackageId)
            {
                return NotFound();
            }

            if (SelectedHotelIds == null || !SelectedHotelIds.Any())
            {
                ModelState.AddModelError("Hotels", "Você deve selecionar ao menos um hotel.");
            }

            if (ModelState.IsValid)
            {
                await _packageService.UpdatePackageAsync(package, SelectedHotelIds);
                return RedirectToAction(nameof(Index));
            }

            ViewBag.Hotels = new MultiSelectList(await _packageService.GetAllHotelsAsync(), "HotelId", "Name", SelectedHotelIds);
            return View(package);
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

            return View(travelPackage);
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
}