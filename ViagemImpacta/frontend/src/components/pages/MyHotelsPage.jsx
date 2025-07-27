// src/pages/MyHotelsPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import HotelCard from '../hotels/HotelCard.jsx'; // Usando o card unificado  
// 1. Importe o UserSettingsModal do seu novo arquivo de componente
import UserSettingsModal from '../common/UserSettingsModal.jsx';

function MyHotelsPage() {
    const navigate = useNavigate();
    const { 
        currentUser, 
        isLoggedIn,
        savedHotels, 
        visitedHotels,
        removeSavedHotel
    } = useAuth();
    
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    if (!currentUser) {
        return <div className="text-center p-10">Carregando dados...</div>;
    }

    return (
        <section className="my-hotels-page bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto px-6">
                <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img src={currentUser.avatar} alt="Avatar do Usuário" className="w-16 h-16 rounded-full object-cover border-2 border-blue-500" />
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Olá, {currentUser.name}!</h2>
                            <p className="text-gray-600 text-sm">Sua experiência em Hotéis.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsSettingsModalOpen(true)}
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                        aria-label="Configurações do Usuário"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </button>
                </div>

                {/* Seção Hotéis Visitados */}
                <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-8">Hotéis Visitados</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {visitedHotels?.length > 0 ? (
                        visitedHotels.map(hotel => <HotelCard key={hotel.id} hotel={hotel} />)
                    ) : (
                        <p className="text-gray-600 text-center col-span-full">Nenhum hotel visitado ainda.</p>
                    )}
                </div>

                {/* Seção Lista de Desejo de Hotéis */}
                <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-12">Sua Lista de Desejos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {savedHotels?.length > 0 ? (
                        savedHotels.map(hotel => (
                            <div key={hotel.id} className="relative group">
                                <HotelCard hotel={hotel} />
                                <button
                                    onClick={() => removeSavedHotel(hotel.id)}
                                    className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Remover da lista de desejos"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 text-center col-span-full">Sua lista de desejos está vazia.</p>
                    )}
                </div>
            </div>

            {/* 2. O modal é renderizado aqui e recebe as props para controle */}
            <UserSettingsModal
                isOpen={isSettingsModalOpen}
                onClose={() => setIsSettingsModalOpen(false)}
            />
        </section>
    );
}

// 3. REMOVIDO: A definição duplicada de UserSettingsModal foi removida daqui.

export default MyHotelsPage;
