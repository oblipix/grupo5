import React from 'react';
// Importe a função isHotelSaved se ela for usada dentro do card
// import { isHotelSaved } from '../App'; // Ou passe como prop

const RecommendedHotelCard = ({ hotel, onCardClick, onSaveTravel, isHotelSaved }) => {
  if (!hotel) {
    return null; // ou algum placeholder
  }

  const handleSaveClick = (e) => {
    e.stopPropagation(); // Evita que o clique no botão ative o clique do card
    if (onSaveTravel) {
      onSaveTravel(hotel);
    }
  };

  const isSaved = isHotelSaved ? isHotelSaved(hotel.id) : false;

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"
      onClick={() => onCardClick(hotel.id)}
    >
      {/* AQUI ESTÁ O PONTO CRÍTICO: USE hotel.mainImageUrl */}
      <img
        src={hotel.mainImageUrl} // <-- VERIFIQUE SE ESTÁ USANDO ESTA PROPRIEDADE
        alt={hotel.title}
        className="w-full h-48 object-cover" // Ajuste a altura conforme necessário
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 truncate mb-2">{hotel.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{hotel.description.substring(0, 70)}...</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-blue-600">R$ {hotel.price.toFixed(2)}</span>
          <div className="flex items-center">
            {/* Botão de Salvar (opcional, se você quiser no card) */}
            <button
              onClick={handleSaveClick}
              className={`p-2 rounded-full ${isSaved ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'} hover:opacity-80 transition duration-300 mr-2`}
              title={isSaved ? 'Remover dos Salvos' : 'Salvar Hotel'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            </button>
            <button
              onClick={() => onCardClick(hotel.id)}
              className="main-action-buttonpx-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 text-sm"
            >
              Ver Detalhes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedHotelCard;