// src/components/layout/HomeMenu.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const HomeMenu = () => {
    return (
        <section className="bg-white rounded-t-[50px] shadow-md -mt-8 md:-mt-8 relative z-10 py-4 px-6">
            <div className="container mx-auto flex flex-wrap justify-center gap-4">
                {/* COMENTADO - FUNCIONALIDADE DE PROMOÇÕES DESABILITADA
                <a 
                    href="#viagens-promocao" 
                    onClick={(e) => handleScroll(e, 'viagens-promocao')} 
                    className="px-4 py-2 bg-gray-100 rounded-full text-gray-800 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                    Promoções
                </a>
                */}
                {/* LINK DE EVENTOS COMENTADO */}
                {/*
                <Link to="/evento" className="px-4 py-2 bg-gray-100 rounded-full text-gray-800 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
                    Eventos
                </Link>
                */}
            </div>
        </section>
    );
};

export default HomeMenu;
