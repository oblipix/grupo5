// src/components/hotels/PromocoesDestaque.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHotels } from '../hooks/useHotels.js';
import HotelCard from './HotelCard.jsx';
import AnimatedHotelCard from '../common/AnimatedHotelCard.jsx';

// Importa Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const PromocoesDestaque = () => {
    const { hotels, loading, error } = useHotels();
    const [promocoes, setPromocoes] = useState([]);
    
    // Efeito para filtrar os hotéis com promoção
    useEffect(() => {
        if (hotels && hotels.length > 0) {
            // Aqui podemos filtrar os hotéis com alguma promoção ou desconto
            // Por exemplo, hotéis que têm uma tag "promo" ou um campo de desconto
            
            // Como exemplo, vamos considerar que os hotéis com valores abaixo da média estão em promoção
            const avgPrice = hotels.reduce((acc, hotel) => {
                const hotelPrice = hotel.price || 
                    (hotel.roomOptions?.length > 0 
                        ? Math.min(...hotel.roomOptions.map(room => room.price).filter(price => price > 0))
                        : 0);
                return acc + hotelPrice;
            }, 0) / hotels.length;
            
            const hoteisPromocao = hotels
                .filter(hotel => {
                    const hotelPrice = hotel.price || 
                        (hotel.roomOptions?.length > 0 
                            ? Math.min(...hotel.roomOptions.map(room => room.price).filter(price => price > 0))
                            : 0);
                    // Filtrar apenas hotéis com preço abaixo da média
                    return hotelPrice > 0 && hotelPrice < avgPrice;
                })
                .sort((a, b) => {
                    // Ordenar do menor para o maior preço
                    const priceA = a.price || 
                        (a.roomOptions?.length > 0 
                            ? Math.min(...a.roomOptions.map(room => room.price).filter(price => price > 0))
                            : 0);
                    const priceB = b.price || 
                        (b.roomOptions?.length > 0 
                            ? Math.min(...b.roomOptions.map(room => room.price).filter(price => price > 0))
                            : 0);
                    return priceA - priceB;
                })
                .slice(0, 3); // Limitar a 3 promoções
            
            setPromocoes(hoteisPromocao);
        }
    }, [hotels]);

    if (loading) {
        return (
            <section id="promocoes-destaque" className="py-8 sm:py-12 lg:py-16 bg-white px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Carregando promoções...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="promocoes-destaque" className="py-8 sm:py-12 lg:py-16 bg-white px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center py-8">
                        <p className="text-red-600">Erro ao carregar promoções</p>
                    </div>
                </div>
            </section>
        );
    }

    if (promocoes.length === 0) {
        return (
            <section id="promocoes-destaque" className="py-8 sm:py-12 lg:py-16 bg-white px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-7xl">
                    <div className="section-title">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                            Promoções em <span className="text-blue-600">Destaque</span>
                        </h2>
                    </div>
                    <div className="text-center py-8">
                        <p className="text-gray-600">Nenhuma promoção disponível no momento.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="promocoes-destaque" className="py-8 sm:py-12 lg:py-16 bg-white px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-7xl">
                <div className="section-title">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                        Promoções em <span className="text-blue-600">Destaque</span>
                    </h2>
                </div>
                <div className="flex justify-end mb-6 sm:mb-8">
                    <Link to="/promocoes" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center text-sm sm:text-base">
                        Ver todas
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
                
                {/* Mobile Swiper - visível apenas em telas pequenas */}
                <div className="block md:hidden px-4">
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={20}
                        slidesPerView={1.1}
                        centeredSlides={true}
                        pagination={{ 
                            clickable: true,
                            el: '.promocoes-swiper-pagination'
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1.3,
                                spaceBetween: 24,
                                centeredSlides: true,
                            },
                        }}
                        className="py-4 overflow-visible"
                        style={{ overflow: 'visible' }}
                    >
                        {promocoes.map(hotel => (
                            <SwiperSlide key={hotel.id}>
                                <div className="relative w-full px-2">
                                    <AnimatedHotelCard index={hotel.id}>
                                        <div className="relative">
                                            {/* Badge de promoção */}
                                            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full font-bold z-30 shadow-lg transform rotate-12 text-xs sm:text-sm">
                                                OFERTA
                                            </div>
                                            <HotelCard hotel={{...hotel, starRating: 5}} />
                                        </div>
                                    </AnimatedHotelCard>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    
                    {/* Apenas paginação centralizada */}
                    <div className="promocoes-swiper-pagination flex justify-center mt-6"></div>
                </div>

                {/* Desktop Grid - visível apenas em telas médias e grandes */}
                <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-12 cards-grid px-2 sm:px-4 lg:px-8 py-4">
                    {promocoes.map(hotel => (
                        <div key={hotel.id} className="relative card-spacing w-full">
                            <AnimatedHotelCard>
                                <div className="relative w-full">
                                    {/* Badge de promoção - agora dentro do card */}
                                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full font-bold z-30 shadow-lg transform rotate-12 text-xs sm:text-sm">
                                        OFERTA
                                    </div>
                                    <HotelCard hotel={{...hotel, starRating: 5}} /> {/* Forçamos 5 estrelas como solicitado */}
                                </div>
                            </AnimatedHotelCard>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PromocoesDestaque;
