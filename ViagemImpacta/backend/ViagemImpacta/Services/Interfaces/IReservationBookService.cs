using ViagemImpacta.DTO.ReservationBook;
using ViagemImpacta.Models;

namespace ViagemImpacta.Services.Interfaces
{
    public interface IReservationBookService
    {
        // ✅ CORRETO: Service retorna DTOs organizados por entidade
        Task<IEnumerable<ReservationBookListResponse>> GetAllPackagesAsync();
        Task<ReservationBookResponse?> GetPackageByIdAsync(int id);
             
        Task<IEnumerable<ReservationBookListResponse>> GetPackagesWithFiltersAsync(
            string? destination = null,     
            decimal? minPrice = null,       
            decimal? maxPrice = null,       
            DateTime? checkIn = null,     
            DateTime? checkOut = null,       
            bool? promotion = null,         
            int skip = 0,                  
            int take = 10);                 
         
        Task<IEnumerable<ReservationBookListResponse>> SearchPackagesAsync(string searchTerm);       
    }
}
