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

function HomePage() {
  const { isLoaded } = useOutletContext();

  return (
    <>
      <HeroSwiper />
      <HomeMenu />
      <SearchHotelsBar />

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