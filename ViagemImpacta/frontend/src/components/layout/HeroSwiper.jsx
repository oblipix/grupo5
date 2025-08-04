

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, A11y } from 'swiper/modules';

// 1. Importar os dados dos slides
import { heroSlidesData } from '../data/heroSlides.js';

// Importar os estilos necessários
import 'swiper/css';
import 'swiper/css/effect-fade';
import '../styles/HeroSwiper.css'; 

function HeroSwiper() {
  return (
    <Swiper
      modules={[Autoplay, EffectFade, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      effect="fade"
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      loop={true}
      className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] text-white hero-swiper"
    >
      {/* 2. Mapear sobre os dados importados */}
      {heroSlidesData.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className="relative w-full h-full bg-cover bg-center flex items-center justify-start p-8 text-left overflow-hidden" 
            style={{ 
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.88), rgba(0, 0, 0, 0.4)), url(${slide.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              marginTop: '0px',
              marginBottom: '0px'
            }}
          >
            <div className="z-10 max-w-6xl animate-fade-in-up"> 
            <h1 className="title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 drop-shadow-lg max-w-4xl">
                {slide.title}
              </h1>
              <p className="paragrafoHero text-base md:text-md lg:text-x drop-shadow-sm">
                {slide.subtitle}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default HeroSwiper;