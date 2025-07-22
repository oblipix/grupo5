import React from 'react';

// Função auxiliar para gerar URLs de imagem aleatórias
const generateRandomImageUrl = (id, width = 200, height = 150) => {
  return `https://picsum.photos/id/${id % 1000}/${width}/${height}`;
};

// HotelCard: Componente para exibir um card de hotel
// Recebe 'hotel' e 'onImageClick' como props
function HotelCard({ hotel, onImageClick }) { // Adicionado onImageClick aqui
  
  // Cria um array completo de imagens para o modal, incluindo a mainImageUrl se desejado
  // Assumo que você quer a mainImageUrl como a primeira imagem da galeria no modal
  const allModalImages = hotel.galleryImages || []; 
  // Opcional: Se mainImageUrl não estiver já em galleryImages, adicione-a como o primeiro item
  // if (hotel.mainImageUrl && !allModalImages.some(img => img.url === hotel.mainImageUrl)) {
  //   allModalImages.unshift({ id: `main-${hotel.id}`, url: hotel.mainImageUrl, alt: hotel.title });
  // }


  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden relative w-full md:max-w-md mx-auto">
      {/* Foto Principal do Hotel - AGORA CLICÁVEL */}
      <div 
        className="relative w-full h-64 overflow-hidden rounded-t-lg cursor-pointer hover:opacity-90 transition"
        onClick={() => onImageClick(allModalImages, allModalImages[0]?.id)} // Clica na primeira imagem da galeria
      >
        <img
          src={hotel.mainImageUrl || generateRandomImageUrl(hotel.id, 600, 400)}
          alt={hotel.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Conteúdo Principal do Hotel */}
      <div className="p-4">
        <h3 className="text-2xl font-bold text-blue-800 mb-2">{hotel.title}</h3>
        <p className="text-gray-600 text-sm mb-2 flex items-center">
          <svg className="w-4 h-4 mr-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
          <a
            href={hotel.mapUrl}
            target="_blank" // Abre o link em uma nova aba
            rel="noopener noreferrer" // Medida de segurança para links externos
            className="text-blue-600 hover:underline" // Adiciona um estilo para parecer um link
          >
            {hotel.location}
            </a>
        </p>
        <p className="text-blue-400 bg-blue-50 p-3 rounded-md mb-2">
          {hotel.description}
        </p>
      </div>

      {/* Miniaturas de Fotos do Hotel - AGORA CLICÁVEIS */}
      {allModalImages && allModalImages.length > 0 && (
        <div className="px-4 pb-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {allModalImages.map((imgObject, index) => ( // Alterado para imgObject
              <img
                key={imgObject.id || `img-${hotel.id}-${index}`} // Use imgObject.id se existir, senão um fallback
                src={imgObject.url || generateRandomImageUrl(hotel.id + index + 1000, 100, 80)} // Use imgObject.url
                alt={imgObject.alt || `Miniatura do ${hotel.title} ${index + 1}`} // Use imgObject.alt
                className="w-20 h-16 object-cover rounded-md flex-shrink-0 cursor-pointer hover:opacity-80 transition"
                onClick={() => onImageClick(allModalImages, imgObject.id)} // Passa o array de objetos e o ID do objeto clicado
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HotelCard;