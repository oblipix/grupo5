// src/components/Footer.js
import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '150px',
  borderRadius: '0.5rem',
};

const hotelLocations = [
    { id: 1, position: { lat: -22.9068, lng: -43.1729 }, color: '#EF4444' },
    { id: 2, position: { lat: -29.3797, lng: -50.8732 }, color: '#3B82F6' },
    { id: 3, position: { lat: -8.0578,  lng: -34.8820 }, color: '#22C55E' },
    { id: 4, position: { lat: -8.8913,  lng: -36.4942 }, color: '#A855F7' },
    { id: 5, position: { lat: -15.7797, lng: -47.9297 }, color: '#EAB308' },
    { id: 6, position: { lat: -19.9190, lng: -43.9388 }, color: '#F97316' }
];

const defaultCenter = { lat: -14.2350, lng: -51.9253 };

const mapOptions = {
    disableDefaultUI: true,
    gestureHandling: 'none',
    zoomControl: false,
    scrollwheel: false,
    draggable: false,
};

const createMarkerIcon = (color) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

function Footer({ 
    isLoaded,
    onNavigateToHotels,
    onSelectPromos,
    onNavigateToEvents,
    onNavigateToMyTravels,
    onNavigateToInstitutional,
    onNavigateToBlog,
}) {

  const handleNavClick = (e, navFunction) => {
    e.preventDefault();
    if (navFunction) {
      navFunction();
    }
  };

  return (
    // ✅ AQUI A MÁGICA ACONTECE: adicionamos 'relative' e a nova classe 'footer-curve'
    <footer className="relative footer-curve w-full bg-slate-900 text-gray-300 py-12 mt-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="logo text-white text-3xl font-bold">Tripz</span>
            <p className="text-sm text-gray-400 mt-2 max-w-xs">Sua jornada dos sonhos começa aqui. Explore, descubra e viva experiências inesquecíveis.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#/" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" /></svg></a>
              <a href="#/" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919-4.919 1.266-.057 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" /></svg></a>
              <a href="#/" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.299 1.634 4.212 3.791 4.649-.69.188-1.433.23-2.187.085.606 1.885 2.364 3.264 4.448 3.303-1.791 1.398-4.062 2.186-6.514 2.186-1.125 0-2.23-.066-3.313-.195 2.308 1.486 5.062 2.35 8.04 2.35 8.995 0 13.91-7.456 13.91-13.91 0-.213-.005-.426-.014-.637.957-.692 1.789-1.56 2.436-2.525z" /></svg></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white tracking-wider mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li><a href="#/" onClick={(e) => handleNavClick(e, onNavigateToHotels)} className="hover:text-white transition-colors">Hotéis</a></li>
              <li><a href="#/" onClick={(e) => handleNavClick(e, onSelectPromos)} className="hover:text-white transition-colors">Promoções</a></li>
              <li><a href="#/" onClick={(e) => handleNavClick(e, onNavigateToEvents)} className="hover:text-white transition-colors">Eventos</a></li>
              <li><a href="#/" onClick={(e) => handleNavClick(e, onNavigateToMyTravels)} className="hover:text-white transition-colors">Minhas Viagens</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white tracking-wider mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li><a href="#/" onClick={(e) => handleNavClick(e, onNavigateToInstitutional)} className="hover:text-white transition-colors">Sobre Nós (Institucional)</a></li>
              <li><a href="#/" onClick={(e) => handleNavClick(e, onNavigateToBlog)} className="hover:text-white transition-colors">Dicas de Viagem (Blog)</a></li>
              <li><a href="#/" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white tracking-wider mb-4">Onde Estamos</h4>
            <div className="rounded-lg overflow-hidden">
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={defaultCenter}
                  zoom={3.5}
                  options={mapOptions}
                >
                  {hotelLocations.map(loc => (
                    <Marker
                      key={loc.id}
                      position={loc.position}
                      icon={{
                          url: createMarkerIcon(loc.color),
                          scaledSize: new window.google.maps.Size(24, 24),
                          anchor: new window.google.maps.Point(12, 24),
                      }}
                    />
                  ))}
                </GoogleMap>
              ) : (
                <div className="bg-slate-800 w-full h-[150px] flex items-center justify-center text-sm rounded-lg">
                  Carregando mapa...
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-sm text-gray-400 sm:flex sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Tripz. Todos os direitos reservados.</p>
          <div className="flex justify-center space-x-4 mt-4 sm:mt-0">
            <a href="#/" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#/" className="hover:text-white transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;