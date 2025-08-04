// src/components/common/LazyIcon.jsx

import React from 'react';

const LazyIconLoader = () => {
  return (
    <div className="w-6 h-6 flex items-center justify-center animate-spinFade">
      {/* Spinner personalizado com múltiplos elementos */}
      <div className="relative">
        {/* Círculo externo */}
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        
        {/* Ponto central pulsante */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
        </div>
        
        {/* Círculo interno que gira na direção oposta */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 border border-white/50 border-b-transparent rounded-full animate-spin" 
               style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LazyIconLoader;
