// src/components/Header.jsx

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Bars3Icon, UserCircleIcon, XMarkIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';
import { FaBuilding, FaTag } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isLoggedIn, currentUser, logout } = useAuth();

    const getNavLinkClasses = ({ isActive }) => {
        const baseClasses = "text-gray-300 hover:text-white font-medium focus:outline-none transition-colors duration-300";
        return isActive ? `${baseClasses} active-link` : baseClasses;
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const UserLoginLink = () => {
        if (isLoggedIn) {
            // Debug temporário - remover após corrigir
            console.log('Debug currentUser no Header:', currentUser);

            // Função para obter o primeiro nome do usuário de forma segura
            const getFirstName = () => {
                if (!currentUser) return 'Usuário';

                // Tenta diferentes propriedades que podem conter o nome
                const possibleNames = [
                    currentUser.name,
                    currentUser.firstName,
                    currentUser.fullName,
                    currentUser.username,
                    currentUser.email
                ];

                for (const nameField of possibleNames) {
                    if (nameField && typeof nameField === 'string' && nameField.trim()) {
                        // Se for email, pega a parte antes do @
                        if (nameField.includes('@')) {
                            return nameField.split('@')[0];
                        }
                        // Se for nome completo, pega o primeiro nome
                        return nameField.split(' ')[0];
                    }
                }

                return 'Usuário'; // Fallback
            };

            return (
                <div className="flex items-center space-x-2">
                    <NavLink to="/minhas-viagens" className="text-gray-300 hover:text-white transition-colors flex items-center">
                        <UserCircleIcon className="h-8 w-8 md:h-7 md:w-7" />
                        <span className="ml-2 hidden md:inline-block">Olá, {getFirstName()}!</span>
                    </NavLink>
                    <button
                        onClick={logout}
                        className="main-action-button text-gray-300 hover:text-red-400 transition-colors flex items-center"
                        title="Sair"
                    >
                         <ArrowRightEndOnRectangleIcon className="h-6 w-6" />
                         <span className="ml-1 hidden md:inline-block text-sm">Sair</span>
                    </button>
                </div>
            );
        } else {
            return (
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <UserCircleIcon className="h-8 w-8 md:h-7 md:w-7" />
                    <span className="ml-2 hidden md:inline-block">Login</span>
                </Link>
            );
        }
    };

    return (
        <header className="w-full bg-slate-900 shadow-lg py-4 sticky top-0 z-50">
            <div className="container mx-auto px-6 flex items-center justify-between">

                {/* Logo e Botões Principais */}
                <div className="flex items-center space-x-6">
                    <Link to="/" className="flex items-center cursor-pointer">
                        <span className="logo text-white text-3xl font-bold">Tripz</span>
                    </Link>

                    {/* Botões Hotéis e Promoções */}

                          <div className="menu1 items-center space-x-4 hidden lg:flex">
                        <NavLink 
                            to="/hoteis" 
                            className={({ isActive }) => 
                                isActive 
                                ? "flex items-center space-x-2 px-4 py-2 rounded-lg text-white bg-slate-800 transition-colors duration-200" 
                                : "flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                            }
                        >
                            <FaBuilding className="text-lg" />
                            <span className="font-medium">Hotéis</span>
                        </NavLink>

                        <NavLink 
                            to="/promocoes" 
                            className={({ isActive }) => 
                                isActive 
                                ? "flex items-center space-x-2 px-4 py-2 rounded-lg text-white bg-slate-800 transition-colors duration-200" 
                                : "flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                            }
                        >
                            <FaTag className="text-lg" />
                            <span className="font-medium">Promoções</span>
                        </NavLink>
                    </div>
                </div>
 

                {/* Container para o Menu de Navegação (Desktop) E Ícone de Usuário */}
                <div className="desktop-menu hidden md:flex items-center space-x-8">
                    <nav>
                        <ul className="flex items-center space-x-8">
                            <li><NavLink to="/" className={getNavLinkClasses} end>Início</NavLink></li>

                            <li><NavLink to="/contato" className={getNavLinkClasses}>Contato</NavLink></li>
                            <li><NavLink to="/institucional" className={getNavLinkClasses}>Institucional</NavLink></li>
                        </ul>
                    </nav>
                    <UserLoginLink />
                </div>


                {/* Botão do Hambúrguer e Ícone de Usuário para Telas Pequenas */}
                <div className="hamburger-menu flex items-center space-x-4">
                    <UserLoginLink />
                    <button
                        onClick={toggleMobileMenu}
                        className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md p-2"
                        aria-label="Abrir menu de navegação"
                    >
                        {isMobileMenuOpen ? (
                            <XMarkIcon className="h-7 w-7" />
                        ) : (
                            <Bars3Icon className="h-7 w-7" />
                        )}
                    </button>
                </div>
            </div>

            {/* Menu Mobile (Dropdown) */}
            {isMobileMenuOpen && (
                <div className="mobile-menu bg-slate-800 pb-4 transition-all duration-300 ease-in-out">
                    <ul className="flex flex-col items-center space-y-4 pt-4">
                        <li><NavLink to="/" className={getNavLinkClasses} end onClick={toggleMobileMenu}>Início</NavLink></li>
                        {/* <<<<<<< REMOVIDO: LINKS ESPECÍFICOS DO MENU MOBILE >>>>>>> */}
                        {/* Removidos: Hotéis, Promoções, Eventos, Blog */}
                        <li><NavLink to="/contato" className={getNavLinkClasses} onClick={toggleMobileMenu}>Contato</NavLink></li>
                        <li><NavLink to="/institucional" className={getNavLinkClasses} onClick={toggleMobileMenu}>Institucional</NavLink></li>
                        <li><NavLink to="/hoteis" className={getNavLinkClasses} onClick={toggleMobileMenu}>Hotéis</NavLink></li>
                        <li><NavLink to="/promocoes" className={getNavLinkClasses} onClick={toggleMobileMenu}>Promoções</NavLink></li>
                    </ul>
                </div>
            )}
        </header>
    );
}

export default Header;