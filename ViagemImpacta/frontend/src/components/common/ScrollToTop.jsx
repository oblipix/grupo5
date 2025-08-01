// src/components/common/ScrollToTop.jsx

import React, { lazy, Suspense, useState } from 'react';
import { useScrollVisibility } from '../../hooks/useScrollVisibility';
import LazyIconLoader from './LazyIcon';

// Lazy loading do ícone para otimização
const LazyChevronUpIcon = lazy(() => 
  import('@heroicons/react/24/outline').then(module => ({
    default: module.ChevronUpIcon
  }))
);

// Wrapper component para controlar a animação do ícone carregado
const AnimatedIcon = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  React.useEffect(() => {
    // Trigger da animação após o componente montar
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${isLoaded ? 'animate-lazyFadeIn' : 'opacity-0'}`}>
      {children}
    </div>
  );
};

const ScrollToTop = () => {
  // Hook para detectar quando mostrar o botão (aparece após 300px de scroll)
  const isVisible = useScrollVisibility(300);

  // Função para voltar ao topo
  const scrollToTop = () => {
    // Scroll suave para o elemento com id="top" se existir, senão para o topo da página
    const topElement = document.getElementById('top');
    if (topElement) {
      topElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8
        transition-all duration-700 ease-in-out
        ${isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-75 pointer-events-none'
        }
      `}
    >
      <button
        onClick={scrollToTop}
        className={`
          bg-gradient-to-r from-blue-600 to-blue-700 
          hover:from-blue-700 hover:to-blue-800
          text-white
          w-14 h-14 rounded-full
          shadow-lg hover:shadow-xl
          transition-all duration-300 ease-in-out
          transform hover:scale-105 active:scale-95
          flex items-center justify-center
          border-2 border-blue-500/30
          backdrop-blur-sm
          group
          focus:outline-none focus:ring-4 focus:ring-blue-300/50
          ${isVisible ? 'animate-breathe hover:animate-none' : ''}
        `}
        aria-label="Voltar ao topo"
        title="Voltar ao topo"
      >
        <Suspense fallback={<LazyIconLoader />}>
          <AnimatedIcon>
            <LazyChevronUpIcon 
              className="w-6 h-6 transition-transform duration-200 group-hover:-translate-y-1 group-active:translate-y-0" 
            />
          </AnimatedIcon>
        </Suspense>
        
        {/* Indicador visual adicional para mobile */}
        <div className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-200"></div>
      </button>
    </div>
  );
};

export default ScrollToTop;
