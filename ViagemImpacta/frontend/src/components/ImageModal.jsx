/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback } from 'react'; // Importe useCallback também

function ImageModal({ images, initialImageId, onClose }) {
  // Encontra o índice inicial da imagem no array
  const initialIndex = images.findIndex(img => img.id === initialImageId);
  // Estado para manter o índice da imagem atual sendo exibida
  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex !== -1 ? initialIndex : 0);

  // === Adicionado useEffect para resetar currentImageIndex se initialImageId mudar ===
  // Isso garante que se o modal for aberto novamente com uma imagem inicial diferente,
  // ele comece na imagem correta.
  useEffect(() => {
    const newInitialIndex = images.findIndex(img => img.id === initialImageId);
    if (newInitialIndex !== -1 && newInitialIndex !== currentImageIndex) {
      setCurrentImageIndex(newInitialIndex);
    }
  }, [initialImageId, images]); // Depende do ID inicial e das imagens


  // Se o array de imagens estiver vazio ou o ID inicial não for encontrado
  if (!images || images.length === 0 || initialIndex === -1) {
    // Poderíamos renderizar um erro ou fechar o modal
    return null;
  }

  const currentImage = images[currentImageIndex];

  // Funções para navegar entre as imagens
  const goToNextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images]); // Depende de 'images'

  const goToPrevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images]); // Depende de 'images'

  const goToSpecificImage = useCallback((index) => {
    setCurrentImageIndex(index);
  }, []); // Não depende de nada mutável

  // Efeito para lidar com a navegação pelo teclado
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        goToNextImage();
      } else if (event.key === 'ArrowLeft') {
        goToPrevImage();
      } else if (event.key === 'Escape') { // Adiciona suporte para fechar com ESC
        onClose();
      }
    };

    // Adiciona o event listener quando o modal abre
    document.addEventListener('keydown', handleKeyDown);

    // Remove o event listener quando o modal fecha ou o componente é desmontado
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToNextImage, goToPrevImage, onClose]); // Dependências: Funções de navegação e onClose


  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 cursor-zoom-out" // cursor-zoom-out para indicar clicável
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl max-h-full bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300"
        onClick={(e) => e.stopPropagation()} // Impede que o clique no container branco feche o modal
      >
        {/* Imagem atual */}
        <img
          src={currentImage.url} // Usa a URL da imagem atual
          alt={currentImage.alt}
          className="max-w-full max-h-screen object-contain"
        />

        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition z-10" // Adicionei z-10
          aria-label="Fechar modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {/* Botão de Navegação ANTERIOR */}
        {images.length > 1 && ( // Renderiza apenas se houver mais de uma imagem
          <button
            onClick={goToPrevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition z-10"
            aria-label="Imagem anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
        )}

        {/* Botão de Navegação PRÓXIMO */}
        {images.length > 1 && ( // Renderiza apenas se houver mais de uma imagem
          <button
            onClick={goToNextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition z-10"
            aria-label="Próxima imagem"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        )}

        {/* Miniaturas da Galeria no rodapé do modal */}
        {images.length > 1 && ( // Renderiza miniaturas apenas se houver mais de uma imagem
          <div className="absolute bottom-0 w-full flex justify-center items-center p-2 bg-gray-800 bg-opacity-70 overflow-x-auto">
            <div className="flex space-x-2">
              {images.map((imgObject, index) => (
                <img
                  key={imgObject.id || index} // Use id ou index como fallback
                  src={imgObject.url}
                  alt={imgObject.alt || `Miniatura ${index + 1}`}
                  className={`w-16 h-12 object-cover rounded-md cursor-pointer border-2 ${
                    index === currentImageIndex ? 'border-blue-500' : 'border-transparent'
                  } hover:opacity-80 transition`}
                  onClick={(e) => {
                    e.stopPropagation(); // Impede que o clique na miniatura feche o modal
                    goToSpecificImage(index); // Vai para a imagem específica
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageModal;