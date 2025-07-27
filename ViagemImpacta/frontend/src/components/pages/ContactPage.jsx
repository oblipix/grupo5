/* eslint-disable no-unused-vars */
// src/components/pages/ContactPage.jsx
import React, { useState } from 'react';
import { GoogleMap, Marker } from "@react-google-maps/api";
// O caminho para hotelLocations DEVE ser './../data/mapLocations.js' ou '../../data/mapLocations.js'
// Depende de onde seu ContactPage.jsx está. Se está em src/components/pages/, então é "../../data/mapLocations.js"
import { hotelLocations } from "../data/mapLocations"; // Certifique-se de que o caminho está correto

// Importe usePageContext
import { usePageContext } from "../../App.jsx"; // Caminho correto para App.jsx

// Importe os ícones para contato e redes sociais
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
    FaYoutube
} from 'react-icons/fa';


// <<<<<<<<<<<< REUTILIZANDO CONFIGURAÇÕES DO MAPA DO FOOTER (com ajustes de altura) >>>>>>>>>>>>
const mapOptions = { disableDefaultUI: true, gestureHandling: 'greedy', zoomControl: true }; // Permite zoom e arrastar, mas sem UI padrão
const defaultCenter = { lat: -14.2350, lng: -51.9253 }; // Centro do Brasil para ver todos
const createMarkerIcon = (color) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>`)}`;

// Estilo específico para o mapa da página de Contato (maior)
const contactPageMapContainerStyle = { width: '100%', height: '450px', borderRadius: '0.75rem' }; // Aumentei a altura um pouco
// <<<<<<<<<<<< FIM DAS REUTILIZAÇÕES E AJUSTES >>>>>>>>>>>>


function ContactPage() {
    // Obtenha isLoaded do contexto do Outlet
    const { isLoaded } = usePageContext();

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!formData.name || !formData.email || !formData.message) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        // Simulação de envio
        console.log('Formulário de contato enviado:', formData);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000); // Resetar mensagem de sucesso
    };

    return (
        <div className="bg-gray-50 py-12 px-6">
            <div className="container mx-auto max-w-6xl">
                <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">
                    Fale Conosco
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Informações de Contato */}
                    <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">Estamos aqui para ajudar!</h2>
                            <p className="text-gray-600 mb-6">
                                Tem alguma pergunta, sugestão ou precisa de suporte? Entre em contato conosco pelos canais abaixo:
                            </p>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-center text-gray-700 text-lg">
                                    <EnvelopeIcon className="h-7 w-7 text-blue-600 mr-4" />
                                    <span>email@tripz.com.br</span>
                                </div>
                                <div className="flex items-center text-gray-700 text-lg">
                                    <PhoneIcon className="h-7 w-7 text-green-500 mr-4" />
                                    <span>+55 (XX) 9XXXX-XXXX</span>
                                </div>
                                <div className="flex items-start text-gray-700 text-lg">
                                    <MapPinIcon className="h-7 w-7 text-red-500 mr-4 flex-shrink-0" />
                                    <span>
                                        Rua Exemplo, 123 - Centro<br />
                                        Cidade, Estado - CEP 12345-678<br />
                                        Brasil
                                    </span>
                                </div>
                            </div>

                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Conecte-se Conosco</h3>
                            <div className="flex space-x-6">
                                <a href="https://facebook.com/tripz" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition-colors">
                                    <FaFacebookF className="h-8 w-8" />
                                </a>
                                <a href="https://instagram.com/tripz" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 transition-colors">
                                    <FaInstagram className="h-8 w-8" />
                                </a>
                                <a href="https://twitter.com/tripz" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition-colors">
                                    <FaTwitter className="h-8 w-8" />
                                </a>
                                <a href="https://linkedin.com/company/tripz" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:text-blue-900 transition-colors">
                                    <FaLinkedinIn className="h-8 w-8" />
                                </a>
                                <a href="https://youtube.com/tripz" target="_blank" rel="noopener noreferrer" className="text-red-700 hover:text-red-900 transition-colors">
                                    <FaYoutube className="h-8 w-8" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Formulário de Contato */}
                    <div className="bg-white rounded-lg shadow-xl p-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Envie-nos uma Mensagem</h2>
                        {isSubmitted ? (
                            <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center font-medium">
                                Mensagem enviada com sucesso! Em breve entraremos em contato.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nome</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        placeholder="Seu nome completo"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">E-mail</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        placeholder="seu.email@exemplo.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Mensagem</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="6"
                                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        placeholder="Descreva sua dúvida ou sugestão..."
                                    ></textarea>
                                </div>
                                {error && (
                                    <p className="text-red-500 text-sm">{error}</p>
                                )}
                                <button
                                    type="submit"
                                    className="main-action-button w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md"
                                >
                                    Enviar Mensagem
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Mapa Maior na Parte Inferior da Página de Contato - AGORA COM TODOS OS MARCADORES */}
                <div className="mt-12 bg-white rounded-lg shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Nossa Localização no Mapa</h2>
                    <div className="rounded-lg overflow-hidden shadow-md">
                        {isLoaded ? (
                            <GoogleMap
                                mapContainerStyle={contactPageMapContainerStyle} // Usando o estilo maior
                                center={defaultCenter} // Usando o centro padrão do Brasil
                                zoom={3.5} // Zoom para ver o Brasil inteiro
                                options={mapOptions} // Opções sem UI e com gestos
                            >
                                {/* Renderizando TODOS os marcadores dos hotéis */}
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
                                {/* Opcional: Adicione um marcador extra para o endereço da empresa se for diferente dos hotéis */}
                                {/* <Marker
                                    position={{ lat: -23.5505, lng: -46.6333 }} // Exemplo: Sede da empresa
                                    icon={{
                                        url: createMarkerIcon('red'),
                                        scaledSize: new window.google.maps.Size(32, 32),
                                        anchor: new window.google.maps.Point(16, 32),
                                    }}
                                    title="Sede da Tripz"
                                /> */}
                            </GoogleMap>
                        ) : (
                            <div className="bg-gray-200 w-full h-[450px] flex items-center justify-center text-lg rounded-lg">
                                Carregando mapa...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;