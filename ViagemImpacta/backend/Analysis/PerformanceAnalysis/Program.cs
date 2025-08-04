using System.Diagnostics;
using System.Text.Json;

namespace PerformanceAnalysis
{
    class Program
    {
        private static readonly HttpClient httpClient = new HttpClient();
        private const string API_BASE_URL = "http://localhost:5155/api";

        static async Task Main(string[] args)
        {
            Console.WriteLine("🔍 ANÁLISE DE PERFORMANCE - ENDPOINT GETALLHOTELS");
            Console.WriteLine("=" + new string('=', 55));
            Console.WriteLine();

            await AnalyzeEndpoint();
            Console.WriteLine("\nPressione qualquer tecla para sair...");
            Console.ReadKey();
        }

        private static async Task AnalyzeEndpoint()
        {
            var results = new List<long>();
            const int numberOfTests = 10;

            Console.WriteLine($"🚀 Executando {numberOfTests} testes de performance...");
            Console.WriteLine();

            for (int i = 1; i <= numberOfTests; i++)
            {
                Console.Write($"Teste {i:D2}/10: ");

                var stopwatch = Stopwatch.StartNew();

                try
                {
                    var response = await httpClient.GetAsync($"{API_BASE_URL}/hotels");

                    if (response.IsSuccessStatusCode)
                    {
                        var content = await response.Content.ReadAsStringAsync();
                        var hotels = JsonSerializer.Deserialize<List<HotelResponse>>(content, new JsonSerializerOptions
                        {
                            PropertyNameCaseInsensitive = true
                        });

                        stopwatch.Stop();

                        results.Add(stopwatch.ElapsedMilliseconds);

                        Console.WriteLine($"{stopwatch.ElapsedMilliseconds}ms | {hotels?.Count ?? 0} hotéis | Status: {response.StatusCode}");
                    }
                    else
                    {
                        stopwatch.Stop();
                        Console.WriteLine($"❌ ERRO: {response.StatusCode} - {response.ReasonPhrase}");
                    }
                }
                catch (Exception ex)
                {
                    stopwatch.Stop();
                    Console.WriteLine($"❌ EXCEÇÃO: {ex.Message}");
                }

                // Aguardar entre requisições para não sobrecarregar
                await Task.Delay(500);
            }

            // Análise dos resultados
            Console.WriteLine();
            Console.WriteLine("📊 ANÁLISE DOS RESULTADOS:");
            Console.WriteLine(new string('-', 40));

            if (results.Count > 0)
            {
                var min = results.Min();
                var max = results.Max();
                var avg = results.Average();
                var median = CalculateMedian(results);

                Console.WriteLine($"⏱️  Tempo Mínimo:   {min}ms");
                Console.WriteLine($"⏱️  Tempo Máximo:   {max}ms");
                Console.WriteLine($"⏱️  Tempo Médio:    {avg:F1}ms");
                Console.WriteLine($"⏱️  Mediana:        {median:F1}ms");
                Console.WriteLine();

                // Classificação de performance
                ClassifyPerformance(avg);

                // Diagnóstico
                Console.WriteLine("🔧 POSSÍVEIS CAUSAS DE LENTIDÃO:");
                Console.WriteLine(new string('-', 40));
                AnalyzePossibleCauses(avg);
            }
            else
            {
                Console.WriteLine("❌ Nenhum teste foi bem-sucedido.");
            }
        }

        private static double CalculateMedian(List<long> values)
        {
            var sorted = values.OrderBy(x => x).ToList();
            var count = sorted.Count;

            if (count % 2 == 0)
            {
                return (sorted[count / 2 - 1] + sorted[count / 2]) / 2.0;
            }
            else
            {
                return sorted[count / 2];
            }
        }

        private static void ClassifyPerformance(double avgTime)
        {
            Console.WriteLine("🎯 CLASSIFICAÇÃO DE PERFORMANCE:");
            Console.WriteLine(new string('-', 40));

            if (avgTime <= 100)
            {
                Console.WriteLine("✅ EXCELENTE: Tempo de resposta muito bom (≤100ms)");
            }
            else if (avgTime <= 200)
            {
                Console.WriteLine("✅ BOM: Tempo de resposta aceitável (≤200ms)");
            }
            else if (avgTime <= 500)
            {
                Console.WriteLine("⚠️  MODERADO: Tempo de resposta alto (≤500ms)");
                Console.WriteLine("   📝 Considere otimizações");
            }
            else if (avgTime <= 1000)
            {
                Console.WriteLine("❌ RUIM: Tempo de resposta muito alto (≤1s)");
                Console.WriteLine("   🚨 Necessita otimização urgente");
            }
            else
            {
                Console.WriteLine("🔴 CRÍTICO: Tempo de resposta inaceitável (>1s)");
                Console.WriteLine("   ⚡ Refatoração necessária");
            }
            Console.WriteLine();
        }

        private static void AnalyzePossibleCauses(double avgTime)
        {
            if (avgTime > 200)
            {
                Console.WriteLine("1. 🗄️  BANCO DE DADOS:");
                Console.WriteLine("   • Query não otimizada (Include com Rooms)");
                Console.WriteLine("   • Falta de índices");
                Console.WriteLine("   • Muitos dados sendo carregados");
                Console.WriteLine("   • N+1 Query Problem");
                Console.WriteLine();

                Console.WriteLine("2. 🔄 ENTITY FRAMEWORK:");
                Console.WriteLine("   • AsNoTracking() não utilizado");
                Console.WriteLine("   • Eager Loading desnecessário");
                Console.WriteLine("   • AutoMapper overhead");
                Console.WriteLine();

                Console.WriteLine("3. 🌐 REDE/INFRAESTRUTURA:");
                Console.WriteLine("   • Latência de rede");
                Console.WriteLine("   • Servidor sobrecarregado");
                Console.WriteLine("   • Garbage Collection");
                Console.WriteLine();

                Console.WriteLine("4. 📊 VOLUME DE DADOS:");
                Console.WriteLine("   • Muitos hotéis na base");
                Console.WriteLine("   • Muitos quartos por hotel");
                Console.WriteLine("   • Campos desnecessários sendo transferidos");
                Console.WriteLine();

                Console.WriteLine("🔧 SOLUÇÕES RECOMENDADAS:");
                Console.WriteLine(new string('-', 40));
                Console.WriteLine("✅ Implementar paginação");
                Console.WriteLine("✅ Usar AsNoTracking()");
                Console.WriteLine("✅ Implementar cache (Redis/Memory)");
                Console.WriteLine("✅ Projections/Select específicos");
                Console.WriteLine("✅ Índices no banco");
                Console.WriteLine("✅ Lazy loading otimizado");
                Console.WriteLine("✅ Response compression");
            }
        }
    }

    // Classe para deserializar a resposta da API
    public class HotelResponse
    {
        public int HotelId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public int Stars { get; set; }
        public List<RoomResponse>? Rooms { get; set; }
    }

    public class RoomResponse
    {
        public int RoomId { get; set; }
        public string TypeName { get; set; } = string.Empty;
        public decimal AverageDailyPrice { get; set; }
        public int Capacity { get; set; }
    }
}
