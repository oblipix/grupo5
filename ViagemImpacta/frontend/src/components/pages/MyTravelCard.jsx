import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';

// Função auxiliar para gerar URLs de imagem aleatórias
const generateRandomImageUrl = (id, width = 400, height = 300) => {
  return `https://picsum.photos/id/${id % 1000}/${width}/${height + 150}`;
};

// Helper function to get status tag classes (para cores no MyTravels)
const getStatusTagClasses = (status) => {
  switch (status) {
    case 'Concluída':
      return 'bg-green-500 text-white'; // Verde para concluído
    case 'Em Andamento':
      return 'bg-yellow-500 text-gray-800'; // Amarelo para em andamento
    case 'Salva': // Usado para "Lista de Desejo"
      return 'bg-blue-500 text-white'; // Azul para lista de desejos/salva
    default:
      return 'bg-gray-500 text-white'; // Cor padrão
  }
};

// MyTravelCard: Usado na página Minhas Viagens
function MyTravelCard({ travel, onCardClick }) {
  // Obtém o status de login do contexto de autenticação
  const { isLoggedIn, addSavedHotel, savedHotels } = useAuth();
  const { showModal } = useModal();
  
  // Verifica se o hotel já está nos favoritos - só se estiver logado
  const isFavorited = isLoggedIn && (savedHotels?.some(saved => saved.id === travel.id) || travel.isFavorited);
  
  // Função para lidar com o clique no coração
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Evita que o clique ative o onClick do card
    
    if (!isLoggedIn) {
      // Mostra modal de aviso se não estiver logado
      showModal({
        title: 'Login Necessário',
        message: 'É necessário estar logado para favoritar destinos. Faça login para salvar seus hotéis favoritos!',
        actionText: 'Fazer Login',
        showHeader: true,
        onConfirm: () => {
          // Redireciona para a página de login
          window.location.href = '/login';
        }
      });
      return;
    }
    
    // Se estiver logado, adiciona aos favoritos
    if (!isFavorited) {
      addSavedHotel(travel);
    }
  };
  
  return (
    <div
      className="bg-white rounded-lg shadow-xl border border-gray-200 p-2 w-full max-w-[220px] md:max-w-[240px] mx-auto relative h-96 flex flex-col cursor-pointer my-travel-card"
      onClick={() => onCardClick(travel.id)} // O card inteiro é clicável para ir aos detalhes
    >
      {/* Imagem do Card */}
      <div className="relative w-full h-40 overflow-hidden rounded-md"> {/* h-40 para altura menor da imagem */}
        <img
          src={travel.imageUrl || generateRandomImageUrl(travel.id)}
          alt={travel.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div> {/* Overlay escuro na imagem */}

        {/* Tag de Tipo (Nacional/Internacional) - SUPERIOR DIREITO DA FOTO */}
        {travel.type && (
          <span className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white whitespace-nowrap z-10">
            Viagens {travel.type}
          </span>
        )}

        {/* BOTÃO DE CORAÇÃO PARA FAVORITAR - SEMPRE VISÍVEL */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 left-2 p-1 rounded-full bg-white/50 hover:bg-white/70 transition-all duration-200 z-10"
          title={isFavorited ? "Favoritado" : "Favoritar"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 transition-colors duration-200 ${
              isFavorited ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
            }`}
            fill={isFavorited ? 'currentColor' : 'none'}
            viewBox="0 0 24 24" 
            stroke="currentColor"
            strokeWidth="2"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-4 flex flex-col justify-start flex-grow">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-2">{travel.title}</h3>
          {/* Descrição/Dias de Viagem - Direto abaixo do título */}
          <p className="text-gray-600 text-sm">{travel.description}</p> 
        </div>
        {/* Status da Viagem - Abaixo da Descrição, empurrado para baixo */}
        {travel.status && (
          <div className="mt-auto"> 
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusTagClasses(travel.status)}`}>
              {travel.status === 'Salva' ? 'Lista de Desejo' : travel.status}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTravelCard;