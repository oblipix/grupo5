/* eslint-disable react-refresh/only-export-components */
// src/App.jsx

import React, { useEffect } from 'react';
import { Outlet, useOutletContext, useLocation } from 'react-router-dom';
import { useJsApiLoader } from '@react-google-maps/api';

import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';

const MAPS_API_KEY = import.meta.env.VITE_Maps_API_KEY;

// <<<<<<<<<<<< SOLUÇÃO: MOVER A ARRAY 'LIBRARIES' PARA FORA DO COMPONENTE >>>>>>>>>>>>
const libraries = ["places"]; // Definida uma única vez, fora da função do componente

function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: MAPS_API_KEY,
    libraries: libraries, // Agora passamos a constante definida acima
  });

  // FUNCIONALIDADE DE EVENTO MODAL COMENTADA
  // const { isEventModalOpen, closeEventModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main id="top" className="flex-grow">
        <Outlet context={{ isLoaded }} />
      </main>

      <Footer isLoaded={isLoaded} />
    </div>
  );
}

export function usePageContext() {
  return useOutletContext();
}

export default App;