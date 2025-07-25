import React, { useState } from 'react';
import TravelSection from './TravelSection'; // Reutilizamos TravelSection
import HotelCard from './HotelCard'; // Reutilizamos HotelCard
import UserSettingsModal from './UserSettingsModal'; // Importe o modal de configurações

// Dados de exemplo para hotéis visitados e lista de desejo
const visitedHotelsData = [
  { id: 1, mainImageUrl: 'https://picsum.photos/id/1000/800/600', title: 'Hotel Grandioso', description: 'Estadia de luxo inesquecível.', location: 'Paris, França', galleryImages: ['https://picsum.photos/id/1001/100/80'] },
  { id: 2, mainImageUrl: 'https://picsum.photos/id/1002/800/600', title: 'Pousada da Mata', description: 'Natureza exuberante e tranquilidade.', location: 'Bonito, Brasil', galleryImages: ['https://picsum.photos/id/1003/100/80'] },
];

const hotelWishlistData = [
  { id: 3, mainImageUrl: 'https://picsum.photos/id/1004/800/600', title: 'Resort Ilha Bela', description: 'Praias privativas e mergulho.', location: 'Maldivas', galleryImages: ['https://picsum.photos/id/1005/100/80'] },
  { id: 4, mainImageUrl: 'https://picsum.photos/id/1006/800/600', title: 'Hotel Urbano', description: 'Moderno e central, para explorar a cidade.', location: 'Nova York, EUA', galleryImages: ['https://picsum.photos/id/1007/100/80'] },
];

function MyHotelsPage({ userData, onSaveUserData }) { // Receberá userData e onSaveUserData do App.jsx
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  return (
    <section className="my-hotels-page bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-6">
        {/* Cabeçalho da Página do Cliente */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={userData.avatarUrl || 'https://picsum.photos/id/1005/100/100'} alt="Avatar do Usuário" className="w-16 h-16 rounded-full object-cover border-2 border-blue-500" />
            <div>
              <h2 className="text-xl font-bold text-gray-800">Olá, {userData.name || 'Cliente'}!</h2>
              <p className="text-gray-600 text-sm">Sua experiência em Hotéis.</p>
              <p className="text-gray-700 text-base">Tudo pronto para sua próxima estadia?</p>
            </div>
          </div>
          {/* Ícone de Configurações */}
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Configurações do Usuário"
          >
            <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.16-2.61-3.6-1.63L3.58 4.88c-1.52.99-1.89 2.98-.82 4.41l.98 1.48a1.53 1.53 0 002.32.22l2.36-1.57c.3-.2.66-.3.94-.38a8.88 8.88 0 003.54.49c.81.1 1.6.28 2.37.53.69.23 1.34.56 1.83.99l.13.1a.98.98 0 00.74-.23l1.83-1.83c.96-.96.22-2.58-.88-3.08l-1.57-.75c-.32-.15-.65-.25-1-.3zm-2.02 5.09a.75.75 0 011.06 0L12 10.94l1.47-1.47a.75.75 0 011.06 0l.75.75a.75.75 0 010 1.06L13.06 12l1.47 1.47a.75.75 0 010 1.06l-.75.75a.75.75 0 01-1.06 0L12 13.06l-1.47 1.47a.75.75 0 01-1.06 0l-.75-.75a.75.75 0 010-1.06L10.94 12l-1.47-1.47a.75.75 0 010-1.06zM12 1.5a10.5 10.5 0 100 21 10.5 10.5 0 000-21zM2.8 12a9.2 9.2 0 1118.4 0 9.2 9.2 0 01-18.4 0z" clipRule="evenodd"></path></svg>
          </button>
        </div>

        {/* Seção Hotéis Visitados */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-8">Hotéis Visitados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* 2 hotéis por página */}
          {visitedHotelsData.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
          {visitedHotelsData.length === 0 && (
            <p className="text-gray-600 text-center col-span-full">Nenhum hotel visitado ainda.</p>
          )}
        </div>

        {/* Seção Lista de Desejo de Hotéis */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-12">Lista de Desejo de Hotéis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* 2 hotéis por página */}
          {hotelWishlistData.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
          {hotelWishlistData.length === 0 && (
            <p className="text-gray-600 text-center col-span-full">Sua lista de desejos de hotéis está vazia.</p>
          )}
        </div>
      </div>

      {/* Renderiza o modal de configurações do usuário */}
      <UserSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        userData={userData} // Passa os dados atuais do usuário para o modal
        onSave={onSaveUserData} // Passa a função para salvar os dados atualizados
      />
    </section>
  );
}

export default MyHotelsPage;