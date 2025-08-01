/* eslint-disable no-unused-vars */
// src/pages/HotelsPage.jsx
 
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useFilteredHotels from '../hooks/useFilteredHotels';

 
// 1. Importar os componentes que vamos adicionar
import HeroSwiper from '../layout/HeroSwiper.jsx';
import HomeMenu from '../layout/HomeMenu.jsx';
 
import SearchHotelsBar from '../common/SearchHotelsBar.jsx';
import HotelCard from '../hotels/HotelCard.jsx';
import useHotelFilter from '../hooks/useHotelFilter.js';
import { useHotels } from '../hooks/useHotels.js';
import hotelService from '../../services/hotelService';
 
function HotelsPage() {
  const location = useLocation();
  const navigate = useNavigate();
 
  // Hook para gerenciar hotéis da API
 

const [refreshFlag, setRefreshFlag] = useState(false);
const refresh = () => {
  setRefreshFlag(flag => !flag);
};
const [selectedAmenities, setSelectedAmenities] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const filters = {
     destination: queryParams.get('destino') || '',
      page: Number(queryParams.get('pagina')) || 1,
      precoMin: queryParams.get('precoMin') ? Number(queryParams.get('precoMin')) : undefined,
      precoMax: queryParams.get('precoMax') ? Number(queryParams.get('precoMax')) : undefined,
      amenities: selectedAmenities.join(','),
      guests: queryParams.get('hospedes') ? Number(queryParams.get('hospedes')) : undefined,
      roomType: queryParams.get('tipoQuarto') || '',
      checkIn: queryParams.get('checkIn') || '',
      checkOut: queryParams.get('checkOut') || '',
    // Adicione outros filtros da URL aqui se necessário
  };

  // DEBUG TEMPORÁRIO: Veja o objeto filters antes de enviar para o hook
  console.log('[DEBUG][HotelsPage][TEMP] Filtros montados:', filters);

  const { hotels, loading, error } = useFilteredHotels(filters);


  const hotelsPerPage = 6;
  const indexOfLastHotel = filters.page * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
 const currentHotelsPaginated = hotels.slice(indexOfFirstHotel, indexOfLastHotel);
  const totalPages = Math.ceil(hotels.length / hotelsPerPage);
 
  const handleSearchSubmit = (params) => {
    // Monta nova querystring priorizando todos os valores vindos do formulário (params)
    const newSearchParams = new URLSearchParams();
    if (params.destination) newSearchParams.append('destino', params.destination);
    if (params.precoMin !== undefined) newSearchParams.append('precoMin', params.precoMin);
    if (params.precoMax !== undefined) newSearchParams.append('precoMax', params.precoMax);
    if (params.selectedAmenities && params.selectedAmenities.length > 0) {
      newSearchParams.append('comodidades', params.selectedAmenities.join(','));
    }
    if (params.selectedRoomType) newSearchParams.append('tipoQuarto', params.selectedRoomType);
    if (params.guests) newSearchParams.append('hospedes', params.guests);
    if (params.checkIn) newSearchParams.append('checkIn', params.checkIn);
    if (params.checkOut) newSearchParams.append('checkOut', params.checkOut);
    // Adicione outros filtros do formulário aqui se necessário
    newSearchParams.append('pagina', '1');
    navigate(`?${newSearchParams.toString()}`);
  };
 
  const paginate = (pageNumber) => {
    // Monta nova querystring mantendo todos os filtros atuais
    const newSearchParams = new URLSearchParams();
    if (filters.destination) newSearchParams.append('destino', filters.destination);
    if (filters.precoMin !== undefined) newSearchParams.append('precoMin', filters.precoMin);
    if (filters.precoMax !== undefined) newSearchParams.append('precoMax', filters.precoMax);
    if (filters.amenities) newSearchParams.append('comodidades', filters.amenities);
    if (filters.guests) newSearchParams.append('hospedes', filters.guests);
    if (filters.roomType) newSearchParams.append('tipoQuarto', filters.roomType);
    if (filters.checkIn) newSearchParams.append('checkIn', filters.checkIn);
    if (filters.checkOut) newSearchParams.append('checkOut', filters.checkOut);
    newSearchParams.append('pagina', pageNumber);
    // Adicione outros filtros se necessário
    navigate(`?${newSearchParams.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
 
  // Componente de loading
  if (loading && hotels.length === 0) {
    return (
      <>
        <HeroSwiper />
        <HomeMenu />
        <section id="hotels-section" className="bg-gray-50 min-h-screen">
            <SearchHotelsBar
              selectedAmenities={selectedAmenities}
              onAmenitiesChange={setSelectedAmenities}
              onSearch={handleSearchSubmit}
            />
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Carregando hotéis...</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
 
  // Componente de erro
  
  if (error) {
    return (
      <>
        <HeroSwiper />
        <HomeMenu />
        <section id="hotels-section" className="bg-gray-50 min-h-screen">
           <SearchHotelsBar
              selectedAmenities={selectedAmenities}
              onAmenitiesChange={setSelectedAmenities}
              onSearch={handleSearchSubmit}
            />
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p className="font-bold">Erro ao carregar hotéis</p>
                  <p>{error}</p>
                </div>
                <button
                  onClick={refresh}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Tentar Novamente
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
    ); 
  }
 
  return (
    // 2. Usar um Fragment <> para agrupar os elementos
    <>
      {/* 3. Adicionar o HeroSwiper e o HomeMenu no topo da página */}
      <HeroSwiper />
      <HomeMenu />
 
      <section id="hotels-section" className="bg-gray-50 min-h-screen">
         <SearchHotelsBar
            selectedAmenities={selectedAmenities}
            onAmenitiesChange={setSelectedAmenities}
            onSearch={handleSearchSubmit}
          />
 
        <div className="container mx-auto px-6 py-8">
          <p className="text-center text-lg text-gray-700 mb-8">
            Explore uma seleção de hotéis incríveis e encontre a hospedagem perfeita!
          </p>
 
          {loading && (
            <div className="text-center mb-4">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Atualizando hotéis...
              </div>
            </div>
          )}
 
          {hotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentHotelsPaginated.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center text-lg mt-10">
              Nenhum hotel encontrado. Tente ajustar seus filtros de busca.
            </p>
          )}
 
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-12">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 rounded-md transition-colors ${filters.page === number ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-100'}`}
                >
                  {number}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
 
export default HotelsPage;