// src/components/hotels/HotelsMapSection.jsx

import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import { allHotelsData } from '../data/hotels.js'; // Certifique-se de que o caminho está correto

const mapContainerStyle = {
  width: '100%',
  height: '450px', // Aumentei a altura para melhor visualização
  borderRadius: '0.5rem',
};

const defaultCenter = { lat: -14.2350, lng: -51.9253 }; // Centro do Brasil

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

const createMarkerIcon = (color) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

function HotelsMapSection({ isLoaded }) {
  const navigate = useNavigate();
  
  // Estado para controlar o centro do mapa e o zoom
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [mapZoom, setMapZoom] = useState(4);
  
  // Estado para controlar qual hotel está selecionado (InfoWindow)
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Função para centralizar o mapa em um hotel específico
  const handleUnitClick = (hotel) => {
    setMapCenter({ lat: hotel.lat, lng: hotel.lng });
    setMapZoom(14); // Aumenta o zoom ao focar em uma cidade
    setSelectedHotel(hotel); // Seleciona o hotel para mostrar InfoWindow
  };

  // Função para lidar com clique no marcador
  const handleMarkerClick = (hotel) => {
    setSelectedHotel(hotel);
    setMapCenter({ lat: hotel.lat, lng: hotel.lng });
  };

  // Função para redirecionar para detalhes do hotel
  const handleViewDetails = (hotelId) => {
    navigate(`/hoteis/${hotelId}`);
  };

  return (
    <section id="mapa-hoteis" className="py-12 bg-white px-6">
      <div className="container mx-auto">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Onde Estamos: Nossos Hotéis no Mapa</h2>
            <p className="text-gray-600 mt-2">Explore nossas unidades e planeje sua estadia!</p>
        </div>
        
        {/* Layout de duas colunas */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Coluna da Esquerda: Lista de Unidades */}
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Nossas Unidades</h3>
            <div className="space-y-2">
              {allHotelsData.map(hotel => (
                <button
                  key={hotel.id}
                  onClick={() => handleUnitClick(hotel)}
                  className="w-full text-left flex items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                >
                  <span 
                    className="w-3 h-3 rounded-full mr-3 flex-shrink-0" 
                    style={{ backgroundColor: hotel.markerColor || '#4285F4' }}
                  ></span>
                  <span>{hotel.location.split(',')[0]}</span> {/* Mostra apenas a cidade */}
                </button>
              ))}
            </div>
          </div>

          {/* Coluna da Direita: Mapa */}
          <div className="w-full md:w-2/3 rounded-lg overflow-hidden shadow-xl">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter} // O centro agora é dinâmico
                zoom={mapZoom}     // O zoom agora é dinâmico
                options={mapOptions}
                onClick={() => setSelectedHotel(null)} // Fecha InfoWindow ao clicar no mapa
              >
                {allHotelsData.map(hotel => (
                  <Marker
                    key={hotel.id}
                    position={{ lat: hotel.lat, lng: hotel.lng }}
                    title={hotel.title}
                    icon={{
                      url: createMarkerIcon(hotel.markerColor || '#4285F4'),
                      scaledSize: new window.google.maps.Size(30, 30),
                      anchor: new window.google.maps.Point(15, 30),
                    }}
                    onClick={() => handleMarkerClick(hotel)}
                  />
                ))}
                
                {/* InfoWindow para mostrar detalhes do hotel selecionado */}
                {selectedHotel && (
                  <InfoWindow
                    position={{ lat: selectedHotel.lat, lng: selectedHotel.lng }}
                    onCloseClick={() => setSelectedHotel(null)}
                    options={{
                      pixelOffset: new window.google.maps.Size(0, -30),
                      maxWidth: 280,
                    }}
                  >
                    <div className="p-3 max-w-xs">
                      <div className="flex flex-col space-y-2">
                        {/* Imagem do hotel */}
                        <img 
                          src={selectedHotel.mainImageUrl || selectedHotel.images?.[0] || 'https://via.placeholder.com/200x120?text=Hotel'}
                          alt={selectedHotel.title}
                          className="w-full h-24 object-cover rounded-md"
                          loading="lazy"
                        />
                        
                        {/* Informações do hotel */}
                        <div>
                          <h3 className="font-bold text-gray-800 text-sm line-clamp-2">{selectedHotel.title}</h3>
                          <p className="text-gray-600 text-xs mb-1 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {selectedHotel.location}
                          </p>
                          
                          {/* Rating */}
                          {selectedHotel.rating && (
                            <div className="flex items-center mb-1">
                              <span className="text-yellow-500 text-xs">★</span>
                              <span className="text-xs text-gray-700 ml-1 font-medium">{selectedHotel.rating}</span>
                              <span className="text-xs text-gray-500 ml-1">/5.0</span>
                            </div>
                          )}
                          
                          {/* Preço */}
                          {selectedHotel.price && (
                            <p className="text-blue-600 font-semibold text-sm">
                              A partir de R$ {selectedHotel.price.toLocaleString('pt-BR')}/noite
                            </p>
                          )}
                          
                          {/* Descrição curta */}
                          {selectedHotel.description && (
                            <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                              {selectedHotel.description.substring(0, 80)}...
                            </p>
                          )}
                          
                          {/* Botão para ver detalhes */}
                          <button
                            onClick={() => handleViewDetails(selectedHotel.id)}
                            className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded-md transition-colors duration-200 font-medium shadow-sm"
                          >
                            Ver Detalhes Completos
                          </button>
                        </div>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            ) : (
              <div className="bg-gray-200 w-full h-[450px] flex items-center justify-center text-gray-500 rounded-lg">
                Carregando mapa...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HotelsMapSection;
