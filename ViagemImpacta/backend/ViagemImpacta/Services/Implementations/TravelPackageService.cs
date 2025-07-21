using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces;


namespace ViagemImpacta.Services.Implementations
{
    public class TravelPackageService : ITravelPackageService
    {
        private readonly AppDbContext _context;

        public TravelPackageService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TravelPackage>> GetAllPackagesAsync()
        {
            return await _context.TravelPackages
                .Where(p =>p.Active)
                .Include(p => p.Hotels)
                .Include(p=>p.Reviews)
                .ToListAsync();
        }
        public async Task<TravelPackage?> GetPackageByIdAsync(int id)
        {
            return await _context.TravelPackages
                .Where(p => p.Active && p.TravelPackageId == id)
                .Include(p => p.Hotels)
                .Include(p => p.Reviews)
                .FirstOrDefaultAsync();
        }
        public async Task<IEnumerable<TravelPackage>> GetPackagesWithFiltersAsync(
            string? destination = null,
            decimal? minPrice = null,
            decimal? maxPrice = null,
            DateTime? startDate = null,
            DateTime? endDate = null,
            bool? promotion = null,
            int skip = 0,
            int take = 10)
        {
            var query = _context.TravelPackages
                .Include(p => p.Hotels)
                .Where(p => p.Active);

            //Filtros

            //por Destinos apenas descrição ou título
            if (!string.IsNullOrEmpty(destination))
                query = query.Where(p => p.Destination.Contains(destination));
            //por menor preço
            if (minPrice.HasValue)
                query = query.Where(p => p.Price >= minPrice.Value);
            // por maior preço
            if (maxPrice.HasValue)
                query = query.Where(p => p.Price <= maxPrice.Value);

            //por data de início disponivel
            if (startDate.HasValue)
                query = query.Where(p => p.StartDate >= startDate.Value);

            //por data de término
            if (endDate.HasValue)
                query = query.Where(p => p.EndDate <= endDate.Value);

            //por promoção
            if (promotion.HasValue && promotion.Value)
                query = query.Where(p => p.Promotion);


            return await query
                .Skip(skip)
                .Take(take)
                .ToListAsync();
        }

        public async Task<IEnumerable<TravelPackage>> SearchPackagesAsync(string searchTerm)
        {
            /*
             *US10 - Busca por termo livre
             *TODO:
             *proteger contra SQL Injection
             *proteger contra multiplas palavras
             *campo branco tratar como vazio?
             */

            return await _context.TravelPackages
                .Include(p => p.Hotels)
                .Where(p => p.Active &&
                    (p.Title!.Contains(searchTerm) ||
                     p.Description!.Contains(searchTerm)))
                .ToListAsync();
        }


    }
}
