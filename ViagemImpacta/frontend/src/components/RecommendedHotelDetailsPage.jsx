/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'; // Importe useState
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

const RecommendedHotelDetailsPage = ({ hotel, onBack }) => {
    if (!hotel) {
        return (
            <div className="container mx-auto py-12 px-6 text-center">
                <p className="text-gray-700 text-xl">Hotel não encontrado.</p>
                <button
                    onClick={onBack}
                    className="mt-8 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300"
                >
                    ← Voltar
                </button>
            </div>
        );
    }

    const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
    // NOVO ESTADO: Para controlar o modal de imagem
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Função para abrir o modal com a imagem clicada
    const openImageModal = (index) => {
        setCurrentImageIndex(index);
        setIsModalOpen(true);
    };

    // Função para fechar o modal
    const closeImageModal = () => {
        setIsModalOpen(false);
    };

    // Navegação no modal (opcional, para próxima/anterior)
    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % hotel.galleryImages.length
        );
    };

    const goToPrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex - 1 + hotel.galleryImages.length) % hotel.galleryImages.length
        );
    };

    return (
        <div className="container mx-auto py-12 px-6">
            <button
                onClick={onBack}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-8 transition duration-300"
            >
                ← Voltar para Hotéis Recomendados
            </button>

            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">{hotel.title}</h1>
            <p className="text-xl text-gray-600 mb-8 text-center">{hotel.location}</p>

            <div className="bg-white rounded-lg shadow-xl p-8 mb-10">
                {/* Galeria de Imagens com Swiper */}
                {hotel.galleryImages && hotel.galleryImages.length > 0 && (
                    <div className="mb-8">
                        <Swiper
                            loop={true}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            modules={[FreeMode, Navigation, Thumbs, Pagination]}
                            className="mySwiper2 mb-2 rounded-lg"
                            pagination={{ clickable: true }}
                        >
                            {hotel.galleryImages.map((image, index) => (
                                <SwiperSlide key={image.id || index}>
                                    {/* Adicionado onClick para abrir o modal */}
                                    <img
                                        src={image.url}
                                        alt={image.alt}
                                        className="w-full h-96 object-cover rounded-lg cursor-pointer"
                                        onClick={() => openImageModal(index)} // <-- Torna a imagem clicável
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            loop={true}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper mt-2"
                        >
                            {hotel.galleryImages.map((image, index) => (
                                <SwiperSlide key={`thumb-${image.id || index}`}>
                                    {/* Adicionado onClick para abrir o modal também nas miniaturas */}
                                    <img
                                        src={image.url}
                                        alt={`Thumbnail ${image.alt}`}
                                        className="w-full h-20 object-cover rounded-md cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                                        onClick={() => openImageModal(index)} // <-- Torna a miniatura clicável
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}

                {/* Seções "Sobre o Hotel" e "Comodidades" lado a lado em telas maiores */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"> {/* Contêiner grid para as duas colunas principais */}
                    <div> {/* Coluna da esquerda: Sobre o Hotel e Avaliação Geral */}
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Sobre o Hotel</h2>
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">{hotel.description}</p>
                        
                        <div className="flex flex-col justify-center bg-blue-50 border border-blue-200 rounded-lg p-5 shadow-sm"> {/* Contêiner para Avaliação Geral */}
                            <h3 className="text-2xl font-bold text-gray-800 mb-8 ">Avaliação Geral</h3>
                            <div className="flex items-center text-blue-600">
                                <span className="text-5xl font-extrabold mr-2">{hotel.rating}</span>
                                <span className="text-3xl font-semibold">/ 5.0</span>
                                <svg className="w-8 h-8 text-yellow-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.157L10 16.324l-2.806 2.034c-.783.57-1.838-.196-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.927 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69L9.049 2.927z" />
                                </svg>
                            </div>
                            <p className="text-gray-600">Baseado em {hotel.feedbacks.length} avaliações de hóspedes.</p>
                        </div>
                    </div>

                    <div> {/* Coluna da direita: Comodidades */}
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">Comodidades</h3>
                        <ul className="list-disc list-inside text-gray-700 text-lg">
                            {hotel.hasRestaurant && <li>Restaurante no local</li>}
                            {hotel.hasWifi && <li>Wi-Fi Grátis</li>}
                            {hotel.parking && <li>Estacionamento</li>}
                            {hotel.leisureFacilities.map((facility, index) => (
                                <li key={index}>{facility}</li>
                            ))}
                            <li>Total de Quartos: {hotel.totalRooms}</li>
                            <li>Total de Banheiros: {hotel.totalBathrooms}</li>
                            <li>Elevadores: {hotel.elevators}</li>
                        </ul>
                    </div>
                </div>

                {/* Opções de Quartos */}
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Opções de Quartos</h2>
                {hotel.roomOptions && hotel.roomOptions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {hotel.roomOptions.map((room, index) => (
                            <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-5 shadow-sm">
                                <h4 className="text-xl font-semibold text-blue-800 mb-2">{room.type}</h4>
                                <p className="text-gray-700 mb-1">{room.description}</p>
                                <p className="text-gray-700 mb-1">Capacidade: {room.capacity} pessoa(s)</p>
                                <p className="text-gray-700 mb-1">Camas: {room.beds}</p>
                                <p className="text-gray-700 mb-3">Banheiros: {room.bathrooms}</p>
                                <p className="text-blue-700 font-bold text-lg">
                                    Preço por diária: R$ {room.price.toFixed(2).replace('.', ',')}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 mb-8">Nenhuma opção de quarto disponível no momento.</p>
                )}


                {/* Avaliações dos Hóspedes */}
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Avaliações dos Hóspedes</h2>
                {hotel.feedbacks && hotel.feedbacks.length > 0 ? (
                    <div className="space-y-6">
                        {hotel.feedbacks.map(feedback => (
                            <div key={feedback.id} className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex items-center mb-2">
                                    <span className="font-bold text-lg text-gray-800 mr-2">{feedback.guestName}</span>
                                    <span className="text-yellow-500 font-bold text-md">{feedback.rating} ★</span>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{feedback.comment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">Não há avaliações para este hotel ainda.</p>
                )}
            </div>

            {/* Modal de Imagem */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
                    onClick={closeImageModal} // Fecha o modal ao clicar fora da imagem
                >
                    <div className="relative" onClick={(e) => e.stopPropagation()}> {/* Impede que o clique na imagem feche o modal */}
                        <img
                            src={hotel.galleryImages[currentImageIndex].url}
                            alt={hotel.galleryImages[currentImageIndex].alt}
                            className="max-h-[90vh] max-w-[90vw] object-contain"
                        />
                        <button
                            onClick={closeImageModal}
                            className="absolute top-4 right-4 text-white text-4xl font-bold bg-gray-800 bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-75 transition-colors"
                            aria-label="Fechar"
                        >
                            &times;
                        </button>
                        {/* Botões de navegação (opcional) */}
                        <button
                            onClick={goToPrevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl bg-gray-800 bg-opacity-50 rounded-full w-16 h-16 flex items-center justify-center hover:bg-opacity-75 transition-colors"
                            aria-label="Imagem anterior"
                        >
                            &#8249;
                        </button>
                        <button
                            onClick={goToNextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl bg-gray-800 bg-opacity-50 rounded-full w-16 h-16 flex items-center justify-center hover:bg-opacity-75 transition-colors"
                            aria-label="Próxima imagem"
                        >
                            &#8250;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecommendedHotelDetailsPage;