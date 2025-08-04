// src/components/common/BackToTop.jsx

import React, { useState, useEffect, useCallback, memo } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

const BackToTop = memo(() => {
  const [showButton, setShowButton] = useState(false);

  // Função memoizada para scroll
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Lazy loading do event listener
  useEffect(() => {
    let timeoutId = null;
    let isListenerActive = false;

    // Handler otimizado com debounce
    const handleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        const shouldShow = window.pageYOffset > 300;
        setShowButton(prev => prev !== shouldShow ? shouldShow : prev);
      }, 16); // ~60fps
    };

    // Lazy loading: adiciona listener apenas quando necessário
    const addScrollListener = () => {
      if (!isListenerActive) {
        window.addEventListener('scroll', handleScroll, { 
          passive: true,
          capture: false 
        });
        isListenerActive = true;
      }
    };

    // Delay para lazy loading - só adiciona o listener após 200ms
    const initTimeout = setTimeout(() => {
      addScrollListener();
      handleScroll(); // Verifica estado inicial
    }, 200);

    return () => {
      clearTimeout(initTimeout);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (isListenerActive) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Early return para não renderizar se não necessário
  // if (!showButton) return null;

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8
        transition-all duration-700 ease-in-out
        ${showButton 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-75 pointer-events-none'
        }
      `}
    >
      <button
        onClick={scrollToTop}
        className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-300/50 group"
        aria-label="Voltar ao topo"
        title="Voltar ao topo"
      >
        <ChevronUpIcon className="w-6 h-6 transition-transform duration-200 group-hover:-translate-y-1" />
      </button>
    </div>
  );
});

// Adiciona displayName para debugging
BackToTop.displayName = 'BackToTop';

export default BackToTop;
