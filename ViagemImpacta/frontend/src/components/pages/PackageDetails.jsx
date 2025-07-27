// src/pages/PackageDetails.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allPromotionalTravels } from '../data/promotions.js';
import { Icons } from '../layout/Icons.jsx'; // Importando os ícones

// Componente para renderizar estrelas de avaliação
const RatingDisplay = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => <Icons.Star key={`full-${i}`} className="w-5 h-5 text-yellow-400" />)}
            {[...Array(emptyStars)].map((_, i) => <Icons.Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />)}
        </div>
    );
};

// Função auxiliar para formatar moeda
const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

function PackageDetails() {
    const { packageId } = useParams();
    const navigate = useNavigate();
    const packageData = allPromotionalTravels.find(p => p.id === parseInt(packageId));

    if (!packageData) {
        return (
            <div className="container mx-auto p-4 text-center">
                <p className="text-xl text-red-600 mb-4">Ops! Promoção não encontrada.</p>
                <button onClick={() => navigate('/')} className="px-6 py-2 bg-gray-300 rounded-lg">
                    Voltar para a Home
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto py-8 px-6">
                <button onClick={() => navigate(-1)} className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded mb-8">
                    &larr; Voltar
                </button>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img 
                        src={packageData.imageUrl} 
                        alt={packageData.title} 
                        className="w-full h-96 object-cover"
                    />
                    <div className="p-8">
                        <h1 className="text-4xl font-extrabold text-blue-800 mb-4">{packageData.title}</h1>
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">{packageData.description}</p>
                        
                        {/* Seção de Preços */}
                        <div className="text-center my-6 p-4 bg-blue-50 rounded-lg">
                            <p className="text-xl text-gray-500 line-through">De: {formatCurrency(packageData.priceFrom)}</p>
                            <p className="text-4xl font-bold text-green-600 mt-1">Por: {formatCurrency(packageData.priceTo)}</p>
                            <p className="text-sm text-gray-500 mt-1">por pessoa</p>
                        </div>

                        {/* Seção de Avaliações */}
                        {packageData.reviews && packageData.reviews.length > 0 && (
                            <div className="my-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">O que os viajantes dizem</h2>
                                <div className="space-y-4">
                                    {packageData.reviews.map((review, index) => (
                                        <div key={index} className="border-t pt-4">
                                            <div className="flex items-center mb-1">
                                                <RatingDisplay rating={review.rating} />
                                                <span className="ml-auto text-xs font-semibold text-gray-600">{review.guestName}</span>
                                            </div>
                                            <p className="text-gray-600 italic text-sm">"{review.comment}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Botão de Reservar */}
                        <div className="mt-8 text-center">
                            <button 
                                onClick={() => navigate(`/purchase/${packageData.id}`)} 
                                className=" main-action-button bg-green-600 text-white font-bold text-xl rounded-full hover:bg-green-700 transition duration-300 shadow-lg transform hover:scale-105 px-10 py-4"
                            >
                                Reservar Agora!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageDetails;
