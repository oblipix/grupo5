import React from 'react';
import { Link } from 'react-router-dom';
import allPromotionalTravels from './data/promotions';
import { FaCalendarAlt, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const PromotionsPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Promoções Especiais
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Aproveite nossas ofertas exclusivas e viva experiências inesquecíveis nos melhores destinos
                    </p>
                </div>

                {/* Promotions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allPromotionalTravels.map((promotion) => (
                        <div key={promotion.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="relative">
                                <img 
                                    src={promotion.imageUrl} 
                                    alt={promotion.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        promotion.status === 'Em Andamento' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-orange-100 text-orange-800'
                                    }`}>
                                        {promotion.status}
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                        {promotion.type}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                    {promotion.title}
                                </h3>
                                
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {promotion.description}
                                </p>
                                
                                <div className="flex items-center text-gray-500 mb-4">
                                    <FaCalendarAlt className="mr-2" />
                                    <span className="text-sm">{promotion.eventDate}</span>
                                </div>
                                
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <FaStar className="text-yellow-400 mr-1" />
                                        <span className="text-sm text-gray-600">
                                            {promotion.reviews?.length || 0} avaliações
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500 line-through">
                                            R$ {promotion.priceFrom?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </div>
                                        <div className="text-lg font-bold text-green-600">
                                            R$ {promotion.priceTo?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </div>
                                    </div>
                                </div>
                                
                                <Link 
                                    to={`/promocao/${promotion.id}`}
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center font-medium inline-block"
                                >
                                    Ver Detalhes
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                
                {allPromotionalTravels.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <FaTag className="mx-auto text-6xl mb-4" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">
                            Nenhuma promoção disponível
                        </h3>
                        <p className="text-gray-600">
                            Volte em breve para conferir nossas ofertas especiais!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PromotionsPage;
