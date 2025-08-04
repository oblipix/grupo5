using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.Services.Interfaces;
using ViagemImpacta.Models.Enums;

namespace ViagemImpacta.Services.Implementations
{
    public class DashboardService : IDashboardService
    {
        private readonly AgenciaDbContext _context;

        public DashboardService(AgenciaDbContext context)
        {
            _context = context;
        }

        public async Task<DashboardStats> GetDashboardStatsAsync()
        {
            var now = DateTime.Now;
            var firstDayOfMonth = new DateTime(now.Year, now.Month, 1);
            var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);

            var stats = new DashboardStats();

            // Estatísticas gerais
            stats.TotalHotels = await _context.Hotels.CountAsync();
            stats.TotalReservations = await _context.Reservations.CountAsync();
            stats.TotalUsers = await _context.Users.Where(u => u.Role == Roles.User).CountAsync();
            stats.TotalRooms = await _context.Rooms.SumAsync(r => r.TotalRooms);

            // Reservas por status
            stats.PendingReservations = await _context.Reservations
                .CountAsync(r => !r.IsConfirmed && !r.IsCanceled);
            stats.ConfirmedReservations = await _context.Reservations
                .CountAsync(r => r.IsConfirmed && !r.IsCanceled);
            stats.CanceledReservations = await _context.Reservations
                .CountAsync(r => r.IsCanceled);

            // Receita total
            stats.TotalRevenue = await _context.Reservations
                .Where(r => r.IsConfirmed && !r.IsCanceled)
                .SumAsync(r => r.TotalPrice);

            // Valor médio das reservas
            if (stats.ConfirmedReservations > 0)
            {
                stats.AverageReservationValue = stats.TotalRevenue / stats.ConfirmedReservations;
            }

            // Estatísticas do mês atual
            stats.ReservationsThisMonth = await _context.Reservations
                .CountAsync(r => r.CreatedAt >= firstDayOfMonth && r.CreatedAt <= lastDayOfMonth);

            stats.RevenueThisMonth = await _context.Reservations
                .Where(r => r.IsConfirmed && !r.IsCanceled && 
                           r.CreatedAt >= firstDayOfMonth && r.CreatedAt <= lastDayOfMonth)
                .SumAsync(r => r.TotalPrice);

            // Taxa de ocupação (aproximada)
            var totalReservationDays = await _context.Reservations
                .Where(r => r.IsConfirmed && !r.IsCanceled)
                .ToListAsync();
            
            if (totalReservationDays.Any() && stats.TotalRooms > 0)
            {
                var averageDays = totalReservationDays.Average(r => (r.CheckOut - r.CheckIn).Days);
                stats.OccupancyRate = (decimal)(stats.ConfirmedReservations * averageDays) / (stats.TotalRooms * 30) * 100; // aproximação mensal
                if (stats.OccupancyRate > 100) stats.OccupancyRate = 100;
            }

            return stats;
        }

        public async Task<IEnumerable<HotelRevenueData>> GetHotelRevenueDataAsync()
        {
            return await _context.Reservations
                .Where(r => r.IsConfirmed && !r.IsCanceled)
                .Include(r => r.Hotel)
                .GroupBy(r => new { r.HotelId, r.Hotel.Name, r.Hotel.City, r.Hotel.Stars })
                .Select(g => new HotelRevenueData
                {
                    HotelName = g.Key.Name ?? "Hotel Desconhecido",
                    Revenue = g.Sum(r => r.TotalPrice),
                    ReservationCount = g.Count(),
                    City = g.Key.City ?? "Cidade Desconhecida",
                    Stars = g.Key.Stars
                })
                .OrderByDescending(h => h.Revenue)
                .Take(10)
                .ToListAsync();
        }

        public async Task<IEnumerable<MonthlyRevenueData>> GetMonthlyRevenueDataAsync()
        {
            var twelveMonthsAgo = DateTime.Now.AddMonths(-12);

            var monthlyData = await _context.Reservations
                .Where(r => r.IsConfirmed && !r.IsCanceled && r.CreatedAt >= twelveMonthsAgo)
                .ToListAsync();

            var result = monthlyData
                .GroupBy(r => new { r.CreatedAt.Year, r.CreatedAt.Month })
                .Select(g => new MonthlyRevenueData
                {
                    Month = $"{g.Key.Month:00}/{g.Key.Year}",
                    Revenue = g.Sum(r => r.TotalPrice),
                    ReservationCount = g.Count()
                })
                .OrderBy(m => m.Month)
                .ToList();

            return result;
        }

        public async Task<IEnumerable<ReservationStatusData>> GetReservationStatusDataAsync()
        {
            var totalReservations = await _context.Reservations.CountAsync();

            if (totalReservations == 0)
                return new List<ReservationStatusData>();

            var statusData = new List<ReservationStatusData>();

            var confirmedCount = await _context.Reservations
                .CountAsync(r => r.IsConfirmed && !r.IsCanceled);
            statusData.Add(new ReservationStatusData
            {
                Status = "Confirmadas",
                Count = confirmedCount,
                Percentage = (decimal)confirmedCount / totalReservations * 100
            });

            var pendingCount = await _context.Reservations
                .CountAsync(r => !r.IsConfirmed && !r.IsCanceled);
            statusData.Add(new ReservationStatusData
            {
                Status = "Pendentes",
                Count = pendingCount,
                Percentage = (decimal)pendingCount / totalReservations * 100
            });

            var canceledCount = await _context.Reservations
                .CountAsync(r => r.IsCanceled);
            statusData.Add(new ReservationStatusData
            {
                Status = "Canceladas",
                Count = canceledCount,
                Percentage = (decimal)canceledCount / totalReservations * 100
            });

            return statusData;
        }

        public async Task<IEnumerable<TopHotelData>> GetTopHotelsAsync()
        {
            var hotelStats = await _context.Reservations
                .Where(r => r.IsConfirmed && !r.IsCanceled)
                .Include(r => r.Hotel)
                .GroupBy(r => new { r.HotelId, r.Hotel.Name, r.Hotel.City, r.Hotel.Stars })
                .Select(g => new TopHotelData
                {
                    HotelName = g.Key.Name ?? "Hotel Desconhecido",
                    Stars = g.Key.Stars,
                    City = g.Key.City ?? "Cidade Desconhecida",
                    ReservationCount = g.Count(),
                    Revenue = g.Sum(r => r.TotalPrice),
                    AverageRating = 0 // Assumindo que não há sistema de avaliação ainda
                })
                .OrderByDescending(h => h.Revenue)
                .Take(5)
                .ToListAsync();

            return hotelStats;
        }

        public async Task<IEnumerable<MostReservedRoomData>> GetMostReservedRoomsAsync()
        {
            var roomData = await _context.Reservations
                .Where(r => r.IsConfirmed && !r.IsCanceled)
                .Include(r => r.Room)
                .Include(r => r.Hotel)
                .ToListAsync();

            var result = roomData
                .Where(r => r.Room != null)
                .GroupBy(r => r.Room.TypeName.ToString())
                .Select(g => new MostReservedRoomData
                {
                    RoomType = g.Key,
                    ReservationCount = g.Count(),
                    Revenue = g.Sum(r => r.TotalPrice),
                    AveragePrice = g.Count() > 0 ? g.Average(r => r.TotalPrice / Math.Max((r.CheckOut - r.CheckIn).Days, 1)) : 0,
                    MostPopularHotel = g.GroupBy(r => r.Hotel?.Name ?? "Hotel Desconhecido")
                                       .OrderByDescending(h => h.Count())
                                       .FirstOrDefault()?.Key ?? "N/A"
                })
                .OrderByDescending(r => r.ReservationCount)
                .Take(5)
                .ToList();

            return result;
        }

        public async Task<IEnumerable<HotelPerformanceData>> GetHotelPerformanceDataAsync()
        {
            var hotelData = await _context.Hotels
                .Include(h => h.Rooms)
                .ToListAsync();

            var reservationData = await _context.Reservations
                .Where(r => r.IsConfirmed && !r.IsCanceled)
                .Include(r => r.Hotel)
                .ToListAsync();

            var result = hotelData.Select(hotel =>
            {
                var hotelReservations = reservationData.Where(r => r.HotelId == hotel.HotelId).ToList();
                var totalRooms = hotel.Rooms?.Sum(r => r.TotalRooms) ?? 0;
                var revenue = hotelReservations.Sum(r => r.TotalPrice);
                var reservationCount = hotelReservations.Count;

                return new HotelPerformanceData
                {
                    HotelName = hotel.Name ?? "Hotel Desconhecido",
                    City = hotel.City ?? "Cidade Desconhecida",
                    Stars = hotel.Stars,
                    Revenue = revenue,
                    ReservationCount = reservationCount,
                    AverageReservationValue = reservationCount > 0 ? revenue / reservationCount : 0,
                    TotalRooms = totalRooms,
                    OccupancyRate = totalRooms > 0 && hotelReservations.Any() ? 
                        (decimal)(hotelReservations.Sum(r => (r.CheckOut - r.CheckIn).Days) * 100) / (totalRooms * 30) : 0,
                    ConversionRate = 85 // Valor simulado - seria calculado com dados reais de visualizações
                };
            })
            .Where(h => h.ReservationCount > 0)
            .OrderByDescending(h => h.Revenue)
            .Take(10)
            .ToList();

            return result;
        }

        public async Task<IEnumerable<TopSellingHotelData>> GetTopSellingHotelsAsync()
        {
            var result = await _context.Reservations
                .Where(r => r.IsConfirmed && !r.IsCanceled)
                .Include(r => r.Hotel)
                .Include(r => r.Hotel.Rooms)
                .GroupBy(r => new { 
                    r.HotelId, 
                    r.Hotel.Name, 
                    r.Hotel.City, 
                    r.Hotel.Stars,
                    TotalRooms = r.Hotel.Rooms.Sum(room => room.TotalRooms)
                })
                .Select(g => new TopSellingHotelData
                {
                    HotelName = g.Key.Name ?? "Hotel Desconhecido",
                    City = g.Key.City ?? "Cidade Desconhecida",
                    Stars = g.Key.Stars,
                    TotalRevenue = g.Sum(r => r.TotalPrice),
                    TotalReservations = g.Count(),
                    AverageReservationValue = g.Average(r => r.TotalPrice),
                    TotalRooms = g.Key.TotalRooms,
                    RevenuePerRoom = g.Key.TotalRooms > 0 ? g.Sum(r => r.TotalPrice) / g.Key.TotalRooms : 0
                })
                .OrderByDescending(h => h.TotalRevenue)
                .Take(10)
                .ToListAsync();

            return result;
        }

        public async Task<FinancialSummaryData> GetFinancialSummaryAsync()
        {
            var now = DateTime.Now;
            var thisMonth = new DateTime(now.Year, now.Month, 1);
            var lastMonth = thisMonth.AddMonths(-1);

            var confirmedReservations = await _context.Reservations
                .Where(r => r.IsConfirmed && !r.IsCanceled)
                .ToListAsync();

            var thisMonthRevenue = confirmedReservations
                .Where(r => r.CreatedAt >= thisMonth)
                .Sum(r => r.TotalPrice);

            var lastMonthRevenue = confirmedReservations
                .Where(r => r.CreatedAt >= lastMonth && r.CreatedAt < thisMonth)
                .Sum(r => r.TotalPrice);

            var pendingValue = await _context.Reservations
                .Where(r => !r.IsConfirmed && !r.IsCanceled)
                .SumAsync(r => r.TotalPrice);

            var canceledValue = await _context.Reservations
                .Where(r => r.IsCanceled)
                .SumAsync(r => r.TotalPrice);

            return new FinancialSummaryData
            {
                TotalRevenue = confirmedReservations.Sum(r => r.TotalPrice),
                RevenueThisMonth = thisMonthRevenue,
                RevenueLastMonth = lastMonthRevenue,
                RevenueGrowth = lastMonthRevenue > 0 ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0,
                AverageReservationValue = confirmedReservations.Any() ? confirmedReservations.Average(r => r.TotalPrice) : 0,
                TotalTransactions = confirmedReservations.Count,
                PendingPayments = pendingValue,
                RefundedAmount = canceledValue
            };
        }

        public async Task<IEnumerable<RevenueByPeriodData>> GetRevenueByPeriodAsync()
        {
            var sixMonthsAgo = DateTime.Now.AddMonths(-6);
            
            var periodData = await _context.Reservations
                .Where(r => r.IsConfirmed && !r.IsCanceled && r.CreatedAt >= sixMonthsAgo)
                .ToListAsync();

            var monthlyData = periodData
                .GroupBy(r => new { r.CreatedAt.Year, r.CreatedAt.Month })
                .Select(g => new
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    Revenue = g.Sum(r => r.TotalPrice),
                    Count = g.Count()
                })
                .OrderBy(x => x.Year).ThenBy(x => x.Month)
                .ToList();

            var result = new List<RevenueByPeriodData>();
            
            for (int i = 0; i < monthlyData.Count; i++)
            {
                var current = monthlyData[i];
                var growth = 0m;
                
                if (i > 0)
                {
                    var previous = monthlyData[i - 1];
                    growth = previous.Revenue > 0 ? ((current.Revenue - previous.Revenue) / previous.Revenue) * 100 : 0;
                }

                result.Add(new RevenueByPeriodData
                {
                    Period = $"{current.Month:00}/{current.Year}",
                    Revenue = current.Revenue,
                    ReservationCount = current.Count,
                    GrowthPercentage = growth
                });
            }

            return result;
        }

        public async Task<IEnumerable<HotelDetailedAnalytics>> GetHotelDetailedAnalyticsAsync()
        {
            var totalMarketRevenue = await _context.Reservations
                .Where(r => r.IsConfirmed && !r.IsCanceled)
                .SumAsync(r => r.TotalPrice);

            var hotelAnalytics = await _context.Hotels
                .Include(h => h.Rooms)
                .ToListAsync();

            var reservations = await _context.Reservations
                .Where(r => r.IsConfirmed && !r.IsCanceled)
                .Include(r => r.Hotel)
                .Include(r => r.Room)
                .ToListAsync();

            var result = new List<HotelDetailedAnalytics>();

            foreach (var hotel in hotelAnalytics)
            {
                var hotelReservations = reservations.Where(r => r.HotelId == hotel.HotelId).ToList();
                var revenue = hotelReservations.Sum(r => r.TotalPrice);
                var totalRooms = hotel.Rooms?.Sum(r => r.TotalRooms) ?? 0;

                // ✅ NOVA LÓGICA: Calcular quartos baseado na média de ocupação ou reservas ativas
                var availableRooms = totalRooms;
                
                if (hotel.Rooms != null && hotelReservations.Any())
                {
                    // Opção 1: Quartos ocupados hoje (reservas ativas)
                    var today = DateTime.Today;
                    var currentlyOccupiedRooms = 0;
                    
                    foreach (var room in hotel.Rooms)
                    {
                        var occupiedCount = hotelReservations
                            .Where(r => r.RoomId == room.RoomId && 
                                       r.CheckIn <= today && 
                                       r.CheckOut > today)
                            .Count();
                        currentlyOccupiedRooms += occupiedCount;
                    }
                    
                    // Opção 2: Média de quartos reservados (mais representativo)
                    var totalReservationDays = hotelReservations.Sum(r => (r.CheckOut - r.CheckIn).Days);
                    var averageOccupiedRooms = totalReservationDays > 0 ? 
                        (int)Math.Ceiling((double)totalReservationDays / 30) : 0; // aproximação mensal
                    
                    // Usar a maior ocupação entre atual e média para mostrar impacto real
                    var roomsToSubtract = Math.Max(currentlyOccupiedRooms, averageOccupiedRooms);
                    
                    // Garantir que sempre tenha pelo menos 0 quartos disponíveis
                    availableRooms = Math.Max(0, totalRooms - roomsToSubtract);
                    
                    // Se houver muitas reservas, mostrar pelo menos que há impacto
                    if (hotelReservations.Count > 0 && availableRooms == totalRooms)
                    {
                        availableRooms = Math.Max(0, totalRooms - hotelReservations.Count);
                    }
                }

                // Calcular taxa de ocupação
                decimal occupancyRate = 0;
                if (totalRooms > 0 && hotelReservations.Any())
                {
                    var totalReservationDays = hotelReservations.Sum(r => (r.CheckOut - r.CheckIn).Days);
                    var availableRoomDays = totalRooms * 30;
                    occupancyRate = ((decimal)totalReservationDays / availableRoomDays) * 100;
                    
                    if (occupancyRate > 100) occupancyRate = 100;
                }

                var analytics = new HotelDetailedAnalytics
                {
                    HotelId = hotel.HotelId,
                    HotelName = hotel.Name ?? "Hotel Desconhecido",
                    City = hotel.City ?? "Cidade Desconhecida",
                    Stars = hotel.Stars,
                    TotalRevenue = revenue,
                    TotalReservations = hotelReservations.Count,
                    AverageReservationValue = hotelReservations.Any() ? revenue / hotelReservations.Count : 0,
                    TotalRooms = availableRooms, // ✅ Quartos disponíveis considerando impacto das reservas
                    RevenuePerRoom = totalRooms > 0 ? revenue / totalRooms : 0,
                    MarketShare = totalMarketRevenue > 0 ? (revenue / totalMarketRevenue) * 100 : 0,
                    OccupancyRate = occupancyRate
                };

                // Distribuição por tipo de quarto
                if (hotel.Rooms != null)
                {
                    analytics.RoomTypeDistribution = hotel.Rooms
                        .GroupBy(r => r.TypeName.ToString())
                        .ToDictionary(g => g.Key, g => g.Sum(r => r.TotalRooms));
                }

                // Performance mensal (últimos 6 meses)
                var sixMonthsAgo = DateTime.Now.AddMonths(-6);
                analytics.MonthlyPerformance = hotelReservations
                    .Where(r => r.CreatedAt >= sixMonthsAgo)
                    .GroupBy(r => new { r.CreatedAt.Year, r.CreatedAt.Month })
                    .Select(g => new MonthlyPerformance
                    {
                        Month = $"{g.Key.Month:00}/{g.Key.Year}",
                        Revenue = g.Sum(r => r.TotalPrice),
                        Reservations = g.Count(),
                        OccupancyRate = totalRooms > 0 ? (decimal)g.Sum(r => (r.CheckOut - r.CheckIn).Days) / (totalRooms * DateTime.DaysInMonth(g.Key.Year, g.Key.Month)) * 100 : 0
                    })
                    .OrderBy(m => m.Month)
                    .ToList();

                result.Add(analytics);
            }

            return result.OrderByDescending(h => h.TotalRevenue);
        }

        public async Task<IEnumerable<CityPerformanceData>> GetCityPerformanceDataAsync()
        {
            var totalRevenue = await _context.Reservations
                .Where(r => r.IsConfirmed && !r.IsCanceled)
                .SumAsync(r => r.TotalPrice);

            var cityData = await _context.Hotels
                .GroupBy(h => h.City)
                .Select(g => new
                {
                    City = g.Key ?? "Cidade Desconhecida",
                    HotelCount = g.Count(),
                    Hotels = g.ToList()
                })
                .ToListAsync();

            var reservations = await _context.Reservations
                .Where(r => r.IsConfirmed && !r.IsCanceled)
                .Include(r => r.Hotel)
                .ToListAsync();

            var result = new List<CityPerformanceData>();

            foreach (var city in cityData)
            {
                var cityReservations = reservations.Where(r => r.Hotel?.City == city.City).ToList();
                var cityRevenue = cityReservations.Sum(r => r.TotalPrice);

                result.Add(new CityPerformanceData
                {
                    City = city.City,
                    HotelCount = city.HotelCount,
                    TotalRevenue = cityRevenue,
                    TotalReservations = cityReservations.Count,
                    AverageRevenue = city.HotelCount > 0 ? cityRevenue / city.HotelCount : 0,
                    MarketShare = totalRevenue > 0 ? (cityRevenue / totalRevenue) * 100 : 0
                });
            }

            return result.OrderByDescending(c => c.TotalRevenue);
        }

        public async Task<IEnumerable<StarRatingAnalytics>> GetStarRatingAnalyticsAsync()
        {
            var starData = await _context.Hotels
                .GroupBy(h => h.Stars)
                .Select(g => new
                {
                    Stars = g.Key,
                    HotelCount = g.Count(),
                    Hotels = g.ToList()
                })
                .ToListAsync();

            var reservations = await _context.Reservations
                .Where(r => r.IsConfirmed && !r.IsCanceled)
                .Include(r => r.Hotel)
                .ToListAsync();

            var result = new List<StarRatingAnalytics>();

            foreach (var star in starData)
            {
                var starReservations = reservations.Where(r => r.Hotel?.Stars == star.Stars).ToList();
                var starRevenue = starReservations.Sum(r => r.TotalPrice);

                result.Add(new StarRatingAnalytics
                {
                    Stars = star.Stars,
                    HotelCount = star.HotelCount,
                    TotalRevenue = starRevenue,
                    TotalReservations = starReservations.Count,
                    AverageReservationValue = starReservations.Any() ? starRevenue / starReservations.Count : 0,
                    AverageOccupancyRate = 0 // Seria calculado com dados mais específicos
                });
            }

            return result.OrderBy(s => s.Stars);
        }

        public async Task<CompetitiveAnalysisData> GetCompetitiveAnalysisAsync()
        {
            var totalRevenue = await _context.Reservations
                .Where(r => r.IsConfirmed && !r.IsCanceled)
                .SumAsync(r => r.TotalPrice);

            var totalReservations = await _context.Reservations
                .Where(r => r.IsConfirmed && !r.IsCanceled)
                .CountAsync();

            var cityPerformance = await GetCityPerformanceDataAsync();
            var starPerformance = await GetStarRatingAnalyticsAsync();

            var topCompetitors = await _context.Reservations
                .Where(r => r.IsConfirmed && !r.IsCanceled)
                .Include(r => r.Hotel)
                .GroupBy(r => new { r.HotelId, r.Hotel.Name, r.Hotel.City, r.Hotel.Stars })
                .Select(g => new CompetitorData
                {
                    HotelName = g.Key.Name ?? "Hotel Desconhecido",
                    City = g.Key.City ?? "Cidade Desconhecida",
                    Stars = g.Key.Stars,
                    Revenue = g.Sum(r => r.TotalPrice),
                    MarketShare = totalRevenue > 0 ? (g.Sum(r => r.TotalPrice) / totalRevenue) * 100 : 0,
                    GrowthRate = 0 // Seria calculado com dados históricos
                })
                .OrderByDescending(c => c.Revenue)
                .Take(10)
                .ToListAsync();

            return new CompetitiveAnalysisData
            {
                TotalMarketRevenue = totalRevenue,
                TotalMarketReservations = totalReservations,
                TopPerformingCity = cityPerformance.FirstOrDefault()?.City ?? "N/A",
                TopPerformingStarCategory = starPerformance.OrderByDescending(s => s.TotalRevenue).FirstOrDefault()?.Stars.ToString() + " estrelas" ?? "N/A",
                TopCompetitors = topCompetitors.ToList()
            };
        }
    }
}