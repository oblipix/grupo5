// src/App.js
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TravelSection from './components/TravelSection';
import HeroSwiper from './components/HeroSwiper';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import TravelCard from './components/TravelCard';

import HotelsPage from './components/HotelsPage';
import EventBlogSection from './components/EventBlogSection'; 
import EventReservationForm from './components/EventReservationForm'; 
import PromotionDetailsPage from './components/PromotionDetailsPage'; 
import PurchasePage from './components/PurchasePage'; // <-- ATENÇÃO AQUI: Importe a página de compra

// fotos para promoçoes section
import ImageNatalRS from './assets/images/natal1RS.png'; 
import ImageAnoNovoRJ from './assets/images/anonovoRJ.png';
import ImageCarnavelPe from './assets/images/carnavalPE.png';

// Certifique-se de que estes componentes estão importados se forem usados:
// import FlightDetailsPage from './components/FlightDetailsPage';
// import MyTravelsPage from './components/MyTravelsPage';

const removeAccents = (str) => {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

function App() {
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [selectedFlightId, setSelectedFlightId] = useState(null);
  const [selectedPromotionId, setSelectedPromotionId] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [savedUserTravels, setSavedUserTravels] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeFilterButton, setActiveFilterButton] = useState(''); 
  const [showEventReservationForm, setShowEventReservationForm] = useState(false); 
  const [promotionToPurchase, setPromotionToPurchase] = useState(null); // <-- ATENÇÃO AQUI: Estado para a promoção de compra


// Função para converter data de DD/MM/AAAA para AAAA-MM-DD
const convertDdMmYyyyToYyyyMmDd = (dateString) => {
  if (!dateString) return null;
  const parts = dateString.split('/');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
  }
  return dateString; // Retorna o original se não estiver no formato esperado
};


  const allPromotionalTravels = [
    
    { 
      id: 13, 
      title: 'Carnaval Tripz Folia em Recife!', 
      description: 'Sinta a energia contagiante do Carnaval em Recife! Nosso Hotel Tripz, com sua arquitetura moderna e vibrante, é o cenário perfeito para você se jogar no frevo. Garanta pacotes exclusivos e esteja no coração da festa mais democrática do Brasil.', 
      imageUrl: ImageCarnavelPe, 
      type: 'Nacional', 
      status: 'Em Andamento', 
      eventDate: '15/02/2027',
      priceFrom: 2500.00, 
      priceTo: 1999.00, 
      packagePrices: { 
        casal: 3800.00,
        solteiro: 1999.00,
        familia: 5500.00 
      },
      reviews: [ 
        { rating: 5, comment: 'Energia incrível! O hotel estava perfeito para o Carnaval. Voltarei!', guestName: 'Maria S.' },
        { rating: 4, comment: 'Adorei a localização e a estrutura. A festa foi sensacional.', guestName: 'João P.' },
        { rating: 5, comment: 'Recife é demais no Carnaval, e o Tripz tornou a experiência ainda melhor.', guestName: 'Ana L.' },
      ]
    },
   
    { 
      id: 16, 
      title: 'Réveillon Tripz: Brilho e Emoção em Copacabana!', 
      description: 'Prepare-se para a maior festa de Réveillon do mundo! O Hotel Tripz em Copacabana te coloca no centro da celebração. Com um telão exclusivo no jardim, uma cascata de fogos de artifício no céu e a energia da praia mais famosa do Brasil, sua virada de ano será inesquecível.', 
      imageUrl: ImageAnoNovoRJ,
      type: 'Nacional', 
      status: 'Em Andamento' ,
      eventDate: '31/12/2026',
      priceFrom: 4000.00,
      priceTo: 3200.00,
      packagePrices: {
        casal: 6000.00,
        solteiro: 3200.00,
        familia: 8500.00
      },
      reviews: [
        { rating: 5, comment: 'Melhor Réveillon da vida! A vista dos fogos foi espetacular e a festa do hotel, impecável.', guestName: 'Paula G.' },
        { rating: 5, comment: 'Experiência única. Tudo muito bem organizado e seguro.', guestName: 'Ricardo F.' },
        { rating: 4, comment: 'Incrível! Poderia ter mais opções de comida no buffet, mas a festa foi nota 10.', guestName: 'Camila B.' },
      ]
    },
    
    {
      id: 18, 
      title: 'Natal Mágico na Montanha - Tripz Garanhuns!',
      description: 'Viva a magia do Natal em Garanhuns! Nosso hotel de arquitetura em madeira se transforma num refúgio aconchegante com decorações festivas, ceia especial e um clima europeu que encanta a todos. Perfeito para um Natal inesquecível em família.',
      imageUrl: ImageNatalRS, 
      type: 'Nacional',
      status: 'Em Andamento',
      eventDate: '24/12/2025',
      priceFrom: 2100.00,
      priceTo: 1850.00,
      packagePrices: {
        casal: 3600.00,
        solteiro: 1850.00,
        familia: 5200.00
      },
      reviews: [
        { rating: 5, comment: 'Natal mais lindo que já tive! A decoração estava deslumbrante e a ceia maravilhosa.', guestName: 'Aline V.' },
        { rating: 5, comment: 'O clima natalino no hotel é super acolhedor. Me senti em um filme.', guestName: 'Bruno F.' },
        { rating: 4, comment: 'Tudo muito bom, só achei que poderia ter mais atividades para crianças pequenas.', guestName: 'Carla A.' },
      ] 
    },
  ];

  const allRecommendedTravels = [
    { id: 8, title: 'Atenas Antiga', description: 'Explorando a história da Grécia.', imageUrl: 'https://picsum.photos/id/108/400/300', type: 'Internacional', status: 'Salva' },
    { id: 9, title: 'Cidades Históricas Brasil', description: 'Ouro Preto e suas belezas.', imageUrl: 'https://picsum.photos/id/109/400/300', type: 'Nacional', status: 'Em Andamento' },
    { id: 10, title: 'Fiordes da Noruega', description: 'Paisagens deslumbrantes do norte.', imageUrl: 'https://picsum.photos/id/110/400/300', type: 'Internacional', status: 'Concluída' },
    { id: 11, title: 'Tailândia Tropical', description: 'Templos, praias e culinária.', imageUrl: 'https://picsum.photos/id/111/400/300', type: 'Internacional', status: 'Salva' },
    { id: 12, title: 'Canadá Selvagem', description: 'Montanhas Rochosas e vida selvagem.', imageUrl: 'https://picsum.photos/id/112/400/300', type: 'Internacional', status: 'Em Andamento' },
  ];

  const allFlights = [
    { id: 401, title: 'Brasília', description: 'Ida 12/08/2025', imageUrl: 'https://picsum.photos/id/125/400/300', type: 'Nacional', status: 'Disponível', price: 94.22, category: 'Economy', connection: false, origin: 'São Paulo', subtitle: 'Brasil Int.' },
    { id: 402, title: 'São Paulo', description: 'Ida 09/08/2025', imageUrl: 'https://picsum.photos/id/126/400/300', type: 'Nacional', status: 'Disponível', price: 94.85, category: 'Economy', connection: false, origin: 'Brasília', subtitle: 'Viracopos' },
    { id: 403, title: 'Jaguaruna', description: 'Ida 10/09/2025', imageUrl: 'https://picsum.photos/id/127/400/300', type: 'Nacional', status: 'Disponível', price: 153.34, category: 'Economy', connection: false, origin: 'São Paulo', subtitle: 'Humberto Ghizzo Bortoluzzi Regional' },
    { id: 404, title: 'Nova York', description: 'Ida 05/11/2025', imageUrl: 'https://picsum.photos/id/128/400/300', type: 'Internacional', status: 'Disponível', price: 3000.00, category: 'Premium Business', connection: true, origin: 'Brasília', subtitle: 'Internacional' },
    { id: 405, title: 'Salvador', description: 'Ida 20/12/2025', imageUrl: 'https://picsum.photos/id/129/400/300', type: 'Nacional', status: 'Disponível', price: 500.00, category: 'Economy', connection: false, origin: 'São Paulo', subtitle: 'Brasil' },
    { id: 406, title: 'Londres', description: 'Ida 15/01/2026', imageUrl: 'https://picsum.photos/id/130/400/300', type: 'Internacional', status: 'Disponível', price: 2800.00, category: 'Economy', connection: true, origin: 'São Paulo', subtitle: 'Internacional' },
  ];

  const allAvailableTravels = [...allPromotionalTravels, ...allRecommendedTravels];

  // Adicionando a função para lidar com o clique nas promoções de hotéis
  const handlePromotionClick = (promotionId) => { 
    setSelectedPromotionId(promotionId);
    setCurrentPage('promotionDetails'); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // NOVA FUNÇÃO para navegar para a página de compra
  const handleNavigateToPurchase = (promotionData) => { // <-- ATENÇÃO AQUI: Função para navegar para compra
    setPromotionToPurchase(promotionData); 
    setCurrentPage('purchase'); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveTravel = (/** @type {Object} */ travelToSave) => {
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
    console.log("Busca no Header desativada. Termo:", term);
    setCurrentPage('home');
    setActiveFilterButton('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Esta função pode ser usada para pacotes genéricos que não sejam promoções de hotéis
  const handlePackageClick = (packageId) => {
    console.log("Card de pacote genérico clicado:", packageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFlightCardClick = (flightId) => {
    setSelectedFlightId(flightId);
    setCurrentPage('flightDetails');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    if (currentPage === 'flightDetails') {
      setCurrentPage('flights');
    } else if (currentPage === 'promotionDetails') { 
      setCurrentPage('home'); 
      setSelectedPromotionId(null);
    } else if (currentPage === 'purchase') { // <-- ATENÇÃO AQUI: Volta da página de compra
      setCurrentPage('promotionDetails'); // Volta para os detalhes da promoção anterior
      setPromotionToPurchase(null); 
    } else {
      setCurrentPage('home');
      setActiveFilterButton('');
    }
    setSelectedPackageId(null);
    setSelectedFlightId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToMyTravels = () => {
    if (!isLoggedIn) {
      setCurrentPage('login');
    } else {
      setCurrentPage('myTravels');
    }
    setSelectedPackageId(null);
    setSelectedFlightId(null);
    setActiveFilterButton('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToHome = () => {
    setCurrentPage('home');
    setSelectedPackageId(null);
    setSelectedFlightId(null);
    setActiveFilterButton('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToLogin = () => {
    setCurrentPage('login');
    setSelectedPackageId(null);
    setSelectedFlightId(null);
    setActiveFilterButton('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToRegister = () => {
    setCurrentPage('register');
    setSelectedPackageId(null);
    setSelectedFlightId(null);
    setActiveFilterButton('');
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
    setSelectedFlightId(null);
    setActiveFilterButton('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPromos = () => {
    setActiveFilterButton('promos');
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRecommended = () => {
    setActiveFilterButton('recommended');
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToHotels = () => {
    setCurrentPage('hotels');
    setActiveFilterButton('hotels');
    setSelectedPackageId(null);
    setSelectedFlightId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Funções para controlar a visibilidade do formulário de eventos
  const handleOpenEventReservationForm = () => {
    setShowEventReservationForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseEventReservationForm = () => {
    setShowEventReservationForm(false);
  };

  const selectedGenericPackage = allAvailableTravels.find(
    (travel) => travel.id === selectedPackageId
  );
  const selectedFlightData = allFlights.find(
    (flight) => flight.id === selectedFlightId
  );

  // Encontra a promoção selecionada para passar ao componente de detalhes
  const selectedPromotionData = allPromotionalTravels.find( 
    (promo) => promo.id === selectedPromotionId
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onSearch={handleGlobalSearch}
        onNavigateToMyTravels={handleNavigateToMyTravels}
        onNavigateToHome={handleNavigateToHome}
        onNavigateToFlights={handleNavigateToFlights}
        onNavigateToHotels={handleNavigateToHotels}
      />

      <main className="flex-grow">
        {currentPage !== 'login' && currentPage !== 'register' && currentPage !== 'myTravels' && (
          <>
            <HeroSwiper />
            <section className="bg-white rounded-t-[50px] shadow-md -mt-10 md:-mt-18 relative z-10 py-4 px-6">
              <div className="container mx-auto flex flex-wrap justify-center gap-4">
                {/* VIAGENS COM PROMOÇÃO */}
                <a
                  href="#viagens-promocao"
                  onClick={handleSelectPromos}
                  className={`btn-common-style ${activeFilterButton === 'promos' ? 'btn-active-style' : 'btn-hover-style'}`}
                >
                  Promoção
                </a>
                {/* RECOMENDADO POR VIAJANTES */}
                <a
                  href="#recomendado-viajantes"
                  onClick={handleSelectRecommended}
                  className={`btn-common-style ${activeFilterButton === 'recommended' ? 'btn-active-style' : 'btn-hover-style'}`}
                >
                  Recomendado por Viajantes
                </a>
                {/* HOTÉIS */}
                <button
                  onClick={handleNavigateToHotels}
                  className={`reset-btn-style btn-common-style ${activeFilterButton === 'hotels' ? 'btn-active-style' : 'btn-hover-style'}`}
                >
                  Hotéis
                </button>
                {/* BOTÃO PARA EVENTOS */}
                <button
                  onClick={() => setCurrentPage('events')}
                  className={`reset-btn-style btn-common-style ${activeFilterButton === 'events' ? 'btn-active-style' : 'btn-hover-style'}`}
                >
                  Eventos
                </button>
              </div>
            </section>
          </>
        )}

        {/* Lógica de Renderização de Páginas */}
        {selectedFlightId ? (
          <p>Flight Details Page (Componente não fornecido na amostra)</p>
        ) : currentPage === 'login' ? (
          <LoginPage onNavigateToRegister={handleNavigateToRegister} onLoginSuccess={handleLoginSuccess} />
        ) : currentPage === 'register' ? (
          <RegisterPage onNavigateToLogin={handleNavigateToLogin} />
        ) : currentPage === 'myTravels' ? (
          <p>My Travels Page (Componente não fornecido na amostra)</p>
        ) : currentPage === 'hotels' ? (
          <HotelsPage />
        ) : currentPage === 'events' ? (
          <EventBlogSection onOpenReservationForm={handleOpenEventReservationForm} />
        ) : currentPage === 'promotionDetails' && selectedPromotionData ? ( 
          <PromotionDetailsPage
            promotionData={selectedPromotionData}
            onBack={handleBackToList}
            onNavigateToPurchase={handleNavigateToPurchase} // <-- ATENÇÃO AQUI: Passando a função para o detalhe
          />
        ) : currentPage === 'purchase' && promotionToPurchase ? ( // <-- ATENÇÃO AQUI: Nova condição de renderização para PurchasePage
          <PurchasePage
            promotionData={promotionToPurchase} 
            onBack={handleBackToList} 
          />
        ) : (
          <>
            <TravelSection
              id="viagens-promocao"
              title="Nossas Promoções"
              travels={allPromotionalTravels}
              onCardClick={handlePromotionClick} 
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
      </main>

      {/* Renderiza o formulário de reserva de eventos condicionalmente */}
      {showEventReservationForm && (
        <EventReservationForm onClose={handleCloseEventReservationForm} />
      )}

      <Footer />
    </div>
  );
}

export default App;