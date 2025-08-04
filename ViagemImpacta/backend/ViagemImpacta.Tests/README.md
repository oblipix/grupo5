# ViagemImpacta.Tests

## 📋 Projeto de Testes Reorganizado

Este projeto contém todos os testes unitários e de integração da aplicação ViagemImpacta, seguindo as melhores práticas de organização de código.

## 🔄 Reorganização Realizada

### ✅ Movido para Testes

- **DebugController**: Funcionalidade de debug movida de `Controllers/ApiControllers/DebugController.cs` para `Controllers/DebugControllerTests.cs`
- **Testes de Performance**: Organizados nos projetos `PerformanceTests` e `PerformanceAnalysis`
- **Análise de Database**: Organizada no projeto `DatabaseAnalysis`

### 📁 Estrutura do Projeto

```
ViagemImpacta.Tests/
├── Controllers/
│   ├── DebugControllerTests.cs      # Testes de funcionalidades de debug
│   └── [outros controller tests]
├── DTOs/
│   └── [testes de DTOs]
├── Mappings/
│   └── [testes de mapeamentos]
├── Services/
│   └── [testes de serviços]
└── Repositories/
    └── [testes de repositórios]
```

## 🧪 Tipos de Teste

### Unit Tests

- **Controllers**: Testes de API controllers
- **Services**: Testes de lógica de negócio
- **Repositories**: Testes de acesso a dados
- **DTOs**: Testes de mapeamento e validação

### Integration Tests

- **API Endpoints**: Testes end-to-end
- **Database**: Testes de integração com banco

### Performance Tests

- **Load Testing**: Testes de carga
- **Stress Testing**: Testes de estresse
- **Database Performance**: Análise de performance do banco

## 🛠️ Ferramentas Utilizadas

- **xUnit**: Framework de testes
- **FluentAssertions**: Assertions mais legíveis
- **Moq**: Mocking framework
- **AutoMapper**: Testes de mapeamento

## 🚀 Como Executar

### Todos os Testes

```bash
dotnet test
```

### Testes Específicos

```bash
# Testes de Controller
dotnet test --filter "FullyQualifiedName~Controllers"

# Testes de Debug
dotnet test --filter "FullyQualifiedName~DebugControllerTests"
```

### Com Coverage

```bash
dotnet test --collect:"XPlat Code Coverage"
```

## 📊 Projetos de Análise

### DatabaseAnalysis

- Análise de performance do banco de dados
- Identificação de gargalos
- Otimização de queries

### PerformanceAnalysis

- Análise de performance da aplicação
- Profiling de memória e CPU
- Benchmark de endpoints

### PerformanceTests

- Testes automatizados de performance
- Testes de carga e estresse
- Monitoramento contínuo

## ⚠️ Importante

- **DebugController**: Mantido no projeto principal apenas para compatibilidade. **DEVE SER REMOVIDO EM PRODUÇÃO**.
- **Testes de Debug**: Usar `DebugControllerTests.cs` em vez do endpoint de debug.
- **Organização**: Seguir a estrutura de pastas para manter organização.

## 🎯 Próximos Passos

1. ✅ Mover funcionalidades de debug para testes
2. ✅ Organizar projetos de análise na solução
3. 🔄 Adicionar mais testes unitários
4. 🔄 Implementar testes de integração
5. 🔄 Remover DebugController do projeto principal
