// src/pages/HomePage.jsx

import React from 'react';
import { useOutletContext } from 'react-router-dom';

// Importe todas as seções que compõem sua página inicial
import HeroSwiper from '../layout/HeroSwiper.jsx';
import HomeMenu from '../layout/HomeMenu.jsx';
import SearchHotelsBar from '../common/SearchHotelsBar.jsx';
import TravelSection from '../pages/TravelSection.jsx';
import RecommendedHotelsSection from '../hotels/RecommendedHotelsSection.jsx';
import BlogSection from '../blog/BlogSection.jsx'; // <<<<< MANTER AQUI >>>>>
import HotelsMapSection from '../hotels/HotelsMapSection.jsx';
import NewsletterSection from '../pages/NewsletterSection.jsx';

function HomePage() {
  const { isLoaded } = useOutletContext();

  return (
    <>
      <HeroSwiper />
      <HomeMenu />
      <SearchHotelsBar />
      
      {/* Seção de Promoções (com o ID 'viagens-promocao') */}
      <TravelSection 
        id="viagens-promocao" 
        title="Nossas Promoções" 
      />

      <RecommendedHotelsSection />

      {/* <<<<<<<<<<<< BLOG SECTION - ADICIONADO NOVAMENTE COM O ID >>>>>>>>>>>> */}
      <BlogSection 
        id="dicas-de-viagem" // Este é o ID que o link no Footer vai usar para rolar
        title="Dicas de Viagem: Prepare sua Aventura!" 
      />

      <HotelsMapSection isLoaded={isLoaded} />
      <NewsletterSection />
    </>
  );
}

export default HomePage;