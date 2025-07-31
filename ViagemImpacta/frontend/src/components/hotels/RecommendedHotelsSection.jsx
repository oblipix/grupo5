// src/components/RecommendedHotelsSection.jsx
 
import React from 'react';
import HotelCard from './HotelCard.jsx'; // Usar o HotelCard unificado
import { useHotels } from '../hooks/useHotels.js';
import AnimatedHotelCard from '../common/AnimatedHotelCard.jsx';
 
const RecommendedHotelsSection = () => {
    const { hotels, loading, error } = useHotels();
   
    const topRatedHotels = [...hotels]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);
 
    if (loading) {
        return (
            <section id="recomendado-viajantes" className="py-12 bg-gray-50 px-6">
                <div className="container mx-auto">
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Carregando recomendações...</p>
                    </div>
                </div>
            </section>
        );
    }
 
    if (error) {
        return (
            <section id="recomendado-viajantes" className="py-12 bg-gray-50 px-6">
                <div className="container mx-auto">
                    <div className="text-center py-8">
                        <p className="text-red-600">Erro ao carregar recomendações</p>
                    </div>
                </div>
            </section>
        );
    }
 
    return (
        <section id="recomendado-viajantes" className="py-12 bg-white px-6">
            <div className="container mx-auto">
                <div className="section-title">
                    <h2 className="text-3xl font-bold">
                        Hotéis Recomendados pelos Nossos Viajantes <span className="text-yellow-500">★</span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cards-grid">
                    {topRatedHotels.map((hotel, index) => (
                        <AnimatedHotelCard key={hotel.id} index={index}>
                            <div className="card-spacing">
                                <HotelCard hotel={hotel} />
                            </div>
                        </AnimatedHotelCard>
                    ))}
                </div>
            </div>
        </section>
    );
};
 
export default RecommendedHotelsSection;