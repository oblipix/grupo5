using GerenciadorDeProjetos.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.Models;

namespace ViagemImpacta.Controllers.ApiControllers
{
    /// <summary>
    /// 📋 CONTROLLER PARA ESTAGIÁRIOS - API de Hotéis
    /// 
    /// Este controller gerencia operações CRUD para hotéis através de API RESTful.
    /// Demonstra padrões fundamentais de desenvolvimento web com ASP.NET Core.
    /// 
    /// 🎯 FUNCIONALIDADES:
    /// - Listar todos os hotéis
    /// - Buscar hotel por ID
    /// - Filtrar hotéis por estrelas
    /// - Filtrar por comodidades (WiFi, Estacionamento, Academia)
    /// 
    /// 🏗️ ARQUITETURA:
    /// Controller → UnitOfWork → Repository → Entity Framework → Database
    /// 
    /// 📚 CONCEITOS DEMONSTRADOS:
    /// - REST API com verbos HTTP
    /// - Dependency Injection
    /// - Validação de entrada
    /// - Status codes HTTP
    /// - Query parameters
    /// - Async/await patterns
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class HotelsController : ControllerBase
    {
        // 🔧 DEPENDENCY INJECTION
        // UnitOfWork centraliza acesso a todos os repositories
        // Injected pelo container DI do ASP.NET Core
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>
        /// 🏗️ CONSTRUTOR com Dependency Injection
        /// 
        /// CONCEITO: O ASP.NET Core resolve automaticamente as dependências
        /// registradas no Program.cs e injeta no construtor.
        /// 
        /// BENEFÍCIOS:
        /// - Desacoplamento entre camadas
        /// - Facilita testes unitários (mock das dependências)
        /// - Lifecycle management automático
        /// </summary>
        public HotelsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// 📋 ENDPOINT: Listar todos os hotéis
        /// 
        /// 🎯 PROPÓSITO:
        /// Retorna lista completa de hotéis cadastrados no sistema
        /// 
        /// 🌐 EXEMPLO DE USO:
        /// GET /api/hotels
        /// 
        /// 📊 RESPONSE:
        /// 200 OK com array de objetos Hotel
        /// Cada hotel inclui: ID, Nome, Localização, Estrelas, Comodidades
        /// 
        /// 🔍 IMPLEMENTAÇÃO:
        /// - Usa método GetAllAsync() do repository genérico
        /// - Async para não bloquear thread durante I/O
        /// - Retorna todos os hotéis (sem paginação para simplificar)
        /// </summary>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Hotel>>> GetAllHotels()
        {
            // 🎯 DELEGAÇÃO PARA REPOSITORY VIA UNITOFWORK
            // UnitOfWork.Hotels acessa o HotelRepository
            // GetAllAsync() é herdado do Repository<Hotel> genérico
            var hotels = await _unitOfWork.Hotels.GetAllAsync();
            
            // ✅ RETORNO PADRONIZADO
            // Ok() = 200 HTTP Status Code
            // Serialização automática para JSON
            return Ok(hotels);
        }

        /// <summary>
        /// 📋 ENDPOINT: Buscar hotel específico por ID
        /// 
        /// 🎯 PROPÓSITO:
        /// Retorna detalhes completos de um hotel específico
        /// 
        /// 🔧 PARÂMETROS:
        /// - id: Identificador único do hotel (vem da rota)
        /// 
        /// 🌐 EXEMPLOS DE USO:
        /// GET /api/hotels/1     → Hotel com ID 1
        /// GET /api/hotels/999   → 404 se não existir
        /// GET /api/hotels/0     → 400 Bad Request
        /// 
        /// 📊 RESPONSES:
        /// 200 OK: Hotel encontrado
        /// 400 Bad Request: ID inválido
        /// 404 Not Found: Hotel não existe
        /// 
        /// 🛡️ VALIDAÇÕES:
        /// - ID deve ser número positivo
        /// - Verificação de existência antes de retornar
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Hotel>> GetHotel(int id)
        {
            // 🛡️ VALIDAÇÃO DE ENTRADA
            // REGRA: IDs devem ser números positivos
            if (id <= 0) 
                return BadRequest("ID deve ser maior que zero");

            // 🔍 BUSCA NO REPOSITORY
            // GetByIdAsync() é método do repository genérico
            var hotel = await _unitOfWork.Hotels.GetByIdAsync(id);
            
            // 🚫 VERIFICAÇÃO DE EXISTÊNCIA
            // Se hotel não existe, retorna 404 com mensagem descritiva
            if (hotel == null) 
                return NotFound($"Hotel com ID {id} não encontrado");
                
            // ✅ SUCESSO
            return Ok(hotel);
        }

        /// <summary>
        /// 📋 ENDPOINT: Filtrar hotéis por número de estrelas
        /// 
        /// 🎯 PROPÓSITO:
        /// Permite buscar hotéis de uma categoria específica (1-5 estrelas)
        /// 
        /// 🔧 PARÂMETROS:
        /// - stars: Número de estrelas (1 a 5)
        /// 
        /// 🌐 EXEMPLOS DE USO:
        /// GET /api/hotels/stars/5    → Hotéis 5 estrelas
        /// GET /api/hotels/stars/4    → Hotéis 4 estrelas
        /// GET /api/hotels/stars/0    → 400 Bad Request
        /// 
        /// 📊 RESPONSE:
        /// 200 OK com array de hotéis da categoria solicitada
        /// 
        /// 🔍 IMPLEMENTAÇÃO:
        /// - Usa método específico GetHotelsByStarsAsync()
        /// - Validação de range (1-5 estrelas)
        /// - Query otimizada no banco de dados
        /// </summary>
        [HttpGet("stars/{stars}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<Hotel>>> GetHotelsByStars(int stars)
        {
            // 🛡️ VALIDAÇÃO DE REGRA DE NEGÓCIO
            // Hotéis são classificados de 1 a 5 estrelas
            if (stars < 1 || stars > 5) 
                return BadRequest("Estrelas devem ser entre 1 e 5");

            // 🎯 BUSCA ESPECÍFICA
            // Método implementado no HotelRepository
            // WHERE Stars = @stars no SQL
            var hotels = await _unitOfWork.Hotels.GetHotelsByStarsAsync(stars);
            
            // ✅ RETORNO
            // Sempre 200 OK, mesmo se array vazio
            return Ok(hotels);
        }

        /// <summary>
        /// 📋 ENDPOINT: Filtrar hotéis por comodidades
        /// 
        /// 🎯 PROPÓSITO:
        /// Permite buscar hotéis que possuem comodidades específicas
        /// Útil para clientes com necessidades especiais
        /// 
        /// 🔧 QUERY PARAMETERS:
        /// - wifi: true para hotéis com WiFi
        /// - parking: true para hotéis com estacionamento  
        /// - gym: true para hotéis com academia
        /// 
        /// 🌐 EXEMPLOS DE USO:
        /// GET /api/hotels/amenities?wifi=true                    → Hotéis com WiFi
        /// GET /api/hotels/amenities?parking=true&gym=true       → Com estacionamento E academia
        /// GET /api/hotels/amenities?wifi=true&parking=true&gym=true → Com todas as comodidades
        /// GET /api/hotels/amenities                              → Todos os hotéis (sem filtros)
        /// 
        /// 📊 RESPONSE:
        /// 200 OK com hotéis que atendem aos critérios
        /// 
        /// 🔍 LÓGICA:
        /// - Parâmetros opcionais (default = false)
        /// - Combina filtros com AND lógico
        /// - Query otimizada no banco de dados
        /// </summary>
        [HttpGet("amenities")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Hotel>>> GetHotelsWithAmenities(
            [FromQuery] bool wifi = false,      // 📶 WiFi gratuito
            [FromQuery] bool parking = false,   // 🚗 Estacionamento
            [FromQuery] bool gym = false)       // 💪 Academia/Fitness
        {
            // 🎯 BUSCA COM MÚLTIPLOS FILTROS
            // Método específico que combina os filtros
            // SQL: WHERE (NOT @wifi OR Wifi = 1) AND (NOT @parking OR Parking = 1) AND...
            var hotels = await _unitOfWork.Hotels.GetHotelsWithAmenitiesAsync(wifi, parking, gym);
            
            // ✅ RETORNO
            return Ok(hotels);
        }
    }

    /*
     🎓 GUIA DE ESTUDOS:
     
     1. 🏗️ PADRÃO REPOSITORY + UNIT OF WORK:
        - Repository: Encapsula lógica de acesso a dados
        - Unit of Work: Coordena múltiplos repositories
        - Benefícios: Testabilidade, separação de responsabilidades
        - UnitOfWork.Hotels.GetAllAsync() vs direct DbContext access
     
     2. 🔧 DEPENDENCY INJECTION NO ASP.NET CORE:
        - Registrado no Program.cs com AddScoped
        - Resolved automaticamente no construtor
        - Scoped = uma instância por HTTP request
        - Facilita testes (mock das dependências)
     
     3. 🌐 REST API BEST PRACTICES:
        - GET para leitura (não modifica dados)
        - URLs semânticas (/hotels, /hotels/5, /hotels/stars/4)
        - Status codes apropriados (200, 400, 404)
        - Query parameters para filtros opcionais
        - Consistent response format
     
     4. 🛡️ VALIDAÇÃO E TRATAMENTO DE ERROS:
        - Validar entrada ANTES de processar
        - Mensagens de erro claras e úteis
        - Status codes semânticos
        - BadRequest(400) para dados inválidos
        - NotFound(404) para recursos inexistentes
     
     5. ⚡ PERFORMANCE CONSIDERATIONS:
        - Async/await para operações I/O
        - Queries específicas (GetHotelsByStarsAsync)
        - Evitar N+1 queries com Include()
        - Considerar paginação para grandes datasets
     
     6. 📊 HTTP STATUS CODES:
        - 200 OK: Sucesso com dados
        - 400 Bad Request: Dados de entrada inválidos
        - 404 Not Found: Recurso não encontrado
        - 500 Internal Server Error: Erro no servidor
     
     7. 🔍 QUERY PATTERNS DEMONSTRADOS:
        - GetAllAsync(): SELECT * FROM Hotels
        - GetByIdAsync(id): SELECT * FROM Hotels WHERE Id = @id
        - GetHotelsByStarsAsync(stars): SELECT * WHERE Stars = @stars
        - GetHotelsWithAmenitiesAsync(): WHERE com múltiplas condições
     
     8. 🧪 COMO TESTAR:
        - Swagger UI: /swagger
        - Postman/Insomnia
        - curl commands
        - Testes unitários com mocks
     
     🚀 EXERCÍCIOS PARA PRATICAR:
     1. Implementar endpoint para buscar hotéis por localização
     2. Adicionar paginação (skip/take) no GetAllHotels
     3. Criar endpoint para buscar hotéis por faixa de preço
     4. Implementar cache para melhorar performance
     5. Adicionar logging para auditoria
     6. Escrever testes unitários para os endpoints
     
     📚 PRÓXIMOS CONCEITOS PARA ESTUDAR:
     - Autenticação e autorização (JWT)
     - Middleware customizado
     - Rate limiting
     - API versioning
     - CORS configuration
     - Health checks
     */
}
