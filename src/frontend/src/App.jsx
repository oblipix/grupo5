import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TravelSection from './components/TravelSection';
import HeroSwiper from './components/HeroSwiper';
import PackageDetails from './components/PackageDetails';

// === FUNÇÃO AUXILIAR PARA REMOVER ACENTOS ===
const removeAccents = (str) => {
  // Normaliza a string para decompor caracteres acentuados em caractere base + diacrítico
  // E remove todos os caracteres diacríticos (códigos Unicode de U+0300 a U+036f)
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

function App() {
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [rawSearchTerm, setRawSearchTerm] = useState(''); // Armazena o termo exato digitado
  const [processedSearchTerm, setProcessedSearchTerm] = useState(''); // Armazena o termo sem acentos, para busca

  // Dados originais de viagem (NÃO FILTRADOS)
  const allPromotionalTravels = [
    { id: 1, title: 'Maldivas Paradisíacas', description: '7 dias em resorts de luxo.', imageUrl: 'https://picsum.photos/id/101/400/300' },
    { id: 2, title: 'Trilha na Patagônia', description: 'Aventura nas montanhas e glaciares.', imageUrl: 'https://picsum.photos/id/102/400/300' },
    { id: 3, title: 'Safari na Tanzânia', description: 'Explore a vida selvagem africana.', imageUrl: 'https://picsum.photos/id/103/400/300' },
    { id: 4, title: 'Culturas do Japão', description: 'Tóquio, Quioto e tradições milenares.', imageUrl: 'https://picsum.photos/id/104/400/300' },
    { id: 5, title: 'Praias do Caribe', description: 'Sol, mar e relaxamento total.', imageUrl: 'https://picsum.photos/id/105/400/300' },
    { id: 6, title: 'Nova Zelândia', description: 'Paisagens épicas e esportes radicais.', imageUrl: 'https://picsum.photos/id/106/400/300' },
    { id: 7, title: 'Egito Milenar', description: 'Pirâmides e a história dos faraós.', imageUrl: 'https://picsum.photos/id/107/400/300' },
  ];

  const allRecommendedTravels = [
    { id: 8, title: 'Atenas Antiga', description: 'Explorando a história da Grécia.', imageUrl: 'https://picsum.photos/id/108/400/300' },
    { id: 9, title: 'Cidades Históricas Brasil', description: 'Ouro Preto e suas belezas.', imageUrl: 'https://picsum.photos/id/109/400/300' },
    { id: 10, title: 'Fiordes da Noruega', description: 'Paisagens deslumbrantes do norte.', imageUrl: 'https://picsum.photos/id/110/400/300' },
    { id: 11, title: 'Tailândia Tropical', description: 'Templos, praias e culinária.', imageUrl: 'https://picsum.photos/id/111/400/300' },
    { id: 12, title: 'Canadá Selvagem', description: 'Montanhas Rochosas e vida selvagem.', imageUrl: 'https://picsum.photos/id/112/400/300' },
  ];

  // Agrupa todas as viagens para busca
  const allAvailableTravels = [...allPromotionalTravels, ...allRecommendedTravels];

  // Filtra as viagens com base no termo de busca processado
  const filteredAllTravels = allAvailableTravels.filter(travel => {
    const processedTitle = removeAccents(travel.title).toLowerCase();
    const processedDescription = removeAccents(travel.description).toLowerCase();
    
    return processedTitle.includes(processedSearchTerm) || 
           processedDescription.includes(processedSearchTerm);
  });

  const handleGlobalSearch = (term) => {
    setRawSearchTerm(term); // Armazena o termo original para exibição
    setProcessedSearchTerm(removeAccents(term).toLowerCase()); // Armazena o termo processado para busca
    setSelectedPackageId(null); 

    setTimeout(() => {
        const resultsSection = document.getElementById('search-results');
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, 100);
  };

  const handlePackageClick = (packageId) => {
    setSelectedPackageId(packageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedPackageId(null);
    setRawSearchTerm(''); // Limpa ambos os termos ao voltar
    setProcessedSearchTerm(''); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedPackage = allAvailableTravels.find( 
    (travel) => travel.id === selectedPackageId
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleGlobalSearch} /> 

      <main className="flex-grow">
        <HeroSwiper />

        <section className="bg-white rounded-t-[50px] shadow-md -mt-10 md:-mt-18 relative z-10 py-4 px-6">
          <div className="container mx-auto flex flex-wrap justify-center gap-4 text-gray-700 font-medium">
            <a href="#viagens-promocao" className="py-2 px-4 rounded-full bg-blue-100 text-blue-700 whitespace-nowrap">Viagens com Promoção</a>
            <a href="#recomendado-viajantes" className="py-2 px-4 rounded-full hover:bg-gray-100 whitespace-nowrap">Recomendado por Viajantes</a>
            <a href="#" className="py-2 px-4 rounded-full hover:bg-gray-100 whitespace-nowrap">Complete sua viagem</a>
            <a href="#" className="py-2 px-4 rounded-full hover:bg-gray-100 whitespace-nowrap">Voos</a>
            <a href="#" className="py-2 px-4 rounded-full hover:bg-gray-100 whitespace-nowrap">Hotéis</a>
          </div>
        </section>

        {/* Botão "Limpar Busca" - Será movido para dentro do bloco de resultados */}
        {/* {rawSearchTerm && ( // Condição agora usa rawSearchTerm
            <div className="container mx-auto px-6 py-4">
                <button onClick={() => { setRawSearchTerm(''); setProcessedSearchTerm(''); }} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300">Limpar Busca</button>
            </div>
        )} */}

        {selectedPackageId ? (
          // Se um pacote está selecionado, EXIBE APENAS o PackageDetails
          <PackageDetails
            packageData={selectedPackage}
            onBack={handleBackToList}
          />
        ) : (
          // Caso contrário (estamos na Home), decide o que mostrar com base no termo de busca
          <>
            {rawSearchTerm ? ( // Agora verifica rawSearchTerm para saber se há busca ativa
                // Exibe Resultados da Busca se houver termo
                <div id="search-results" className="py-8 px-6 bg-white"> 
                    <div className="container mx-auto">
                        {/* === MUDANÇA AQUI: Usa rawSearchTerm na exibição do título === */}
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Resultados da Busca para "{rawSearchTerm}"</h2>
                        
                        {/* Mensagem quando resultados são encontrados / Nenhum resultado */}
                        {filteredAllTravels.length > 0 ? (
                            <>
                                <p className="text-gray-700 text-center text-lg mb-6">
                                    Encontramos {filteredAllTravels.length} pacotes para você! :)
                                </p>
                                <TravelSection
                                    title="" 
                                    travels={filteredAllTravels} 
                                    onCardClick={handlePackageClick}
                                />
                            </>
                        ) : (
                            <p className="text-gray-600 text-center text-lg mb-6"> 
                                Não encontramos resultados para "{rawSearchTerm}" :( <br /> {/* Usa rawSearchTerm aqui também */}
                                Tente ajustar sua busca ou explore outros pacotes!
                            </p>
                        )}
                        
                        {/* === MUDANÇA AQUI: NOVO LOCAL DO BOTÃO "LIMPAR BUSCA" === */}
                        <div className="text-center mt-6"> 
                            <button onClick={() => { setRawSearchTerm(''); setProcessedSearchTerm(''); }} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300">Limpar Busca</button>
                        </div>
                    </div>
                </div>
            ) : (
                // Exibe "Viagens com Promoção" e "Recomendado por Viajantes" APENAS se NÃO houver termo de busca
                <>
                    <TravelSection
                        id="viagens-promocao"
                        title="Viagens com Promoção"
                        travels={allPromotionalTravels} 
                        onCardClick={handlePackageClick}
                    />
                    <TravelSection
                        id="recomendado-viajantes"
                        title="Recomendado por Viajantes"
                        travels={allRecommendedTravels} 
                        onCardClick={handlePackageClick}
                    />
                </>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;