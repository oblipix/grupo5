using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ViagemImpacta.DTOs;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories.Interfaces;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Services.Implementations
{
    public class TravelPackageService : ITravelPackageService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public TravelPackageService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TravelPackageDto>> GetAllPackagesAsync()
        {
            var packages = await _unitOfWork.TravelPackages.GetAllAsync(p => p.Active, include: q => q.Include(p => p.Hotels));
            return _mapper.Map<IEnumerable<TravelPackageDto>>(packages);
        }

        public async Task<TravelPackageDto?> GetPackageByIdAsync(int id)
        {
            var package = await _unitOfWork.TravelPackages.GetAsync(p => p.TravelPackageId == id && p.Active, include: q => q.Include(p => p.Hotels));
            return package == null ? null : _mapper.Map<TravelPackageDto>(package);
        }

        public async Task<TravelPackage> CreatePackageAsync(TravelPackage package, List<int> hotelIds)
        {
            package.CreatedAt = DateTime.UtcNow;
            package.UpdatedAt = DateTime.UtcNow;

            var selectedHotels = await _unitOfWork.Hotels.GetAllAsync(h => hotelIds.Contains(h.HotelId));
            package.Hotels = selectedHotels.ToList();

            await _unitOfWork.TravelPackages.AddAsync(package);
            await _unitOfWork.CommitAsync();

            return package;
        }

        public async Task<bool> UpdatePackageAsync(TravelPackage package, List<int> hotelIds)
        {
            var existingPackage = await _unitOfWork.TravelPackages.GetAsync(p => p.TravelPackageId == package.TravelPackageId, include: q => q.Include(p => p.Hotels));
            if (existingPackage == null) return false;

            _mapper.Map(package, existingPackage);

            var selectedHotels = await _unitOfWork.Hotels.GetAllAsync(h => hotelIds.Contains(h.HotelId));
            existingPackage.Hotels = selectedHotels.ToList();

            _unitOfWork.TravelPackages.Update(existingPackage);
            await _unitOfWork.CommitAsync();

            return true;
        }

        public async Task<bool> DeletePackageAsync(int id)
        {
            var packageToDelete = await _unitOfWork.TravelPackages.GetAsync(p => p.TravelPackageId == id);
            if (packageToDelete == null) return false;

            packageToDelete.Active = false;
            _unitOfWork.TravelPackages.Update(packageToDelete);
            await _unitOfWork.CommitAsync();

            return true;
        }

        public async Task<IEnumerable<Hotel>> GetAllHotelsAsync()
        {
            return await _unitOfWork.Hotels.GetAllAsync();
        }

        public async Task<IEnumerable<TravelPackageDto>> SearchPackagesAsync(string searchTerm)
        {
            var packages = await _unitOfWork.TravelPackages.GetAllAsync(
                p => p.Active && (p.Title.Contains(searchTerm) || p.Description.Contains(searchTerm)),
                include: q => q.Include(p => p.Hotels));
            return _mapper.Map<IEnumerable<TravelPackageDto>>(packages);
        }

        public async Task<IEnumerable<TravelPackageDto>> GetPackagesWithFiltersAsync(string? destination, decimal? minPrice, decimal? maxPrice, DateTime? startDate, DateTime? endDate, bool? promotion, int skip, int take)
        {
            var packages = await _unitOfWork.TravelPackages.GetAllAsync(
                p => p.Active &&
                    (string.IsNullOrEmpty(destination) || p.Destination.Contains(destination)) &&
                    (!minPrice.HasValue || p.Price >= minPrice.Value) &&
                    (!maxPrice.HasValue || p.Price <= maxPrice.Value) &&
                    (!startDate.HasValue || p.StartDate >= startDate.Value) &&
                    (!endDate.HasValue || p.EndDate <= endDate.Value) &&
                    (!promotion.HasValue || p.Promotion == promotion.Value),
                include: q => q.Include(p => p.Hotels));
            return _mapper.Map<IEnumerable<TravelPackageDto>>(packages.Skip(skip).Take(take));
        }
    }
}