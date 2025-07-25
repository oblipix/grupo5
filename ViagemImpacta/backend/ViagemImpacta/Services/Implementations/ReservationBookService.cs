using AutoMapper;
using ViagemImpacta.DTO.ReservationBook;
using ViagemImpacta.Repositories;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Services.Implementations
{
    /// <summary>
    /// Service responsável pela lógica de negócio de pacotes de viagem
    /// Retorna DTOs organizados por entidade para proteger as entidades
    /// </summary>
    public class ReservationBookService : IReservationBookService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ReservationBookService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        /// <summary>
        /// Retorna todos os pacotes ativos como DTOs de listagem
        /// </summary>
        public async Task<IEnumerable<ReservationBookListResponse>> GetAllPackagesAsync()
        {
            var packages = await _unitOfWork.ReservationBooks.GetActivePackagesAsync();
            return _mapper.Map<IEnumerable<ReservationBookListResponse>>(packages);
        }

        /// <summary>
        /// Retorna pacote específico com detalhes completos como DTO
        /// </summary>
        public async Task<ReservationBookResponse?> GetPackageByIdAsync(int id)
        {
            var package = await _unitOfWork.ReservationBooks.GetPackageWithDetailsAsync(id);
            
            if (package == null)
                return null;
            
            return _mapper.Map<ReservationBookResponse>(package);
        }

        /// <summary>
        /// Busca pacotes com filtros e retorna DTOs de listagem
        /// </summary>
        public async Task<IEnumerable<ReservationBookListResponse>> GetPackagesWithFiltersAsync(
            string? destination = null,
            decimal? minPrice = null,
            decimal? maxPrice = null,
            DateTime? checkIn = null,
            DateTime? checkOut = null,
            bool? promotion = null,
            int skip = 0,
            int take = 10)
        {
            var packages = await _unitOfWork.ReservationBooks.GetActivePackagesAsync();
            var filtered = packages.AsQueryable();
            
            if (!string.IsNullOrEmpty(destination))
                filtered = filtered.Where(p =>
                    p.Destination != null && p.Destination.Contains(destination, StringComparison.OrdinalIgnoreCase));
            
            if (minPrice.HasValue)
                filtered = filtered.Where(p => p.FinalPrice >= minPrice.Value);
            
            if (maxPrice.HasValue)
                filtered = filtered.Where(p => p.FinalPrice <= maxPrice.Value);
            
            if (checkIn.HasValue)
                filtered = filtered.Where(p => p.CheckIn >= checkIn.Value);
            
            if (checkOut.HasValue)
                filtered = filtered.Where(p => p.CheckOut <= checkOut.Value);
            
            if (promotion.HasValue)
                filtered = filtered.Where(p => p.Promotion == promotion.Value);
            
            var paginatedPackages = filtered.Skip(skip).Take(take).ToList();
            
            return _mapper.Map<IEnumerable<ReservationBookListResponse>>(paginatedPackages);
        }

        /// <summary>
        /// Busca pacotes por termo e retorna DTOs de listagem
        /// </summary>
        public async Task<IEnumerable<ReservationBookListResponse>> SearchPackagesAsync(string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                return Enumerable.Empty<ReservationBookListResponse>();

            var packages = await _unitOfWork.ReservationBooks.SearchPackagesAsync(searchTerm.Trim());
            
            return _mapper.Map<IEnumerable<ReservationBookListResponse>>(packages);
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