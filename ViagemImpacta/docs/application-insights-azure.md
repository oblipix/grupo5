# 🔍 **Application Insights - Integração Azure**

## 📊 **Status da Implementação**

✅ **Pacote Instalado**: Microsoft.ApplicationInsights.AspNetCore v2.23.0  
✅ **Configuração**: Connection String configurada para Azure  
✅ **Logs Estruturados**: Integração com sistema fail-fast existente  
✅ **Telemetria Automática**: Requests, dependencies, exceptions

## 🚀 **O que Foi Configurado**

### **1. Pacote NuGet**

```bash
dotnet add package Microsoft.ApplicationInsights.AspNetCore
```

### **2. Configuração no Program.cs**

```csharp
// Application Insights
builder.Services.AddApplicationInsightsTelemetry();
```

### **3. Connection String no appsettings.json**

```json
{
  "ApplicationInsights": {
    "ConnectionString": "InstrumentationKey=e8df2519-f49f-4de7-9d99-07aeaf040f9a;IngestionEndpoint=https://southcentralus-3.in.applicationinsights.azure.com/;LiveEndpoint=https://southcentralus.livediagnostics.monitor.azure.com/;ApplicationId=4e6bcfea-2904-4266-b125-36d689887340"
  }
}
```

## 📈 **Telemetria Coletada Automaticamente**

### **🔄 Requests**

- HTTP requests (GET, POST, PUT, DELETE)
- Response times e status codes
- URLs e user agents
- Performance metrics

### **🔗 Dependencies**

- SQL Server queries (Entity Framework)
- HTTP calls para APIs externas
- Tempo de resposta do banco de dados

### **❌ Exceptions**

- Unhandled exceptions
- Stack traces completos
- Context da requisição

### **📊 Performance Counters**

- CPU usage
- Memory usage
- Request rate
- Response time

## 🎯 **Logs Customizados Fail-Fast**

O sistema de logs que implementamos **automaticamente se integra** com Application Insights:

```csharp
// Todos estes logs vão para Application Insights
_logger.LogWarning("🚀 FAIL-FAST: {ValidationType} | Reason: {Reason} | Time: {ElapsedMs}ms | Status: {Status}",
    "NegativeMinPrice", $"MinPrice negative: {minPrice}", stopwatch.ElapsedMilliseconds, "BLOCKED");

_logger.LogInformation("✅ VALIDATIONS: All passed | Time: {ElapsedMs}ms | Status: {Status}",
    stopwatch.ElapsedMilliseconds, "PROCEEDING");

_logger.LogInformation("🎯 SEARCH: Success | Results: {ResultCount} | Time: {ElapsedMs}ms | Filters: {Filters}",
    hotels.Count(), stopwatch.ElapsedMilliseconds, filterSummary);
```

## 🔍 **Como Monitorar no Azure**

### **1. Portal Azure**

1. Acesse: https://portal.azure.com
2. Vá para **Application Insights**
3. Selecione seu recurso: **ApplicationId: 4e6bcfea-2904-4266-b125-36d689887340**

### **2. Principais Dashboards**

#### **📊 Live Metrics**

- Requests em tempo real
- Performance counters
- Falhas instantâneas

#### **🔍 Logs (KQL Queries)**

```kusto
// Logs de Fail-Fast
traces
| where message contains "FAIL-FAST"
| project timestamp, message, severityLevel
| order by timestamp desc

// Performance de buscas
traces
| where message contains "SEARCH: Success"
| project timestamp, message
| order by timestamp desc

// Requests mais lentos
requests
| where duration > 1000
| project timestamp, name, duration, resultCode
| order by duration desc
```

#### **📈 Performance**

- Response time trends
- Dependency call duration
- Failure rate analysis

#### **🔔 Availability**

- Uptime monitoring
- Geographic performance
- Synthetic transactions

## ⚡ **Queries Úteis para Fail-Fast**

### **Contagem de Fail-Fast por Tipo**

```kusto
traces
| where message contains "FAIL-FAST"
| extend ValidationType = extract("FAIL-FAST: ([^|]+)", 1, message)
| summarize count() by ValidationType
| render piechart
```

### **Performance Timeline**

```kusto
traces
| where message contains "SEARCH: Success"
| extend Duration = extract("Time: ([0-9]+)ms", 1, message)
| extend DurationInt = toint(Duration)
| project timestamp, DurationInt
| render timechart
```

### **Top Erros Bloqueados**

```kusto
traces
| where message contains "BLOCKED"
| extend Reason = extract("Reason: ([^|]+)", 1, message)
| summarize count() by Reason
| order by count_ desc
```

## 🎯 **Benefícios da Integração**

### **🔍 Visibilidade Total**

- **Fail-Fast metrics** em dashboards profissionais
- **Performance insights** em tempo real
- **Error tracking** automático

### **📊 Business Intelligence**

- **Pattern detection** em inputs inválidos
- **User behavior analysis**
- **API usage statistics**

### **🚨 Alertas Proativos**

- **Response time** > threshold
- **Error rate** spikes
- **Dependency failures**

### **💰 Cost Optimization**

- **Resource usage** insights
- **Scaling decisions** baseadas em dados
- **Performance bottlenecks** identification

## 🛠️ **Configurações Adicionais Recomendadas**

### **1. Sampling (para reduzir custos)**

```csharp
builder.Services.Configure<TelemetryConfiguration>(config =>
{
    config.DefaultTelemetrySink.TelemetryProcessorChainBuilder
        .UseAdaptiveSampling(maxTelemetryItemsPerSecond: 5)
        .Build();
});
```

### **2. Custom Properties**

```csharp
_logger.LogInformation("Hotel search completed for {Destination} with {ResultCount} results",
    destination, resultCount);
```

### **3. Dependecy Tracking**

```csharp
// Já habilitado automaticamente para:
// - SQL Server (Entity Framework)
// - HTTP calls
// - Redis (se usado)
```

## 🎉 **Resultado Final**

Seu projeto agora tem:
✅ **Monitoramento profissional** Azure Application Insights  
✅ **Logs estruturados** integrados  
✅ **Performance tracking** em tempo real  
✅ **Fail-fast analytics** visualizáveis  
✅ **Production-ready** observability

**🚀 Pronto para Azure deployment com observabilidade enterprise!**

---

## 🔥 **TESTE DE PERFORMANCE - SISTEMA DE BUSCA**

### **📊 Estratégia de Teste Implementada**

Criamos um **teste de performance nativo em C#** que foca especificamente no seu **sistema de busca** e **fail-fast validation**. O teste simula **50 usuários simultâneos** e mede:

#### **🎯 Endpoints Testados:**

1. **Buscas Válidas** (esperado: 100-800ms)

   - `/api/hotels/search?destination=Rio`
   - `/api/hotels/search?destination=São Paulo&stars=4`
   - `/api/hotels/search?destination=Brasília&minPrice=200&maxPrice=800`

2. **Fail-Fast Validation** (esperado: 1-5ms)
   - `/api/debug/test-failfast?minPrice=-100` (preço negativo)
   - `/api/debug/test-failfast?stars=10` (estrelas inválidas)
   - `/api/debug/test-failfast?guests=0` (hóspedes inválidos)

#### **🏗️ Estrutura do Teste:**

- **FASE 1: Warm-up** - 10 requests sequenciais
- **FASE 2: Load Test** - 50 usuários simultâneos por 2 minutos
- **FASE 3: Overload** - 100 requests simultâneos

### **🚀 Como Executar o Teste:**

#### **1. Certifique-se que a API está rodando:**

```bash
cd C:\Users\r.pessoa.de.melo\Desktop\Prof Juan\Sprint01\ViagemImpacta\ViagemImpacta\backend\ViagemImpacta
dotnet run
```

#### **2. Execute o teste de performance:**

```bash
cd C:\Users\r.pessoa.de.melo\Desktop\Prof Juan\Sprint01\ViagemImpacta\ViagemImpacta\backend\PerformanceTests
dotnet run
```

### **📈 Métricas Coletadas:**

#### **🎯 Performance Metrics:**

- **Response Time**: Average, Min, Max, P95, P99
- **Success Rate**: % de requests bem-sucedidos
- **Throughput**: Requests per second
- **Error Rate**: % de falhas

#### **📊 Application Insights Integration:**

- **Todos os requests** vão automaticamente para Azure
- **Logs fail-fast** aparecem em tempo real
- **Performance counters** são coletados

### **🔍 Interpretando os Resultados:**

#### **✅ Resultados Esperados:**

```
📊 LOAD TEST RESULTS:
================================
Total Requests: 1,500
✅ Successful: 1,485 (99.0%)
❌ Failed: 15 (1.0%)
⚡ Response Times:
   • Average: 45ms
   • P95: 300ms
   • P99: 800ms

🎯 Performance por Endpoint:
   FailFast Preço Negativo: 450 reqs | Avg: 2ms
   FailFast Stars Inválido: 420 reqs | Avg: 3ms
   Busca Básica Rio: 315 reqs | Avg: 250ms
   Busca SP com Stars: 315 reqs | Avg: 280ms
```

#### **🚨 Sinais de Alerta:**

- **Fail-fast > 50ms**: Problema na validação
- **Busca > 1000ms**: Otimizar queries do banco
- **Error rate > 5%**: Investigar logs
- **Memory spike**: Possível memory leak

### **🔗 Monitoramento em Tempo Real:**

#### **1. Durante o teste, acesse:**

- **Application Insights**: https://portal.azure.com
- **ApplicationId**: `4e6bcfea-2904-4266-b125-36d689887340`
- **Live Metrics**: Para ver requests em tempo real

#### **2. Queries úteis no Application Insights:**

```kusto
// Performance durante o teste
requests
| where timestamp > ago(10m)
| summarize avg(duration), max(duration), count() by bin(timestamp, 30s)
| render timechart

// Fail-fast effectiveness
traces
| where message contains "FAIL-FAST"
| where timestamp > ago(10m)
| summarize count() by bin(timestamp, 30s)
| render timechart
```

### **💡 Vantagens deste Approach:**

1. **🎯 Específico**: Testa exatamente seu sistema de busca
2. **🔄 Integrado**: Usa Application Insights que já está configurado
3. **📊 Detalhado**: Métricas por endpoint e por fase
4. **🚀 Realista**: Simula comportamento real de usuários
5. **🛠️ Nativo**: C# - não precisa ferramentas externas

### **🎯 Próximos Passos:**

1. **Execute o teste** e analise os resultados
2. **Verifique Application Insights** para métricas detalhadas
3. **Ajuste parâmetros** baseado nos resultados
4. **Configure alerts** para production monitoring
