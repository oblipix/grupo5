

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 1. Importar o Link para navegação
import { allHotelsData } from '../data/hotels.js'; // 2. Importar os dados dos hotéis
import { Icons } from '../Icons.jsx'; // 3. Importar os ícones

const HotelSearchSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);

  // O useEffect agora usa `allHotelsData` importado
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredHotels([]);
      setShowNoResults(false);
      return;
    }

    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const results = allHotelsData.filter(hotel =>
      hotel.title.toLowerCase().includes(lowercasedSearchTerm) ||
      hotel.description.toLowerCase().includes(lowercasedSearchTerm) ||
      hotel.location.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredHotels(results);
    setShowNoResults(results.length === 0);
  }, [searchTerm]);

  return (
    <section className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg my-8 mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Encontre os Melhores Hotéis</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Pesquise por nome, descrição ou localização do hotel..."
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showNoResults && (
        <p className="text-center text-gray-600 text-lg">Nenhum hotel encontrado para sua pesquisa.</p>
      )}

      {filteredHotels.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map(hotel => (
            // 4. Cada resultado agora é um Link para a página de detalhes
            <Link to={`/hoteis/${hotel.id}`} key={hotel.id} className="block group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl h-full">
                <img
                  src={hotel.mainImageUrl}
                  alt={`Imagem de ${hotel.title}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{hotel.title}</h3>
                  <div className="flex items-center mb-3">
                    {Array.from({ length: 5 }, (_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.round(hotel.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.157L10 16.324l-2.806 2.034c-.783.57-1.838-.196-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.927 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69L9.049 2.927z"></path></svg>
                    ))}
                    <span className="ml-2 text-gray-600 text-sm font-medium">{hotel.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">{hotel.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default HotelSearchSection;