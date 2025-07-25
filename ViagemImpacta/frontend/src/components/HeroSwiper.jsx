/* eslint-disable no-unused-vars */
// HeroSwiper.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import restauranteImage from '../assets/images/restaurantePE.png';
import entradaprincipalImage from '../assets/images/entradaprincipalPE.png';
import piscinaImageRJ from '../assets/images/piscinaRJ.png';
import cinemalRSImage from '../assets/images/salacinemaRS.png';
import piscinaGAImage from '../assets/images/piscinaGA.png';
import './HeroSwiper.css'; // Importando o CSS específico do HeroSwiper


function HeroSwiper() {
  const heroSlides = [

    {
      id: 1,
      imageUrl: entradaprincipalImage,
      title: 'Sua Próxima Viagem Começa Aqui.',
      subtitle: 'Ofertas exclusivas para explorar o mundo sem sair de casa.',
    },

    {
      id: 2,
      imageUrl: restauranteImage,
      title: 'Aventura Inesquecível Espera por Você!',
      subtitle: 'Descubra destinos paradisíacos e paisagens de tirar o fôlego.',
    },
  
    {
      id: 3,
      imageUrl: piscinaImageRJ,
      title: 'Relaxe e Desconecte-se.',
      subtitle: 'Pacotes de viagem completos para você aproveitar cada momento.',
    },

    {
      id: 4,
      imageUrl: cinemalRSImage,
      title: 'Entretenimento de Primeira Classe.',
      subtitle: 'Desfrute de sessões de cinema privativas com toda a qualidade que você merece.',
    },

    {
      id: 5,
      imageUrl: piscinaGAImage,
      title: 'EOásis de Lazer e Relaxamento.',
      subtitle: 'Mergulhe em momentos inesquecíveis na nossa piscina, perfeita para toda a família.',
    },


  ];

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
      className="w-full h-[60vh] md:h-[80vh] lg:h-[90vh] text-white pb-12 hero-swiper-pagination" 
    >
      {heroSlides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className="relative w-full h-full bg-cover bg-center flex items-center justify-start p-8 text-left" 
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.81), rgba(0, 0, 0, 0.83)), url(${slide.imageUrl})` }}
          >
            <div className="z-10 max-w-3xl"> 
              {/* === MUDANÇA AQUI: Tamanho do TÍTULO do Hero === */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-md">
                {slide.title}
              </h1>
              {/* === MUDANÇA AQUI: Tamanho do SUBTÍTULO do Hero === */}
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