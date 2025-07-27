// src/pages/HotelsPage.jsx

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// 1. Importar os componentes que vamos adicionar
import HeroSwiper from '../layout/HeroSwiper.jsx';
import HomeMenu from '../layout/HomeMenu.jsx';

import SearchHotelsBar from '../common/SearchHotelsBar.jsx';
import HotelCard from '../hotels/HotelCard.jsx';
import useHotelFilter from '../hooks/useHotelFilter.js';
import { allHotelsData } from '../data/hotels.js';

function HotelsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialFilters = {
    destination: queryParams.get('destino') || '',
    page: Number(queryParams.get('pagina')) || 1,
    // Adicione outros filtros da URL aqui se necessário
  };

  const { filterParams, setFilterParams, filteredHotels } = useHotelFilter(allHotelsData, initialFilters);

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

  return (
    // 2. Usar um Fragment <> para agrupar os elementos
    <>
      {/* 3. Adicionar o HeroSwiper e o HomeMenu no topo da página */}
      <HeroSwiper />
      <HomeMenu />

      <section id="hotels-section" className="bg-gray-50 min-h-screen">
        <SearchHotelsBar onSearch={handleSearchSubmit} />

        <div className="container mx-auto px-6 py-8">
          <p className="text-center text-lg text-gray-700 mb-8">
            Explore uma seleção de hotéis incríveis e encontre a hospedagem perfeita!
          </p>

          {filteredHotels.length > 0 ? (
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
                  className={`px-4 py-2 rounded-md transition-colors ${filterParams.page === number ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-100'}`}
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
