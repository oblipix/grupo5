// src/components/common/HotelCardSkeleton.jsx

import React from 'react';

function HotelCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 animate-pulse">
      {/* Skeleton da imagem */}
      <div className="relative h-48 bg-gray-300"></div>
      
      {/* Skeleton do conteúdo */}
      <div className="p-6 space-y-4">
        {/* Skeleton do título */}
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        
        {/* Skeleton da avaliação */}
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-300 rounded"></div>
            ))}
          </div>
          <div className="h-4 bg-gray-300 rounded w-16"></div>
        </div>
        
        {/* Skeleton da localização */}
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        
        {/* Skeleton das comodidades */}
        <div className="flex flex-wrap gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-6 bg-gray-300 rounded w-16"></div>
          ))}
        </div>
        
        {/* Skeleton do preço e botão */}
        <div className="flex justify-between items-center pt-4">
          <div className="space-y-1">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-6 bg-gray-300 rounded w-24"></div>
          </div>
          <div className="h-10 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
}

export default HotelCardSkeleton;
