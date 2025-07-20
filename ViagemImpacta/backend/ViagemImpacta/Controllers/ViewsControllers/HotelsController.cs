using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces; // Importa a interface do serviço

namespace ViagemImpacta.Controllers
{
    public class HotelsController : Controller
    {
        // --- ALTERAÇÃO 1: Injetar o IHotelService ---
        private readonly IHotelService _hotelService;

        public HotelsController(IHotelService hotelService)
        {
            _hotelService = hotelService;
        }

        // GET: Hotels
        // A action Index agora busca os hotéis através do serviço
        public async Task<IActionResult> Index()
        {
            var hotels = await _hotelService.GetAllHotelsAsync();
            return View(hotels);
        }

        // GET: Hotels/Details/5
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

        // GET: Hotels/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Hotels/Create
        // --- ALTERAÇÃO 2: Usa o serviço para criar o hotel ---
        // Note que não há mais a chamada para SaveChangesAsync() aqui.
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

        // GET: Hotels/Edit/5
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

        // POST: Hotels/Edit/5
        // POST: Hotels/Edit/5
        // --- ALTERAÇÃO 3: Usa o serviço para atualizar ---
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
                    // Pode acontecer se o hotel for deletado por outro usuário
                    return NotFound();
                }
            }
            return View(hotel);
        }

        // GET: Hotels/Delete/5
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

        // POST: Hotels/Delete/5
        // --- ALTERAÇÃO 4: Usa o serviço para deletar ---
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            await _hotelService.DeleteHotelAsync(id);
            return RedirectToAction(nameof(Index));
        }

        // GET: Hotels/Search
        // A action de busca agora usa o método de filtros do serviço.
        public async Task<IActionResult> Search(string? location, int? minStars)
        {
            ViewBag.Location = location;
            ViewBag.MinStars = minStars;

            var hotels = await _hotelService.GetHotelsWithFiltersAsync(location, minStars, null, null);

            // Reutiliza a view de busca que já tínhamos.
            return View(hotels);
        }
    }
}