import React, { useState } from 'react';
import ImageModal from './ImageModal';

// Ícones SVG para comodidades (mantidos)
const Icons = {
  TotalRooms: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
  TotalBathrooms: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M11 15v2m1-2v2m-1-5v2m1-2v2m-4-2v2m1-2v2m-4-2v2m1-2v2M4 7h16" /></svg>,
  Parking: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.09 1.5H21m-4 0l-3 6m0 0l-4.5 1.5M14 14l-4.5 1.5M14 14l-.09 1.5M17 17H7l-.09 1.5H21m-4 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" /></svg>,
  Elevator: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
  Restaurant: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" /></svg>,
  Wifi: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l1.293-1.293a1 1 0 01.707-.293H15a1 1 0 01.707.293l1.293 1.293H20a1 1 0 011 1v4a1 1 0 01-1 1h-1.414l-1.293 1.293a1 1 0 01-.707.293H9a1 1 0 01-.707-.293L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v.01M12 8v.01M12 12v.01M12 16v.01" /></svg>,
  Pool: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292V15m0 0v2m0-2a4 4 0 100 0m0 0a4 4 0 110 0" /></svg>,
  Gym: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  ArtRoom: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M4 8h16M4 16h16M11 4h2M11 20h2M12 12h.01M12 12v.01M8 12h.01M8 12v.01M16 12h.01M16 12v.01" /></svg>,
  Garden: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M4 8h16M4 16h16M11 4h2M11 20h2M12 12h.01M12 12v.01M8 12h.01M8 12v.01M16 12h.01M16 12v.01" /></svg>,
  Cinema: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M4 8h16M4 16h16M11 4h2M11 20h2M12 12h.01M12 12v.01M8 12h.01M8 12v.01M16 12h.01M16 12v.01" /></svg>,
  Sauna: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Spa: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Bar: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" /></svg>,
  Saloon: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h2a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2m4-12h6m-6 4h6m-6 4h6m0 0V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v3m10-5V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2m4-12h6m-6 4h6m-6 4h6m0 0V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v3" /></svg>,
  KidsArea: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2h3a2 2 0 002-2V6zm0 0a2 2 0 012 2h3a2 2 0 012 2v4a2 2 0 01-2 2h-3a2 2 0 01-2-2V6zm-7 4h14a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2z" /></svg>,
  Lounge: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5a2 2 0 00-2 2v2a2 2 0 002 2h14a2 2 0 002-2v-2a2 2 0 00-2-2z" /></svg>,
};

// Adicione onReserveRoom como uma prop
function HotelDetailsPage({ hotel, onBack, onReserveRoom }) {
  // Estados para o modal de imagens
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [initialImageId, setInitialImageId] = useState(null);

  // Mapeamento de nomes de comodidades para componentes de ícone
  const leisureIconMap = {
    'Piscina': Icons.Pool,
    'Jaguzza': Icons.Spa,
    'Academia': Icons.Gym,
    'Spa': Icons.Spa,
    'Sauna': Icons.Sauna,
    'Bar na piscina': Icons.Bar,
    'Salão de Jogos': Icons.Saloon,
    'Piscina Aquecida': Icons.Pool,
    'Lareira Comunal': Icons.Lounge,
    'Jardim Amplo': Icons.Garden,
    'Trilhas': Icons.Garden,
    'Piscina natural': Icons.Pool,
    'Redário': Icons.Lounge, // Redário mapeado para Lounge
    'Salão de Eventos': Icons.Saloon,
    'Área Kids': Icons.KidsArea,
    'Sala de Artes': Icons.ArtRoom,
    'Sala de Cinema': Icons.Cinema,
    'Bar': Icons.Bar,
  };

  if (!hotel) {
    return (
      <div className="container mx-auto py-8 px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Hotel não encontrado.</h2>
        <button
          onClick={onBack}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Voltar para Hotéis
        </button>
      </div>
    );
  }

  // Função para abrir o modal de imagem
  const handleImageClick = (imagesArray, clickedImageId) => {
    setModalImages(imagesArray);
    setInitialImageId(clickedImageId);
    setIsModalOpen(true);
  };

  // Função para fechar o modal de imagem
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalImages([]);
    setInitialImageId(null);
  };

  return (
    <div className="container mx-auto py-8 px-6">
      <button
        onClick={onBack}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-8 transition duration-300"
      >
        ← Voltar para Hotéis
      </button>

      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Imagem Principal do Hotel - Clicável para abrir modal */}
        <img
          src={hotel.mainImageUrl}
          alt={hotel.title}
          className="w-full h-96 object-cover rounded-lg mb-6 cursor-pointer"
          onClick={() => handleImageClick(hotel.galleryImages || [], hotel.galleryImages?.[0]?.id)}
        />
        <h1 className="text-4xl font-extrabold text-blue-800 mb-2">{hotel.title}</h1>
        <p className="text-gray-400 text-lg mb-4">{hotel.location}</p>
        <p className="text-gray-700 leading-relaxed mb-8">{hotel.description}</p>

        {/* Galeria de Imagens do Hotel - AGORA CLICÁVEL */}
        {hotel.galleryImages && hotel.galleryImages.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Galeria</h2>
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

        {/* Informações Gerais do Hotel */}
        <div className="mb-8 bgHotelDetails1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Comodidades e Estrutura</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 ">
            {hotel.totalRooms && (
              <p className="flex items-center"><Icons.TotalRooms />Total de Quartos: <span className="font-semibold ml-1">{hotel.totalRooms}</span></p>
            )}
            {hotel.totalBathrooms && (
              <p className="flex items-center"><Icons.TotalBathrooms />Total de Banheiros: <span className="font-semibold ml-1">{hotel.totalBathrooms}</span></p>
            )}
            {hotel.elevators && (
              <p className="flex items-center"><Icons.Elevator />Elevadores: <span className="font-semibold ml-1">{hotel.elevators}</span></p>
            )}
            {hotel.parking !== undefined && (
              <p className="flex items-center"><Icons.Parking />Estacionamento: <span className="font-semibold ml-1">{hotel.parking ? 'Disponível' : 'Não Disponível'}</span></p>
            )}
            {hotel.hasRestaurant !== undefined && (
              <p className="flex items-center"><Icons.Restaurant />Restaurante: <span className="font-semibold ml-1">{hotel.hasRestaurant ? 'Sim' : 'Não'}</span></p>
            )}
            {hotel.hasWifi !== undefined && (
              <p className="flex items-center"><Icons.Wifi />Wi-Fi: <span className="font-semibold ml-1">{hotel.hasWifi ? 'Disponível' : 'Não Disponível'}</span></p>
            )}
          </div>
        </div>

        {/* Facilidades de Lazer */}
        {hotel.leisureFacilities && hotel.leisureFacilities.length > 0 && (
          <div className="mb-8 bgHotelDetails2">

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Lazer e Entretenimento</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-700 ">
              {hotel.leisureFacilities.map((facility, index) => {
                const IconComponent = leisureIconMap[facility];
                return (
                  <p key={index} className="flex items-center">
                    {IconComponent ? <IconComponent /> : <span className="w-5 h-5 mr-2"></span>}
                    {facility}
                  </p>
                );
              })}
            </div>
          </div>
        )}

        {/* Opções de Quartos e Preços */}
        {hotel.roomOptions && hotel.roomOptions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Opções de Quartos</h2>
            <div className="space-y-6">
              {hotel.roomOptions.map((room, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{room.type}</h3>
                    <p className="text-gray-600 text-sm mb-2">{room.description}</p>
                    <p className="text-gray-700 text-sm">
                      Capacidade: {room.minCapacity || 1} - {room.capacity} {room.capacity > 1 ? 'pessoas' : 'pessoa'}
                    </p>
                    {room.beds && (
                      <p className="text-gray-700 text-sm">Camas: {room.beds}</p>
                    )}
                    {room.bathrooms && (
                      <p className="text-gray-700 text-sm">Banheiros: {room.bathrooms}</p>
                    )}
                    {room.available !== undefined && (
                      <p className="text-gray-700 text-sm">
                        Disponíveis: {room.available} {room.available === 1 ? 'quarto' : 'quartos'}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-4 text-right">
                    <p className=" pHotelDetails text-2xl font-bold text-green-600 mb-2">R$ {room.price.toFixed(2).replace('.', ',')}</p>
                    {/* Botão Reservar */}
                    <button 
                      onClick={() => onReserveRoom(hotel, room)} // CHAMA onReserveRoom com hotel e quarto
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 reservation-button"
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Link para o Mapa (opcional) */}
        {hotel.mapUrl && (
          <div className="text-center mt-8">
            <a
              href={hotel.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline text-lg font-semibold"
            >
              Ver localização no mapa
            </a>
          </div>
        )}
      </div>

      {/* === MODAL DE IMAGENS === */}
      {isModalOpen && (
        <ImageModal
          images={modalImages}
          initialImageId={initialImageId}
          onClose={handleCloseModal}
        />
      )}
      {/* ======================= */}
    </div>
  );
}

export default HotelDetailsPage;