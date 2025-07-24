using AutoMapper;
using GerenciadorDeProjetos.Repositories.Interfaces;
using ViagemImpacta.DTO.TravelPackage;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Services
{
    /// <summary>
    /// Service responsável pela lógica de negócio de pacotes de viagem
    /// Retorna DTOs organizados por entidade para proteger as entidades
    /// </summary>
    public class TravelPackageService : ITravelPackageService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public TravelPackageService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        /// <summary>
        /// Retorna todos os pacotes ativos como DTOs de listagem
        /// </summary>
        public async Task<IEnumerable<TravelPackageListResponse>> GetAllPackagesAsync()
        {
            var packages = await _unitOfWork.TravelPackages.GetActivePackagesAsync();
            return _mapper.Map<IEnumerable<TravelPackageListResponse>>(packages);
        }

        /// <summary>
        /// Retorna pacote específico com detalhes completos como DTO
        /// </summary>
        public async Task<TravelPackageResponse?> GetPackageByIdAsync(int id)
        {
            var package = await _unitOfWork.TravelPackages.GetPackageWithDetailsAsync(id);
            
            if (package == null)
                return null;
            
            return _mapper.Map<TravelPackageResponse>(package);
        }

        /// <summary>
        /// Busca pacotes com filtros e retorna DTOs de listagem
        /// </summary>
        public async Task<IEnumerable<TravelPackageListResponse>> GetPackagesWithFiltersAsync(
            string? destination = null,
            decimal? minPrice = null,
            decimal? maxPrice = null,
            DateTime? startDate = null,
            DateTime? endDate = null,
            bool? promotion = null,
            int skip = 0,
            int take = 10)
        {
            var packages = await _unitOfWork.TravelPackages.GetActivePackagesAsync();
            var filtered = packages.AsQueryable();
            
            if (!string.IsNullOrEmpty(destination))
                filtered = filtered.Where(p =>
                    p.Destination != null && p.Destination.Contains(destination, StringComparison.OrdinalIgnoreCase));
            
            if (minPrice.HasValue)
                filtered = filtered.Where(p => p.Price >= minPrice.Value);
            
            if (maxPrice.HasValue)
                filtered = filtered.Where(p => p.Price <= maxPrice.Value);
            
            if (startDate.HasValue)
                filtered = filtered.Where(p => p.StartDate >= startDate.Value);
            
            if (endDate.HasValue)
                filtered = filtered.Where(p => p.EndDate <= endDate.Value);
            
            if (promotion.HasValue)
                filtered = filtered.Where(p => p.Promotion == promotion.Value);
            
            var paginatedPackages = filtered.Skip(skip).Take(take).ToList();
            
            return _mapper.Map<IEnumerable<TravelPackageListResponse>>(paginatedPackages);
        }

        /// <summary>
        /// Busca pacotes por termo e retorna DTOs de listagem
        /// </summary>
        public async Task<IEnumerable<TravelPackageListResponse>> SearchPackagesAsync(string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                return Enumerable.Empty<TravelPackageListResponse>();

            var packages = await _unitOfWork.TravelPackages.SearchPackagesAsync(searchTerm.Trim());
            
            return _mapper.Map<IEnumerable<TravelPackageListResponse>>(packages);
        }
    }
}

    /*
     🎓 GUIA COMPLETO - SERVICE LAYER
     
     1. 🏗️ O QUE É UM SERVICE?
        - Camada intermediária entre Controller e Repository
        - Contém LÓGICA DE NEGÓCIO da aplicação
        - Coordena operações complexas
        - Aplica validações de domínio
        - Orquestra múltiplos repositories quando necessário
     
     2. 🎯 RESPONSABILIDADES DO SERVICE:
        ✅ Implementar regras de negócio
        ✅ Validar dados de entrada
        ✅ Coordenar operações entre repositories
        ✅ Transformar dados entre camadas
        ✅ Aplicar cálculos de domínio
        ❌ NÃO fazer queries diretas ao banco
        ❌ NÃO retornar dados HTTP específicos
        ❌ NÃO conter lógica de apresentação
     
     3. 🔧 DEPENDENCY INJECTION NO SERVICE:
        - Service recebe dependências via construtor
        - UnitOfWork coordena múltiplos repositories
        - Permite testes unitários (mock das dependências)
        - Lifecycle: Scoped (uma instância por request)
     
     4. 🛡️ VALIDAÇÕES DE NEGÓCIO:
        - Sempre validar parâmetros de entrada
        - Retornar valores seguros (lista vazia vs exception)
        - Aplicar regras de domínio específicas
        - Exemplo: searchTerm vazio = lista vazia
     
     5. ⚡ CONSIDERAÇÕES DE PERFORMANCE:
        ✅ Delegar queries complexas para Repository
        ✅ Usar Include apenas quando necessário
        ✅ Aplicar filtros no banco, não em memória
        ❌ Não buscar todos os dados e filtrar depois (problema atual)
        ❌ Não fazer múltiplas queries desnecessárias
     
     6. 🎨 PADRÕES APLICADOS:
        - Service Layer Pattern
        - Dependency Injection
        - Repository Pattern (via UnitOfWork)
        - Domain Validation
        - Fail-Safe Defaults
     
     7. 🧪 COMO TESTAR SERVICES:
        - Mock do IUnitOfWork
        - Testar regras de negócio isoladamente
        - Verificar validações de entrada
        - Teste de cenários de erro
        
        Exemplo:    ```csharp
    [Test]
    public async Task SearchPackagesAsync_EmptyTerm_ReturnsEmpty()
    {
        var result = await service.SearchPackagesAsync("");
        Assert.That(result, Is.Empty);
    }
}
*/