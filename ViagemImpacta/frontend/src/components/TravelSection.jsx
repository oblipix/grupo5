import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Importa os estilos principais do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './TravelSection.css'; 


// Importa os módulos Swiper que você vai usar (Navigation, Pagination, A11y)
import { Navigation, Pagination, A11y } from 'swiper/modules';

function TravelSection({ title, travels, id, className, onCardClick }) {
  const generateRandomImageUrl = (id, width = 400, height = 300) => {
    return `https://picsum.photos/id/${id % 1000}/${width}/${height + 150}`;
  };

  return (
    <section id={id} className={`py-8 px-6 bg-white ${className}`}>
      <div className="container mx-auto">
        <h2 className="TitleSection text-3xl font-bold text-gray-800 mb-6">{title}</h2>

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={0} 
          slidesPerView={1} 
          navigation 
          pagination={{ clickable: true }} 
          scrollbar={{ draggable: true }} 
          breakpoints={{
            320: { 
              slidesPerView: 1, 
              spaceBetween: 0, 
            },
            640: { 
              slidesPerView: 2, 
              spaceBetween: 0, 
            },
            768: { 
              slidesPerView: 3, 
              spaceBetween: 0, 
            },
            1024: { 
              slidesPerView: 4, 
              spaceBetween: 0, 
            },
            1280: { 
              slidesPerView: 4,
              spaceBetween: 0,
            }
          }}
          className="mySwiper travel-pagination-bottom" 
        >
          {travels.map((travel) => (
            <SwiperSlide key={travel.id}>
              {/* O card principal não precisa de cursor-pointer se apenas o botão é clicável */}
              <div
                className="cardSombra bg-white rounded-lg border border-gray-200 p-2  transform transition duration-300 hover:scale-105 max-w-[620px] mx-2 relative h-full flex flex-col"
              >
                {/* Restante do código do card permanece o mesmo */}
                <div className="relative w-full h-92 overflow-hidden rounded-md">
                    <img
                        src={travel.imageUrl || generateRandomImageUrl(travel.id)}
                        alt={travel.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"></div> 

                    <div className="absolute inset-0 p-4 text-white flex flex-col justify-center items-start text-left">
                        <div>
                            <h3 className="TittleCards">{travel.title}</h3>
                            <p className="text-xs mb-3 line-clamp-2">{travel.description}</p>
                        </div>
                        {/* === MUDANÇA AQUI: Adicionado cursor-pointer ao botão === */}
                        <button
                          className="main-action-button bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 text-sm mt-4 cursor-pointer" // Adicionado cursor-pointer
                          onClick={(e) => {
                            e.stopPropagation();
                            onCardClick(travel.id);
                          }}
                        >
                            Ver Detalhes
                        </button>
                    </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default TravelSection;