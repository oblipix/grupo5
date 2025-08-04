/* eslint-disable no-unused-vars */
// src/pages/HotelsPage.jsx
 
import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useFilteredHotels from '../hooks/useFilteredHotels';

 
// 1. Importar os componentes que vamos adicionar
import HeroSwiper from '../layout/HeroSwiper.jsx';
import HomeMenu from '../layout/HomeMenu.jsx';
 
import SearchHotelsBar from '../common/SearchHotelsBar.jsx';
import HotelCard from '../hotels/HotelCard.jsx';
import HotelCardSkeleton from '../common/HotelCardSkeleton.jsx';
import { useHotels } from '../hooks/useHotels.js';
import hotelService from '../../services/hotelService';
import ScrollReveal from '../common/ScrollReveal.jsx';
import AnimatedHotelCard from '../common/AnimatedHotelCard.jsx';
 
function HotelsPage() {
  const location = useLocation();
  const navigate = useNavigate();
 
  // Estados do componente - SEMPRE na mesma ordem
  const [refreshFlag, setRefreshFlag] = useState(false);

  // Função para refresh
  const refresh = () => {
    setRefreshFlag(flag => !flag);
  };

  // Memoiza os filtros para evitar recriação desnecessária
  const filters = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);

    //ler amenities da URL
    const amenitiesFromUrl = queryParams.get('amenities');
    const amenitiesArray = amenitiesFromUrl ? amenitiesFromUrl.split(',') : [];

    return {
      destination: queryParams.get('destination') || '',
      page: Number(queryParams.get('page')) || 1,
      minPrice: queryParams.get('minPrice') ? Number(queryParams.get('minPrice')) : undefined,
      maxPrice: queryParams.get('maxPrice') ? Number(queryParams.get('maxPrice')) : undefined,
      amenities: amenitiesFromUrl || '',
      amenitiesArray: amenitiesArray,
      guests: queryParams.get('guests') ? Number(queryParams.get('guests')) : undefined,
      roomType: queryParams.get('roomType') || '',
      checkIn: queryParams.get('checkIn') || '',
      checkOut: queryParams.get('checkOut') || '',
    };
  }, [location.search]);

  // Hook customizado - SEMPRE após os estados e useMemo
  const { hotels, loading, error, loadingState } = useFilteredHotels(filters);


  const hotelsPerPage = 6;
  const indexOfLastHotel = filters.page * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
 const currentHotelsPaginated = hotels.slice(indexOfFirstHotel, indexOfLastHotel);
  const totalPages = Math.ceil(hotels.length / hotelsPerPage);
 
  const handleSearchSubmit = (params) => {
    // Monta nova querystring priorizando todos os valores vindos do formulário (params)
    const newSearchParams = new URLSearchParams();
    if (params.destination) newSearchParams.append('destination', params.destination);
    if (params.minPrice !== undefined) newSearchParams.append('minPrice', params.minPrice);
    if (params.maxPrice !== undefined) newSearchParams.append('maxPrice', params.maxPrice);
    if (params.selectedAmenities && params.selectedAmenities.length > 0) {
      newSearchParams.append('amenities', params.selectedAmenities.join(','));
    }
    if (params.selectedRoomType) newSearchParams.append('roomType', params.selectedRoomType);
    if (params.guests) newSearchParams.append('guests', params.guests);
    if (params.checkIn) newSearchParams.append('checkIn', params.checkIn);
    if (params.checkOut) newSearchParams.append('checkOut', params.checkOut);
    // Adicione outros filtros do formulário aqui se necessário
    newSearchParams.append('page', '1');
    navigate(`?${newSearchParams.toString()}`);
  };
 
  const paginate = (pageNumber) => {
    // Monta nova querystring mantendo todos os filtros atuais
    const newSearchParams = new URLSearchParams();
    if (filters.destination) newSearchParams.append('destination', filters.destination);
    if (filters.minPrice !== undefined) newSearchParams.append('minPrice', filters.minPrice);
    if (filters.maxPrice !== undefined) newSearchParams.append('maxPrice', filters.maxPrice);
    if (filters.amenities) newSearchParams.append('amenities', filters.amenities);
    if (filters.guests) newSearchParams.append('guests', filters.guests);
    if (filters.roomType) newSearchParams.append('roomType', filters.roomType);
    if (filters.checkIn) newSearchParams.append('checkIn', filters.checkIn);
    if (filters.checkOut) newSearchParams.append('checkOut', filters.checkOut);
    newSearchParams.append('page', pageNumber);
    // Adicione outros filtros se necessário
    navigate(`?${newSearchParams.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
 
  // Componente de loading melhorado
  if (loadingState.isLoading && hotels.length === 0) {
    return (
      <>
        <HeroSwiper />
        <HomeMenu />
        <section id="hotels-section" className="bg-white min-h-screen">
            <SearchHotelsBar
              enableOnChange={true}
              onSearch={handleSearchSubmit}
              loadingState={loadingState}
            />
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <div className="space-y-2">
                  <p className="text-gray-600">{loadingState.loadingMessage}</p>
                  {loadingState.progress > 0 && (
                    <div className="w-64 mx-auto">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${loadingState.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{loadingState.progress}% concluído</p>
                    </div>
                  )}
                </div>
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
        <section id="hotels-section" className="bg-white min-h-screen">
           <SearchHotelsBar
              enableOnChange={true}
              onSearch={handleSearchSubmit}
              loadingState={loadingState}
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
      {/* 3. Hero e Menu sem animação para manter posicionamento */}
      <HeroSwiper />
      <HomeMenu />

      <section id="hotels-section" className="bg-white min-h-screen overflow-visible">
         <ScrollReveal animation="fadeUp" delay={300}>
          <SearchHotelsBar
            enableOnChange={true}
            onSearch={handleSearchSubmit}
            loadingState={loadingState}
          />
        </ScrollReveal>

        <div className="container mx-auto px-8 py-12">
          <ScrollReveal animation="fadeUp" delay={200}>
            <p className="text-center text-lg text-gray-700 mb-8">
              Explore uma seleção de hotéis incríveis e encontre a hospedagem perfeita!
            </p>
          </ScrollReveal>

          {loadingState.isLoading && hotels.length === 0 ? (
            // Skeleton loading para primeira carga
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-8 py-4">
              {[...Array(6)].map((_, index) => (
                <HotelCardSkeleton key={index} />
              ))}
            </div>
          ) : hotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-8 py-4">
              {currentHotelsPaginated.map((hotel, index) => (
                <AnimatedHotelCard key={hotel.id} index={index}>
                  <div className="card-spacing">
                    <HotelCard hotel={hotel} />
                  </div>
                </AnimatedHotelCard>
              ))}
            </div>
          ) : (
            <ScrollReveal animation="fadeUp" delay={400}>
              <p className="text-gray-600 text-center text-lg mt-10">
                Nenhum hotel encontrado. Tente ajustar seus filtros de busca.
              </p>
            </ScrollReveal>
          )}

          {totalPages > 1 && (
            <ScrollReveal animation="fadeUp" delay={500}>
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
            </ScrollReveal>
          )}
        </div>
      </section>
    </>
  );
}
 
export default HotelsPage;