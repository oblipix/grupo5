// src/components/common/LazyScrollToTop.jsx

import React, { useState, useEffect, useCallback, memo, useRef } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

const LazyScrollToTop = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  // Função memoizada para scroll
  const scrollToTop = useCallback(() => {
    const topElement = document.getElementById('top');
    if (topElement) {
      topElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, []);

  // Lazy loading com Intersection Observer
  useEffect(() => {
    // Só carrega o componente quando o usuário faz algum scroll
    const loadComponent = () => {
      setIsLoaded(true);
      window.removeEventListener('scroll', loadComponent);
    };

    // Lazy loading: só ativa após primeiro scroll
    window.addEventListener('scroll', loadComponent, { 
      passive: true, 
      once: true 
    });

    return () => {
      window.removeEventListener('scroll', loadComponent);
    };
  }, []);

  // Intersection Observer para detectar quando o topo sai da view
  useEffect(() => {
    if (!isLoaded) return;

    // Cria um elemento sentinela no topo da página
    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    sentinel.style.height = '1px';
    sentinel.style.width = '1px';
    sentinel.style.opacity = '0';
    sentinel.style.pointerEvents = 'none';
    
    // Adiciona ao body
    document.body.appendChild(sentinel);
    sentinelRef.current = sentinel;

    // Configura o Intersection Observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        // Mostra o botão quando o topo não está visível
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -100px 0px' // Adiciona margem para mostrar antes
      }
    );

    observerRef.current.observe(sentinel);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (sentinelRef.current && document.body.contains(sentinelRef.current)) {
        document.body.removeChild(sentinelRef.current);
      }
    };
  }, [isLoaded]);

  // Fallback para navegadores que não suportam Intersection Observer
  useEffect(() => {
    if (!isLoaded || 'IntersectionObserver' in window) return;

    let timeoutId = null;
    
    const handleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        setIsVisible(window.pageYOffset > 300);
      }, 16);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isLoaded]);

  // Early return se não carregado ou não visível
  if (!isLoaded || !isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50
        bg-gradient-to-r from-blue-600 to-blue-700 
        hover:from-blue-700 hover:to-blue-800
        text-white
        w-12 h-12 md:w-14 md:h-14 
        rounded-full
        shadow-lg hover:shadow-xl
        transition-all duration-300 ease-in-out
        transform hover:scale-110 active:scale-95
        flex items-center justify-center
        border-2 border-blue-500/20
        backdrop-blur-sm
        sm:bottom-8 sm:right-8
        group
        focus:outline-none focus:ring-4 focus:ring-blue-300/50
        animate-fadeIn
      `}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
    >
      <ChevronUpIcon 
        className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 group-hover:-translate-y-1 group-active:translate-y-0" 
      />
      
      {/* Indicador visual sutil */}
      <div className="absolute inset-0 rounded-full bg-white/5 scale-0 group-hover:scale-100 transition-transform duration-200"></div>
    </button>
  );
});

LazyScrollToTop.displayName = 'LazyScrollToTop';

export default LazyScrollToTop;
