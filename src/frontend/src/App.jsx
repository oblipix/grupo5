/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'; // Importe useState
import Header from './components/Header';
import Footer from './components/Footer';
import TravelSection from './components/TravelSection';
import HeroSwiper from './components/HeroSwiper';
import PackageDetails from './components/PackageDetails'; // Importado para ser a tela de detalhes

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import TravelCard from './components/TravelCard';

import FlightsPage from './components/FlightsPage'; // Certifique-se que FlightsPage está importado


// FUNÇÃO AUXILIAR PARA REMOVER ACENTOS
export const removeAccents = (str) => { // 'export' para ser usada em FlightsPage
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

function App() {
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [rawSearchTerm, setRawSearchTerm] = useState('');
  const [processedSearchTerm, setProcessedSearchTerm] = useState('');
  // Adicione 'recommended' e 'hotels' como possíveis valores para currentPage
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'flights', 'hotels', 'myTravels', 'login', 'register', 'promos', 'recommended'
  const [savedUserTravels, setSavedUserTravels] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const allPromotionalTravels = [
    { id: 1, title: 'Maldivas Paradisíacas', description: '7 dias em resorts de luxo.', imageUrl: 'https://picsum.photos/id/101/400/300', type: 'Internacional', status: 'Em Andamento' },
    { id: 2, title: 'Trilha na Patagônia', description: 'Aventura nas montanhas e glaciares.', imageUrl: 'https://picsum.photos/id/102/400/300', type: 'Internacional', status: 'Em Andamento' },
    { id: 3, title: 'Safari na Tanzânia', description: 'Explore a vida selvagem africana.', imageUrl: 'https://picsum.photos/id/103/400/300', type: 'Internacional', status: 'Salva' },
    { id: 4, title: 'Culturas do Japão', description: 'Tóquio, Quioto e tradições milenares.', imageUrl: 'https://picsum.photos/id/104/400/300', type: 'Internacional', status: 'Em Andamento' },
    { id: 5, title: 'Praias do Caribe', description: 'Sol, mar e relaxamento total.', imageUrl: 'https://picsum.photos/id/105/400/300', type: 'Internacional', status: 'Concluída' },
    { id: 6, title: 'Nova Zelândia', description: 'Paisagens épicas e esportes radicais.', imageUrl: 'https://picsum.photos/id/106/400/300', type: 'Internacional', status: 'Concluída' },
    { id: 7, title: 'Egito Milenar', description: 'Pirâmides e a história dos faraós.', imageUrl: 'https://picsum.photos/id/107/400/300', type: 'Internacional', status: 'Em Andamento' },
  ];

  const allRecommendedTravels = [
    { id: 8, title: 'Atenas Antiga', description: 'Explorando a história da Grécia.', imageUrl: 'https://picsum.photos/id/108/400/300', type: 'Internacional', status: 'Salva' },
    { id: 9, title: 'Cidades Históricas Brasil', description: 'Ouro Preto e suas belezas.', imageUrl: 'https://picsum.photos/id/109/400/300', type: 'Nacional', status: 'Em Andamento' },
    { id: 10, title: 'Fiordes da Noruega', description: 'Paisagens deslumbrantes do norte.', imageUrl: 'https://picsum.photos/id/110/400/300', type: 'Internacional', status: 'Concluída' },
    { id: 11, title: 'Tailândia Tropical', description: 'Templos, praias e culinária.', imageUrl: 'https://picsum.photos/id/111/400/300', type: 'Internacional', status: 'Salva' },
    { id: 12, title: 'Canadá Selvagem', description: 'Montanhas Rochosas e vida selvagem.', imageUrl: 'https://picsum.photos/id/112/400/300', type: 'Internacional', status: 'Em Andamento' },
  ];

  const allAvailableTravels = [...allPromotionalTravels, ...allRecommendedTravels];

  const filteredAllTravels = allAvailableTravels.filter(travel => {
    const processedTitle = removeAccents(travel.title).toLowerCase();
    const processedDescription = removeAccents(travel.description).toLowerCase();

    return processedTitle.includes(processedSearchTerm) ||
           processedDescription.includes(processedSearchTerm);
  });

  const handleSaveTravel = (travelToSave) => {
    const isAlreadySaved = savedUserTravels.some(saved => saved.id === travelToSave.id);

    if (isAlreadySaved) {
      setSavedUserTravels(prevSaved => prevSaved.filter(saved => saved.id !== travelToSave.id));
      console.log(`Viagem ${travelToSave.title} removida dos salvos.`);
    } else {
      const travelWithStatus = { ...travelToSave, status: 'Salva', type: travelToSave.type || 'Internacional' };
      setSavedUserTravels(prevSaved => [...prevSaved, travelWithStatus]);
      console.log(`Viagem ${travelToSave.title} salva!`);
    }
  };

  const isTravelSaved = (travelId) => {
    return savedUserTravels.some(saved => saved.id === travelId);
  };

  const handleGlobalSearch = (term) => {
    setRawSearchTerm(term);
    setProcessedSearchTerm(removeAccents(term).toLowerCase());
    setSelectedPackageId(null);
    setCurrentPage('home'); // Ao pesquisar, volta para a home para mostrar os resultados

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
    setRawSearchTerm('');
    setProcessedSearchTerm('');
    setCurrentPage('home'); // Volta para home, ou para a página anterior se houver lógica mais complexa
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToMyTravels = () => {
    if (!isLoggedIn) {
      setCurrentPage('login');
    } else {
      setCurrentPage('myTravels');
    }
    setSelectedPackageId(null);
    setRawSearchTerm('');
    setProcessedSearchTerm('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToHome = () => {
    setCurrentPage('home');
    setSelectedPackageId(null);
    setRawSearchTerm('');
    setProcessedSearchTerm('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToLogin = () => {
    setCurrentPage('login');
    setSelectedPackageId(null);
    setRawSearchTerm('');
    setProcessedSearchTerm('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToRegister = () => {
    setCurrentPage('register');
    setSelectedPackageId(null);
    setRawSearchTerm('');
    setProcessedSearchTerm('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('myTravels');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToFlights = () => {
    setCurrentPage('flights');
    setSelectedPackageId(null);
    setRawSearchTerm('');
    setProcessedSearchTerm('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Nova função para navegar para a página de Hotéis
  const handleNavigateToHotels = () => {
    setCurrentPage('hotels');
    setSelectedPackageId(null);
    setRawSearchTerm('');
    setProcessedSearchTerm('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Novas funções para os botões "Viagens com Promoção" e "Recomendado por Viajantes"
  const handleNavigateToPromos = () => {
    // Ao clicar em promoções, a página principal deve ser 'home'
    setCurrentPage('home');
    setRawSearchTerm(''); // Limpa a busca para mostrar todas as promoções
    setProcessedSearchTerm('');
    setSelectedPackageId(null);
    // Rola a página para a seção de promoções se ela existir
    setTimeout(() => {
        const section = document.getElementById('viagens-promocao');
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleNavigateToRecommended = () => {
    // Ao clicar em recomendados, a página principal deve ser 'recommended'
    setCurrentPage('recommended'); // Novo valor para currentPage
    setRawSearchTerm(''); // Limpa a busca
    setProcessedSearchTerm('');
    setSelectedPackageId(null);
    // Rola a página para a seção de recomendados se ela existir
    setTimeout(() => {
        const section = document.getElementById('recomendado-viajantes');
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };


  const selectedPackage = allAvailableTravels.find(
    (travel) => travel.id === selectedPackageId
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onSearch={handleGlobalSearch}
        onNavigateToMyTravels={handleNavigateToMyTravels}
        onNavigateToHome={handleNavigateToHome}
        onNavigateToFlights={handleNavigateToFlights}
        currentPage={currentPage} // Passe currentPage para o Header se ele também precisar saber
      />

      <main className="flex-grow">
        {/* CONTEÚDO SEMPRE VISÍVEL NO TOPO (Home/Busca/Detalhes/Voos/etc) */}
        {currentPage !== 'login' && currentPage !== 'register' && currentPage !== 'myTravels' && (
          <>
            <HeroSwiper />
            <section className="bg-white rounded-t-[50px] shadow-md -mt-10 md:-mt-18 relative z-10 py-4 px-6">
              <div className="container mx-auto flex flex-wrap justify-center gap-4 text-gray-700 font-medium">

                {/* BOTÃO VIAGENS COM PROMOÇÃO */}
                {/* Convertido de <a> para <button> para controle de estado */}
                <button
                  onClick={handleNavigateToPromos}
                  className={`py-2 px-4 rounded-full whitespace-nowrap
                    ${(currentPage === 'home' && !rawSearchTerm) ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-100 text-gray-700'}`
                  }
                >
                  Viagens com Promoção
                </button>

                {/* BOTÃO RECOMENDADO POR VIAJANTES */}
                {/* Convertido de <a> para <button> para controle de estado */}
                <button
                  onClick={handleNavigateToRecommended}
                  className={`py-2 px-4 rounded-full whitespace-nowrap
                    ${currentPage === 'recommended' ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-100 text-gray-700'}`
                  }
                >
                  Recomendado por Viajantes
                </button>

                {/* BOTÃO VOOS (já estava ajustado) */}
                <button
                  onClick={handleNavigateToFlights}
                  className={`py-2 px-4 rounded-full whitespace-nowrap flex items-center
                    ${currentPage === 'flights' ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-100 text-gray-700'}`
                  }
                >
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9v-2h2v2zm0-4H9v-2h2v2zm0-4H9V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>
                  Voos
                </button>

                {/* BOTÃO HOTÉIS */}
                {/* Convertido de <a> para <button> para controle de estado */}
                <button
                  onClick={handleNavigateToHotels}
                  className={`py-2 px-4 rounded-full whitespace-nowrap
                    ${currentPage === 'hotels' ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-100 text-gray-700'}`
                  }
                >
                  Hotéis
                </button>
              </div>
            </section>
          </>
        )}

        {/* Botão "Limpar Busca" - Visível apenas quando há uma busca ativa E NÃO estamos em auth/myTravels pages */}
        {rawSearchTerm && currentPage !== 'login' && currentPage !== 'register' && currentPage !== 'myTravels' && (
            <div className="container mx-auto px-6 py-4">
                <button onClick={() => { setRawSearchTerm(''); setProcessedSearchTerm(''); }} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300">Limpar Busca</button>
            </div>
        )}

        {/* LÓGICA DE RENDERIZAÇÃO DO CONTEÚDO PRINCIPAL (Páginas e Seções) */}
        {selectedPackageId ? ( // Prioridade: Detalhes do Pacote
          <PackageDetails
            packageData={selectedPackage}
            onBack={handleBackToList}
          />
        ) : (
          // Próxima prioridade: Páginas de Autenticação ou Minhas Viagens ou Voos/Hotéis
          currentPage === 'login' ? (
            <LoginPage
              onNavigateToRegister={handleNavigateToRegister}
              onLoginSuccess={handleLoginSuccess}
            />
          ) : currentPage === 'register' ? (
            <RegisterPage
              onNavigateToLogin={handleNavigateToLogin}
            />
          ) : currentPage === 'myTravels' ? (
            <MyTravelsPage
              onCardClick={handlePackageClick}
              savedUserTravels={savedUserTravels}
              allAvailableTravels={allAvailableTravels}
            />
          ) : currentPage === 'flights' ? ( // === RENDERIZAÇÃO DA PÁGINA DE VOOS ===
            <FlightsPage
              onCardClick={handlePackageClick}
              onSaveTravel={handleSaveTravel}
              isTravelSaved={isTravelSaved}
            />
          ) : currentPage === 'hotels' ? ( // === RENDERIZAÇÃO DA PÁGINA DE HOTÉIS ===
            <div className="container mx-auto px-6 py-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Página de Hotéis</h2>
              <p className="text-gray-600">Este é o conteúdo da página de Hotéis. Você precisará criar o componente `HotelsPage` para uma funcionalidade completa.</p>
            </div>
          ) : (
            // Se nenhuma das anteriores, estamos na Home (com ou sem busca)
            <>
              {rawSearchTerm ? (
                  // Exibe Resultados da Busca se houver termo
                  <div id="search-results" className="py-8 px-6 bg-white">
                      <div className="container mx-auto">
                          <h2 className="text-3xl font-bold text-gray-800 mb-6">Resultados da Busca para "{rawSearchTerm}"</h2>

                          {filteredAllTravels.length > 0 ? (
                              <>
                                  <p className="text-gray-700 text-center text-lg mb-6">
                                      Encontramos {filteredAllTravels.length} pacotes para você! :)
                                  </p>
                                  <TravelSection
                                      title=""
                                      travels={filteredAllTravels}
                                      onCardClick={handlePackageClick}
                                      onSaveTravel={handleSaveTravel}
                                      isTravelSaved={isTravelSaved}
                                      CardComponent={TravelCard}
                                  />
                              </>
                          ) : (
                              <p className="text-gray-600 text-center text-lg mb-6">
                                  Não encontramos resultados para "{rawSearchTerm}" :( <br />
                                  Tente ajustar sua busca ou explore outros pacotes!
                              </p>
                          )}

                          <div className="text-center mt-6">
                              <button onClick={() => { setRawSearchTerm(''); setProcessedSearchTerm(''); }} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300">Limpar Busca</button>
                          </div>
                      </div>
                  </div>
              ) : (
                  // Exibe "Viagens com Promoção" e "Recomendado por Viajantes" APENAS se NÃO houver termo de busca E se estamos na home/recommended
                  // A exibição dessas seções não muda, mas a ativação do botão sim.
                  <>
                      <TravelSection
                          id="viagens-promocao"
                          title="Viagens com Promoção"
                          travels={allPromotionalTravels}
                          onCardClick={handlePackageClick}
                          onSaveTravel={handleSaveTravel}
                          isTravelSaved={isTravelSaved}
                          CardComponent={TravelCard}
                      />
                      <TravelSection
                          id="recomendado-viajantes"
                          title="Recomendado por Viajantes"
                          travels={allRecommendedTravels}
                          onCardClick={handlePackageClick}
                          onSaveTravel={handleSaveTravel}
                          isTravelSaved={isTravelSaved}
                          CardComponent={TravelCard}
                      />
                  </>
              )}
            </>
          )
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;