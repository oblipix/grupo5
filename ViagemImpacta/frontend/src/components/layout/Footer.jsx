import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useHotels } from '../hooks/useHotels';


// Importe os ícones das redes sociais
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
    FaYoutube,
    FaMapMarkerAlt,
    FaEnvelope,
    FaPhone
} from 'react-icons/fa';

// As configurações do mapa continuam aqui, pois são específicas do Footer
const mapContainerStyle = { width: '100%', height: '150px', borderRadius: '0.75rem' };
const defaultCenter = { lat: -14.2350, lng: -51.9253 };
const mapOptions = { disableDefaultUI: true, gestureHandling: 'none', zoomControl: false };
const createMarkerIcon = (color) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>`)}`;

function Footer({ isLoaded }) {
    // Usar o hook useHotels para carregar hotéis do banco de dados
    const { hotels, loading, loadAllHotels } = useHotels();

    // Carregar hotéis quando o componente for montado
    useEffect(() => {
        loadAllHotels();
    }, [loadAllHotels]);

    return (
        <footer className="relative w-full bg-gradient-to-b from-slate-900 to-slate-800 text-gray-300 py-12 mt-8 shadow-lg z-10">
            {/* Elemento específico para a curva com destaque */}
            <div className="footer-curve absolute top-0 left-0 w-full h-5"></div>
            <div className="container mx-auto px-4 sm:px-6 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <span className="logo text-white text-4xl font-bold mb-2">Tripz</span>
                        <p className="text-sm text-gray-300 mt-2 max-w-xs">Sua jornada dos sonhos começa aqui. Explore destinos incríveis e crie memórias inesquecíveis.</p>
                        {/* Ícones de redes sociais */}
                        <div className="flex space-x-4 mt-6">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-900 hover:bg-blue-600 text-white p-2 rounded-full transition-all transform hover:scale-110">
                                <FaFacebookF className="h-5 w-5" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-pink-900 hover:bg-pink-600 text-white p-2 rounded-full transition-all transform hover:scale-110">
                                <FaInstagram className="h-5 w-5" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-blue-800 hover:bg-blue-500 text-white p-2 rounded-full transition-all transform hover:scale-110">
                                <FaTwitter className="h-5 w-5" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-indigo-900 hover:bg-indigo-600 text-white p-2 rounded-full transition-all transform hover:scale-110">
                                <FaLinkedinIn className="h-5 w-5" />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-red-900 hover:bg-red-600 text-white p-2 rounded-full transition-all transform hover:scale-110">
                                <FaYoutube className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links de Navegação */}
                    <div>
                        <h4 className="font-semibold text-white text-lg tracking-wider mb-6 border-b border-blue-400 pb-2 inline-block">Navegação</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/hoteis" className="group flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 group-hover:w-2 transition-all"></span>
                                    Hotéis
                                </Link>
                            </li>
                            {/* Link para a página de promoções */}
                            <li>
                                <Link to="/promocoes" className="group flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 group-hover:w-2 transition-all"></span>
                                    Promoções
                                </Link>
                            </li>
                                <li>
                                <Link to="/minhas-viagens" className="group flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 group-hover:w-2 transition-all"></span>
                                    Minhas Viagens
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Links da Empresa */}
                    <div>
                        <h4 className="font-semibold text-white text-lg tracking-wider mb-6 border-b border-blue-400 pb-2 inline-block">Empresa</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/institucional" className="group flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 group-hover:w-2 transition-all"></span>
                                    Sobre Nós
                                </Link>
                            </li>
                            {/* <<<<<<<<<<<< MANTER AQUI: LINK PARA A SEÇÃO DO BLOG NA HOME >>>>>>>>>>>> */}
                            <li>
                                <Link to="/#dicas-de-viagem" className="group flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 group-hover:w-2 transition-all"></span>
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link to="/contato" className="group flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 group-hover:w-2 transition-all"></span>
                                    Contato
                                </Link>
                            </li>
                            <li>
                                <Link to="/termos" className="group flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 group-hover:w-2 transition-all"></span>
                                    Termos de Uso
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Onde Estamos - Mapa no Footer */}
                    <div>
                        <h4 className="font-semibold text-white text-lg tracking-wider mb-6 border-b border-blue-400 pb-2 inline-block">Nossa Localização</h4>
                        <div className="rounded-lg overflow-hidden">
                            {isLoaded && !loading && hotels.length > 0 ? (
                                <GoogleMap mapContainerStyle={mapContainerStyle} center={defaultCenter} zoom={3.5} options={mapOptions}>
                                    {hotels.map(hotel => (
                                        <Marker
                                            key={hotel.id}
                                            position={{ lat: hotel.lat, lng: hotel.lng }}
                                            icon={{
                                                url: createMarkerIcon(hotel.markerColor || '#60A5FA'),
                                                scaledSize: new window.google.maps.Size(24, 24),
                                                anchor: new window.google.maps.Point(12, 24),
                                            }}
                                        />
                                    ))}
                                </GoogleMap>
                            ) : (
                                <div className="bg-gradient-to-r from-slate-800 to-slate-700 w-full h-[150px] flex items-center justify-center text-sm rounded-lg">
                                    <div className="animate-pulse flex flex-col items-center">
                                        <div className="w-10 h-10 bg-blue-500/30 rounded-full mb-2"></div>
                                        <div className="text-blue-300">Carregando mapa...</div>
                                    </div>
                                </div>
                            )}
                            {/* Informações de contato */}
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center text-gray-300">
                                    <FaMapMarkerAlt className="text-blue-400 mr-2" />
                                    <span>Av. Boa Viagem, 1000 - Recife, PE</span>
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <FaEnvelope className="text-blue-400 mr-2" />
                                    <span>contato@tripz.com</span>
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <FaPhone className="text-blue-400 mr-2" />
                                    <span>(81) 4005-8181</span>
                                </div>
                                <Link to="/contato" className="mt-3 inline-block bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all text-sm">
                                    Ver página de contato
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Direitos Autorais e Links Legais */}
                <div className="mt-12 pt-6 border-t border-blue-900/50 text-center text-sm text-gray-400">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            <span className="text-blue-400 font-semibold mr-2">©</span> 
                            <span>{new Date().getFullYear()} Tripz. Todos os direitos reservados.</span>
                        </div>
                        <div className="flex items-center space-x-6">
                            <Link to="/privacidade" className="hover:text-blue-400 transition-colors flex items-center">
                                <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                                Política de Privacidade
                            </Link>
                            <a href="#top" className="text-blue-400 hover:text-white transition-all transform hover:translate-y-[-3px]">
                                ↑ Topo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
 