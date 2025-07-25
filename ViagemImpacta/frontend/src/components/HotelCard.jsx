// src/components/HotelCard.js
import React from 'react';

// Função auxiliar para gerar URLs de imagem aleatórias
const generateRandomImageUrl = (id, width = 200, height = 150) => {
  return `https://picsum.photos/id/${id % 1000}/${width}/${height}`;
};

// HotelCard: Componente para exibir um card de hotel
// Recebe 'hotel', 'onImageClick', 'onSaveTravel', 'isHotelSaved', e AGORA 'onDetailsClick'
function HotelCard({ hotel, onImageClick, onSaveTravel, isHotelSaved, onDetailsClick }) {
  // Lógica do botão de like (coração)
  const isSaved = isHotelSaved ? isHotelSaved(hotel.id) : false;

  const handleSaveClick = (e) => {
    e.stopPropagation(); // Impede que o clique no coração propague
    onSaveTravel(hotel);
  };

  // Cria um array completo de imagens para o modal
  const allModalImages = hotel.galleryImages || []; 

  // Função para lidar com o clique no botão "Ver Detalhes"
  const handleDetailsClick = (e) => {
    e.stopPropagation(); // Impede que o clique propague para a div principal do card
    if (onDetailsClick) {
      onDetailsClick(hotel.id); // Chama a função passada do HotelsPage com o ID do hotel
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden relative w-full h-full flex flex-col">
      {/* Foto Principal do Hotel - Clicável para abrir modal */}
      <div 
        className="relative w-full h-64 overflow-hidden rounded-t-lg cursor-pointer hover:opacity-90 transition"
        onClick={() => onImageClick(allModalImages, allModalImages[0]?.id)} 
      >
        <img
          src={hotel.mainImageUrl || generateRandomImageUrl(hotel.id, 600, 400)}
          alt={hotel.title}
          className="w-full h-full object-cover"
        />
        {/* Botão de LIKE (coração) - Adicionado de volta aqui */}
        {onSaveTravel && ( // Só renderiza se a função onSaveTravel for passada
          <button
            className="absolute top-2 right-2 p-2 rounded-full bg-white/70 hover:bg-white transition z-10 focus:outline-none"
            onClick={handleSaveClick}
            aria-label={isSaved ? "Remover hotel dos salvos" : "Salvar hotel"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${isSaved ? 'text-red-500' : 'text-gray-600'}`}
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
      </div>

      {/* Conteúdo Principal do Hotel */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-blue-800 mb-2">{hotel.title}</h3>
          <p className="text-gray-600 text-sm mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
            <a
              href={hotel.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {hotel.location}
            </a>
          </p>
          <p className="text-gray-600 bg-gray-100 p-6 rounded-md mb-2">
            {hotel.description}
          </p>
          {/* Exibir preço "A partir de" se houver roomOptions */}
          {hotel.roomOptions && hotel.roomOptions.length > 0 && (
            <p className="text-lg text-green-600 mt-2 priceHotelsDetails">
              A partir de R$ {Math.min(...hotel.roomOptions.map(r => r.price)).toFixed(2).replace('.', ',')}
            </p>
          )}
        </div>

        {/* Botão "Ver Detalhes" */}
        <button
          onClick={handleDetailsClick} // Chama a nova função onDetailsClick
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 w-full
          reservation-button"
        >
          Ver Detalhes
        </button>
      </div>

      {/* Miniaturas de Fotos do Hotel - Clicáveis */}
      {allModalImages && allModalImages.length > 0 && (
        <div className="px-4 pb-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {allModalImages.map((imgObject, index) => (
              <img
                key={imgObject.id || `img-${hotel.id}-${index}`}
                src={imgObject.url || generateRandomImageUrl(hotel.id + index + 1000, 100, 80)}
                alt={imgObject.alt || `Miniatura do ${hotel.title} ${index + 1}`}
                className="w-20 h-16 object-cover rounded-md flex-shrink-0 cursor-pointer hover:opacity-80 transition"
                onClick={() => onImageClick(allModalImages, imgObject.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HotelCard;