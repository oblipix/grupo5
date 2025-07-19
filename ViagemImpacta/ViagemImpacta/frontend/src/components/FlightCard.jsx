/* eslint-disable no-unused-vars */
import React from 'react';

// Função auxiliar para gerar URLs de imagem aleatórias
const generateRandomImageUrl = (id, width = 400, height = 300) => {
  return `https://picsum.photos/id/${id % 1000}/${width}/${height + 150}`;
};

// Função auxiliar para obter classes de estilo para as tags de categoria (ex: Economy, Premium)
const getCategoryTagClasses = (category) => {
  switch (category) {
    case 'Economy':
      return 'bg-green-900 text-white'; // azul claro para Economy
    case 'Premium Economy':
    case 'Premium Business':
      return 'bg-green-500 text-white'; // Roxo mais escuro para Premium
    default:
      return 'bg-gray-500 text-white';
  }
};

// FlightCard: Componente para exibir um card de voo com detalhes
// Recebe as props: travel (que é um objeto de 'flight'), onCardClick, onSaveTravel, isTravelSaved
function FlightCard({ travel: flight, onCardClick, onSaveTravel, isTravelSaved }) {
  // Nota: o isTravelSaved e onSaveTravel são passados, mas o coração não está no design da imagem.
  // Se quiser adicionar um "salvar voo" no futuro, pode usar esses props.

  return (
    <div
      className="bg-white rounded-lg shadow-xl border border-gray-200 relative overflow-hidden cursor-pointer w-full max-w-[280px] h-[400px]" // Tamanho fixo e arredondamentos
      onClick={() => onCardClick(flight.id)} // Torna o card clicável para ver detalhes (se houver)
    >
      {/* Seção da Imagem com Overlays */}
      <div className="relative w-full h-1/2 overflow-hidden rounded-t-lg"> {/* Imagem ocupa metade da altura do card */}
        <img
          src={flight.imageUrl || generateRandomImageUrl(flight.id)}
          alt={flight.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div> {/* Overlay escuro na imagem */}

        {/* Ícone de Toggle/Switch no topo-direito da imagem (exemplo de ícone) */}
        <div className="absolute top-2 right-2 p-1 rounded-full bg-white/50 text-gray-800 z-10">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 102 0V5zM9 13a1 1 0 102 0v-1a1 1 0 10-2 0v1z" clipRule="evenodd"></path></svg>
        </div>

        {/* Tag "Voo direto" / "Voo com conexão" no canto inferior direito da imagem */}
        {flight.connection !== undefined && ( // Renderiza se a propriedade connection existir
          <span className={`absolute bottom-2 right-2 px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap z-10 ${flight.connection ? 'bg-blue-700 text-white' : 'bg-blue-900 text-white'}`}>
            Voo {flight.connection ? 'com conexão' : 'direto'}
          </span>
        )}
      </div>

      {/* Seção de Conteúdo do Card (abaixo da imagem) */}
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-gray-600 text-xs mb-1">A partir de {flight.origin} ({flight.origin === 'São Paulo' ? 'Campinas' : flight.origin})</p> {/* Exemplo de origem */}
        <h3 className="text-2xl font-bold text-gray-800 mb-1">{flight.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{flight.subtitle}</p> {/* Subtitle (e.g. 'Brasil Int.') */}
        <p className="text-gray-600 text-sm mb-4">{flight.description}</p> {/* Data de ida/volta */}

        {/* Tag de Categoria (Economy, Premium) - Parte inferior esquerda do conteúdo */}
        {flight.category && (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryTagClasses(flight.category)}`}>
            {flight.category}
          </span>
        )}

        {/* Preço e "Taxas Incluídas" - Parte inferior direita do conteúdo */}
        <div className="flex flex-col items-end mt-auto"> {/* mt-auto para empurrar para baixo */}
          <span className="text-1xl font-bold text-gray-800">BRL {flight.price.toFixed(2)}</span>
          <p className="text-gray-600 text-xs">Taxas Incluídas</p>
        </div>
      </div>
    </div>
  );
}

export default FlightCard;