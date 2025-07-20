using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces; // Importa a interface do serviço

namespace ViagemImpacta.Controllers
{
    public class HotelsController : Controller
    {
        private readonly IHotelService _hotelService;

        public HotelsController(IHotelService hotelService)
        {
            _hotelService = hotelService;
        }

        public async Task<IActionResult> Index()
        {
            var hotels = await _hotelService.GetAllHotelsAsync();
            return View(hotels);
        }

        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var hotel = await _hotelService.GetHotelByIdAsync(id.Value);
            if (hotel == null)
            {
                return NotFound();
            }

            return View(hotel);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Name,Phone,Location,Image,Wifi,Parking,Stars,Gym,Restaurant")] Hotel hotel)
        {
            if (ModelState.IsValid)
            {
                await _hotelService.CreateHotelAsync(hotel);
                return RedirectToAction(nameof(Index));
            }
            return View(hotel);
        }

        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var hotel = await _hotelService.GetHotelByIdAsync(id.Value);
            if (hotel == null)
            {
                return NotFound();
            }
            return View(hotel);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("HotelId,Name,Phone,Location,Image,Wifi,Parking,Stars,Gym,Restaurant")] Hotel hotel)
        {
            if (id != hotel.HotelId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                var success = await _hotelService.UpdateHotelAsync(id, hotel);
                if (success)
                {
                    return RedirectToAction(nameof(Index));
                }
                else
                {
                    return NotFound();
                }
            }
            return View(hotel);
        }

        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var hotel = await _hotelService.GetHotelByIdAsync(id.Value);
            if (hotel == null)
            {
                return NotFound();
            }

            return View(hotel);
        }

        
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            await _hotelService.DeleteHotelAsync(id);
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Search(string? location, int? minStars)
        {
            ViewBag.Location = location;
            ViewBag.MinStars = minStars;

            var hotels = await _hotelService.GetHotelsWithFiltersAsync(location, minStars, null, null);

            return View(hotels);
        }
    }
}