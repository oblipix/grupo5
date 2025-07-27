// src/components/ImageModal.jsx

import React, { useState, useEffect, useCallback } from 'react';

function ImageModal({ images, initialImageId, onClose }) {
  const initialIndex = images.findIndex(img => img.id === initialImageId);
  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex !== -1 ? initialIndex : 0);

  useEffect(() => {
    const newInitialIndex = images.findIndex(img => img.id === initialImageId);
    if (newInitialIndex !== -1) {
      setCurrentImageIndex(newInitialIndex);
    }
  }, [initialImageId, images]);

  // Funções de navegação com useCallback para otimização
  const goToNextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const goToPrevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  // Efeito para navegação por teclado (Setas e ESC)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') goToNextImage();
      else if (event.key === 'ArrowLeft') goToPrevImage();
      else if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goToNextImage, goToPrevImage, onClose]);

  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = images[currentImageIndex];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] bg-gray-900 rounded-lg overflow-hidden shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.url}
          alt={currentImage.alt}
          className="w-full h-full object-contain"
        />

        {/* Botões de controle */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition"
          aria-label="Fechar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition"
              aria-label="Anterior"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button
              onClick={goToNextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition"
              aria-label="Próxima"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ImageModal;