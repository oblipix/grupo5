// src/hooks/useScrollAnimations.js

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook global para controlar animações de scroll
 * @returns {Object} Configurações e controles das animações
 */
export const useScrollAnimations = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [performance, setPerformance] = useState('auto'); // 'high', 'medium', 'low', 'auto'

  useEffect(() => {
    // Detecta automaticamente a performance do dispositivo
    const detectPerformance = () => {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const memory = navigator.deviceMemory;
      
      // Dispositivo de baixa performance
      if (memory && memory < 4) return 'low';
      if (connection && connection.effectiveType && connection.effectiveType.includes('2g')) return 'low';
      
      // Dispositivo de média performance
      if (memory && memory < 8) return 'medium';
      if (connection && connection.effectiveType === '3g') return 'medium';
      
      // Dispositivo de alta performance
      return 'high';
    };

    if (performance === 'auto') {
      setPerformance(detectPerformance());
    }

    // Respeita preferências do usuário
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsEnabled(false);
    }
  }, [performance]);

  const getAnimationConfig = useCallback(() => {
    if (!isEnabled) {
      return {
        duration: 200,
        delay: 0,
        stagger: 0,
        easing: 'ease'
      };
    }

    switch (performance) {
      case 'low':
        return {
          duration: 300,
          delay: 50,
          stagger: 100,
          easing: 'ease'
        };
      case 'medium':
        return {
          duration: 500,
          delay: 100,
          stagger: 150,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        };
      case 'high':
      default:
        return {
          duration: 700,
          delay: 150,
          stagger: 200,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        };
    }
  }, [isEnabled, performance]);

  const toggleAnimations = useCallback(() => {
    setIsEnabled(prev => !prev);
  }, []);

  const setPerformanceMode = useCallback((mode) => {
    setPerformance(mode);
  }, []);

  return {
    isEnabled,
    performance,
    config: getAnimationConfig(),
    toggleAnimations,
    setPerformanceMode
  };
};

/**
 * Hook para animações com throttling em dispositivos móveis
 * @param {Function} callback - Função de callback
 * @param {number} delay - Delay do throttle
 * @returns {Function} Função throttled
 */
export const useThrottledScroll = (callback, delay = 16) => {
  const [lastCall, setLastCall] = useState(0);

  return useCallback((...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      setLastCall(now);
      callback(...args);
    }
  }, [callback, delay, lastCall]);
};

/**
 * Hook para preload de animações críticas
 * @param {Array} criticalElements - Seletores de elementos críticos
 */
export const usePreloadAnimations = (criticalElements = []) => {
  useEffect(() => {
    // Força o render de elementos críticos sem animação inicialmente
    criticalElements.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.style.transition = 'none';
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    });

    // Restaura animações após um frame
    requestAnimationFrame(() => {
      criticalElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          el.style.transition = '';
          el.style.opacity = '';
          el.style.transform = '';
        });
      });
    });
  }, [criticalElements]);
};
