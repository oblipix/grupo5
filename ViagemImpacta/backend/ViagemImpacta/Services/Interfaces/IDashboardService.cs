using ViagemImpacta.Models;

namespace ViagemImpacta.Services.Interfaces
{
    public interface IDashboardService
    {
        Task<DashboardStats> GetDashboardStatsAsync();
        Task<IEnumerable<HotelRevenueData>> GetHotelRevenueDataAsync();
        Task<IEnumerable<MonthlyRevenueData>> GetMonthlyRevenueDataAsync();
        Task<IEnumerable<ReservationStatusData>> GetReservationStatusDataAsync();
        Task<IEnumerable<TopHotelData>> GetTopHotelsAsync();
        Task<IEnumerable<MostReservedRoomData>> GetMostReservedRoomsAsync();
        Task<IEnumerable<HotelPerformanceData>> GetHotelPerformanceDataAsync();
        Task<IEnumerable<TopSellingHotelData>> GetTopSellingHotelsAsync();
        Task<FinancialSummaryData> GetFinancialSummaryAsync();
        Task<IEnumerable<RevenueByPeriodData>> GetRevenueByPeriodAsync();
        Task<IEnumerable<HotelDetailedAnalytics>> GetHotelDetailedAnalyticsAsync();
        Task<IEnumerable<CityPerformanceData>> GetCityPerformanceDataAsync();
        Task<IEnumerable<StarRatingAnalytics>> GetStarRatingAnalyticsAsync();
        Task<CompetitiveAnalysisData> GetCompetitiveAnalysisAsync();
    }

    public class DashboardStats
    {
        public int TotalHotels { get; set; }
        public int TotalReservations { get; set; }
        public int TotalUsers { get; set; }
        public decimal TotalRevenue { get; set; }
        public int ReservationsThisMonth { get; set; }
        public decimal RevenueThisMonth { get; set; }
        public int PendingReservations { get; set; }
        public int ConfirmedReservations { get; set; }
        public int CanceledReservations { get; set; }
        public decimal AverageReservationValue { get; set; }
        public int TotalRooms { get; set; }
        public decimal OccupancyRate { get; set; }
    }

    public class HotelRevenueData
    {
        public string HotelName { get; set; } = string.Empty;
        public decimal Revenue { get; set; }
        public int ReservationCount { get; set; }
        public string City { get; set; } = string.Empty;
        public int Stars { get; set; }
    }

    public class MonthlyRevenueData
    {
        public string Month { get; set; } = string.Empty;
        public decimal Revenue { get; set; }
        public int ReservationCount { get; set; }
    }

    public class ReservationStatusData
    {
        public string Status { get; set; } = string.Empty;
        public int Count { get; set; }
        public decimal Percentage { get; set; }
    }

    public class TopHotelData
    {
        public string HotelName { get; set; } = string.Empty;
        public int Stars { get; set; }
        public string City { get; set; } = string.Empty;
        public int ReservationCount { get; set; }
        public decimal Revenue { get; set; }
        public decimal AverageRating { get; set; }
        public decimal OccupancyRate { get; set; }
    }

    public class MostReservedRoomData
    {
        public string RoomType { get; set; } = string.Empty;
        public int ReservationCount { get; set; }
        public decimal Revenue { get; set; }
        public decimal AveragePrice { get; set; }
        public string MostPopularHotel { get; set; } = string.Empty;
    }

    public class HotelPerformanceData
    {
        public string HotelName { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public int Stars { get; set; }
        public decimal Revenue { get; set; }
        public int ReservationCount { get; set; }
        public decimal AverageReservationValue { get; set; }
        public decimal OccupancyRate { get; set; }
        public int TotalRooms { get; set; }
        public decimal ConversionRate { get; set; }
    }

    public class TopSellingHotelData
    {
        public string HotelName { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public int Stars { get; set; }
        public decimal TotalRevenue { get; set; }
        public int TotalReservations { get; set; }
        public decimal AverageReservationValue { get; set; }
        public int TotalRooms { get; set; }
        public decimal RevenuePerRoom { get; set; }
    }

    public class FinancialSummaryData
    {
        public decimal TotalRevenue { get; set; }
        public decimal RevenueThisMonth { get; set; }
        public decimal RevenueLastMonth { get; set; }
        public decimal RevenueGrowth { get; set; }
        public decimal AverageReservationValue { get; set; }
        public int TotalTransactions { get; set; }
        public decimal PendingPayments { get; set; }
        public decimal RefundedAmount { get; set; }
    }

    public class RevenueByPeriodData
    {
        public string Period { get; set; } = string.Empty;
        public decimal Revenue { get; set; }
        public int ReservationCount { get; set; }
        public decimal GrowthPercentage { get; set; }
    }

    // Classes avançadas para análises detalhadas
    public class HotelDetailedAnalytics
    {
        public int HotelId { get; set; }
        public string HotelName { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public int Stars { get; set; }
        public decimal TotalRevenue { get; set; }
        public int TotalReservations { get; set; }
        public decimal AverageReservationValue { get; set; }
        public decimal OccupancyRate { get; set; }
        public int TotalRooms { get; set; }
        public decimal RevenuePerRoom { get; set; }
        public decimal MarketShare { get; set; }
        public Dictionary<string, int> RoomTypeDistribution { get; set; } = new();
        public List<MonthlyPerformance> MonthlyPerformance { get; set; } = new();
    }

    public class MonthlyPerformance
    {
        public string Month { get; set; } = string.Empty;
        public decimal Revenue { get; set; }
        public int Reservations { get; set; }
        public decimal OccupancyRate { get; set; }
    }

    public class CityPerformanceData
    {
        public string City { get; set; } = string.Empty;
        public int HotelCount { get; set; }
        public decimal TotalRevenue { get; set; }
        public int TotalReservations { get; set; }
        public decimal AverageRevenue { get; set; }
        public decimal MarketShare { get; set; }
    }

    public class StarRatingAnalytics
    {
        public int Stars { get; set; }
        public int HotelCount { get; set; }
        public decimal TotalRevenue { get; set; }
        public int TotalReservations { get; set; }
        public decimal AverageReservationValue { get; set; }
        public decimal AverageOccupancyRate { get; set; }
    }

    public class CompetitiveAnalysisData
    {
        public decimal TotalMarketRevenue { get; set; }
        public int TotalMarketReservations { get; set; }
        public string TopPerformingCity { get; set; } = string.Empty;
        public string TopPerformingStarCategory { get; set; } = string.Empty;
        public List<CompetitorData> TopCompetitors { get; set; } = new();
    }

    public class CompetitorData
    {
        public string HotelName { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public int Stars { get; set; }
        public decimal Revenue { get; set; }
        public decimal MarketShare { get; set; }
        public decimal GrowthRate { get; set; }
    }
}