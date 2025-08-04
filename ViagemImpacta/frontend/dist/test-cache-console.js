// Teste rápido do cache - adicione este código no console do navegador

// Teste simples do cache
async function testCacheSimples() {
  console.log('🧪 Testando cache do hotelService...');
  
  // Limpa cache primeiro
  hotelService.clearCache();
  console.log('Cache limpo');
  
  // Primeira chamada - deve fazer requisição à API
  console.time('Primeira chamada getAllHotels');
  try {
    const hotels1 = await hotelService.getAllHotels();
    console.timeEnd('Primeira chamada getAllHotels');
    console.log(`✅ Primeira chamada: ${hotels1.length} hotéis encontrados`);
    
    // Segunda chamada - deve usar cache
    console.time('Segunda chamada getAllHotels (cache)');
    const hotels2 = await hotelService.getAllHotels();
    console.timeEnd('Segunda chamada getAllHotels (cache)');
    console.log(`✅ Segunda chamada: ${hotels2.length} hotéis encontrados`);
    
    // Verifica se os dados são os mesmos
    const sameData = JSON.stringify(hotels1) === JSON.stringify(hotels2);
    console.log(`✅ Dados idênticos: ${sameData}`);
    
    // Mostra informações do cache
    const cacheInfo = hotelService.getCacheInfo();
    console.log('📊 Info do cache:', cacheInfo);
    
    return { success: true, hotels1, hotels2, sameData, cacheInfo };
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
    return { success: false, error };
  }
}

// Teste com filtros
async function testCacheComFiltros() {
  console.log('🧪 Testando cache do getHotelsWithFilters...');
  
  const filters = { destination: 'Rio de Janeiro' };
  
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
}

// Disponibiliza as funções globalmente
window.testCacheSimples = testCacheSimples;
window.testCacheComFiltros = testCacheComFiltros;

console.log('🧪 Funções de teste disponíveis:');
console.log('- testCacheSimples()');
console.log('- testCacheComFiltros()');
console.log('- hotelService.getCacheInfo()');
console.log('- hotelService.clearCache()');
