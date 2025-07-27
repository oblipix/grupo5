// src/components/HotelCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa o contexto para ações do usuário
import { StarIcon } from '@heroicons/react/24/solid'; // Para a avaliação

function HotelCard({ hotel }) {
    // Usa o contexto para gerenciar o estado de "salvo"
    const { isLoggedIn, savedHotels, addSavedHotel, removeSavedHotel } = useAuth();

    if (!hotel) return null;

    const isSaved = savedHotels?.some(saved => saved.id === hotel.id);

    const handleSaveClick = (e) => {
        e.preventDefault();  // Impede que o clique no botão ative o Link do card
        e.stopPropagation(); // Para a propagação do evento

        if (!isLoggedIn) {
            alert("Você precisa fazer login para salvar hotéis.");
            return;
        }

        if (isSaved) {
            removeSavedHotel(hotel.id);
        } else {
            addSavedHotel(hotel);
        }
    };

    return (
        // O card inteiro é um link para a página de detalhes do hotel
        // Mantido o hover de scale e sombra mais pronunciada.
        <Link to={`/hoteis/${hotel.id}`}
              className="block group bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden
                         h-full flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            <div className="relative w-full h-56 overflow-hidden">
                <img
                    src={hotel.mainImageUrl}
                    alt={hotel.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Botão de "Salvar" */}
                <button
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition z-10 focus:outline-none shadow-md"
                    onClick={handleSaveClick}
                    aria-label={isSaved ? "Remover dos favoritos" : "Salvar nos favoritos"}
                >
                    <svg className={`h-6 w-6 transition-colors ${isSaved ? 'text-red-500' : 'text-gray-500'}`}
                        fill={isSaved ? 'currentColor' : 'none'}
                        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 18.75l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                    </svg>
                </button>
            </div>

            <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                    {/* Título: Mantido com background azul e fonte branca */}
                    <h3 className="inline-block bg-blue-600 text-white px-3 py-1 rounded-md font-bold text-xl mb-2 truncate">
                        {hotel.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                        {hotel.location}
                    </p>
                    {hotel.rating && (
                        <div className="flex items-center text-yellow-500 text-sm mb-2">
                            {[...Array(Math.floor(hotel.rating))].map((_, i) => (
                                <StarIcon key={i} className="h-4 w-4" />
                            ))}
                            <span className="ml-1 text-gray-600">
                                {hotel.rating.toFixed(1)}/5.0 ({hotel.reviews || 0} avaliações)
                            </span>
                        </div>
                    )}
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                        {hotel.description}
                    </p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                    {hotel.price && (
                        <p className="text-lg font-bold">
                            {/* "Diárias a partir de": Removido o background, agora é apenas texto cinza */}
                            <span className="bg-yellow-100 text-gray-500 text-base font-normal mr-1">
                                Diárias a partir de
                            </span>
                            {/* Preço: Mantido o destaque azul e tamanho maior */}
                            <span className="bg-yellow-100 text-xl text-gray-600">
                                R$ {hotel.price.toFixed(2).replace('.', ',')}
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default HotelCard;