import React from 'react';
// Importe a função isHotelSaved se ela for usada dentro do card
// import { isHotelSaved } from '../App'; // Ou passe como prop

const RecommendedHotelCard = ({ hotel, onCardClick, onSaveTravel, isHotelSaved }) => {
  if (!hotel) {
    return null; // ou algum placeholder
  }

  const handleSaveClick = (e) => {
    e.stopPropagation(); // Evita que o clique no botão ative o clique do card
    try {
      if (onSaveTravel) {
        onSaveTravel(hotel);
        
        // Garante que vai para a página de favoritos mesmo se houver erro no backend
        setTimeout(() => {
          window.location.href = '/minhas-viagens';
        }, 500);
      }
    } catch (error) {
      console.error("Erro ao processar ação de favorito:", error);
      alert("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.");
    }
  };

  const isSaved = isHotelSaved ? isHotelSaved(hotel.id) : false;

  return (
    <div
      className="hotel-card-modern bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"
      onClick={() => onCardClick(hotel.id)}
    >
      <div className="relative">
        {/* Overlay gradient for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
        
        <img
          src={hotel.mainImageUrl}
          alt={hotel.title}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Title and location overlay on image */}
        <h3 className="absolute bottom-4 left-4 z-20 text-white font-bold text-xl drop-shadow-lg">{hotel.title}</h3>
        
        {/* Save button with modern styling */}
        <button
          onClick={handleSaveClick}
          className={`favorite-button ${isSaved ? 'favorited' : ''}`}
          title={isSaved ? "Remover dos favoritos" : "Salvar nos favoritos"}
        >
          <svg className={`h-6 w-6 transition-colors ${isSaved ? 'text-red-500' : 'text-gray-500'}`}
            fill={isSaved ? 'currentColor' : 'none'}
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 18.75l-7.682-7.682a4.5 4.5 0 010-6.364z" />
          </svg>
        </button>
      </div>
      
      <div className="p-5 bg-gradient-to-b from-white to-gray-50">
        <p className="text-sm text-gray-700 leading-relaxed line-clamp-2 mb-4">{hotel.description}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="bg-blue-600 text-white px-3 py-1.5 rounded-lg font-bold text-lg pulse-price">
            R$ {hotel.price.toFixed(2)}
          </div>
          <div className="flex items-center gap-2">
            
            {/* Botão de Reservar */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Navega direto para a página de pagamento com os dados do hotel
                window.location.href = `/payment?hotelId=${hotel.id}&type=hotel&price=${hotel.price}`;
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 text-sm font-semibold"
            >
              Reservar
            </button>
            
            <button
              onClick={() => onCardClick(hotel.id)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 text-sm"
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