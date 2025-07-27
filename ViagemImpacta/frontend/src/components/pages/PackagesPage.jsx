// src/pages/PackagesPage.jsx

import React, { useState } from 'react';

// 1. Importar os dados das promoções diretamente
import { allPromotionalTravels } from '../data/promotions.js'; 
import PackageCard from '../pages/PackageDetails.jsx'; // Importar o card de pacotes

// Função auxiliar (pode ser movida para um arquivo src/utils/helpers.js)
const removeAccents = (str) => {
    if (!str) return ''; 
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

// 2. O componente não recebe mais props
function PackagesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const packagesPerPage = 4; // Aumentei para 4 para preencher melhor a tela

    const processedSearchTerm = removeAccents(searchTerm).toLowerCase();

    // 3. O filtro agora usa a constante importada 'allPromotionalTravels'
    const filteredPackages = allPromotionalTravels.filter(pkg => {
        const processedTitle = removeAccents(pkg.title).toLowerCase();
        const processedDescription = removeAccents(pkg.description).toLowerCase();
        const processedLocation = pkg.location ? removeAccents(pkg.location).toLowerCase() : '';
        const processedEventDate = pkg.eventDate ? removeAccents(pkg.eventDate).toLowerCase() : '';
        // Adicionei o 'theme' que você tinha no seu exemplo de dados
        const processedTheme = pkg.theme ? removeAccents(pkg.theme).toLowerCase() : '';

        return processedTitle.includes(processedSearchTerm) ||
               processedDescription.includes(processedSearchTerm) ||
               processedLocation.includes(processedSearchTerm) ||
               processedEventDate.includes(processedSearchTerm) ||
               processedTheme.includes(processedSearchTerm);
    });

    // A lógica de paginação permanece a mesma
    const indexOfLastPackage = currentPage * packagesPerPage;
    const indexOfFirstPackage = indexOfLastPackage - packagesPerPage;
    const currentPackages = filteredPackages.slice(indexOfFirstPackage, indexOfLastPackage);
    const totalPages = Math.ceil(filteredPackages.length / packagesPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section id="packages-section" className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-6">
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Encontre o Pacote Perfeito</h2>
                    <input
                        type="text"
                        placeholder="Pesquise por 'Carnaval', 'Recife', 'Natal'..."
                        className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reseta para a primeira página ao buscar
                        }}
                    />
                </div>

                {/* A lógica de renderização e paginação permanece a mesma */}
                {filteredPackages.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {currentPackages.map(pkg => (
                            <PackageCard key={pkg.id} pkg={pkg} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center text-lg mt-10">
                        Nenhum pacote encontrado para sua busca. Tente outras palavras-chave.
                    </p>
                )}

                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-12">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                            <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={`px-4 py-2 rounded-md transition-colors ${currentPage === number ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-100'}`}
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