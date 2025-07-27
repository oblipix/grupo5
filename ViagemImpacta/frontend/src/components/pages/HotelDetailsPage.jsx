
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allHotelsData } from '../data/hotels.js'; // Certifique-se de que o caminho está correto
import ImageModal from '../common/ImageModal.jsx';
import { Icons } from '../layout/Icons.jsx'; // Importando os ícones centralizados

// Importa o carrossel e seus estilos
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// Componente para renderizar estrelas de avaliação
const RatingDisplay = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => <Icons.Star key={`full-${i}`} className="w-5 h-5 text-yellow-400" />)}
            {[...Array(emptyStars)].map((_, i) => <Icons.Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />)}
        </div>
    );
};

// Mapeamento de nomes de comodidades para componentes de ícone
const leisureIconMap = {
    'Piscina': Icons.Pool,
    'Academia': Icons.Gym,
    'Spa': Icons.Spa,
    'Sauna': Icons.Sauna,
    'Sala de Cinema': Icons.Cinema,
    'Bar': Icons.Bar,
    'Restaurante': Icons.Restaurant,
    'Jardim Amplo': Icons.Garden,
    'Salão de Jogos': Icons.Saloon,
    'Área Kids': Icons.KidsArea,
    'Piscina Aquecida': Icons.Pool,
    'Wi-Fi Grátis': Icons.Wifi,
    'Estacionamento': Icons.Parking,
    'Bar na piscina': Icons.Bar, // Adicionado mapping para "Bar na piscina"
    // Adicione outros mapeamentos aqui conforme necessário
};

function HotelDetailsPage() {
    const { hotelId } = useParams();
    const navigate = useNavigate();
    const hotel = allHotelsData.find(h => h.id === parseInt(hotelId));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImages, setModalImages] = useState([]);
    const [initialImageId, setInitialImageId] = useState(null);

    if (!hotel) {
        return (
            <div className="container mx-auto py-8 px-6 text-center">
                <h2 className="text-2xl font-bold">Hotel não encontrado.</h2>
                <button onClick={() => navigate('/hoteis')} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md">
                    Ver todos os Hotéis
                </button>
            </div>
        );
    }

    const handleImageClick = (imagesArray, clickedImageId) => {
        setModalImages(imagesArray);
        setInitialImageId(clickedImageId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Configurações do Carrossel de Feedbacks
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="container mx-auto py-8 px-6">
            <button onClick={() => navigate(-1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-8">
                &larr; Voltar
            </button>

            <div className="bg-white rounded-lg shadow-lg p-8">
                <img
                    src={hotel.mainImageUrl}
                    alt={hotel.title}
                    className="w-full h-96 object-cover rounded-lg mb-6 cursor-pointer shadow-md"
                    onClick={() => handleImageClick(hotel.galleryImages || [], hotel.galleryImages?.[0]?.id)}
                />

                {/* Título do Hotel com Background Azul e Fonte Branca */}
                <h1 className="inline-block bg-blue-700 text-white text-4xl font-extrabold py-2 px-4 rounded-lg mb-4 shadow-md">
                    {hotel.title}
                </h1>
                <p className="text-gray-500 text-lg mb-4">{hotel.location}</p>

                {/* Descrição do Hotel com Background Cinza Claro e Fonte Cinza Escura */}
                <p className="bg-gray-50 text-gray-800 leading-relaxed p-4 rounded-lg mb-8 shadow-sm">
                    {hotel.description}
                </p>

                {hotel.galleryImages && hotel.galleryImages.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Galeria de Fotos</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {hotel.galleryImages.map(img => (
                                <img
                                    key={img.id}
                                    src={img.url}
                                    alt={img.alt}
                                    className="w-full h-32 object-cover rounded-lg shadow-sm cursor-pointer hover:opacity-80 transition"
                                    onClick={() => handleImageClick(hotel.galleryImages, img.id)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Seção "O que o hotel oferece" com Background AMARELO e Fonte Cinza Escura */}
                <div className="my-8 py-6 border-t border-b border-gray-200">
                    {/* Título "O que o hotel oferece" com Background AMARELO e Fonte Cinza Escura */}
                    <h2 className="inline-block bg-yellow-400 text-gray-800 text-2xl font-bold py-2 px-4 rounded-lg mb-4 shadow-md">
                        O que o hotel oferece
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
                        {hotel.leisureFacilities.map((facility, index) => {
                            const IconComponent = leisureIconMap[facility];
                            return (
                                <div key={index} className="flex items-center bg-yellow-100 text-gray-800 p-3 rounded-lg shadow-sm">
                                    {IconComponent ? <IconComponent className="w-6 h-6 mr-2 text-yellow-700" /> : <span className="w-6 h-6 mr-2"></span>}
                                    <span className="font-medium">{facility}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {hotel.roomOptions?.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Opções de Quartos</h2>
                        <div className="space-y-6">
                            {hotel.roomOptions.map((room, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center shadow-md">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">{room.type}</h3>
                                        <p className="text-gray-600 text-sm mb-2">{room.description}</p>
                                    </div>
                                    {/* <<<<< AQUI ESTÁ A MUDANÇA: DIV PARA COLOCAR PREÇO E BOTÃO EM COLUNA >>>>> */}
                                    <div className="mt-4 md:mt-0 md:ml-4 text-right flex-shrink-0 flex flex-col items-end">
                                        {/* Preço com Background Amarelo Claro e Fonte Cinza Escuro */}
                                        <p className="inline-block bg-yellow-100 text-gray-800 font-bold text-2xl px-3 py-1 rounded-lg mb-2 shadow-sm">
                                            R$ {room.price.toFixed(2).replace('.', ',')}
                                        </p>
                                        {/* Botão "Reservar" agora abaixo do preço (devido ao flex-col e items-end) */}
                                        <button
                                            onClick={() => navigate(`/payment?type=hotel&id=${hotel.id}&subitem=${encodeURIComponent(room.type)}`)}
                                            className="reservation-button bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition shadow mt-2" 
                                        >
                                            Reservar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Seção de Avaliações (Feedbacks) - Carrossel abaixo de Opções de Quartos */}
                {hotel.feedbacks && hotel.feedbacks.length > 0 && (
                    <div className="mb-8">
                        <h2 className="inline-block bg-yellow-400 text-gray-800 text-2xl font-bold py-2 px-4 rounded-lg mb-4 shadow-md">
                            O que os hóspedes dizem
                        </h2>
                        <Slider {...sliderSettings}>
                            {hotel.feedbacks.map(feedback => (
                                <div key={feedback.id} className="p-2">
                                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm h-full flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center mb-3">
                                                <RatingDisplay rating={feedback.rating} />
                                                <span className="ml-auto text-sm font-semibold text-gray-700">{feedback.guestName}</span>
                                            </div>
                                            <p className="text-gray-600 italic text-base">"{feedback.comment}"</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <ImageModal
                    images={modalImages}
                    initialImageId={initialImageId}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default HotelDetailsPage;