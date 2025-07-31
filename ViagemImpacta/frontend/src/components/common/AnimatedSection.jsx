// src/components/common/AnimatedSection.jsx

import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

/**
 * Seção animada que aparece ao scroll
 * @param {Object} props - Props do componente
 * @param {React.ReactNode} props.children - Conteúdo da seção
 * @param {string} props.animation - Tipo de animação
 * @param {string} props.className - Classes CSS adicionais
 * @param {number} props.delay - Delay da animação
 * @param {number} props.threshold - Threshold do intersection observer
 */
const AnimatedSection = ({ 
  children, 
  animation = 'fadeUp',
  className = '',
  delay = 0,
  threshold = 0.1
}) => {
  const [ref, isVisible] = useIntersectionObserver({ 
    threshold,
    rootMargin: '-80px 0px'
  });

  return (
    <section
      ref={ref}
      className={`
        scroll-reveal scroll-reveal-${animation}
        ${isVisible ? 'scroll-reveal-visible' : ''}
        ${className}
      `}
      style={{
        animationDelay: `${delay}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </section>
  );
};

/**
 * Container para múltiplas seções com animação escalonada
 * @param {Object} props - Props do componente
 */
export const AnimatedSectionGroup = ({ children, staggerDelay = 200 }) => {
  const childrenArray = React.Children.toArray(children);
  
  return (
    <>
      {childrenArray.map((child, index) => (
        <AnimatedSection
          key={index}
          delay={index * staggerDelay}
          animation="fadeUp"
        >
          {child}
        </AnimatedSection>
      ))}
    </>
  );
};

/**
 * Título animado com efeito especial
 * @param {Object} props - Props do componente
 */
export const AnimatedTitle = ({ children, className = '', level = 'h2' }) => {
  const [ref, isVisible] = useIntersectionObserver({ 
    threshold: 0.5,
    rootMargin: '-100px 0px'
  });

  const Tag = level;

  return (
    <Tag
      ref={ref}
      className={`
        scroll-reveal scroll-reveal-titleSlide
        ${isVisible ? 'scroll-reveal-visible' : ''}
        ${className}
      `}
    >
      {children}
    </Tag>
  );
};

/**
 * Bloco de texto animado
 * @param {Object} props - Props do componente
 */
export const AnimatedTextBlock = ({ children, className = '' }) => {
  const [ref, isVisible] = useIntersectionObserver({ 
    threshold: 0.3,
    rootMargin: '-50px 0px'
  });

  return (
    <div
      ref={ref}
      className={`
        scroll-reveal scroll-reveal-textBlock
        ${isVisible ? 'scroll-reveal-visible' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

/**
 * Imagem animada com efeito de zoom
 * @param {Object} props - Props do componente
 */
export const AnimatedImage = ({ src, alt, className = '', ...props }) => {
  const [ref, isVisible] = useIntersectionObserver({ 
    threshold: 0.2,
    rootMargin: '-100px 0px'
  });

  return (
    <div
      ref={ref}
      className={`
        scroll-reveal scroll-reveal-image
        ${isVisible ? 'scroll-reveal-visible' : ''}
        overflow-hidden
      `}
    >
      <img
        src={src}
        alt={alt}
        className={`transition-transform duration-700 ${className}`}
        {...props}
      />
    </div>
  );
};

export default AnimatedSection;
