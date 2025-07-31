// src/hooks/useScrollVisibility.js

import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Hook personalizado com lazy loading para detectar quando mostrar o botão de scroll to top
 * @param {number} threshold - Pixels scrollados para mostrar o botão (padrão: 300)
 * @returns {boolean} isVisible - Se o botão deve ser visível
 */
export const useScrollVisibility = (threshold = 300) => {
  const [isVisible, setIsVisible] = useState(false);

  // Memoizar o threshold para evitar recriação do effect
  const memoizedThreshold = useMemo(() => threshold, [threshold]);

  // Callback memoizado para melhor performance
  const toggleVisibility = useCallback(() => {
    const shouldShow = window.pageYOffset > memoizedThreshold;
    setIsVisible(prev => prev !== shouldShow ? shouldShow : prev);
  }, [memoizedThreshold]);

  useEffect(() => {
    // Lazy loading: só adiciona o listener quando necessário
    let timeoutId = null;
    let isListenerActive = false;
    
    const debouncedToggle = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Debounce para melhor performance
      timeoutId = setTimeout(toggleVisibility, 16); // ~60fps
    };

    const addListener = () => {
      if (!isListenerActive) {
        window.addEventListener('scroll', debouncedToggle, { 
          passive: true,
          capture: false 
        });
        isListenerActive = true;
      }
    };

    const removeListener = () => {
      if (isListenerActive) {
        window.removeEventListener('scroll', debouncedToggle);
        isListenerActive = false;
      }
    };

    // Lazy loading: só adiciona o listener após um pequeno delay
    const initTimeout = setTimeout(() => {
      addListener();
      // Verifica o estado inicial
      toggleVisibility();
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(initTimeout);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      removeListener();
    };
  }, [toggleVisibility]);

  return isVisible;
};

/**
 * Hook para detectar se o header está visível usando Intersection Observer
 * @param {string} headerSelector - Seletor CSS do header (padrão: 'header')
 * @returns {boolean} isHeaderVisible - Se o header está visível
 */
export const useHeaderVisibility = (headerSelector = 'header') => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    const headerElement = document.querySelector(headerSelector);
    
    if (!headerElement) {
      // Se não encontrar o header, usa o scroll básico
      const fallbackToggle = () => {
        setIsHeaderVisible(window.pageYOffset < 100);
      };
      
      window.addEventListener('scroll', fallbackToggle, { passive: true });
      return () => window.removeEventListener('scroll', fallbackToggle);
    }

    // Usar Intersection Observer para melhor performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Considera visível se pelo menos 10% está na tela
        rootMargin: '-50px 0px 0px 0px' // Pequena margem para ativar antes de sair completamente
      }
    );

    observer.observe(headerElement);

    return () => {
      observer.disconnect();
    };
  }, [headerSelector]);

  return isHeaderVisible;
};
