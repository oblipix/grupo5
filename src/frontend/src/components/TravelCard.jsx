import React from 'react';

// Função auxiliar para gerar URLs de imagem aleatórias (pode ser movida para utilitários se usada em vários lugares)
const generateRandomImageUrl = (id, width = 400, height = 300) => {
  return `https://picsum.photos/id/${id % 1000}/${width}/${height + 150}`;
};

// TravelCard: Usado na Home, Resultados de Busca e FlightsPage
// Recebe as props: travel, onCardClick, onSaveTravel, isTravelSaved
function TravelCard({ travel, onCardClick, onSaveTravel, isTravelSaved }) {
  // Verifica se a viagem está salva para mudar o ícone do coração
  const isSaved = isTravelSaved ? isTravelSaved(travel.id) : false; 

  return (
    <div
      className="bg-white rounded-lg shadow-xl border border-gray-200 p-2 max-w-[220px] mx-auto relative h-96 flex flex-col cursor-pointer"
      onClick={() => onCardClick(travel.id)} // O card inteiro é clicável para ir aos detalhes
    >
      {/* Botão de LIKE (coração) - No canto superior direito da IMAGEM */}
      {onSaveTravel && ( // Só renderiza se a função onSaveTravel for passada
        <button
          className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition z-10"
          onClick={(e) => {
            e.stopPropagation(); // Evita que o clique no botão ative o clique do card inteiro
            onSaveTravel(travel);
          }}
          aria-label={isSaved ? "Remover dos salvos" : "Salvar pacote"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${isSaved ? 'text-red-500' : 'text-white'}`}
            fill={isSaved ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      )}

      {/* Imagem do Card */}
      <div className="relative w-full h-2/3 overflow-hidden rounded-md">
        <img
          src={travel.imageUrl || generateRandomImageUrl(travel.id)}
          alt={travel.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{travel.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{travel.description}</p>
        </div>
        {/* === BOTÃO "VER DETALHES" === */}
        {/* Ele utiliza a classe main-action-button para a cor azul definida em index.css */}
        <button
          className="main-action-button text-white px-4 py-2 rounded-md transition duration-300 text-sm mt-auto self-start cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Previne que o clique no botão acione o clique do card pai
            onCardClick(travel.id);
          }}
        >
          Ver Detalhes
        </button>
      </div>
    </div>
  );
}

export default TravelCard;