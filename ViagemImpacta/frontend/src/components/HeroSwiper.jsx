// HeroSwiper.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

function HeroSwiper() {
  const heroSlides = [
    {
      id: 1,
      imageUrl: 'https://picsum.photos/id/1018/1920/800',
      title: 'Aventura Inesquecível Espera por Você!',
      subtitle: 'Descubra destinos paradisíacos e paisagens de tirar o fôlego.',
    },
    {
      id: 2,
      imageUrl: 'https://picsum.photos/id/1040/1920/800',
      title: 'Sua Próxima Viagem Começa Aqui.',
      subtitle: 'Ofertas exclusivas para explorar o mundo sem sair de casa.',
    },
    {
      id: 3,
      imageUrl: 'https://picsum.photos/id/1084/1920/800',
      title: 'Relaxe e Desconecte-se.',
      subtitle: 'Pacotes de viagem completos para você aproveitar cada momento.',
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
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.61), rgba(0, 0, 0, 0.53)), url(${slide.imageUrl})` }}
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
              <button className="main-action-button mt-8 bg-blue-600 text-white px-8 py-4 rounded-full text-lg md:text-xl font-semibold hover:bg-blue-700 transition duration-300 shadow-xl self-start">
                Ver Pacotes
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default HeroSwiper;