/* eslint-disable react-refresh/only-export-components */
// src/App.jsx

import React, { useEffect } from 'react'; // Importar useEffect
import { Outlet, useOutletContext, useLocation } from 'react-router-dom'; // Importar useLocation
import { useJsApiLoader } from '@react-google-maps/api';

import { useModal } from './components/context/ModalContext.jsx';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import EventReservationForm from './components/common/EventReservationForm.jsx';

const MAPS_API_KEY = import.meta.env.VITE_Maps_API_KEY;

function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: MAPS_API_KEY,
    libraries: ["places"],
  });

  const { isEventModalOpen, closeEventModal } = useModal();
  const location = useLocation(); // Hook para obter a localização atual

  // <<<<<<<<<<<< NOVO USE EFFECT PARA ROLAGEM DE ÂNCORAS >>>>>>>>>>>>
  useEffect(() => {
    if (location.hash) { // Se houver um hash na URL (ex: #promocoes-section)
      const element = document.getElementById(location.hash.substring(1)); // Pega o ID sem o '#'
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // Rola suavemente para o elemento
      }
    } else {
      // Se não houver hash e a rota mudou (ex: de /contato para /), rola para o topo da página
      // Isso evita que a página fique na rolagem anterior ao mudar de rota sem âncora.
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]); // Dependência: executa quando a localização (URL) muda


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <Outlet context={{ isLoaded }} />
      </main>
      
      <Footer isLoaded={isLoaded} />

      {isEventModalOpen && <EventReservationForm onClose={closeEventModal} />}
    </div>
  );
}

// Hook para que as páginas filhas possam acessar o contexto do Outlet
export function usePageContext() {
  return useOutletContext();
}

export default App;