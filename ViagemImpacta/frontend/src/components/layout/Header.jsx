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
        const baseClasses = "group text-gray-300 hover:text-blue-400 font-medium focus:outline-none transition-all duration-300 flex items-center";
        return isActive 
            ? `${baseClasses} active-link text-white` 
            : baseClasses;
    };
    
    // Classe específica para os botões Hotéis e Promoções
    const getSpecialNavLinkClasses = ({ isActive }) => {
        return isActive 
            ? "flex items-center px-4 py-2 rounded-lg text-white transition-all duration-200 active-link" 
            : "flex items-center px-4 py-2 rounded-lg text-gray-300 hover:text-blue-400  transition-all duration-200";
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
                <div className="flex items-center space-x-3">
                    <NavLink to="/minhas-viagens" className="text-gray-300 hover:text-blue-400 transition-all flex items-center py-1 px-3 rounded-lg ">
                        <UserCircleIcon className="h-8 w-8 md:h-6 md:w-6 text-blue-400" />
                        <span className="ml-2 hidden md:inline-block font-medium">Olá, {getFirstName()}!</span>
                    </NavLink>
                    <button
                        onClick={logout}
                        className="text-gray-300 hover:text-white transition-all flex items-center bg-gradient-to-r from-blue-900/40 to-blue-700/40 hover:from-red-900/40 hover:to-red-700/40 px-3 py-1 rounded-lg"
                        title="Sair"
                    >
                         <ArrowRightEndOnRectangleIcon className="h-6 w-6 md:h-5 md:w-5" />
                         <span className="ml-1 hidden md:inline-block text-sm font-medium">Sair</span>
                    </button>
                </div>
            );
        } else {
            return (
                <Link to="/login" className="text-gray-300 hover:text-white transition-all flex items-center bg-gradient-to-r from-blue-900/40 to-blue-700/40 hover:from-blue-700/60 hover:to-blue-500/60 px-4 py-1.5 rounded-lg">
                    <UserCircleIcon className="h-7 w-7 md:h-6 md:w-6" />
                    <span className="ml-2 hidden md:inline-block font-medium">Login</span>
                </Link>
            );
        }
    };

    return (
        <header className="w-full bg-gradient-to-b from-slate-800 to-slate-900 shadow-lg py-4 sticky top-0 z-50 relative">
            {/* Elemento específico para a linha inferior do header */}
            <div className="header-curve absolute bottom-0 left-0 w-full h-5"></div>
            <div className="container mx-auto px-6 flex items-center justify-between">

                {/* Logo e Botões Principais */}
                <div className="flex items-center space-x-6">
                    <Link to="/" className="flex items-center cursor-pointer">
                        <span className="logo text-white text-3xl font-bold">Tripz</span>
                    </Link>

                    {/* Botões Hotéis e Promoções */}

                    <div className="menu1 hidden md:flex items-center space-x-4">
                        <NavLink 
                            to="/hoteis" 
                            className={getSpecialNavLinkClasses}
                        >
                            <FaBuilding className="text-lg" />
                            <span className="font-medium ml-2">Hotéis</span>
                        </NavLink>

                        <NavLink 
                            to="/promocoes" 
                            className={getSpecialNavLinkClasses}
                        >
                            <FaTag className="text-lg" />
                            <span className="font-medium ml-2">Promoções</span>
                        </NavLink>
                    </div>
                </div>

                {/* Container para o Menu de Navegação (Desktop) E Ícone de Usuário */}
                <div className="hidden md:flex items-center space-x-8">
                    <nav>
                        <ul className="flex items-center space-x-8">
                            <li>
                                <NavLink to="/" className={getNavLinkClasses} end>
                                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 group-hover:w-2 transition-all"></span>
                                    Início
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contato" className={getNavLinkClasses}>
                                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 group-hover:w-2 transition-all"></span>
                                    Contato
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/institucional" className={getNavLinkClasses}>
                                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 group-hover:w-2 transition-all"></span>
                                    Institucional
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <UserLoginLink />
                </div>


                {/* Botão do Hambúrguer e Ícone de Usuário para Telas Pequenas (até 768px) */}
                <div className="flex md:hidden items-center space-x-4">
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
                <div className="md:hidden bg-gradient-to-b from-slate-800 to-slate-900 pb-6 transition-all duration-300 ease-in-out shadow-lg">
                    <ul className="flex flex-col items-center space-y-5 pt-4">
                        <li className="w-4/5">
                            <NavLink to="/" className={({ isActive }) => 
                                isActive 
                                    ? "flex items-center justify-center space-x-2 w-full py-2 px-3 rounded-lg text-white bg-blue-900/40 transition-all" 
                                    : "flex items-center justify-center space-x-2 w-full py-2 px-3 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-blue-900/20 transition-all"
                            } end onClick={toggleMobileMenu}>
                                <span>Início</span>
                            </NavLink>
                        </li>
                        <li className="w-4/5">
                            <NavLink to="/contato" className={({ isActive }) => 
                                isActive 
                                    ? "flex items-center justify-center space-x-2 w-full py-2 px-3 rounded-lg text-white bg-blue-900/40 transition-all" 
                                    : "flex items-center justify-center space-x-2 w-full py-2 px-3 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-blue-900/20 transition-all"
                            } onClick={toggleMobileMenu}>
                                <span>Contato</span>
                            </NavLink>
                        </li>
                        <li className="w-4/5">
                            <NavLink to="/institucional" className={({ isActive }) => 
                                isActive 
                                    ? "flex items-center justify-center space-x-2 w-full py-2 px-3 rounded-lg text-white bg-blue-900/40 transition-all" 
                                    : "flex items-center justify-center space-x-2 w-full py-2 px-3 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-blue-900/20 transition-all"
                            } onClick={toggleMobileMenu}>
                                <span>Institucional</span>
                            </NavLink>
                        </li>
                        <li className="w-4/5">
                            <NavLink to="/hoteis" className={({ isActive }) => 
                                isActive 
                                    ? "flex items-center justify-center space-x-2 w-full py-2 px-3 rounded-lg text-white bg-blue-900/40 transition-all" 
                                    : "flex items-center justify-center space-x-2 w-full py-2 px-3 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-blue-900/20 transition-all"
                            } onClick={toggleMobileMenu}>
                                <FaBuilding className="text-lg" />
                                <span>Hotéis</span>
                            </NavLink>
                        </li>
                        <li className="w-4/5">
                            <NavLink to="/promocoes" className={({ isActive }) => 
                                isActive 
                                    ? "flex items-center justify-center space-x-2 w-full py-2 px-3 rounded-lg text-white bg-blue-900/40 transition-all" 
                                    : "flex items-center justify-center space-x-2 w-full py-2 px-3 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-blue-900/20 transition-all"
                            } onClick={toggleMobileMenu}>
                                <FaTag className="text-lg" />
                                <span>Promoções</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
}

export default Header;