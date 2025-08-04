/* eslint-disable react-refresh/only-export-components */
// src/App.jsx

import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { Outlet, useOutletContext, useLocation } from 'react-router-dom';
import { useJsApiLoader } from '@react-google-maps/api';

import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';

// Lazy loading do componente BackToTop otimizado
const LazyBackToTop = lazy(() => import('./components/common/OptimizedBackToTop.jsx'));

const MAPS_API_KEY = import.meta.env.VITE_Maps_API_KEY;

// <<<<<<<<<<<< SOLUÇÃO: MOVER A ARRAY 'LIBRARIES' PARA FORA DO COMPONENTE >>>>>>>>>>>>
const libraries = ["places"]; // Definida uma única vez, fora da função do componente

function App() {
  useEffect(() => {
    // Limpa apenas os dados de autenticação na primeira vez que o app é carregado
    if (!sessionStorage.getItem('alreadyInitialized')) {
      // Remove apenas os dados de autenticação, preservando outros dados do localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      sessionStorage.setItem('alreadyInitialized', 'true');
    }
  }, []);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: MAPS_API_KEY,
    libraries: libraries, // Agora passamos a constante definida acima
  });

  // FUNCIONALIDADE DE EVENTO MODAL COMENTADA
  // const { isEventModalOpen, closeEventModal } = useModal();
  const location = useLocation();
  const prevPathnameRef = useRef(location.pathname);

  useEffect(() => {
    // Só faz scroll se mudou a página (pathname), não apenas query params
    const pathnameChanged = prevPathnameRef.current !== location.pathname;
    
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (pathnameChanged) {
      // Só scroll para topo se mudou de página, não apenas filtros
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Atualiza pathname anterior
    prevPathnameRef.current = location.pathname;
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main id="top" className="flex-grow">
        <Outlet context={{ isLoaded }} />
      </main>

      <Footer isLoaded={isLoaded} />
      
      {/* Botão voltar ao topo com lazy loading */}
      <Suspense fallback={null}>
        <LazyBackToTop />
      </Suspense>
    </div>
  );
}

export function usePageContext() {
  return useOutletContext();
}

export default App;