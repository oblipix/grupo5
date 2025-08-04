// src/components/RecommendedHotelsSection.jsx
 
import React from 'react';
import HotelCard from './HotelCard.jsx'; // Usar o HotelCard unificado
import { useHotels } from '../hooks/useHotels.js';
import AnimatedHotelCard from '../common/AnimatedHotelCard.jsx';

// Importa Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
 
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
        <section id="recomendado-viajantes" className="py-8 sm:py-12 lg:py-20 bg-white px-6 sm:px-8 lg:px-12 overflow-visible">
            <div className="container mx-auto overflow-visible max-w-7xl">
                <div className="section-title mb-8">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                        Hotéis Recomendados pelos Nossos Viajantes <span className="text-yellow-500">★</span>
                    </h2>
                </div>
                
                {/* Mobile Swiper - visível apenas em telas pequenas */}
                <div className="block md:hidden pb-12">
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={20}
                        slidesPerView={1.0}
                        centeredSlides={true}
                        pagination={{ 
                            clickable: true,
                            el: '.recomendados-swiper-pagination'
                        }}
                        breakpoints={{
                            480: {
                                slidesPerView: 1.0,
                                spaceBetween: 24,
                                centeredSlides: true,
                            },
                            640: {
                                slidesPerView: 1.2,
                                spaceBetween: 28,
                                centeredSlides: true,
                            },
                        }}
                        className="px-2 py-8 overflow-visible"
                        style={{ overflow: 'visible' }}
                    >
                        {topRatedHotels.map((hotel, index) => (
                            <SwiperSlide key={hotel.id} style={{ overflow: 'visible' }}>
                                <div className="relative w-full px-1 pb-6">
                                    <AnimatedHotelCard index={index}>
                                        <HotelCard hotel={hotel} />
                                    </AnimatedHotelCard>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    
                    {/* Apenas paginação centralizada */}
                    <div className="recomendados-swiper-pagination flex justify-center mt-6"></div>
                </div>

                {/* Desktop Grid - visível apenas em telas médias e grandes */}
                <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-12 cards-grid px-2 sm:px-4 lg:px-8 py-4">
                    {topRatedHotels.map((hotel, index) => (
                        <div key={hotel.id} className="relative card-spacing w-full">
                            <AnimatedHotelCard index={index}>
                                <HotelCard hotel={hotel} />
                            </AnimatedHotelCard>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
 
export default RecommendedHotelsSection;