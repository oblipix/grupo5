

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, A11y } from 'swiper/modules';

// 1. Importar os dados dos slides
import { heroSlidesData } from '../data/heroSlides.js';

// Importar os estilos necessários
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import '../styles/HeroSwiper.css'; // Importar o CSS específico do HeroSwiper

function HeroSwiper() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      effect="fade"
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      loop={true}
      className="w-full h-[60vh] md:h-[80vh] lg:h-[90vh] text-white hero-swiper-pagination"
    >
      {/* 2. Mapear sobre os dados importados */}
      {heroSlidesData.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className="relative w-full h-full bg-cover bg-center flex items-center justify-start p-8 text-left" 
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url(${slide.imageUrl})` }}
          >
            <div className="z-10 max-w-3xl animate-fade-in-up"> 
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-14 drop-shadow-md">
                {slide.title}
              </h1>
              <p className="text-base md:text-lg lg:text-xl drop-shadow-sm">
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