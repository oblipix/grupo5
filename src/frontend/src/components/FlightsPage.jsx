import React, { useState } from 'react';
// === MUDANÇA AQUI: Importar FlightCard ===
import FlightCard from './FlightCard'; 

// A função removeAccents é necessária aqui para a lógica de filtragem.
// Se você a exportou do App.jsx, a importação abaixo funcionará.
// Caso contrário, você pode copiá-la para este arquivo ou criar um arquivo de utilidades.
import { removeAccents } from '../App'; 

// Dados de exemplo para voos (ATUALIZADOS com propriedades para o FlightCard)
const allFlights = [
    { id: 401, title: 'Brasília', description: 'Ida 12/08/2025', imageUrl: 'https://picsum.photos/id/125/400/300', type: 'Nacional', status: 'Disponível', price: 94.22, category: 'Economy', connection: false, origin: 'São Paulo', subtitle: 'Brasil Int.' },
    { id: 402, title: 'São Paulo', description: 'Ida 09/08/2025', imageUrl: 'https://picsum.photos/id/126/400/300', type: 'Nacional', status: 'Disponível', price: 94.85, category: 'Economy', connection: false, origin: 'Brasília', subtitle: 'Viracopos' },
    { id: 403, title: 'Jaguaruna', description: 'Ida 10/09/2025', imageUrl: 'https://picsum.photos/id/127/400/300', type: 'Nacional', status: 'Disponível', price: 153.34, category: 'Economy', connection: false, origin: 'São Paulo', subtitle: 'Humberto Ghizzo Bortoluzzi Regional' },
    { id: 404, title: 'Nova York', description: 'Ida 05/11/2025', imageUrl: 'https://picsum.photos/id/128/400/300', type: 'Internacional', status: 'Disponível', price: 3000.00, category: 'Premium Business', connection: true, origin: 'Brasília', subtitle: 'Internacional' },
    { id: 405, title: 'Salvador', description: 'Ida 20/12/2025', imageUrl: 'https://picsum.photos/id/129/400/300', type: 'Nacional', status: 'Disponível', price: 500.00, category: 'Economy', connection: false, origin: 'São Paulo', subtitle: 'Brasil' },
    { id: 406, title: 'Londres', description: 'Ida 15/01/2026', imageUrl: 'https://picsum.photos/id/130/400/300', type: 'Internacional', status: 'Disponível', price: 2800.00, category: 'Economy', connection: true, origin: 'São Paulo', subtitle: 'Internacional' },
];

function FlightsPage({ onCardClick, onSaveTravel, isTravelSaved }) {
  const [origin, setOrigin] = useState('Todas as origens');
  const [destination, setDestination] = useState('Todos os destinos');
  const [filterType, setFilterType] = useState(null); 
  const [filterCategory, setFilterCategory] = useState(null); 
  const [filterConnection, setFilterConnection] = useState(null); 
  const [showMilesOffers, setShowMilesOffers] = useState(false);

  const filteredFlights = allFlights.filter(flight => {
    const processedFlightOrigin = removeAccents(flight.origin).toLowerCase();
    const processedFlightDestination = removeAccents(flight.title).toLowerCase(); 
    
    const processedFilterOrigin = removeAccents(origin).toLowerCase();
    const processedFilterDestination = removeAccents(destination).toLowerCase();

    if (origin !== 'Todas as origens' && processedFlightOrigin !== processedFilterOrigin) return false;
    if (destination !== 'Todos os destinos' && processedFlightDestination !== processedFilterDestination) return false;

    if (filterType === 'oneWay' && flight.connection) return false;
    if (filterType === 'roundTrip' && !flight.connection) return false;

    if (filterCategory && flight.category.toLowerCase() !== filterCategory.toLowerCase()) return false;

    if (filterConnection === 'direct' && flight.connection) return false;
    if (filterConnection === 'connection' && !flight.connection) return false;

    if (showMilesOffers && flight.price >= 1000) return false; // Ajuste o valor conforme sua lógica de "milhas"

    return true;
  });

  return (
    <section className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-6">
        {/* Formulário de busca e filtros */}
        <div className="bg-white p-6 rounded-b-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex-1 w-full md:w-auto">
              <label htmlFor="origin" className="block text-gray-700 text-sm font-bold mb-2">
                Origem:
              </label>
              <select
                id="origin"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              >
                <option>Todas as origens</option>
                <option>São Paulo</option>
                <option>Rio de Janeiro</option>
                <option>Brasília</option>
              </select>
            </div>
            <div className="flex-1 w-full md:w-auto">
              <label htmlFor="destination" className="block text-gray-700 text-sm font-bold mb-2">
                Destinos:
              </label>
              <select
                id="destination"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option>Todos os destinos</option>
                <option>Brasília</option>
                <option>São Paulo</option> 
                <option>Jaguaruna</option> 
                <option>Rio de Janeiro</option>
                <option>Paris</option>
                <option>Nova York</option>
                <option>Salvador</option>
                <option>Londres</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="milesOffers"
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={showMilesOffers}
                onChange={(e) => setShowMilesOffers(e.target.checked)}
              />
              <label htmlFor="milesOffers" className="text-gray-700 text-sm">
                Ver ofertas em milhas
              </label>
            </div>
          </div>

          {/* Filtros por tipo de voo/categoria */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setFilterType(filterType === 'oneWay' ? null : 'oneWay')} 
              className={`px-4 py-2 rounded-full text-sm font-medium ${filterType === 'oneWay' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Somente ida
            </button>
            <button
              onClick={() => setFilterType(filterType === 'roundTrip' ? null : 'roundTrip')} 
              className={`px-4 py-2 rounded-full text-sm font-medium ${filterType === 'roundTrip' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`} 
            >
              Ida e volta
            </button>
            <button
              onClick={() => setFilterCategory(filterCategory === 'economy' ? null : 'economy')} 
              className={`px-4 py-2 rounded-full text-sm font-medium ${filterCategory === 'economy' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`} 
            >
              Economy
            </button>
            <button
              onClick={() => setFilterCategory(filterCategory === 'premiumEconomy' ? null : 'premiumEconomy')} 
              className={`px-4 py-2 rounded-full text-sm font-medium ${filterCategory === 'premiumEconomy' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`} 
            >
              Premium Economy
            </button>
            <button
              onClick={() => setFilterCategory(filterCategory === 'premiumBusiness' ? null : 'premiumBusiness')} 
              className={`px-4 py-2 rounded-full text-sm font-medium ${filterCategory === 'premiumBusiness' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`} 
            >
              Premium Business
            </button>
            <button
              onClick={() => setFilterConnection(filterConnection === 'direct' ? null : 'direct')} 
              className={`px-4 py-2 rounded-full text-sm font-medium ${filterConnection === 'direct' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`} 
            >
              Voo direto
            </button>
            <button
              onClick={() => setFilterConnection(filterConnection === 'connection' ? null : 'connection')} 
              className={`px-4 py-2 rounded-full text-sm font-medium ${filterConnection === 'connection' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`} 
            >
              Voo com conexão
            </button>
            <button
              onClick={() => {
                setFilterType(null);
                setFilterCategory(null);
                setFilterConnection(null);
              }}
              className="px-4 py-2 rounded-full text-sm font-medium bg-gray-300 text-gray-800 hover:bg-gray-400"
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Seção de Resultados de Voos */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            Descubra as melhores ofertas
            <span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full ml-4 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7zm-1 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
              Acumule Milhas LATAM Pass!
            </span>
          </h2>

          {filteredFlights.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredFlights.map(flight => (
                <FlightCard // === MUDANÇA AQUI: AGORA USA FlightCard ===
                  key={flight.id}
                  travel={flight} // 'travel' aqui é o objeto 'flight'
                  onCardClick={onCardClick}
                  onSaveTravel={onSaveTravel}
                  isTravelSaved={isTravelSaved}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center text-lg">
              Nenhum voo encontrado com os filtros selecionados.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default FlightsPage;