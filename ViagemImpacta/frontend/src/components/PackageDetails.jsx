import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Importe os estilos do Swiper para esses módulos
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Importe o componente do modal que criamos
import ImageModal from './ImageModal'; 

// Função auxiliar para gerar URLs de imagem aleatórias
const generateRandomImageUrl = (id, width = 500, height = 350) => {
  return `https://picsum.photos/id/${id % 1000}/${width}/${height + 100}`; 
};

function PackageDetails({ packageData, onBack }) {
  const [selectedImageModal, setSelectedImageModal] = useState(null);

  if (!packageData) {
    return (
      <section className="bg-white rounded-t-3xl shadow-md -mt-10 md:-mt-20 relative z-10 py-8 px-6 text-center">
        <p className="text-gray-700 text-xl">Carregando detalhes do pacote ou pacote não encontrado...</p>
        <button
          onClick={onBack}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Voltar para a lista
        </button>
      </section>
    );
  }

  // Dados de exemplo para as imagens do carrossel de amenidades
  const amenityImages = [
    { id: 1, url: generateRandomImageUrl(200), alt: 'Café da manhã do hotel', caption: 'Delicioso café da manhã incluso para começar o dia.' },
    { id: 2, url: generateRandomImageUrl(201), alt: 'Piscina do hotel', caption: 'Piscina exuberante com vista panorâmica para o mar.' },
    { id: 3, url: generateRandomImageUrl(202), alt: 'Área de Yoga', caption: 'Sessões de yoga relaxantes ao nascer do sol.' },
    { id: 4, url: generateRandomImageUrl(203), alt: 'Spa e Massagem', caption: 'Relaxe e revigore-se em nosso spa de luxo.' },
    { id: 5, url: generateRandomImageUrl(204), alt: 'Centro de Fitness', caption: 'Equipamentos modernos para manter sua rotina de treinos.' },
    { id: 6, url: generateRandomImageUrl(205), alt: 'Restaurante Gourmet', caption: 'Experiências gastronômicas inesquecíveis.' },
  ];

  return (
    <section className="bg-white rounded-t-3xl shadow-md -mt-10 md:-mt-20 relative z-10 py-8 px-6">
      <div className="container mx-auto">
        {/* Botão de Voltar - permanece fora do bloco com background */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Voltar
        </button>

        {/* SEÇÃO COM BACKGROUND AZUL CLARO PARA O CABEÇALHO DO PACOTE */}
        <div className="bg-blue-50 rounded-lg p-6 shadow-sm mb-12"> 
          <h1 className="text-2xl font-bold text-blue-800 mb-2">Detalhes do Pacote</h1>
          {/* Título Principal do pacote - font-size reduzido */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">{packageData.title}</h2> 
          <p className="text-gray-600 mb-0 max-w-2xl"> 
            {packageData.description}
            Desfrute de paisagens deslumbrantes, cultura rica e experiências inesquecíveis. Perfeito para quem busca aventura ou relaxamento total.
          </p>
        </div>

        {/* Estrutura de Duas Colunas: Carrossel de Imagens (Esquerda) e Nossos Planos (Direita) */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Coluna da Esquerda: Carrossel de Imagens do Hotel/Amenidades */}
          <div className="w-full md:w-1/2"> 
            {/* Título "Conheça o Hotel..." centralizado */}
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Conheça o Hotel e suas Ofertas</h3>
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-2 relative h-[360px] flex flex-col max-w-[400px] mx-auto"> 
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={0} 
                    slidesPerView={1} 
                    navigation 
                    pagination={{ clickable: true }} 
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    className="w-full h-full rounded-md overflow-hidden amenities-swiper" 
                >
                    {amenityImages.map((image) => (
                        <SwiperSlide key={image.id}>
                            <div className="relative w-full h-full cursor-pointer">
                                <img
                                    src={image.url} 
                                    alt={image.alt}
                                    className="w-full h-full object-cover" 
                                    // === MUDANÇA AQUI: Passando image.id em vez de image.url ===
                                    onClick={() => setSelectedImageModal(image.id)} 
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-3 text-white">
                                    <p className="text-sm">{image.caption}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
          </div>

          {/* Coluna da Direita: Nossos Planos E Pacotes Extra */}
          <div className="w-full md:w-1/2 mt-12"> 
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-left">Nossos Planos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8"> 
              {/* Cards Plano Individual, Casal, Família */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex flex-col items-center text-center shadow-sm">
                <span className="text-lg font-semibold text-blue-700 mb-2">Individual</span>
                <span className="text-2xl font-bold text-blue-600 mb-3">R$ 250,00</span>
                <p className="text-gray-600 text-sm">Preço por pessoa</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center shadow-sm">
                <span className="text-lg font-semibold text-gray-800 mb-2">Casal</span>
                <span className="text-2xl font-bold text-blue-600 mb-3">R$ 500,00</span>
                <p className="text-gray-600 text-sm">Preço para duas pessoas</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center shadow-sm">
                <span className="text-lg font-semibold text-gray-800 mb-2">Família</span>
                <span className="text-2xl font-bold text-blue-600 mb-3">R$ 1.000,00</span>
                <p className="text-gray-600 text-sm">Até 4 pessoas</p>
              </div>
            </div>

            {/* Seção "Para pacotes extra família" com background azul claro */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-blue-50 rounded-lg p-6 shadow-sm mb-0"> 
              <p className="text-gray-600 text-base md:text-lg">Para pacotes extra família</p>
              <button className=" main-action-button bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition duration-300 shadow-md">
                Contato
              </button>
            </div>
          </div>
        </div> {/* Fim da Estrutura de Duas Colunas */}


        {/* Café da manhã e Outras Facilidades (texto) */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12 bg-gray-50 rounded-lg p-6 shadow-sm">
          <div className="w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Café da manhã e Outras Facilidades</h3>
            <p className="text-gray-700 text-sm mb-3">
              Desfrute de um delicioso café da manhã continental, incluso em todos os nossos planos. Além disso, o hotel oferece diversas facilidades como piscina, academia, spa e aulas de yoga para tornar sua estadia ainda mais relaxante e completa.
            </p>
            {/* Avaliação por Estrelas */}
            <div className="flex items-center text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.816 1.48-8.279-6.064-5.828 8.332-1.151L12 .587z"/>
                </svg>
              ))}
              <span className="text-gray-600 text-sm ml-2">5 Estrelas</span>
            </div>
          </div>
        </div>

      </div> {/* Fim do container mx-auto */}
      
      {selectedImageModal && (
        <ImageModal
          images={amenityImages} // Passando o array completo de imagens
          initialImageId={selectedImageModal} // Passando o ID da imagem clicada
          onClose={() => setSelectedImageModal(null)}
        />
      )}
    </section>
  );
}

export default PackageDetails;