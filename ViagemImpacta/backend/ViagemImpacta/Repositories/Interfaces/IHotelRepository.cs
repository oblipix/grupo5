using ViagemImpacta.Models;

namespace ViagemImpacta.Repositories.Interfaces
{
    /// <summary>
    /// 📋 INTERFACE PARA ESTAGIÁRIOS - Repository de Hotéis
    /// 
    /// Esta interface define o contrato para operações específicas de hotéis,
    /// além das operações CRUD básicas herdadas de IRepository<Hotel>.
    /// 
    /// 🎯 CONCEITOS DEMONSTRADOS:
    /// - Interface Segregation Principle (ISP)
    /// - Herança de interfaces
    /// - Métodos específicos de domínio
    /// - Assinatura de métodos async
    /// 
    /// 🔍 MÉTODOS ESPECÍFICOS:
    /// Cada método representa uma consulta otimizada para um caso de uso específico
    /// </summary>
    public interface IHotelRepository : IRepository<Hotel>
    {
        /// <summary>
        /// 🎯 Busca hotéis por número de estrelas
        /// 
        /// PROPÓSITO: Filtrar hotéis por categoria/qualidade
        /// SQL: SELECT * FROM Hotels WHERE Stars = @stars
        /// </summary>
        /// <param name="stars">Número de estrelas (1-5)</param>
        /// <returns>Lista de hotéis da categoria especificada</returns>
        Task<IEnumerable<Hotel>> GetHotelsByStarsAsync(int stars);

        /// <summary>
        /// 🏨 Busca hotéis por comodidades específicas
        /// 
        /// PROPÓSITO: Filtrar hotéis que atendem necessidades específicas dos hóspedes
        /// 
        /// LÓGICA: Combina filtros com AND lógico
        /// - Se wifi=true: incluir apenas hotéis com WiFi
        /// - Se parking=true: incluir apenas hotéis com estacionamento  
        /// - Se gym=true: incluir apenas hotéis com academia
        /// - Se todos false: retorna todos os hotéis
        /// 
        /// SQL GERADO:
        /// SELECT * FROM Hotels 
        /// WHERE (@wifi = 0 OR Wifi = 1) 
        ///   AND (@parking = 0 OR Parking = 1) 
        ///   AND (@gym = 0 OR Gym = 1)
        /// 
        /// EXEMPLO DE USO:
        /// - GetHotelsWithAmenitiesAsync(true, false, false) → Apenas com WiFi
        /// - GetHotelsWithAmenitiesAsync(true, true, true)   → Com todas as comodidades
        /// </summary>
        /// <param name="wifi">Filtrar por WiFi gratuito</param>
        /// <param name="parking">Filtrar por estacionamento</param>
        /// <param name="gym">Filtrar por academia/fitness</param>
        /// <returns>Lista de hotéis que atendem aos critérios</returns>
        Task<IEnumerable<Hotel>> GetHotelsWithAmenitiesAsync(bool wifi, bool parking, bool gym);

        /// <summary>
        /// 🏨 Busca hotel por ID incluindo quartos
        /// 
        /// PROPÓSITO: Carregar dados completos do hotel incluindo informações dos quartos
        /// ÚTIL: Para exibir detalhes completos na página de detalhes do hotel
        /// 
        /// SQL GERADO: 
        /// SELECT h.*, r.* FROM Hotels h 
        /// LEFT JOIN Rooms r ON h.HotelId = r.HotelId 
        /// WHERE h.HotelId = @id
        /// </summary>
        /// <param name="id">ID do hotel</param>
        /// <returns>Hotel com lista de quartos populada</returns>
        Task<Hotel?> GetHotelWithRoomsAsync(int id);

        /// <summary>
        /// 🏨 Busca todos os hotéis incluindo quartos
        /// 
        /// PROPÓSITO: Carregar lista completa de hotéis com informações dos quartos
        /// ÚTIL: Para exibir preços e detalhes dos quartos na listagem geral
        /// 
        /// SQL GERADO: 
        /// SELECT h.*, r.* FROM Hotels h 
        /// LEFT JOIN Rooms r ON h.HotelId = r.HotelId
        /// </summary>
        /// <returns>Lista de hotéis com quartos populados</returns>
        Task<IEnumerable<Hotel>> GetAllHotelsWithRoomsAsync();
    }

    /*
     🎓 CONCEITOS:
     
     1. 🏗️ HERANÇA DE INTERFACE:
        - IHotelRepository : IRepository<Hotel>
        - Herda todos os métodos CRUD básicos (GetAllAsync, GetByIdAsync, etc.)
        - Adiciona métodos específicos do domínio Hotel
     
     2. 🎯 INTERFACE SEGREGATION PRINCIPLE:
        - Interface pequena e focada
        - Apenas métodos específicos de Hotel
        - Evita interfaces "gordas" com muitos métodos
     
     3. 📝 DOCUMENTAÇÃO XML:
        - /// <summary> para descrição geral
        - /// <param> para documentar parâmetros
        - /// <returns> para descrever retorno
        - Exemplos de SQL gerado
     
     4. ⚡ ASYNC PATTERNS:
        - Todos os métodos retornam Task<T>
        - Suffix "Async" na nomenclatura
        - Permite operações não-bloqueantes
     
     5. 🔍 QUERY OPTIMIZATION:
        - Cada método tem propósito específico
        - SQL otimizado para cada caso de uso
        - Evita over-fetching de dados
     
     📚 EXERCÍCIOS PARA PRATICAR:
     1. Adicionar método GetHotelsByLocationAsync(string location)
     2. Implementar GetHotelsByPriceRangeAsync(decimal min, decimal max)
     3. Criar GetPopularHotelsAsync() (mais reservados)
     4. Implementar GetHotelsWithRoomsAvailableAsync(DateTime checkIn, DateTime checkOut)
     */
}
