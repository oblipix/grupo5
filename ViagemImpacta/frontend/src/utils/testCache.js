// Utilitário para testar o cache do hotelService

import { hotelService } from '../services/hotelService.js';

/**
 * Testa o funcionamento do cache do hotelService
 */
export const testCache = {
  
  /**
   * Testa se o cache está funcionando para getAllHotels
   */
  async testGetAllHotelsCache() {
    console.log('🧪 Testando cache do getAllHotels...');
    
    // Limpa cache primeiro
    hotelService.clearCache();
    
    // Primeira chamada - deve fazer requisição à API
    console.time('Primeira chamada');
    try {
      const hotels1 = await hotelService.getAllHotels();
      console.timeEnd('Primeira chamada');
      console.log(`✅ Primeira chamada: ${hotels1.length} hotéis encontrados`);
      
      // Segunda chamada - deve usar cache
      console.time('Segunda chamada (cache)');
      const hotels2 = await hotelService.getAllHotels();
      console.timeEnd('Segunda chamada (cache)');
      console.log(`✅ Segunda chamada: ${hotels2.length} hotéis encontrados`);
      
      // Verifica se os dados são os mesmos
      const sameData = JSON.stringify(hotels1) === JSON.stringify(hotels2);
      console.log(`✅ Dados idênticos: ${sameData}`);
      
      return { success: true, hotels1, hotels2, sameData };
      
    } catch (error) {
      console.error('❌ Erro no teste:', error);
      return { success: false, error };
    }
  },

  /**
   * Testa se o cache está funcionando para getHotelsWithFilters
   */
  async testGetHotelsWithFiltersCache() {
    console.log('🧪 Testando cache do getHotelsWithFilters...');
    
    // Limpa cache primeiro
    hotelService.clearCache();
    
    const filters = { destination: 'Rio de Janeiro', precoMin: 100, precoMax: 500 };
    
    try {
      // Primeira chamada - deve fazer requisição à API
      console.time('Primeira chamada com filtros');
      const hotels1 = await hotelService.getHotelsWithFilters(filters);
      console.timeEnd('Primeira chamada com filtros');
      console.log(`✅ Primeira chamada: ${hotels1.length} hotéis encontrados`);
      
      // Segunda chamada - deve usar cache
      console.time('Segunda chamada com filtros (cache)');
      const hotels2 = await hotelService.getHotelsWithFilters(filters);
      console.timeEnd('Segunda chamada com filtros (cache)');
      console.log(`✅ Segunda chamada: ${hotels2.length} hotéis encontrados`);
      
      // Verifica se os dados são os mesmos
      const sameData = JSON.stringify(hotels1) === JSON.stringify(hotels2);
      console.log(`✅ Dados idênticos: ${sameData}`);
      
      return { success: true, hotels1, hotels2, sameData };
      
    } catch (error) {
      console.error('❌ Erro no teste:', error);
      return { success: false, error };
    }
  },

  /**
   * Mostra informações do cache atual
   */
  showCacheInfo() {
    const cacheInfo = hotelService.getCacheInfo();
    console.log('📊 Informações do Cache:', cacheInfo);
    return cacheInfo;
  },

  /**
   * Testa invalidação de cache
   */
  testCacheInvalidation() {
    console.log('🧪 Testando invalidação de cache...');
    
    const beforeInfo = hotelService.getCacheInfo();
    console.log(`📊 Antes da invalidação: ${beforeInfo.totalEntries} entradas`);
    
    // Invalida cache de hotéis
    hotelService.invalidateHotelCache();
    
    const afterInfo = hotelService.getCacheInfo();
    console.log(`📊 Após invalidação: ${afterInfo.totalEntries} entradas`);
    
    return { before: beforeInfo, after: afterInfo };
  }
};

// Para usar no console do navegador
window.testCache = testCache;
