/* eslint-disable no-unused-vars */
// src/pages/HotelsPage.jsx
 
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
 
// 1. Importar os componentes que vamos adicionar
import HeroSwiper from '../layout/HeroSwiper.jsx';
import HomeMenu from '../layout/HomeMenu.jsx';
 
import SearchHotelsBar from '../common/SearchHotelsBar.jsx';
import HotelCard from '../hotels/HotelCard.jsx';
import useHotelFilter from '../hooks/useHotelFilter.js';
import { useHotels } from '../hooks/useHotels.js';
import ScrollReveal from '../common/ScrollReveal.jsx';
import AnimatedHotelCard from '../common/AnimatedHotelCard.jsx';
 
function HotelsPage() {
  const location = useLocation();
  const navigate = useNavigate();
 
  // Hook para gerenciar hotéis da API
  const { hotels, loading, error, refresh } = useHotels();
 
  const queryParams = new URLSearchParams(location.search);
  const initialFilters = {
    destination: queryParams.get('destino') || '',
    page: Number(queryParams.get('pagina')) || 1,
    // Adicione outros filtros da URL aqui se necessário
  };
 
  const { filterParams, setFilterParams, filteredHotels } = useHotelFilter(hotels, initialFilters);
 
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilterParams({
      destination: params.get('destino') || '',
      page: Number(params.get('pagina')) || 1,
    });
  }, [location.search, setFilterParams]);
 
  const hotelsPerPage = 6;
  const indexOfLastHotel = filterParams.page * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotelsPaginated = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);
  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);
 
  const handleSearchSubmit = (params) => {
    const newSearchParams = new URLSearchParams();
    if (params.destination) newSearchParams.append('destino', params.destination);
    newSearchParams.append('pagina', '1');
    navigate(`?${newSearchParams.toString()}`);
  };
 
  const paginate = (pageNumber) => {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('pagina', pageNumber);
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
          <SearchHotelsBar onSearch={handleSearchSubmit} />
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
          <SearchHotelsBar onSearch={handleSearchSubmit} />
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

      <section id="hotels-section" className="bg-gray-50 min-h-screen">
        <ScrollReveal animation="fadeUp" delay={300}>
          <SearchHotelsBar onSearch={handleSearchSubmit} />
        </ScrollReveal>

        <div className="container mx-auto px-6 py-8">
          <ScrollReveal animation="fadeUp" delay={200}>
            <p className="text-center text-lg text-gray-700 mb-8">
              Explore uma seleção de hotéis incríveis e encontre a hospedagem perfeita!
            </p>
          </ScrollReveal>

          {loading && (
            <div className="text-center mb-4">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Atualizando hotéis...
              </div>
            </div>
          )}

          {filteredHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentHotelsPaginated.map((hotel, index) => (
                <AnimatedHotelCard key={hotel.id} index={index}>
                  <HotelCard hotel={hotel} />
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
                    className={`px-4 py-2 rounded-md transition-colors ${filterParams.page === number ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-100'}`}
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