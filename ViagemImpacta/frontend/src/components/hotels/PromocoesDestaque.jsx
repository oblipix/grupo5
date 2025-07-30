// src/components/hotels/PromocoesDestaque.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHotels } from '../hooks/useHotels.js';
import HotelCard from './HotelCard.jsx';

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
            <section id="promocoes-destaque" className="py-12 bg-white px-6">
                <div className="container mx-auto">
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
            <section id="promocoes-destaque" className="py-12 bg-white px-6">
                <div className="container mx-auto">
                    <div className="text-center py-8">
                        <p className="text-red-600">Erro ao carregar promoções</p>
                    </div>
                </div>
            </section>
        );
    }

    if (promocoes.length === 0) {
        return (
            <section id="promocoes-destaque" className="py-12 bg-white px-6">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        Promoções em <span className="text-blue-600">Destaque</span>
                    </h2>
                    <div className="text-center py-8">
                        <p className="text-gray-600">Nenhuma promoção disponível no momento.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="promocoes-destaque" className="py-12 bg-white px-6">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Promoções em <span className="text-blue-600">Destaque</span>
                    </h2>
                    <Link to="/promocoes" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center">
                        Ver todas
                        <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {promocoes.map(hotel => (
                        <div key={hotel.id} className="relative">
                            {/* Badge de promoção - agora com z-index maior para aparecer sobre todos os elementos */}
                            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold z-30 shadow-lg transform rotate-12">
                                OFERTA
                            </div>
                            <HotelCard hotel={{...hotel, starRating: 5}} /> {/* Forçamos 5 estrelas como solicitado */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PromocoesDestaque;
