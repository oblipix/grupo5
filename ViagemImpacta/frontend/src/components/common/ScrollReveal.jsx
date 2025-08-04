// src/components/common/ScrollReveal.jsx

import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

/**
 * Componente para revelar elementos ao scroll
 * @param {Object} props - Props do componente
 * @param {React.ReactNode} props.children - Elementos filhos
 * @param {string} props.animation - Tipo de animação ('fadeUp', 'fadeIn', 'slideLeft', etc.)
 * @param {number} props.delay - Delay da animação em ms
 * @param {number} props.duration - Duração da animação em ms
 * @param {string} props.className - Classes CSS adicionais
 */
const ScrollReveal = ({ 
  children, 
  animation = 'fadeUp',
  delay = 0,
  duration = 600,
  className = '',
  threshold = 0.1
}) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold });

  const getAnimationClass = () => {
    const baseClass = 'scroll-reveal';
    const animationClass = `scroll-reveal-${animation}`;
    const visibleClass = isVisible ? 'scroll-reveal-visible' : '';
    
    return `${baseClass} ${animationClass} ${visibleClass} ${className}`.trim();
  };

  return (
    <div
      ref={ref}
      className={getAnimationClass()}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
};

/**
 * Componente para cards que aparecem em sequência
 * @param {Object} props - Props do componente
 * @param {React.ReactNode} props.children - Cards filhos
 * @param {number} props.staggerDelay - Delay entre cada card (ms)
 */
export const ScrollRevealCards = ({ children, staggerDelay = 150, className = '' }) => {
  const childrenArray = React.Children.toArray(children);
  
  return (
    <div className={`scroll-reveal-container ${className}`}>
      {childrenArray.map((child, index) => (
        <ScrollReveal
          key={index}
          animation="fadeUp"
          delay={index * staggerDelay}
          duration={600}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
};

/**
 * Componente para seções que aparecem com efeito especial
 * @param {Object} props - Props do componente
 */
export const ScrollRevealSection = ({ children, animation = 'fadeUp', className = '' }) => {
  return (
    <ScrollReveal 
      animation={animation}
      duration={800}
      threshold={0.2}
      className={className}
    >
      {children}
    </ScrollReveal>
  );
};

export default ScrollReveal;
