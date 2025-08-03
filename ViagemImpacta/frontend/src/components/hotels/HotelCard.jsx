/* eslint-disable no-unused-vars */
// src/components/HotelCard.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa o contexto para ações do usuário
import { useModal } from '../context/ModalContext'; // Importa o contexto para modais
import { StarIcon } from '@heroicons/react/24/solid'; // Para a avaliação
import '../styles/HotelCard.css'; // Importa o CSS específico do card

function HotelCard({ hotel }) {
    // Usa o contexto para gerenciar o estado de "salvo"
    const { isLoggedIn, savedHotels, addSavedHotel, removeSavedHotel } = useAuth();
    const { showModal } = useModal();
    const [showConfetti, setShowConfetti] = useState(false);
    const confettiRef = useRef(null);
    const buttonRef = useRef(null);

    // Limpeza dos confetes quando o componente for desmontado
    useEffect(() => {
        return () => {
            if (confettiRef.current) {
                const currentRef = confettiRef.current;
                while (currentRef.firstChild) {
                    currentRef.removeChild(currentRef.firstChild);
                }
            }
        };
    }, []);

    if (!hotel) return null;

    // Só considera como favoritado se o usuário estiver logado E o hotel estiver na lista de favoritos
    const isSaved = isLoggedIn && savedHotels?.some(saved => saved.id === hotel.id);

    // Determina a classificação do hotel (em estrelas)
    const getStarRating = () => {
        // Se o hotel tem uma propriedade starRating, usamos ela
        if (hotel.starRating) return hotel.starRating;

        // Caso contrário, derivamos das avaliações dos usuários
        if (hotel.rating) {
            // Arredondamos para cima para ter um número inteiro de estrelas
            return Math.round(hotel.rating);
        }

        // Valor padrão se não houver dados
        return 5; // Como solicitado, o exemplo é de 5 estrelas
    };

    // Calcula o menor preço dos quartos disponíveis


    const minPrice = hotel.lowestRoomPrice; // Usa o preço mais baixo disponível
    /*
        const getMinPrice = () => {
            if (hotel.roomOptions && hotel.roomOptions.length > 0) {
                const prices = hotel.roomOptions.map(room => room.price).filter(price => price > 0);
                return prices.length > 0 ? Math.min(...prices) : hotel.price || 0;
            }
            return hotel.price || 0;
        };
    
        const minPrice = getMinPrice();
        */
    const starRating = getStarRating();

    // Função para criar e animar confetes
    const createConfetti = () => {
        if (!confettiRef.current) return;

        // Limpa confetes existentes
        while (confettiRef.current.firstChild) {
            confettiRef.current.removeChild(confettiRef.current.firstChild);
        }

        // Cria novos confetes
        const colors = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.className = `confetti ${colors[Math.floor(Math.random() * colors.length)]}`;

            // Posição aleatória ao redor do coração
            const randomX = -20 + Math.random() * 40;
            const randomY = -20 + Math.random() * 40;

            confetti.style.left = `${randomX}px`;
            confetti.style.top = `${randomY}px`;

            confettiRef.current.appendChild(confetti);

            // Inicia animação com pequeno atraso para efeito cascata
            setTimeout(() => {
                confetti.classList.add('active');
            }, i * 20);
        }

        // Remove os confetes após a animação
        setTimeout(() => {
            setShowConfetti(false);
        }, 1000);
    };

    // Função para lidar com a ação de salvar/remover dos favoritos
    const handleSaveClick = (e) => {
        e.preventDefault();  // Impede que o clique no botão ative o Link do card
        e.stopPropagation(); // Para a propagação do evento

        // Verifica se o usuário está logado
        if (!isLoggedIn) {
            // Mostra modal de aviso se não estiver logado
            showModal({
                title: 'Login Necessário',
                message: 'É necessário estar logado para favoritar hotéis. Faça login para salvar seus hotéis favoritos!',
                actionText: 'Fazer Login',
                showHeader: true,
                onConfirm: () => {
                    // Redireciona para a página de login
                    window.location.href = '/login';
                }
            });
            return;
        }

        try {
            if (!isSaved) {
                // Só exibe confetti quando adiciona aos favoritos
                setShowConfetti(true);

                // Aciona animação de confete e depois mostra o modal
                if (buttonRef.current) {
                    createConfetti();

                    // Adiciona aos favoritos após a animação de confete terminar
                    setTimeout(() => {
                        addSavedHotel(hotel);
                    }, 1200); // Espera a animação de confete terminar (um pouco mais que os 1000ms definidos no timeout do confetti)
                }
            } else {
                // Remove dos favoritos imediatamente (sem animação)
                removeSavedHotel(hotel.id);
            }
        } catch (error) {
            console.error("Erro ao processar ação de favorito:", error);
            alert("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.");
        }
    };



    return (
        <Link to={`/hoteis/${hotel.id}`}
            className="block group hotel-card-modern card-hover-premium bg-white rounded-xl shadow-md border-0 overflow-hidden
                         h-full flex flex-col transform transition-all duration-300 
                         w-full max-w-sm mx-auto sm:max-w-none min-h-[420px] sm:min-h-[450px]">
            <div className="relative w-full h-56 sm:h-64 md:h-80 overflow-hidden"> {/* Altura responsiva aumentada */}
                {/* Overlay gradient over image - mais escuro para melhor contraste */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10"></div>

                <img
                    src={hotel.mainImageUrl}
                    alt={hotel.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 card-image"
                />

                {/* Estrelas do hotel - posicionadas no topo esquerdo */}
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 flex items-center bg-white/30 shadow-lg backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg">
                    {[...Array(starRating)].map((_, index) => (
                        <StarIcon key={index} className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 star-icon" />
                    ))}
                </div>

                {/* Location indicator below stars */}
                <div className="absolute top-8 left-2 sm:top-14 sm:left-4 z-20 flex items-center bg-white/30 shadow-lg backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-white text-xs sm:text-sm">{hotel.location}</span>
                </div>

                {/* Title moved to overlay on image for more modern look */}
                <h3 className="Tittle card-title absolute bottom-2 left-2 sm:bottom-4 sm:left-4 z-20 text-white font-bold text-lg sm:text-xl md:text-2xl drop-shadow-lg mb-1 sm:mb-3 mt-2 line-clamp-2 pr-2">
                    {hotel.title}
                </h3>
            </div>

            <div className="p-3 sm:p-4 flex-grow flex flex-col justify-between bg-gradient-to-b from-white to-gray-50">
                <div>
                    {/* Reviews count and Save button */}
                    <div className="flex items-center mb-2 sm:mb-3 justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                            <span className="text-gray-600 text-xs sm:text-sm">
                                {hotel.rating && !isNaN(parseFloat(hotel.rating)) && (
                                    <>
                                        <span className="font-medium text-blue-600">{parseFloat(hotel.rating).toFixed(1)}</span>
                                        <span className="mx-1">•</span>
                                    </>
                                )}
                                {hotel.reviews || hotel.feedbacks?.length || 0} avaliações
                            </span>

                            {/* Botão de "Salvar" - posicionado ao lado das avaliações */}
                            <div className="relative">
                                <button
                                    ref={buttonRef}
                                    className="bg-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center space-x-1 border border-gray-200"
                                    onClick={handleSaveClick}
                                    aria-label={isSaved ? "Remover dos favoritos" : "Salvar nos favoritos"}
                                >
                                    <svg className={`h-3 w-3 sm:h-4 sm:w-4 transition-colors favorite-icon ${isSaved ? 'text-red-500' : 'text-gray-500'}`}
                                        fill={isSaved ? 'currentColor' : 'none'}
                                        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 18.75l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                                    </svg>
                                </button>
                                {/* Container para os confetes */}
                                <div ref={confettiRef} className="confetti-container"></div>
                            </div>
                        </div>

                        {/* Amenities icons */}
                        <div className="flex space-x-1 sm:space-x-1.5">
                            <span className="text-gray-400 hover:text-blue-500" title="Wi-Fi gratuito">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                                </svg>
                            </span>
                            <span className="text-gray-400 hover:text-blue-500" title="Piscina">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                                </svg>
                            </span>
                            <span className="text-gray-400 hover:text-blue-500" title="Estacionamento">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    {/* Description with improved styling */}
                    {hotel.description ? (
                        <p className="text-gray-700 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-2 sm:mb-3">
                            {hotel.description}
                        </p>
                    ) : (
                        <p className="text-gray-400 text-xs sm:text-sm italic mb-2 sm:mb-4">Sem descrição disponível.</p>
                    )}
                </div>

                {/* Price section with modern styling */}
                <div className="mt-auto">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                            <span className="text-gray-500 text-xs block">
                                Diárias a partir de
                            </span>
                            <div className="price-tag inline-block mt-1 text-sm sm:text-base">
                                R$ {(minPrice !== undefined && minPrice !== null && !isNaN(minPrice)) ? Number(minPrice).toFixed(2).replace('.', ',') : '0,00'}
                            </div>
                        </div>
                        <div className="main-action-button text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-bold text-xs sm:text-sm pulse-price transform hover:scale-105 transition-all duration-200 flex-shrink-0">
                            Ver detalhes
                        </div>
                    </div>
                </div>
            </div>
        </Link >
    );
}

export default HotelCard;