import React from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { hotelLocations } from '../data/mapLocations';

// Importe os ícones das redes sociais
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
    FaYoutube
} from 'react-icons/fa';

// As configurações do mapa continuam aqui, pois são específicas do Footer
const mapContainerStyle = { width: '100%', height: '150px', borderRadius: '0.5rem' };
const defaultCenter = { lat: -14.2350, lng: -51.9253 };
const mapOptions = { disableDefaultUI: true, gestureHandling: 'none', zoomControl: false };
const createMarkerIcon = (color) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>`)}`;

function Footer({ isLoaded }) {
    return (
        <footer className="relative footer-curve w-full bg-slate-900 text-gray-300 py-12 mt-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <span className="logo text-white text-3xl font-bold">Tripz</span>
                        <p className="text-sm text-gray-400 mt-2 max-w-xs">Sua jornada dos sonhos começa aqui.</p>
                        {/* Ícones de redes sociais */}
                        <div className="flex space-x-4 mt-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                                <FaFacebookF className="h-6 w-6" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors">
                                <FaInstagram className="h-6 w-6" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                                <FaTwitter className="h-6 w-6" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors">
                                <FaLinkedinIn className="h-6 w-6" />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-colors">
                                <FaYoutube className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    {/* Links de Navegação */}
                    <div>
                        <h4 className="font-semibold text-white tracking-wider mb-4">Navegação</h4>
                        <ul className="space-y-2">
                            <li><Link to="/hoteis" className="hover:text-white transition-colors">Hotéis</Link></li>
                            {/* Link para a seção de promoções na Home */}
                            <li><Link to="/#viagens-promocao" className="hover:text-white transition-colors">Promoções</Link></li>
                            <li><Link to="/evento" className="hover:text-white transition-colors">Eventos</Link></li>
                            <li><Link to="/minhas-viagens" className="hover:text-white transition-colors">Minhas Viagens</Link></li>
                        </ul>
                    </div>

                    {/* Links da Empresa */}
                    <div>
                        <h4 className="font-semibold text-white tracking-wider mb-4">Empresa</h4>
                        <ul className="space-y-2">
                            <li><Link to="/institucional" className="hover:text-white transition-colors">Sobre Nós</Link></li>
                            {/* <<<<<<<<<<<< MANTER AQUI: LINK PARA A SEÇÃO DO BLOG NA HOME >>>>>>>>>>>> */}
                            <li><Link to="/#dicas-de-viagem" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link to="/contato" className="hover:text-white transition-colors">Contato</Link></li>
                        </ul>
                    </div>

                    {/* Onde Estamos - Mapa no Footer */}
                    <div>
                        <h4 className="font-semibold text-white tracking-wider mb-4">Nossa Localização</h4>
                        <div className="rounded-lg overflow-hidden">
                            {isLoaded ? (
                                <GoogleMap mapContainerStyle={mapContainerStyle} center={defaultCenter} zoom={3.5} options={mapOptions}>
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
                            {/* Adicionar um link para a página de contato com o mapa maior */}
                            <Link to="/contato" className="block text-center mt-2 text-blue-400 hover:underline text-sm">
                                Ver mapa completo na página de Contato
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Direitos Autorais e Links Legais */}
                <div className="mt-10 pt-6 border-t border-slate-800 text-center text-sm text-gray-400 sm:flex sm:justify-between">
                    <p>© {new Date().getFullYear()} Tripz. Todos os direitos reservados.</p>
                    <div className="flex justify-center space-x-4 mt-4 sm:mt-0">
                        <Link to="/termos" className="hover:text-white transition-colors">Termos de Uso</Link>
                        <Link to="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;