// src/components/common/AnimatedHotelCard.jsx

import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

/**
 * Wrapper para cards de hotel com animação de reveal
 * @param {Object} props - Props do componente
 * @param {React.ReactNode} props.children - Card do hotel
 * @param {number} props.index - Índice do card para delay escalonado
 * @param {number} props.delay - Delay base em ms
 */
const AnimatedHotelCard = ({ children, index = 0, delay = 100 }) => {
  const [ref, isVisible] = useIntersectionObserver({ 
    threshold: 0.1,
    rootMargin: '-50px 0px'
  });

  return (
    <div
      ref={ref}
      className={`
        scroll-reveal scroll-reveal-cardPop
        ${isVisible ? 'scroll-reveal-visible' : ''}
        hotel-card-animated
      `}
      style={{
        animationDelay: `${index * delay}ms`,
        transitionDelay: `${index * delay}ms`
      }}
    >
      {children}
    </div>
  );
};

/**
 * Container para grid de hotéis com animação em sequência
 * @param {Object} props - Props do componente
 */
export const AnimatedHotelGrid = ({ children, className = '', staggerDelay = 150 }) => {
  const childrenArray = React.Children.toArray(children);
  
  return (
    <div className={`animated-hotel-grid ${className}`}>
      {childrenArray.map((child, index) => (
        <AnimatedHotelCard
          key={index}
          index={index}
          delay={staggerDelay}
        >
          {child}
        </AnimatedHotelCard>
      ))}
    </div>
  );
};

export default AnimatedHotelCard;
