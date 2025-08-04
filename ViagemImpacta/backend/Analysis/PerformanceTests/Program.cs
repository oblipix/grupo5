using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Text.Json;

namespace PerformanceTests;

public class Program
{
    private static readonly HttpClient _httpClient = new();
    private static ILogger<Program>? _logger;
    private static readonly string _baseUrl = "http://localhost:5155";

    public static async Task Main(string[] args)
    {
        // Configurar logging
        using var host = Host.CreateDefaultBuilder(args)
            .ConfigureServices(services =>
            {
                services.AddLogging(builder =>
                {
                    builder.AddConsole();
                    builder.SetMinimumLevel(LogLevel.Information);
                });
            })
            .Build();

        _logger = host.Services.GetRequiredService<ILogger<Program>>();

        Console.WriteLine("🚀 VIAGEM IMPACTA - TESTE DE PERFORMANCE SISTEMA DE BUSCA");
        Console.WriteLine("================================================================");
        Console.WriteLine($"🎯 Target: {_baseUrl}");
        Console.WriteLine($"👥 Simulating: 50 concurrent users");
        Console.WriteLine($"⏱️  Duration: 2 minutes");
        Console.WriteLine("================================================================\n");

        // Verificar se a API está rodando
        if (!await CheckApiHealth())
        {
            Console.WriteLine("❌ API não está respondendo. Certifique-se que está rodando em http://localhost:5155");
            return;
        }

        // Executar testes sequenciais
        Console.WriteLine("🔥 FASE 1: Teste de Aquecimento (Warm-up)");
        await WarmUpTest();

        Console.WriteLine("\n💥 FASE 2: Teste de Carga (50 usuários simultâneos)");
        await LoadTest();

        Console.WriteLine("\n🚨 FASE 3: Teste de Sobrecarga (Overload)");
        await OverloadTest();

        Console.WriteLine("\n📊 Teste completo! Verifique o Application Insights para métricas detalhadas.");
        Console.WriteLine("🔗 Portal Azure: https://portal.azure.com -> Application Insights -> ApplicationId: 4e6bcfea-2904-4266-b125-36d689887340");
    }

    static async Task<bool> CheckApiHealth()
    {
        try
        {
            var response = await _httpClient.GetAsync($"{_baseUrl}/api/debug/test-failfast?destination=Rio");
            _logger?.LogInformation("✅ API Health Check: {StatusCode}", response.StatusCode);
            return response.IsSuccessStatusCode;
        }
        catch (Exception ex)
        {
            _logger?.LogError(ex, "❌ API Health Check Failed");
            return false;
        }
    }

    static async Task WarmUpTest()
    {
        var endpoints = GetTestEndpoints();
        var results = new List<TestResult>();

        _logger?.LogInformation("🔥 Iniciando warm-up com 10 requests sequenciais...");

        for (int i = 1; i <= 10; i++)
        {
            var endpoint = endpoints[Random.Shared.Next(endpoints.Length)];
            var result = await ExecuteRequest(endpoint, i, "WarmUp");
            results.Add(result);

            Console.WriteLine($"Request {i:00}: {result.StatusCode} | {result.Duration:F0}ms | {endpoint.Name}");
            await Task.Delay(100); // Pequena pausa entre requests
        }

        PrintResults("WARM-UP", results);
    }

    static async Task LoadTest()
    {
        var endpoints = GetTestEndpoints();
        var results = new List<TestResult>();
        var stopwatch = Stopwatch.StartNew();

        _logger?.LogInformation("💥 Iniciando teste de carga: 50 usuários simultâneos por 2 minutos...");

        // Executa por 2 minutos
        var endTime = DateTime.Now.AddMinutes(2);
        var tasks = new List<Task>();

        // Cria 50 "usuários" simultâneos
        for (int userId = 1; userId <= 50; userId++)
        {
            var userTask = SimulateUser(userId, endpoints, endTime, results);
            tasks.Add(userTask);
        }

        await Task.WhenAll(tasks);
        stopwatch.Stop();

        _logger?.LogInformation("✅ Teste de carga completo! Duration: {Duration}s", stopwatch.Elapsed.TotalSeconds);
        PrintResults("LOAD TEST", results);
    }

    static async Task OverloadTest()
    {
        var endpoints = GetTestEndpoints();
        var results = new List<TestResult>();

        _logger?.LogInformation("🚨 Iniciando teste de sobrecarga: 100 requests simultâneos...");

        var tasks = new List<Task<TestResult>>();

        // 100 requests simultâneos para causar overload
        for (int i = 1; i <= 100; i++)
        {
            var endpoint = endpoints[Random.Shared.Next(endpoints.Length)];
            var requestId = i; // Captura o valor atual
            var task = Task.Run(async () => await ExecuteRequest(endpoint, requestId, "Overload"));
            tasks.Add(task);
        }

        var taskResults = await Task.WhenAll(tasks);
        results.AddRange(taskResults);

        PrintResults("OVERLOAD TEST", results);
    }

    static async Task SimulateUser(int userId, TestEndpoint[] endpoints, DateTime endTime, List<TestResult> results)
    {
        var userResults = new List<TestResult>();
        int requestCount = 0;

        while (DateTime.Now < endTime)
        {
            try
            {
                requestCount++;
                var endpoint = endpoints[Random.Shared.Next(endpoints.Length)];
                var result = await ExecuteRequest(endpoint, requestCount, $"User{userId:00}");

                lock (results)
                {
                    results.Add(result);
                    userResults.Add(result);
                }

                // Simula comportamento humano - pausa entre requests
                var delay = Random.Shared.Next(500, 2000); // 0.5 a 2 segundos
                await Task.Delay(delay);
            }
            catch (Exception ex)
            {
                _logger?.LogError(ex, "❌ User {UserId} failed on request {RequestCount}", userId, requestCount);
            }
        }

        var avgResponseTime = userResults.Count > 0 ? userResults.Average(r => r.Duration) : 0;
        _logger?.LogInformation("👤 User {UserId}: {RequestCount} requests | Avg: {AvgTime:F0}ms",
            userId, userResults.Count, avgResponseTime);
    }

    static async Task<TestResult> ExecuteRequest(TestEndpoint endpoint, int requestId, string phase)
    {
        var stopwatch = Stopwatch.StartNew();
        var startTime = DateTime.UtcNow;

        try
        {
            var response = await _httpClient.GetAsync($"{_baseUrl}{endpoint.Path}");
            stopwatch.Stop();

            var content = await response.Content.ReadAsStringAsync();

            return new TestResult
            {
                RequestId = requestId,
                Phase = phase,
                EndpointName = endpoint.Name,
                Path = endpoint.Path,
                StatusCode = (int)response.StatusCode,
                Duration = stopwatch.ElapsedMilliseconds,
                Success = response.IsSuccessStatusCode,
                Timestamp = startTime,
                ResponseSize = content.Length
            };
        }
        catch (Exception ex)
        {
            stopwatch.Stop();
            _logger?.LogError(ex, "❌ Request failed: {Endpoint}", endpoint.Path);

            return new TestResult
            {
                RequestId = requestId,
                Phase = phase,
                EndpointName = endpoint.Name,
                Path = endpoint.Path,
                StatusCode = 0,
                Duration = stopwatch.ElapsedMilliseconds,
                Success = false,
                Timestamp = startTime,
                Error = ex.Message
            };
        }
    }

    static TestEndpoint[] GetTestEndpoints()
    {
        return new[]
        {
            // Endpoints de busca válida (devem ser ~100-800ms)
            new TestEndpoint("Busca Básica Rio", "/api/hotels/search?destination=Rio"),
            new TestEndpoint("Busca SP com Stars", "/api/hotels/search?destination=São Paulo&stars=4"),
            new TestEndpoint("Busca Brasília Range", "/api/hotels/search?destination=Brasília&minPrice=200&maxPrice=800"),
            new TestEndpoint("Busca Salvador Guests", "/api/hotels/search?destination=Salvador&guests=2"),
            new TestEndpoint("Busca Complexa", "/api/hotels/search?destination=Rio&stars=5&minPrice=300&maxPrice=1000&guests=2"),
            
            // Endpoints fail-fast (devem ser ~1-5ms)
            new TestEndpoint("FailFast Preço Negativo", "/api/debug/test-failfast?minPrice=-100&destination=Rio"),
            new TestEndpoint("FailFast Stars Inválido", "/api/debug/test-failfast?stars=10&destination=SP"),
            new TestEndpoint("FailFast Guests Zero", "/api/debug/test-failfast?guests=0&destination=Brasília"),
            new TestEndpoint("FailFast Range Inválido", "/api/debug/test-failfast?minPrice=1000&maxPrice=500&destination=Salvador"),
            
            // Mix de cenários
            new TestEndpoint("Busca Fortaleza", "/api/hotels/search?destination=Fortaleza&stars=3"),
            new TestEndpoint("Busca Recife Budget", "/api/hotels/search?destination=Recife&maxPrice=400")
        };
    }

    static void PrintResults(string testName, List<TestResult> results)
    {
        if (!results.Any()) return;

        var successful = results.Where(r => r.Success).ToList();
        var failed = results.Where(r => !r.Success).ToList();

        Console.WriteLine($"\n📊 {testName} RESULTS:");
        Console.WriteLine("================================");
        Console.WriteLine($"Total Requests: {results.Count}");
        Console.WriteLine($"✅ Successful: {successful.Count} ({(double)successful.Count / results.Count * 100:F1}%)");
        Console.WriteLine($"❌ Failed: {failed.Count} ({(double)failed.Count / results.Count * 100:F1}%)");

        if (successful.Any())
        {
            Console.WriteLine($"⚡ Response Times:");
            Console.WriteLine($"   • Average: {successful.Average(r => r.Duration):F0}ms");
            Console.WriteLine($"   • Minimum: {successful.Min(r => r.Duration):F0}ms");
            Console.WriteLine($"   • Maximum: {successful.Max(r => r.Duration):F0}ms");
            Console.WriteLine($"   • P95: {GetPercentile(successful.Select(r => r.Duration).ToList(), 95):F0}ms");
            Console.WriteLine($"   • P99: {GetPercentile(successful.Select(r => r.Duration).ToList(), 99):F0}ms");
        }

        // Mostra performance por endpoint
        var endpointStats = successful.GroupBy(r => r.EndpointName)
            .Select(g => new
            {
                Name = g.Key,
                Count = g.Count(),
                AvgTime = g.Average(r => r.Duration),
                MinTime = g.Min(r => r.Duration),
                MaxTime = g.Max(r => r.Duration)
            })
            .OrderBy(s => s.AvgTime);

        Console.WriteLine($"\n🎯 Performance por Endpoint:");
        foreach (var stat in endpointStats)
        {
            Console.WriteLine($"   {stat.Name}: {stat.Count} reqs | Avg: {stat.AvgTime:F0}ms | Range: {stat.MinTime:F0}-{stat.MaxTime:F0}ms");
        }

        Console.WriteLine("");
    }

    static double GetPercentile(List<double> values, int percentile)
    {
        if (!values.Any()) return 0;

        values.Sort();
        int index = (int)Math.Ceiling(values.Count * percentile / 100.0) - 1;
        return values[Math.Max(0, Math.Min(index, values.Count - 1))];
    }
}

public record TestEndpoint(string Name, string Path);

public class TestResult
{
    public int RequestId { get; set; }
    public string Phase { get; set; } = "";
    public string EndpointName { get; set; } = "";
    public string Path { get; set; } = "";
    public int StatusCode { get; set; }
    public double Duration { get; set; }
    public bool Success { get; set; }
    public DateTime Timestamp { get; set; }
    public int ResponseSize { get; set; }
    public string? Error { get; set; }
}
