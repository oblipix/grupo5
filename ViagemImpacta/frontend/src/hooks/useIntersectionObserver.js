// src/hooks/useIntersectionObserver.js

import { useState, useEffect, useRef } from 'react';

/**
 * Hook para detectar quando elementos entram na viewport
 * @param {Object} options - Opções do Intersection Observer
 * @returns {Array} [ref, isVisible, hasAnimated] - Ref para o elemento, se está visível, se já animou
 */
export const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true); // Anima apenas uma vez
        }
      },
      {
        threshold: 0.1, // Trigger quando 10% do elemento está visível
        rootMargin: '-50px 0px -50px 0px', // Margem para trigger mais cedo
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated, options]);

  return [elementRef, isVisible, hasAnimated];
};

/**
 * Hook para múltiplos elementos com animação em sequência
 * @param {number} itemCount - Número de itens
 * @param {number} delay - Delay entre animações (ms)
 * @returns {Array} [containerRef, visibleItems] - Ref do container e array de items visíveis
 */
export const useStaggeredAnimation = (itemCount = 0, delay = 100) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          
          // Anima itens em sequência
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, i]));
            }, i * delay);
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-100px 0px'
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [itemCount, delay, hasStarted]);

  return [containerRef, visibleItems];
};
