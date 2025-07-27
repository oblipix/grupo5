// src/components/layout/HomeMenu.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const HomeMenu = () => {
    // Função para rolar suavemente até a seção clicada
    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            // O offset é para compensar a altura do header fixo
            const headerOffset = 80; 
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <section className="bg-white rounded-t-[50px] shadow-md -mt-10 md:-mt-10 relative z-10 py-4 px-6">
            <div className="container mx-auto flex flex-wrap justify-center gap-4">
                <a 
                    href="#viagens-promocao" 
                    onClick={(e) => handleScroll(e, 'viagens-promocao')} 
                    className="px-4 py-2 bg-gray-100 rounded-full text-gray-800 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                    Promoções
                </a>
                <a 
                    href="#recomendado-viajantes" 
                    onClick={(e) => handleScroll(e, 'recomendado-viajantes')} 
                    className="px-4 py-2 bg-gray-100 rounded-full text-gray-800 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                    Recomendados
                </a>
                <Link to="/hoteis" className="px-4 py-2 bg-gray-100 rounded-full text-gray-800 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
                    Hotéis
                </Link>
                <Link to="/evento" className="px-4 py-2 bg-gray-100 rounded-full text-gray-800 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
                    Eventos
                </Link>
            </div>
        </section>
    );
};

export default HomeMenu;
