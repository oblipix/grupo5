// src/pages/HomePage.jsx

import React from 'react';
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


function HomePage() {
  const { isLoaded } = useOutletContext();

  return (
    <>
      <HeroSwiper />
      <HomeMenu />
      <SearchHotelsBar />

      {/* Seção de Promoções em Destaque acima do Blog */}
      <PromocoesDestaque />

      {/* Seção de Hotéis Recomendados */}
      <div className="container mx-auto py-12">
       
        <RecommendedHotelsSection />
      </div>

      <BlogSection 
        id="dicas-de-viagem"
        title="Dicas de Viagem: Prepare sua Aventura!" 
      />

      <HotelsMapSection isLoaded={isLoaded} />
      <NewsletterSection />
    </>
  );
}

export default HomePage;