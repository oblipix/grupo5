// src/components/RecommendedHotelsSection.jsx
 
import React from 'react';
import HotelCard from './HotelCard.jsx'; // Usar o HotelCard unificado
import { useHotels } from '../hooks/useHotels.js';
import AnimatedHotelCard from '../common/AnimatedHotelCard.jsx';

// Importa Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
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
                <div className="block md:hidden">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={16}
                        slidesPerView={1.1}
                        centeredSlides={true}
                        navigation={{
                            nextEl: '.recomendados-swiper-button-next',
                            prevEl: '.recomendados-swiper-button-prev',
                        }}
                        pagination={{ 
                            clickable: true,
                            el: '.recomendados-swiper-pagination'
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1.3,
                                spaceBetween: 20,
                                centeredSlides: true,
                            },
                        }}
                        className="px-4 py-4"
                    >
                        {topRatedHotels.map((hotel, index) => (
                            <SwiperSlide key={hotel.id}>
                                <div className="relative w-full px-2">
                                    <AnimatedHotelCard index={index}>
                                        <HotelCard hotel={hotel} />
                                    </AnimatedHotelCard>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    
                    {/* Botões de navegação customizados - com espaço extra para não serem cortados */}
                    <div className="relative flex justify-between items-center mt-6 px-6">
                        <button className="recomendados-swiper-button-prev bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-30 flex-shrink-0">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div className="recomendados-swiper-pagination flex justify-center flex-grow mx-4"></div>
                        <button className="recomendados-swiper-button-next bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-30 flex-shrink-0">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
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