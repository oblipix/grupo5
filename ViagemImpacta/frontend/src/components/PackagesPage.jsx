import React, { useState } from 'react';
import PackageCard from './PackageCard'; // Importe o PackageCard

// Função auxiliar para remover acentos (definida localmente para PackagesPage)
const removeAccents = (str) => {
  if (!str) return ''; 
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

// Dados de exemplo para Pacotes (serão passados do App.jsx)
// Incluindo um campo 'theme' para facilitar a busca/filtro
/*
const allPackagesData = [
  { 
    id: 1, title: 'Carnaval Tripz Folia em Recife!', description: 'Sinta a energia contagiante do Carnaval em Recife!', 
    imageUrl: 'https://picsum.photos/id/13/800/600', location: 'Recife, PE', eventDate: '15/02/2027', priceFrom: 1999.00, theme: 'Carnaval',
    galleryImages: ['https://picsum.photos/id/14/100/80', 'https://picsum.photos/id/15/100/80']
  },
  { 
    id: 2, title: 'Réveillon Tripz: Brilho e Emoção em Copacabana!', description: 'Prepare-se para a maior festa de Réveillon do mundo!', 
    imageUrl: 'https://picsum.photos/id/16/800/600', location: 'Rio de Janeiro, RJ', eventDate: '31/12/2026', priceFrom: 3200.00, theme: 'Ano Novo',
    galleryImages: ['https://picsum.photos/id/17/100/80', 'https://picsum.photos/id/18/100/80']
  },
  { 
    id: 3, title: 'Natal Mágico na Montanha - Tripz Garanhuns!', description: 'Viva a magia do Natal em Garanhuns!', 
    imageUrl: 'https://picsum.photos/id/19/800/600', location: 'Garanhuns, PE', eventDate: '24/12/2025', priceFrom: 1850.00, theme: 'Natal',
    galleryImages: ['https://picsum.photos/id/20/100/80', 'https://picsum.photos/id/21/100/80']
  },
  { 
    id: 4, title: 'Dia dos Namorados Romântico na Serra', description: 'Celebre o amor em um refúgio aconchegante.', 
    imageUrl: 'https://picsum.photos/id/22/800/600', location: 'Monte Verde, MG', eventDate: '12/06/2026', priceFrom: 1200.00, theme: 'Dia dos Namorados',
    galleryImages: ['https://picsum.photos/id/23/100/80', 'https://picsum.photos/id/24/100/80']
  },
];
*/

// Componente PackagesPage: Exibe uma lista de pacotes temáticos com busca e paginação
// Recebe 'allPromotionalTravels' como prop 'packagesData' do App.jsx
function PackagesPage({ packagesData }) { // Prop 'packagesData' agora recebe os dados
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPagePackages, setCurrentPagePackages] = useState(1); // Controla a página atual
  const packagesPerPage = 2; // Exibir 2 pacotes por página

  const processedSearchTerm = removeAccents(searchTerm).toLowerCase();

  const filteredPackages = packagesData.filter(pkg => { // Usa packagesData diretamente
    const processedTitle = removeAccents(pkg.title).toLowerCase();
    const processedDescription = removeAccents(pkg.description).toLowerCase();
    const processedLocation = pkg.location ? removeAccents(pkg.location).toLowerCase() : '';
    const processedEventDate = pkg.eventDate ? removeAccents(pkg.eventDate).toLowerCase() : '';
    const processedTheme = pkg.theme ? removeAccents(pkg.theme).toLowerCase() : ''; // Filtra por tema

    return processedTitle.includes(processedSearchTerm) ||
           processedDescription.includes(processedSearchTerm) ||
           processedLocation.includes(processedSearchTerm) ||
           processedEventDate.includes(processedSearchTerm) ||
           processedTheme.includes(processedSearchTerm);
  });

  // Lógica de Paginação
  const indexOfLastPackage = currentPagePackages * packagesPerPage;
  const indexOfFirstPackage = indexOfLastPackage - packagesPerPage;
  const currentPackages = filteredPackages.slice(indexOfFirstPackage, indexOfLastPackage);
  
  const totalPages = Math.ceil(filteredPackages.length / packagesPerPage);

  const paginate = (pageNumber) => setCurrentPagePackages(pageNumber);

  return (
    <section id="packages-section" className="bg-white min-h-screen py-8">
      <div className="container mx-auto px-6">
        {/* Ferramenta de Busca para Pacotes */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Buscar Pacotes por Tema ou Local</h2>
          <input
            type="text"
            placeholder="Pesquise por tema, localização, título ou descrição do pacote..."
            className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredPackages.length === 0 && searchTerm && (
              <p className="text-gray-600 text-center text-lg mt-4">
                  Nenhum pacote encontrado para "{searchTerm}" :( <br />
                  Tente ajustar sua busca.
              </p>
          )}
        </div>

        {/* Listagem de Pacotes */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* 2 pacotes por linha em md+ */}
            {currentPackages.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        ) : (
          !searchTerm && ( // Só mostra mensagem se não houver termo de busca e não há pacotes (inicialmente vazia)
            <p className="text-gray-600 text-center text-lg">Nenhum pacote disponível.</p>
          )
        )}

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-4 py-2 rounded-md ${currentPagePackages === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {number}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default PackagesPage;