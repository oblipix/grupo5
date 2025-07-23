using AutoMapper;
using ViagemImpacta.Mappings.Profiles;

namespace ViagemImpacta.Mappings
{
    /// <summary>
    /// 📋 AUTOMAPPER PROFILE PRINCIPAL (DEPRECATED)
    /// 
    /// ⚠️ AVISO: Este profile está sendo substituído por profiles específicos.
    /// 
    /// 🔄 MIGRAÇÃO:
    /// - TravelPackage → TravelPackageProfile
    /// - Hotel → HotelProfile  
    /// - User → UserProfile
    /// 
    /// 🗑️ Este arquivo pode ser removido após migração completa.
    /// Mantido temporariamente para compatibilidade.
    /// </summary>
    [Obsolete("Use profiles específicos: TravelPackageProfile, HotelProfile, UserProfile")]
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // 🚨 DEPRECATED: Mapeamentos movidos para profiles específicos
            // Este construtor está vazio intencionalmente
            
            // Descomente apenas se precisar de compatibilidade temporária:
            // ConfigureTravelPackageMappings();
            // ConfigureHotelMappings();
            // ConfigureUserMappings();
        }

        // 🗑️ Métodos deprecated (remover após migração)
        /*
        private void ConfigureTravelPackageMappings() { ... }
        private void ConfigureHotelMappings() { ... }
        private void ConfigureUserMappings() { ... }
        */
    }
}
