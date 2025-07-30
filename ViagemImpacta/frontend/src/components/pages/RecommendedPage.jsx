// src/components/pages/RecommendedPage.jsx

import React from 'react';
import RecommendedHotelsSection from '../hotels/RecommendedHotelsSection';

const RecommendedPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header da página */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Hotéis Recomendados
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
                        Descubra os melhores hotéis selecionados especialmente para você
                    </p>
                </div>
            </div>

            {/* Seção de hotéis recomendados */}
            <div className="container mx-auto py-12">
                <RecommendedHotelsSection />
            </div>

            {/* Seção adicional com informações */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Por que escolher nossos recomendados?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Nossa equipe seleciona cuidadosamente os melhores hotéis com base em qualidade, 
                            localização e experiência dos hóspedes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Qualidade Garantida</h3>
                            <p className="text-gray-600">
                                Todos os hotéis passam por rigorosa seleção baseada em critérios de excelência.
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Localizações Prime</h3>
                            <p className="text-gray-600">
                                Estrategicamente localizados nos melhores pontos dos destinos mais procurados.
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Avaliações Excelentes</h3>
                            <p className="text-gray-600">
                                Baseado em avaliações reais de milhares de hóspedes satisfeitos.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecommendedPage;
