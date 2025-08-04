using System.Text.Json;

class Program
{
    private static readonly HttpClient httpClient = new HttpClient();
    private const string API_BASE_URL = "http://localhost:5155/api";

    static async Task Main(string[] args)
    {
        Console.WriteLine("📊 ANÁLISE DETALHADA - ENDPOINT GETALLHOTELS");
        Console.WriteLine("=" + new string('=', 50));
        Console.WriteLine();

        await AnalyzeDatabase();
        Console.WriteLine("\nPressione qualquer tecla para sair...");
        Console.ReadKey();
    }

    static async Task AnalyzeDatabase()
    {
        try
        {
            var response = await httpClient.GetAsync($"{API_BASE_URL}/hotels");

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var hotels = JsonSerializer.Deserialize<List<Hotel>>(content, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                Console.WriteLine($"🏨 TOTAL DE HOTÉIS: {hotels?.Count ?? 0}");
                Console.WriteLine();

                if (hotels != null && hotels.Any())
                {
                    var totalRooms = hotels.SelectMany(h => h.Rooms ?? new List<Room>()).Count();
                    var responseSize = System.Text.Encoding.UTF8.GetByteCount(content);

                    Console.WriteLine($"🛏️  TOTAL DE QUARTOS: {totalRooms}");
                    Console.WriteLine($"📦 TAMANHO DA RESPOSTA: {responseSize:N0} bytes ({responseSize / 1024.0:F1} KB)");
                    Console.WriteLine($"📈 MÉDIA DE QUARTOS POR HOTEL: {totalRooms / (double)hotels.Count:F1}");
                    Console.WriteLine();

                    // Análise de performance baseada nos dados
                    Console.WriteLine("🎯 ANÁLISE DE PERFORMANCE:");
                    Console.WriteLine(new string('=', 50));

                    Console.WriteLine("\n📊 CENÁRIO ATUAL:");
                    Console.WriteLine($"   • {hotels.Count} hotéis com {totalRooms} quartos");
                    Console.WriteLine($"   • Resposta de {responseSize / 1024.0:F1} KB");
                    Console.WriteLine($"   • Include de {totalRooms} relacionamentos (N+1 potencial)");

                    Console.WriteLine("\n🚨 PROBLEMAS IDENTIFICADOS:");
                    Console.WriteLine(new string('-', 40));

                    var issues = new List<string>();
                    var priorities = new List<string>();

                    // Análise de problemas
                    if (totalRooms > 50)
                        issues.Add($"❌ CRÍTICO: Muitos relacionamentos ({totalRooms} quartos loaded)");

                    if (responseSize > 20 * 1024)
                        issues.Add($"❌ CRÍTICO: Resposta muito grande ({responseSize / 1024.0:F1} KB)");

                    issues.Add("❌ CRÍTICO: Sem AsNoTracking() - EF rastreando mudanças desnecessariamente");
                    issues.Add("❌ CRÍTICO: Sem paginação - carregando TODOS os hotéis");
                    issues.Add("❌ CRÍTICO: Sem cache - consultando DB a cada request");
                    issues.Add("⚠️  ALTO: Include eager loading pode causar N+1 queries");
                    issues.Add("⚠️  ALTO: AutoMapper overhead em todos os objetos");
                    issues.Add("⚠️  MÉDIO: Sem compressão de resposta");

                    foreach (var issue in issues)
                        Console.WriteLine($"   {issue}");

                    Console.WriteLine("\n🔧 PRIORIDADES DE OTIMIZAÇÃO (EM ORDEM):");
                    Console.WriteLine(new string('=', 50));

                    Console.WriteLine("\n1. 🚨 PRIORIDADE CRÍTICA (implementar AGORA):");
                    Console.WriteLine("   ✅ AsNoTracking() no Repository");
                    Console.WriteLine("   ✅ Cache em memória (5-10 min TTL)");
                    Console.WriteLine("   ✅ Paginação básica (PageSize: 10-20)");

                    Console.WriteLine("\n2. 🔥 PRIORIDADE ALTA (próxima sprint):");
                    Console.WriteLine("   ✅ Projections específicas (só campos necessários)");
                    Console.WriteLine("   ✅ Compressão Response (Gzip)");
                    Console.WriteLine("   ✅ Índices no banco de dados");

                    Console.WriteLine("\n3. 📊 PRIORIDADE MÉDIA (futuro próximo):");
                    Console.WriteLine("   ✅ Lazy loading otimizado");
                    Console.WriteLine("   ✅ Cache distribuído (Redis)");
                    Console.WriteLine("   ✅ Filtros query-string avançados");

                    Console.WriteLine("\n📈 MÉTRICAS DE SUCESSO ESPERADAS:");
                    Console.WriteLine(new string('-', 50));
                    Console.WriteLine("   • Tempo resposta: < 50ms (95% requests)");
                    Console.WriteLine("   • Tamanho resposta: < 20KB por página");
                    Console.WriteLine("   • Suporte: 1000+ hotéis simultâneos");
                    Console.WriteLine("   • Cache hit rate: > 80%");

                    Console.WriteLine("\n🎯 CÓDIGO ESPECÍFICO PARA IMPLEMENTAR:");
                    Console.WriteLine(new string('=', 50));
                    Console.WriteLine("1. HotelRepository.GetAllHotelsWithRoomsAsync():");
                    Console.WriteLine("   return await _context.Hotels");
                    Console.WriteLine("       .AsNoTracking()          // 🚀 CRÍTICO");
                    Console.WriteLine("       .Include(h => h.Rooms)");
                    Console.WriteLine("       .Skip((page-1)*pageSize) // 🚀 CRÍTICO");
                    Console.WriteLine("       .Take(pageSize)          // 🚀 CRÍTICO");
                    Console.WriteLine("       .ToListAsync();");
                    Console.WriteLine();
                    Console.WriteLine("2. HotelsController.GetAllHotels():");
                    Console.WriteLine("   // Adicionar cache + paginação");
                }
            }
            else
            {
                Console.WriteLine($"❌ ERRO: {response.StatusCode}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ EXCEÇÃO: {ex.Message}");
        }
    }
}

public class Hotel
{
    public int HotelId { get; set; }
    public string Name { get; set; } = "";
    public string City { get; set; } = "";
    public int Stars { get; set; }
    public List<Room>? Rooms { get; set; }
}

public class Room
{
    public int RoomId { get; set; }
    public string TypeName { get; set; } = "";
    public decimal AverageDailyPrice { get; set; }
}
