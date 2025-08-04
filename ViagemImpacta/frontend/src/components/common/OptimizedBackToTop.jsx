// src/components/common/OptimizedBackToTop.jsx

import React, { useState, useEffect, useCallback, memo, useRef } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

const OptimizedBackToTop = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const timeoutRef = useRef(null);
  const rafRef = useRef(null);

  // Função otimizada para scroll com RequestAnimationFrame
  const scrollToTop = useCallback(() => {
    const startPosition = window.pageYOffset;
    const targetPosition = 0;
    const distance = startPosition - targetPosition;
    const duration = 600;
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      
      // Easing function (ease-out)
      const ease = 1 - Math.pow(1 - progress, 3);
      
      window.scrollTo(0, startPosition - (distance * ease));
      
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(step);
  }, []);

  // Lazy initialization - só inicializa quando necessário
  useEffect(() => {
    if (isInitialized) return;

    // Detecta primeiro scroll para inicializar
    const initializeOnScroll = () => {
      setIsInitialized(true);
      window.removeEventListener('scroll', initializeOnScroll);
    };

    // Lazy loading: só inicializa após 500ms ou primeiro scroll
    const initTimeout = setTimeout(() => {
      setIsInitialized(true);
    }, 500);

    window.addEventListener('scroll', initializeOnScroll, { 
      passive: true, 
      once: true 
    });

    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener('scroll', initializeOnScroll);
    };
  }, [isInitialized]);

  // Handler de scroll otimizado com debounce
  useEffect(() => {
    if (!isInitialized) return;

    const handleScroll = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        const shouldShow = window.pageYOffset > 300;
        setIsVisible(prev => prev !== shouldShow ? shouldShow : prev);
      }, 16); // ~60fps
    };

    // Intersection Observer fallback para navegadores modernos
    let observer = null;
    
    if ('IntersectionObserver' in window) {
      // Cria elemento sentinela
      const sentinel = document.createElement('div');
      sentinel.style.cssText = `
        position: absolute;
        top: 300px;
        height: 1px;
        width: 1px;
        pointer-events: none;
        opacity: 0;
      `;
      document.body.appendChild(sentinel);

      observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(!entry.isIntersecting);
        },
        { threshold: 0 }
      );

      observer.observe(sentinel);

      // Cleanup function para o observer
      return () => {
        observer.disconnect();
        if (document.body.contains(sentinel)) {
          document.body.removeChild(sentinel);
        }
      };
    } else {
      // Fallback para navegadores antigos
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Verifica estado inicial

      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [isInitialized]);

  // Cleanup geral
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Early return se não inicializado ou não visível
  if (!isInitialized || !isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50
        bg-gradient-to-r from-blue-600 to-blue-700 
        hover:from-blue-700 hover:to-blue-800
        text-white
        w-12 h-12 sm:w-14 sm:h-14 
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
        scroll-to-top-button
        smooth-transition
      `}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
    >
      <ChevronUpIcon 
        className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:-translate-y-1" 
      />
    </button>
  );
});

OptimizedBackToTop.displayName = 'OptimizedBackToTop';

export default OptimizedBackToTop;
