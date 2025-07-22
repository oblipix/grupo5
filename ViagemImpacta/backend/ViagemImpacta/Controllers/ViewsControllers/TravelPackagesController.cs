using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Controllers
{
    public class TravelPackagesController : Controller
    {
        private readonly ITravelPackageService _packageService;
        private readonly AgenciaDbContext _context; // Usado para popular a lista de hotéis

        public TravelPackagesController(ITravelPackageService packageService, AgenciaDbContext context)
        {
            _packageService = packageService;
            _context = context;
        }

        // GET: /TravelPackages
        public async Task<IActionResult> Index()
        {
            var allPackages = await _packageService.GetAllPackagesAsync();
            return View(allPackages);
        }

        // GET: TravelPackages/Create
        public async Task<IActionResult> Create()
        {
            // Prepara a lista de hotéis para o dropdown
            ViewBag.Hotels = new MultiSelectList(await _context.Hotels.ToListAsync(), "HotelId", "Name");
            // Envia um modelo vazio para a View
            return View(new TravelPackage());
        }

        // POST: TravelPackages/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(TravelPackage package, [FromForm] List<int> SelectedHotelIds)
        {
            // Validação manual para garantir que pelo menos um hotel foi selecionado
            if (SelectedHotelIds == null || !SelectedHotelIds.Any())
            {
                ModelState.AddModelError("Hotels", "Você deve selecionar ao menos um hotel.");
            }

            // Remove a validação de propriedades de navegação que não são preenchidas pelo form
            ModelState.Remove("Hotels");
            ModelState.Remove("Reservations");
            ModelState.Remove("Reviews");

            if (ModelState.IsValid)
            {
                await _packageService.CreatePackageAsync(package, SelectedHotelIds);
                return RedirectToAction(nameof(Index)); // Redireciona para a lista de pacotes
            }

            // Se o modelo for inválido, recarrega a lista de hotéis para a View
            ViewBag.Hotels = new MultiSelectList(await _context.Hotels.ToListAsync(), "HotelId", "Name", SelectedHotelIds);
            return View(package);
        }
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            // Usamos o método que já existe no serviço para buscar o pacote por ID
            var travelPackage = await _packageService.GetPackageByIdAsync(id.Value);

            if (travelPackage == null)
            {
                return NotFound();
            }

            return View(travelPackage);
        }
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

            // Passa o pacote para a view de confirmação
            return View(travelPackage);
        }
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            // Usa o método do serviço para "deletar" (desativar) o pacote
            await _packageService.DeletePackageAsync(id);

            // Redireciona de volta para a lista de pacotes
            return RedirectToAction(nameof(Index));
        }
        // GET: TravelPackages/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            // Busca o pacote pelo ID, incluindo os hotéis já associados
            var travelPackage = await _packageService.GetPackageByIdAsync(id.Value);
            if (travelPackage == null)
            {
                return NotFound();
            }

            // Prepara a lista de hotéis para o dropdown, pré-selecionando os que já estão associados ao pacote.
            // Isso é o mais importante para a edição.
            var selectedHotelIds = travelPackage.Hotels.Select(h => h.HotelId).ToList();
            ViewBag.Hotels = new MultiSelectList(await _context.Hotels.ToListAsync(), "HotelId", "Name", selectedHotelIds);

            return View(travelPackage);
        }

        // POST: TravelPackages/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, TravelPackage package, [FromForm] List<int> SelectedHotelIds)
        {
            // Garante que o ID da rota corresponde ao ID do objeto
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
                try
                {
                    // Usa o serviço de atualização que já criamos
                    await _packageService.UpdatePackageAsync(package, SelectedHotelIds);
                }
                catch (DbUpdateConcurrencyException)
                {
                    // Tratamento de erro caso o pacote não exista mais (foi deletado por outra pessoa)
                    if (await _packageService.GetPackageByIdAsync(package.TravelPackageId) == null)
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }

            // Se o modelo for inválido, precisamos popular o ViewBag novamente antes de retornar para a View
            ViewBag.Hotels = new MultiSelectList(await _context.Hotels.ToListAsync(), "HotelId", "Name", SelectedHotelIds);
            return View(package);
        }
    }
}