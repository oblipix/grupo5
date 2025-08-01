// src/pages/HomePage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

// Importe todas as seções que compõem sua página inicial
import HeroSwiper from '../layout/HeroSwiper.jsx';
import HomeMenu from '../layout/HomeMenu.jsx';
import SearchHotelsBar from '../common/SearchHotelsBar.jsx';
import BlogSection from '../blog/BlogSection.jsx';
import HotelsMapSection from '../hotels/HotelsMapSection.jsx';
import NewsletterSection from '../pages/NewsletterSection.jsx';
import PromocoesDestaque from '../hotels/PromocoesDestaque.jsx';
import RecommendedHotelsSection from '../hotels/RecommendedHotelsSection.jsx';

// Imports dos componentes de animação
import ScrollReveal from '../common/ScrollReveal.jsx';
import AnimatedSection from '../common/AnimatedSection.jsx';


function HomePage() {
  const { isLoaded } = useOutletContext();
  const navigate = useNavigate();
  // Estado local para amenities
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // Função para redirecionar para página de resultados com querystring
  const handleSearch = ({ destination, precoMin, precoMax, selectedAmenities, selectedRoomType }) => {
    const searchParams = new URLSearchParams();
    if (destination) searchParams.append('destino', destination);
    if (precoMin > 0) searchParams.append('precoMin', precoMin);
    if (precoMax < 10000) searchParams.append('precoMax', precoMax);
    if (Array.isArray(selectedAmenities) && selectedAmenities.length > 0) searchParams.append('comodidades', selectedAmenities.join(','));
    if (selectedRoomType) searchParams.append('tipoQuarto', selectedRoomType);
    // Adicione outros filtros se necessário
    navigate(`/hoteis?${searchParams.toString()}`);
  };

  return (
    <>
      {/* Hero aparece imediatamente */}
      <HeroSwiper />
      
      {/* Menu surge de baixo */}
      <ScrollReveal animation="fadeUp" delay={300}>
        <HomeMenu />
      </ScrollReveal>
      
      {/* Barra de pesquisa surge suavemente */}
      <ScrollReveal animation="fadeUp" delay={200}>
        <SearchHotelsBar />
      </ScrollReveal>

      {/* Seção de Promoções em Destaque - surge da esquerda */}
      <ScrollReveal animation="slideLeft" delay={300}>
        <PromocoesDestaque />
      </ScrollReveal>

      {/* Seção de Hotéis Recomendados - efeito especial */}
      <AnimatedSection animation="fadeUp" className="container mx-auto py-12">
        <RecommendedHotelsSection />
      </AnimatedSection>

      {/* Blog surgindo com zoom */}
      <ScrollReveal animation="zoomIn" delay={200}>
        <BlogSection 
          id="dicas-de-viagem"
          title="Dicas de Viagem: Prepare sua Aventura!" 
        />
      </ScrollReveal>

      {/* Mapa surge da direita */}
      <ScrollReveal animation="slideRight" delay={300}>
        <HotelsMapSection isLoaded={isLoaded} />
      </ScrollReveal>
      
      {/* Newsletter surge de baixo */}
      <ScrollReveal animation="fadeUp" delay={400}>
        <NewsletterSection />
      </ScrollReveal>
    </>
  );
}

export default HomePage;