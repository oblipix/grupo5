import React from 'react';

// Função auxiliar para gerar URLs de imagem aleatórias
const generateRandomImageUrl = (id, width = 400, height = 300) => {
    // Aumentei a altura padrão para que, mesmo as imagens geradas,
    // tenham uma melhor proporção para os cards maiores.
    return `https://picsum.photos/id/${id % 1000}/${width}/${height + 50}`; 
};

function TravelCard({ travel, onCardClick, onSaveTravel, isTravelSaved }) {
    const isSaved = isTravelSaved ? isTravelSaved(travel.id) : false;

    return (
        // === Ajustes aqui: Aumentei a altura do card e a largura máxima ===
        <div
            className="bg-white rounded-lg shadow-md relative h-[380px] flex flex-col overflow-hidden mx-auto cursor-pointer" // Aumentado para 380px
            onClick={() => onCardClick(travel.id)}
            style={{ maxWidth: '280px' }} // Aumentado para 280px
        >
            {/* Camada da imagem de fundo */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    // O problema da imagem preta pode ser o source.
                    // Vamos tentar puxar de travel.imageUrl primeiro,
                    // e se for undefined/null, usar o generateRandomImageUrl.
                    // É CRÍTICO que travel.imageUrl contenha caminhos/URLs VÁLIDOS para suas imagens reais.
                    src={travel.imageUrl || generateRandomImageUrl(travel.id)} 
                    alt={travel.title}
                    className="w-full h-full object-cover" // object-cover garante que a imagem preencha o espaço
                />
                {/* Overlay escuro para garantir a legibilidade do texto */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>

            {/* Botão de LIKE (coração) - Posicionado sobre a imagem */}
            {onSaveTravel && (
                <button
                    className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition z-10"
                    onClick={(e) => {
                        e.stopPropagation(); 
                        onSaveTravel(travel);
                    }}
                    aria-label={isSaved ? "Remover dos salvos" : "Salvar pacote"}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 ${isSaved ? 'text-red-500' : 'text-white'}`}
                        fill={isSaved ? 'currentColor' : 'none'}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </button>
            )}

            {/* Conteúdo do Card (Título, Descrição, Botão "Ver Detalhes") */}
            <div className="relative p-4 text-white flex flex-col justify-end items-start text-left h-full">
                <div>
                    <h3 className="text-xl font-bold mb-1">{travel.title}</h3>
                    {/* Ajustei o line-clamp para 3 linhas para acomodar mais texto em cards maiores */}
                    <p className="text-sm mb-3 line-clamp-3">{travel.description}</p> 
                </div>
                
                <button
                    className="main-action-button bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 text-sm mt-4 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation(); 
                        onCardClick(travel.id);
                    }}
                >
                    Ver Detalhes
                </button>
            </div>
        </div>
    );
}

export default TravelCard;