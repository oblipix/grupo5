// src/components/common/PageAnimations.jsx

import React from 'react';
import AnimatedSection, { 
  AnimatedTitle, 
  AnimatedTextBlock, 
  AnimatedImage,
  AnimatedSectionGroup 
} from './AnimatedSection';
import { AnimatedHotelGrid } from './AnimatedHotelCard';
import ScrollReveal, { ScrollRevealCards, ScrollRevealSection } from './ScrollReveal';

/**
 * Exemplos de uso dos componentes de animação
 */

// Exemplo 1: Seção de hero animada
export const AnimatedHeroSection = ({ children }) => (
  <AnimatedSection animation="hero" className="hero-section">
    {children}
  </AnimatedSection>
);

// Exemplo 2: Cards de hotel que aparecem em sequência
export const HotelCardsWithAnimation = ({ hotelCards }) => (
  <AnimatedHotelGrid staggerDelay={100}>
    {hotelCards}
  </AnimatedHotelGrid>
);

// Exemplo 3: Seção de títulos e textos
export const AnimatedContentSection = ({ title, description, children }) => (
  <AnimatedSection animation="fadeUp" className="content-section">
    <AnimatedTitle level="h2" className="text-center mb-8">
      {title}
    </AnimatedTitle>
    
    {description && (
      <AnimatedTextBlock className="text-center mb-12">
        {description}
      </AnimatedTextBlock>
    )}
    
    <ScrollRevealCards staggerDelay={150}>
      {children}
    </ScrollRevealCards>
  </AnimatedSection>
);

// Exemplo 4: Grid de benefícios/features
export const AnimatedFeatureGrid = ({ features }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {features.map((feature, index) => (
      <ScrollReveal
        key={index}
        animation="zoomIn"
        delay={index * 100}
        className="feature-card"
      >
        <div className="p-6 bg-white rounded-lg shadow-lg">
          {feature.icon && (
            <AnimatedImage 
              src={feature.icon} 
              alt={feature.title}
              className="w-16 h-16 mx-auto mb-4"
            />
          )}
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      </ScrollReveal>
    ))}
  </div>
);

// Exemplo 5: Seção de depoimentos/testimonials
export const AnimatedTestimonials = ({ testimonials }) => (
  <ScrollRevealSection animation="slideLeft" className="testimonials-section">
    <AnimatedTitle level="h2" className="text-center mb-12">
      O que nossos clientes dizem
    </AnimatedTitle>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <ScrollReveal
          key={index}
          animation="fadeUp"
          delay={index * 150}
        >
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="italic mb-4">"{testimonial.text}"</p>
            <div className="flex items-center">
              <AnimatedImage
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.location}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </ScrollRevealSection>
);

// Exemplo 6: Call to Action animado
export const AnimatedCTA = ({ title, description, buttonText, onButtonClick }) => (
  <ScrollRevealSection animation="zoomIn" className="cta-section text-center py-16">
    <AnimatedTitle level="h2" className="text-4xl font-bold mb-6">
      {title}
    </AnimatedTitle>
    
    <AnimatedTextBlock className="text-xl mb-8 max-w-2xl mx-auto">
      {description}
    </AnimatedTextBlock>
    
    <ScrollReveal animation="fadeUp" delay={300}>
      <button
        onClick={onButtonClick}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
      >
        {buttonText}
      </button>
    </ScrollReveal>
  </ScrollRevealSection>
);

export default {
  AnimatedHeroSection,
  HotelCardsWithAnimation,
  AnimatedContentSection,
  AnimatedFeatureGrid,
  AnimatedTestimonials,
  AnimatedCTA
};
