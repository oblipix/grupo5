import React, { useState, useEffect } from 'react';

function DebugImage({ src, alt, className, hotel }) {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  // Atualiza imageSrc quando src muda
  useEffect(() => {
    setImageSrc(src);
    setImageError(false);
  }, [src, hotel]);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    // Image loaded successfully
  };

  const fallbackImageSrc = `data:image/svg+xml,${encodeURIComponent(`
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#grad)" />
      <text x="50%" y="45%" font-family="Arial,sans-serif" font-size="24" fill="#9ca3af" text-anchor="middle" dy=".3em">
        Imagem Indisponível
      </text>
      <text x="50%" y="55%" font-family="Arial,sans-serif" font-size="16" fill="#6b7280" text-anchor="middle" dy=".3em">
        ${hotel?.title || hotel?.name || 'Hotel'}
      </text>
    </svg>
  `)}`;

  // Se não há src válida, ou houve erro, usa fallback
  if (imageError || !imageSrc || imageSrc === '' || imageSrc === 'undefined' || imageSrc === 'null') {
    return (
      <div className={`${className} bg-gray-200 flex items-center justify-center relative`}>
        <img
          src={fallbackImageSrc}
          alt={alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-75">
          DEBUG: Fallback
        </div>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleImageError}
      onLoad={handleImageLoad}
    />
  );
}

export default DebugImage;
