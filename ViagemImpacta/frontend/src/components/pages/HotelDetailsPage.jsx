import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHotels } from '../hooks/useHotels.js';
import { useAuth } from '../context/AuthContext.jsx';
import ImageModal from '../common/ImageModal.jsx';
import ReservationModal from '../modals/ReservationModal.jsx';
import { Icons } from '../layout/Icons.jsx'; // Importando os ícones centralizados
import '../styles/HotelDetailsPage.css'; // Importando o CSS específico para esta página
 
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
 
// Componente personalizado para ícone de xícara (café/restaurante)
const CoffeeIcon = () => (
    <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 8h1a4 4 0 110 8h-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 1v3M10 1v3M14 1v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Componente personalizado para ícone de vassoura (serviço de quarto/limpeza)
const BroomIcon = () => (
    <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 22h14M12 18v4M5 9l7-7 7 7M9 9v4m6-4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 13h8v5a2 2 0 01-2 2h-4a2 2 0 01-2-2v-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Componente personalizado para ícone de flor (jardim)
const FlowerIcon = () => (
    <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4C12 4 9 1 4 1C4 6 6 9 6 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 4C12 4 15 1 20 1C20 6 18 9 18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 4C12 4 9 7 9 12C4 12 1 15 1 20C6 20 9 18 9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 4C12 4 15 7 15 12C20 12 23 15 23 20C18 20 15 18 15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 4V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Componente personalizado para ícone de pet (pet friendly)
const PetIcon = () => (
    <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 9.5C8.1 9.5 9 8.6 9 7.5C9 6.4 8.1 5.5 7 5.5C5.9 5.5 5 6.4 5 7.5C5 8.6 5.9 9.5 7 9.5Z" stroke="currentColor" strokeWidth="2" />
        <path d="M17 9.5C18.1 9.5 19 8.6 19 7.5C19 6.4 18.1 5.5 17 5.5C15.9 5.5 15 6.4 15 7.5C15 8.6 15.9 9.5 17 9.5Z" stroke="currentColor" strokeWidth="2" />
        <path d="M7 19.5C8.1 19.5 9 18.6 9 17.5C9 16.4 8.1 15.5 7 15.5C5.9 15.5 5 16.4 5 17.5C5 18.6 5.9 19.5 7 19.5Z" stroke="currentColor" strokeWidth="2" />
        <path d="M17 19.5C18.1 19.5 19 18.6 19 17.5C19 16.4 18.1 15.5 17 15.5C15.9 15.5 15 16.4 15 17.5C15 18.6 15.9 19.5 17 19.5Z" stroke="currentColor" strokeWidth="2" />
    </svg>
);

// Mapeamento de nomes de comodidades para componentes de ícone
const leisureIconMap = {
    // Amenidades de lazer
    'Piscina': Icons.Pool,
    'Academia': Icons.Gym,
    'Spa': Icons.Spa,
    'Sauna': Icons.Sauna,
    'Sala de Cinema': Icons.Cinema,
    'Cinema': Icons.Cinema,
    'Teatro': Icons.Cinema,
    'Bar': Icons.Bar,
    'Bar na piscina': Icons.Bar,
    'Restaurante': CoffeeIcon, 
    'Jardim': FlowerIcon,
    'Jardim Amplo': FlowerIcon,
    'Salão de Jogos': Icons.Saloon,
    'Área Kids': Icons.KidsArea,
    'Piscina Aquecida': Icons.Pool,
    'Jacuzzi': Icons.Spa,
    'Área de Lazer': Icons.KidsArea,
    'Áreas Comuns': Icons.KidsArea,
    'Sala de Arte': Icons.ArtRoom,
    'Salão': Icons.Lounge,
    'Lounge': Icons.Lounge,
    'Sala de Reuniões': Icons.Lounge,
    'Business Center': Icons.Lounge,
    'Salão de Festas': Icons.Lounge,
    
    // Serviços
    'Wi-Fi Grátis': Icons.Wifi,
    'Wi-Fi': Icons.Wifi,
    'Internet': Icons.Wifi,
    'Estacionamento': Icons.TotalRooms, // Usando TotalRooms como ícone para estacionamento (parece com vagas de estacionamento)
    'Estacionamento Grátis': Icons.TotalRooms,
    'Serviço de Quarto': BroomIcon, 
    'Acessibilidade': Icons.User,
    'Pet Friendly': PetIcon,
    'Aceita Animais': PetIcon,
    'Aceita Pets': PetIcon,
    'Café da Manhã Incluso': CoffeeIcon, // Usando ícone de xícara para café da manhã
    'Café da Manhã': CoffeeIcon,
    'Recepção 24h': Icons.User,
    'Recepção': Icons.User,
    'Serviço de Limpeza': Icons.RoomType,
    'Limpeza diária': Icons.RoomType,
    'Elevador': Icons.Elevator,
    'Elevadores': Icons.Elevator,
    'Ar-Condicionado': Icons.Wifi,
    'Frigobar': Icons.Bar,
    'Cofre': Icons.RoomType,
    'Vista para o Mar': Icons.Location,
    'Serviço de Concierge': Icons.User,
    'Concierge': Icons.User,
    
    // Variações comuns
    'estacionamento': Icons.TotalRooms,
    'restaurante': CoffeeIcon,
    'quarto': Icons.RoomType,
    'serviço': BroomIcon,
    'cafe': CoffeeIcon,
    'café': CoffeeIcon,
    'jardim': FlowerIcon,
    'piscina': Icons.Pool,
    'wi-fi': Icons.Wifi,
    'wifi': Icons.Wifi,
    'pet': PetIcon,
    'animais': PetIcon
};
 
function HotelDetailsPage() {
    const { hotelId } = useParams();
    const navigate = useNavigate();
    const { getHotelById } = useHotels();
    const { isLoggedIn, currentUser } = useAuth();
   
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImages, setModalImages] = useState([]);
    const [initialImageId, setInitialImageId] = useState(null);
    
    // Estados para o modal de reserva
    const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
 
    useEffect(() => {
        const loadHotel = async () => {
            try {
                setLoading(true);
                const hotelData = await getHotelById(parseInt(hotelId));
                setHotel(hotelData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
 
        if (hotelId) {
            loadHotel();
        }
    }, [hotelId, getHotelById]);
 
    if (loading) {
        return (
            <div className="container mx-auto py-8 px-6 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Carregando hotel...</p>
            </div>
        );
    }
 
    if (error || !hotel) {
        return (
            <div className="container mx-auto py-8 px-6 text-center">
                <h2 className="text-2xl font-bold">Hotel não encontrado.</h2>
                <p className="text-gray-600 mb-4">{error}</p>
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

    // Funções para o modal de reserva
    const handleReserveRoom = (room) => {
        // Verifica se o usuário está logado
        if (!isLoggedIn) {
            alert('Você precisa estar logado para fazer uma reserva. Redirecionando para o login...');
            navigate('/login');
            return;
        }

        console.log('Selected room data:', room);
        console.log('Hotel data:', hotel);
        console.log('Current user:', currentUser);
        setSelectedRoom(room);
        setIsReservationModalOpen(true);
    };

    const handleCloseReservationModal = () => {
        setIsReservationModalOpen(false);
        setSelectedRoom(null);
    };

    const handleReservationSuccess = (reservation) => {
        alert(`Reserva criada com sucesso! ID: ${reservation.id}`);
        // Aqui você pode redirecionar para uma página de confirmação ou atualizar a UI
        console.log('Reserva criada:', reservation);
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
            <button onClick={() => navigate(-1)} className="main-action-button bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center mb-8">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Voltar
            </button>
 
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="relative">
                    <img
                        src={hotel.mainImageUrl}
                        alt={hotel.title}
                        className="w-full h-[500px] object-cover cursor-pointer"
                        onClick={() => handleImageClick(hotel.galleryImages || [], hotel.galleryImages?.[0]?.id)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                        <h1 className="text-white text-5xl font-extrabold mb-2 drop-shadow-lg">
                            {hotel.title}
                        </h1>
                        <p className="text-white text-xl mb-4 flex items-center">
                            <Icons.Location className="mr-2 h-5 w-5" />
                            <span>{hotel.location}</span>
                        </p>
                    </div>
                </div>
                
                <div className="p-8">
                    <div className="bg-blue-50 border-l-4 border-blue-600 text-gray-800 leading-relaxed p-6 rounded-r-lg mb-8 shadow-sm">
                        <h3 className="text-blue-800 font-semibold mb-2">Sobre o hotel</h3>
                        <p>{hotel.description}</p>
                    </div>
 
                    {hotel.galleryImages && hotel.galleryImages.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                Galeria de Fotos
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {hotel.galleryImages.map(img => (
                                    <div key={img.id} className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                        <img
                                            src={img.url}
                                            alt={img.alt}
                                            className="w-full h-40 object-cover cursor-pointer"
                                            onClick={() => handleImageClick(hotel.galleryImages, img.id)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
 
                    {/* Seção "O que o hotel oferece" com design melhorado */}
                    <div className="my-8 py-6 border-t border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            O que o hotel oferece
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
                            {hotel.leisureFacilities.map((facility, index) => {
                                // Logs para debug - ver no console quais facilidades estão sendo recebidas
                                console.log(`Facility: "${facility}"`, leisureIconMap[facility] ? "has icon" : "no icon");
                                
                                // Tenta encontrar o ícone pelo nome exato ou por uma variação comum
                                let IconComponent = leisureIconMap[facility];
                                
                                // Se não encontrar o ícone, escolhe um adequado baseado em palavras-chave
                                if (!IconComponent) {
                                    const facilityLower = facility.toLowerCase();
                                    if (facilityLower.includes('estacionamento')) IconComponent = Icons.TotalRooms;
                                    else if (facilityLower.includes('restaurante') || facilityLower.includes('refeição')) IconComponent = CoffeeIcon;
                                    else if (facilityLower.includes('café') || facilityLower.includes('cafe')) IconComponent = CoffeeIcon;
                                    else if (facilityLower.includes('serviço de quarto') || facilityLower.includes('limpeza')) IconComponent = BroomIcon;
                                    else if (facilityLower.includes('jardim') || facilityLower.includes('flor')) IconComponent = FlowerIcon;
                                    else if (facilityLower.includes('pet') || facilityLower.includes('animal') || facilityLower.includes('cachorro') || facilityLower.includes('gato')) IconComponent = PetIcon;
                                    else if (facilityLower.includes('quarto')) IconComponent = Icons.RoomType;
                                    else if (facilityLower.includes('piscina')) IconComponent = Icons.Pool;
                                    else if (facilityLower.includes('wi-fi') || facilityLower.includes('wifi') || facilityLower.includes('internet')) IconComponent = Icons.Wifi;
                                    else IconComponent = Icons.User; // Fallback padrão
                                }
                                
                                return (
                                    <div key={index} className="flex items-center bg-gray-100 border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-300">
                                        <IconComponent className="w-6 h-6 mr-3 text-blue-600" />
                                        <span className="font-medium">{facility}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
 
                    {hotel.roomOptions?.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                                </svg>
                                Opções de Quartos
                            </h2>
                            <div className="space-y-6">
                                {hotel.roomOptions.map((room, index) => (
                                    <div key={room.id || index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center group">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">{room.type}</h3>
                                            <p className="text-gray-600 text-sm mt-2">{room.description}</p>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                    Café da manhã
                                                </span>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                    Wi-Fi grátis
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-4 md:mt-0 md:ml-6 text-right flex flex-col items-end">
                                            <div className="bg-blue-600 text-white font-bold text-2xl px-4 py-2 rounded-xl mb-3 shadow-md">
                                                R$ {room.price.toFixed(2).replace('.', ',')}
                                            </div>
                                            <button
                                                onClick={() => handleReserveRoom(room)}
                                                className={`reservation-button font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
                                                    isLoggedIn 
                                                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                                        : 'bg-gray-400 hover:bg-gray-500 text-white'
                                                }`}
                                            >
                                                {isLoggedIn ? 'Reservar' : 'Fazer Login para Reservar'}
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
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                                </svg>
                                O que os hóspedes dizem
                            </h2>
                            <div className="bg-gray-50 rounded-2xl overflow-visible p-8">
                                <Slider {...sliderSettings}>
                                    {hotel.feedbacks.map(feedback => (
                                        <div key={feedback.id} className="p-4">
                                            <div className="feedback-bubble">
                                                <div>
                                                    <div className="flex items-center justify-between mb-4">
                                                        <RatingDisplay rating={feedback.rating} />
                                                        <span className="text-sm font-semibold text-gray-700 bg-blue-50 py-1 px-3 rounded-full">{feedback.guestName}</span>
                                                    </div>
                                                    <p className="text-gray-600 italic text-base">"{feedback.comment}"</p>
                                                </div>
                                                <div className="text-right mt-4">
                                                    <span className="text-xs text-gray-400">Data da estadia: Julho 2025</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    )}
                </div>
            </div>
 
            {isModalOpen && (
                <ImageModal
                    images={modalImages}
                    initialImageId={initialImageId}
                    onClose={handleCloseModal}
                />
            )}

            {isReservationModalOpen && selectedRoom && (
                <ReservationModal
                    isOpen={isReservationModalOpen}
                    onClose={handleCloseReservationModal}
                    hotel={hotel}
                    room={selectedRoom}
                    onSuccess={handleReservationSuccess}
                />
            )}
        </div>
    );
}
 
export default HotelDetailsPage;
