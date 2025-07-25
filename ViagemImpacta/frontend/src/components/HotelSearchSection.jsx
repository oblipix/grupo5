/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

// Este componente receberá 'hotelsData' e 'Icons' como props do App.jsx
const HotelSearchSection = ({ hotelsData, Icons }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);

  // Efeito para filtrar hotéis com base no termo de pesquisa
  useEffect(() => {
    // Se o termo de pesquisa estiver vazio, não mostra resultados e remove a mensagem de "nenhum resultado"
    if (searchTerm.trim() === '') {
      setFilteredHotels([]);
      setShowNoResults(false);
      return;
    }

    const lowercasedSearchTerm = searchTerm.toLowerCase();
    // Filtra os hotéis usando o título, descrição ou localização
    const results = hotelsData.filter(hotel =>
      hotel.title.toLowerCase().includes(lowercasedSearchTerm) ||
      hotel.description.toLowerCase().includes(lowercasedSearchTerm) ||
      hotel.location.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredHotels(results);
    // Define se a mensagem de "nenhum resultado" deve ser exibida
    setShowNoResults(results.length === 0);
  }, [searchTerm, hotelsData]); // Adiciona hotelsData como dependência para re-executar se os dados mudarem

  return (
    // Apenas a seção de pesquisa, o wrapper principal (min-h-screen, bg-gray-100)
    // será tratado pelo App.jsx para evitar duplicação de estilos
    <section className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Encontre os Melhores Hotéis</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Pesquise por nome, descrição ou localização do hotel..."
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Mensagem de nenhum resultado */}
      {showNoResults && (
        <p className="text-center text-gray-600 text-lg">Nenhum hotel encontrado para sua pesquisa.</p>
      )}

      {/* Exibição dos hotéis filtrados */}
      {filteredHotels.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map(hotel => (
            <div key={hotel.id} className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <img
                src={hotel.mainImageUrl} // Usa mainImageUrl dos dados do hotel
                alt={`Imagem de ${hotel.title}`}
                className="w-full h-48 object-cover"
                // Fallback para imagem caso a URL não carregue
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/E0E0E0/333333?text=Imagem+N%C3%A3o+Dispon%C3%ADvel'; }}
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{hotel.title}</h3>
                <div className="flex items-center mb-3">
                  {/* Renderiza estrelas de avaliação */}
                  {Array.from({ length: 5 }, (_, i) => (
                    <Icons.Star key={i} />
                  ))}
                  <span className="ml-2 text-gray-600 font-medium">{hotel.rating.toFixed(1)}</span>
                </div>
                <p className="text-gray-700 text-sm mb-4">{hotel.description}</p>
                <div className="space-y-2 text-gray-700 text-sm">
                  {/* Exibição das comodidades do hotel */}
                  {hotel.totalRooms && (
                    <p className="flex items-center"><Icons.TotalRooms />Total de Quartos: <span className="font-semibold ml-1">{hotel.totalRooms}</span></p>
                  )}
                  {hotel.totalBathrooms && (
                    <p className="flex items-center"><Icons.TotalBathrooms />Total de Banheiros: <span className="font-semibold ml-1">{hotel.totalBathrooms}</span></p>
                  )}
                  {hotel.elevators !== undefined && (
                    <p className="flex items-center"><Icons.Elevator />Elevadores: <span className="font-semibold ml-1">{hotel.elevators}</span></p>
                  )}
                  {hotel.parking !== undefined && (
                    <p className="flex items-center"><Icons.Parking />Estacionamento: <span className="font-semibold ml-1">{hotel.parking ? 'Disponível' : 'Não Disponível'}</span></p>
                  )}
                  {hotel.hasRestaurant !== undefined && (
                    <p className="flex items-center"><Icons.Restaurant />Restaurante: <span className="font-semibold ml-1">{hotel.hasRestaurant ? 'Sim' : 'Não'}</span></p>
                  )}
                  {hotel.hasWifi !== undefined && (
                    <p className="flex items-center"><Icons.Wifi />Wi-Fi: <span className="font-semibold ml-1">{hotel.hasWifi ? 'Disponível' : 'Não Disponível'}</span></p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default HotelSearchSection;
