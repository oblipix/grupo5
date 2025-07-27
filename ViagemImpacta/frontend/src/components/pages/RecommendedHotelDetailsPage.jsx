// src/pages/RecommendedHotelDetailsPage.jsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allHotelsData } from '../data/hotels.js';
import { Icons } from '../layout/Icons.jsx'; // Certifique-se de que o caminho esteja correto
import ImageModal from '../common/ImageModal.jsx'; // Importe o modal de imagens

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
    'Salão de Jogos': Icons.Saloon,
    'Piscina Aquecida': Icons.Pool,
    'Lareira Comunal': Icons.Lounge,
    'Jardim Amplo': Icons.Garden,
    'Trilhas': Icons.Garden,
    'Bar': Icons.Bar,
    'Jaguzza': Icons.Spa,
    'Redário': Icons.Lounge,
    'Bar na piscina': Icons.Bar,
    'Salão de Eventos': Icons.Saloon,
    'Área Kids': Icons.KidsArea,
    'Wi-Fi Grátis': Icons.Wifi,
    'Estacionamento': Icons.Parking,
    'Restaurante': Icons.Restaurant
};

function RecommendedHotelDetailsPage() {
    const { hotelId } = useParams();
    const navigate = useNavigate();
    const hotel = allHotelsData.find(h => h.id === parseInt(hotelId));

    // Estado para controlar o modal de imagens
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImages, setModalImages] = useState([]);
    const [initialImageId, setInitialImageId] = useState(null);

    if (!hotel) {
        return (
            <div className="container mx-auto py-8 px-6 text-center">
                <h2 className="text-2xl font-bold">Hotel não encontrado.</h2>
                <button onClick={() => navigate('/')} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md">
                    Voltar para a Home
                </button>
            </div>
        );
    }

    const handleImageClick = (imagesArray, clickedImageId) => {
        setModalImages(imagesArray);
        setInitialImageId(clickedImageId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto py-8 px-6">
                <button onClick={() => navigate(-1)} className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded mb-8">
                    &larr; Voltar
                </button>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden p-8">
                    {/* Imagem Principal */}
                    <img
                        src={hotel.mainImageUrl}
                        alt={hotel.title}
                        className="w-full h-96 object-cover rounded-lg mb-6 cursor-pointer"
                        onClick={() => handleImageClick(hotel.galleryImages || [], hotel.galleryImages?.[0]?.id)}
                    />

                    {/* Galeria de Miniaturas */}
                    {hotel.galleryImages && hotel.galleryImages.length > 0 && (
                        <div className="mb-8">
                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {hotel.galleryImages.slice(0, 6).map(img => ( // Mostra até 6 miniaturas
                                    <img
                                        key={img.id}
                                        src={img.url}
                                        alt={img.alt}
                                        className="w-full h-24 object-cover rounded-lg shadow-sm cursor-pointer hover:opacity-80 transition"
                                        onClick={() => handleImageClick(hotel.galleryImages, img.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="text-center mb-8 border-t pt-8">
                        <span className="bg-yellow-400 text-yellow-900 text-sm font-bold mr-3 px-3 py-1 rounded-full uppercase">★ Recomendado pelos Viajantes ★</span>
                        <h1 className="text-4xl font-extrabold text-blue-800 mt-4">{hotel.title}</h1>
                        <p className="text-gray-500 text-lg">{hotel.location}</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">O que o hotel oferece</h2>
                            <div className="grid grid-cols-2 gap-4 text-gray-700">
                                {hotel.leisureFacilities.map((facility, index) => {
                                    const IconComponent = leisureIconMap[facility];
                                    return (
                                        <div key={index} className="flex items-center">
                                            {IconComponent ? <IconComponent /> : <span className="w-5 h-5 mr-2"></span>}
                                            <span>{facility}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">O que os hóspedes dizem</h2>
                            <div className="flex items-center justify-center bg-blue-100 p-4 rounded-lg mb-6">
                                <span className="text-5xl font-black text-blue-600">{hotel.rating.toFixed(1)}</span>
                                <div className="ml-4 text-left">
                                    <span className="block font-bold text-lg text-blue-800">Excelente</span>
                                    <span className="text-sm text-gray-600">Baseado em {hotel.feedbacks.length} avaliações</span>
                                </div>
                            </div>
                            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                                {hotel.feedbacks.map(feedback => (
                                    <div key={feedback.id} className="border-t pt-4">
                                        <div className="flex items-center mb-1">
                                            <RatingDisplay rating={feedback.rating} />
                                            <span className="ml-auto text-xs font-semibold text-gray-600">{feedback.guestName}</span>
                                        </div>
                                        <p className="text-gray-600 italic text-sm">"{feedback.comment}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
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

export default RecommendedHotelDetailsPage;
