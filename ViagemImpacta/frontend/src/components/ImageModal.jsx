import React, { useState, useEffect } from 'react'; // Importe useState e useEffect

function ImageModal({ images, initialImageId, onClose }) {
  // Encontra o índice inicial da imagem no array
  const initialIndex = images.findIndex(img => img.id === initialImageId);
  // Estado para manter o índice da imagem atual sendo exibida
  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex !== -1 ? initialIndex : 0);

  // Se o array de imagens estiver vazio ou o ID inicial não for encontrado
  if (!images || images.length === 0 || initialIndex === -1) {
    // Poderíamos renderizar um erro ou fechar o modal
    return null; 
  }

  const currentImage = images[currentImageIndex];

  // Funções para navegar entre as imagens
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

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
  }, [images, currentImageIndex, onClose]); // Dependências: images (se mudar), currentImageIndex, onClose

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 cursor-pointer"
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
        <button
          onClick={goToPrevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition z-10"
          aria-label="Imagem anterior"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>

        {/* Botão de Navegação PRÓXIMO */}
        <button
          onClick={goToNextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition z-10"
          aria-label="Próxima imagem"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
    </div>
  );
}

export default ImageModal;