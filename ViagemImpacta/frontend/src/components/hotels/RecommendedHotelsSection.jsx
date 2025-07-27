// src/components/RecommendedHotelsSection.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { allHotelsData } from '../data/hotels.js';

const RecommendedHotelsSection = () => {
    const topRatedHotels = [...allHotelsData]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

    return (
        <section id="recomendado-viajantes" className="py-12 bg-gray-50 px-6">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Hotéis Recomendados pelos Nossos Viajantes <span className="text-yellow-500">★</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {topRatedHotels.map(hotel => (
                        // ====================================================================
                        // A CORREÇÃO ESTÁ AQUI: O link agora aponta para a rota correta
                        // ====================================================================
                        <Link to={`/recommended-hotel/${hotel.id}`} key={hotel.id} className="block group">
                            <div className="bg-white rounded-lg shadow-xl overflow-hidden h-full flex flex-col transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                                <img src={hotel.mainImageUrl} alt={hotel.title} className="w-full h-48 object-cover" />
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="font-bold text-xl text-gray-800 mb-2">{hotel.title}</h3>
                                    <p className="text-gray-600 mb-3 text-sm flex items-center">
                                        <svg className="h-4 w-4 mr-1.5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        {hotel.location}
                                    </p>
                                    <div className="flex items-center mb-4">
                                        <span className="text-yellow-500 text-lg font-bold mr-1">{hotel.rating.toFixed(1)}</span>
                                        <span className="text-gray-500">/ 5.0</span>
                                        <span className="ml-2 text-gray-500 text-xs">({hotel.feedbacks.length} avaliações)</span>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">{hotel.description}</p>
                                    <div className="main-action-button mt-auto text-center bg-blue-600 text-white font-semibold py-2 rounded-lg group-hover:bg-blue-700 transition duration-300">
                                        Ver Detalhes
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecommendedHotelsSection;
