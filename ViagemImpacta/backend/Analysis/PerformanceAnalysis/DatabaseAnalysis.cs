using System.Diagnostics;
using System.Text.Json;

namespace PerformanceAnalysis
{
    class DatabaseAnalysis
    {
        private static readonly HttpClient httpClient = new HttpClient();
        private const string API_BASE_URL = "http://localhost:5155/api";

        static async Task Main(string[] args)
        {
            Console.WriteLine("📊 ANÁLISE DETALHADA DO BANCO DE DADOS");
            Console.WriteLine("=" + new string('=', 45));
            Console.WriteLine();

            await AnalyzeDatabase();
            Console.WriteLine("\nPressione qualquer tecla para sair...");
            Console.ReadKey();
        }

        private static async Task AnalyzeDatabase()
        {
            try
            {
                var response = await httpClient.GetAsync($"{API_BASE_URL}/hotels");

                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var hotels = JsonSerializer.Deserialize<List<HotelAnalysisResponse>>(content, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    Console.WriteLine($"🏨 TOTAL DE HOTÉIS: {hotels?.Count ?? 0}");
                    Console.WriteLine();

                    if (hotels != null && hotels.Any())
                    {
                        var totalRooms = hotels.SelectMany(h => h.Rooms ?? new List<RoomAnalysisResponse>()).Count();
                        var avgRoomsPerHotel = totalRooms / (double)hotels.Count;
                        var hotelsWithMostRooms = hotels.OrderByDescending(h => h.Rooms?.Count ?? 0).Take(3);
                        var responseSize = System.Text.Encoding.UTF8.GetByteCount(content);

                        Console.WriteLine($"🛏️  TOTAL DE QUARTOS: {totalRooms}");
                        Console.WriteLine($"📈 MÉDIA DE QUARTOS POR HOTEL: {avgRoomsPerHotel:F1}");
                        Console.WriteLine($"📦 TAMANHO DA RESPOSTA: {responseSize:N0} bytes ({responseSize / 1024.0:F1} KB)");
                        Console.WriteLine();

                        Console.WriteLine("🏨 HOTÉIS COM MAIS QUARTOS:");
                        Console.WriteLine(new string('-', 40));
                        foreach (var hotel in hotelsWithMostRooms)
                        {
                            Console.WriteLine($"   • {hotel.Name}: {hotel.Rooms?.Count ?? 0} quartos");
                        }
                        Console.WriteLine();

                        Console.WriteLine("🌟 DISTRIBUIÇÃO POR ESTRELAS:");
                        Console.WriteLine(new string('-', 40));
                        var starDistribution = hotels.GroupBy(h => h.Stars).OrderBy(g => g.Key);
                        foreach (var group in starDistribution)
                        {
                            Console.WriteLine($"   • {group.Key} estrelas: {group.Count()} hotéis");
                        }
                        Console.WriteLine();

                        Console.WriteLine("🏙️  DISTRIBUIÇÃO POR CIDADE:");
                        Console.WriteLine(new string('-', 40));
                        var cityDistribution = hotels.GroupBy(h => h.City).OrderByDescending(g => g.Count()).Take(5);
                        foreach (var group in cityDistribution)
                        {
                            Console.WriteLine($"   • {group.Key}: {group.Count()} hotéis");
                        }
                        Console.WriteLine();

                        // Análise de tipos de quarto
                        var allRooms = hotels.SelectMany(h => h.Rooms ?? new List<RoomAnalysisResponse>());
                        var roomTypeDistribution = allRooms.GroupBy(r => r.TypeName).OrderByDescending(g => g.Count());

                        Console.WriteLine("🛏️  TIPOS DE QUARTOS:");
                        Console.WriteLine(new string('-', 40));
                        foreach (var group in roomTypeDistribution)
                        {
                            var avgPrice = group.Average(r => (double)r.AverageDailyPrice);
                            Console.WriteLine($"   • {group.Key}: {group.Count()} quartos | Preço médio: R$ {avgPrice:F2}");
                        }
                        Console.WriteLine();

                        // Análise de performance baseada nos dados
                        AnalyzePerformanceByData(hotels.Count, totalRooms, responseSize);
                    }
                }
                else
                {
                    Console.WriteLine($"❌ ERRO: {response.StatusCode} - {response.ReasonPhrase}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ EXCEÇÃO: {ex.Message}");
            }
        }

        private static void AnalyzePerformanceByData(int hotelCount, int roomCount, int responseSize)
        {
            Console.WriteLine("🎯 ANÁLISE DE PERFORMANCE BASEADA NOS DADOS:");
            Console.WriteLine(new string('=', 50));

            Console.WriteLine("\n📊 CENÁRIO ATUAL:");
            Console.WriteLine($"   • {hotelCount} hotéis com {roomCount} quartos");
            Console.WriteLine($"   • Resposta de {responseSize / 1024.0:F1} KB");
            Console.WriteLine($"   • Include de {roomCount} relacionamentos");

            Console.WriteLine("\n⚡ PROJEÇÕES DE CRESCIMENTO:");
            Console.WriteLine("   • 100 hotéis (7x): ~" + (responseSize * 7 / 1024.0).ToString("F1") + " KB");
            Console.WriteLine("   • 500 hotéis (38x): ~" + (responseSize * 38 / 1024.0).ToString("F1") + " KB");
            Console.WriteLine("   • 1000 hotéis (77x): ~" + (responseSize * 77 / 1024.0).ToString("F1") + " KB");

            Console.WriteLine("\n🚨 PONTOS DE ATENÇÃO:");
            Console.WriteLine(new string('-', 40));

            if (responseSize > 50 * 1024) // > 50KB
            {
                Console.WriteLine("❌ CRÍTICO: Resposta muito grande (>50KB)");
            }
            else if (responseSize > 20 * 1024) // > 20KB
            {
                Console.WriteLine("⚠️  ATENÇÃO: Resposta média-grande (>20KB)");
            }
            else
            {
                Console.WriteLine("✅ OK: Tamanho de resposta aceitável");
            }

            if (roomCount > 100)
            {
                Console.WriteLine("❌ CRÍTICO: Muitos relacionamentos (>100 quartos)");
            }
            else if (roomCount > 50)
            {
                Console.WriteLine("⚠️  ATENÇÃO: Relacionamentos médios (>50 quartos)");
            }
            else
            {
                Console.WriteLine("✅ OK: Relacionamentos controlados");
            }

            Console.WriteLine("\n🔧 PRIORIDADES DE OTIMIZAÇÃO:");
            Console.WriteLine(new string('=', 50));
            Console.WriteLine("1. 🎯 ALTA PRIORIDADE:");
            Console.WriteLine("   • Implementar paginação (PageSize: 10-20)");
            Console.WriteLine("   • AsNoTracking() para read-only");
            Console.WriteLine("   • Cache em memória (5-10 min)");

            Console.WriteLine("\n2. 📊 MÉDIA PRIORIDADE:");
            Console.WriteLine("   • Projections específicas (só campos necessários)");
            Console.WriteLine("   • Compressão de resposta (Gzip)");
            Console.WriteLine("   • Índices no banco de dados");

            Console.WriteLine("\n3. 🚀 BAIXA PRIORIDADE (futuro):");
            Console.WriteLine("   • Cache distribuído (Redis)");
            Console.WriteLine("   • Lazy loading otimizado");
            Console.WriteLine("   • CDN para assets estáticos");

            Console.WriteLine("\n📈 MÉTRICAS DE SUCESSO:");
            Console.WriteLine("   • Tempo < 100ms (95% das requests)");
            Console.WriteLine("   • Tamanho resposta < 50KB");
            Console.WriteLine("   • Suporte a 1000+ hotéis simultâneos");
        }
    }

    // Classes para deserialização (mesmas do teste anterior)
    public class HotelAnalysisResponse
    {
        public int HotelId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public int Stars { get; set; }
        public List<RoomAnalysisResponse>? Rooms { get; set; }
    }

    public class RoomAnalysisResponse
    {
        public int RoomId { get; set; }
        public string TypeName { get; set; } = string.Empty;
        public decimal AverageDailyPrice { get; set; }
        public int Capacity { get; set; }
    }
}
