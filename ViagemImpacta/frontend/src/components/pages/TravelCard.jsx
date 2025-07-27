// src/components/TravelCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

// Função auxiliar para formatar a moeda
const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

function TravelCard({ travel }) {
    if (!travel) return null;

    return (
        // O card inteiro é um link para a página de detalhes
        // h-[28rem] para altura maior
        // text-white para garantir que o texto principal seja branco
        // group-hover:text-white para garantir que o texto continue branco no hover
        <Link
            to={`/packages/${travel.id}`}
            className="block group relative rounded-lg shadow-lg overflow-hidden h-[28rem] text-white
                       transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        >

            {/* Overlay para o efeito de HOVER - adicionado para um hover verde sutil */}
            {/* O background é transparente inicialmente e muda para green-700 com 20% de opacidade no hover do grupo */}
            <div className="absolute inset-0 bg-transparent group-hover:bg-green-700/20 transition-colors duration-300"></div>

            {/* Imagem de Fundo */}
            <img
                src={travel.imageUrl}
                alt={travel.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Overlay Escuro para o conteúdo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent"></div>

            {/* Conteúdo Sobreposto */}
            <div className="relative p-6 flex flex-col h-full">
                <div className="flex-grow">
                    {/* Título: Ajustado para o tamanho grande e largura que você especificou */}
                    <h3 className="text-5xl w-80 text-white font-bold drop-shadow-md">{travel.title}</h3>
                    {/* Descrição: Ajustado para o espaçamento e largura que você especificou, com texto cinza claro */}
                    <p className="text-sm mt-14 w-70 text-gray-200 line-clamp-2 drop-shadow-sm">{travel.description}</p>
                </div>

                <div className="mt-auto">
                    <div className="flex justify-between items-end">
                        <div>
                            {/* <<<<< AQUI ESTÁ A MUDANÇA: Background redondo para "A partir de" >>>>> */}
                            <p className="inline-block bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full mb-1">
                                A partir de
                            </p>
                            {/* Preço: Mantido como está (verde, grande) */}
                            <span className="text-3xl font-bold text-blue-400 drop-shadow-lg block">
                                {formatCurrency(travel.priceTo)}
                            </span>
                        </div>
                        {/* Tag de Status */}
                        {travel.status && (
                            <span className="bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                                {travel.status}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default TravelCard;