// src/components/pages/ProfilePage.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon, PencilIcon, CheckIcon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';
import HotelCard from '../hotels/HotelCard';

function ProfilePage() {
    const { currentUser, updateUser, isLoggedIn, savedHotels, isLoadingAuth } = useAuth();
    const navigate = useNavigate();
    
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        cpf: '',
        birthDate: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Redirect if not logged in
    useEffect(() => {
        if (!isLoadingAuth && !isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, isLoadingAuth, navigate]);

    // Initialize form data when user data is available
    useEffect(() => {
        if (currentUser) {
            setFormData({
                firstName: currentUser.firstName || currentUser.FirstName || currentUser.name?.split(' ')[0] || '',
                lastName: currentUser.lastName || currentUser.LastName || currentUser.name?.split(' ').slice(1).join(' ') || '',
                email: currentUser.email || currentUser.Email || '',
                phone: currentUser.phone || currentUser.Phone || '',
                cpf: currentUser.cpf || currentUser.Cpf || '',
                birthDate: currentUser.birthDate || currentUser.BirthDate || ''
            });
        }
    }, [currentUser]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Formatação para telefone
        if (name === 'phone') {
            const numbers = value.replace(/\D/g, '');
            const formatted = numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            setFormData(prev => ({ ...prev, [name]: formatted }));
        }
        // Formatação para CPF
        else if (name === 'cpf') {
            const numbers = value.replace(/\D/g, '');
            const formatted = numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            setFormData(prev => ({ ...prev, [name]: formatted }));
        }
        else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = async () => {
        setIsLoading(true);
        setError('');
        setMessage('');

        try {
            const updateData = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                cpf: formData.cpf.trim(),
                birthDate: formData.birthDate.trim()
            };

            const result = await updateUser(updateData);
            
            if (result.success) {
                setMessage('Perfil atualizado com sucesso!');
                setIsEditing(false);
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (err) {
            setError(err.message || 'Erro ao atualizar perfil');
            setTimeout(() => setError(''), 5000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        // Reset form data to original values
        if (currentUser) {
            setFormData({
                firstName: currentUser.firstName || currentUser.FirstName || currentUser.name?.split(' ')[0] || '',
                lastName: currentUser.lastName || currentUser.LastName || currentUser.name?.split(' ').slice(1).join(' ') || '',
                email: currentUser.email || currentUser.Email || '',
                phone: currentUser.phone || currentUser.Phone || '',
                cpf: currentUser.cpf || currentUser.Cpf || '',
                birthDate: currentUser.birthDate || currentUser.BirthDate || ''
            });
        }
        setIsEditing(false);
        setError('');
        setMessage('');
    };

    if (!isLoadingAuth && !isLoggedIn) {
        return null; // Will redirect in useEffect
    }

    if (isLoadingAuth) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando perfil...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Hero Section */}
                <div className="text-center mb-12">
                    <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-5"></div>
                        <div className="relative">
                            <UserCircleIcon className="h-20 w-20 text-blue-600 mx-auto mb-4" />
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                Olá, {formData.firstName || 'Usuário'}!
                            </h1>
                            <p className="text-lg text-gray-600">Bem-vindo ao seu painel pessoal</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Coluna Principal - Informações do Perfil */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Card de Informações Pessoais */}
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-blue-100 rounded-xl">
                                        <UserCircleIcon className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Informações Pessoais</h2>
                                </div>
                                {!isEditing && (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center sm:space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 sm:px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg"
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                        <span className="hidden sm:inline">Editar Perfil</span>
                                    </button>
                                )}
                            </div>

                            {/* Mensagens de sucesso/erro */}
                            {message && (
                                <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 rounded-xl flex items-center space-x-2">
                                    <CheckIcon className="h-5 w-5 text-green-600" />
                                    <span>{message}</span>
                                </div>
                            )}
                            {error && (
                                <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-red-800 rounded-xl flex items-center space-x-2">
                                    <XMarkIcon className="h-5 w-5 text-red-600" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {isEditing ? (
                                <div className="space-y-6">
                                    {/* Nome e Sobrenome */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Nome *
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white"
                                                placeholder="Digite seu nome"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Sobrenome *
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white"
                                                placeholder="Digite seu sobrenome"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            E-mail *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white"
                                            placeholder="Digite seu e-mail"
                                        />
                                    </div>

                                    {/* Telefone e CPF */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Telefone
                                            </label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                maxLength="15"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white"
                                                placeholder="(11) 99999-9999"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                CPF
                                            </label>
                                            <input
                                                type="text"
                                                name="cpf"
                                                value={formData.cpf}
                                                onChange={handleInputChange}
                                                maxLength="14"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white"
                                                placeholder="000.000.000-00"
                                            />
                                        </div>
                                    </div>

                                    {/* Data de Nascimento */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Data de Nascimento
                                        </label>
                                        <input
                                            type="date"
                                            name="birthDate"
                                            value={formData.birthDate}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white"
                                        />
                                    </div>

                                    {/* Botões de ação */}
                                    <div className="flex space-x-4 pt-6">
                                        <button
                                            onClick={handleSave}
                                            disabled={isLoading}
                                            className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                                        >
                                            {isLoading ? (
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            ) : (
                                                <>
                                                    <CheckIcon className="h-5 w-5" />
                                                    <span>Salvar Alterações</span>
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            disabled={isLoading}
                                            className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                                        >
                                            <XMarkIcon className="h-5 w-5" />
                                            <span>Cancelar</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-100">
                                            <p className="text-sm font-semibold text-blue-800 mb-1">Nome</p>
                                            <p className="text-lg text-gray-900 font-medium">{formData.firstName || 'Não informado'}</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-100">
                                            <p className="text-sm font-semibold text-blue-800 mb-1">Sobrenome</p>
                                            <p className="text-lg text-gray-900 font-medium">{formData.lastName || 'Não informado'}</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-100">
                                            <p className="text-sm font-semibold text-blue-800 mb-1">E-mail</p>
                                            <p className="text-lg text-gray-900 font-medium">{formData.email || 'Não informado'}</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-100">
                                            <p className="text-sm font-semibold text-blue-800 mb-1">Telefone</p>
                                            <p className="text-lg text-gray-900 font-medium">{formData.phone || 'Não informado'}</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-100">
                                            <p className="text-sm font-semibold text-blue-800 mb-1">CPF</p>
                                            <p className="text-lg text-gray-900 font-medium">{formData.cpf || 'Não informado'}</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-100">
                                            <p className="text-sm font-semibold text-blue-800 mb-1">Data de Nascimento</p>
                                            <p className="text-lg text-gray-900 font-medium">
                                                {formData.birthDate ? new Date(formData.birthDate).toLocaleDateString('pt-BR') : 'Não informado'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Coluna Lateral - Ações Rápidas e Estatísticas */}
                    <div className="space-y-8">
                        {/* Card de Ações Rápidas e Estatísticas - Padronizado */}
                        <div className="flex flex-col gap-8">
                            {/* Ações Rápidas */}
                            <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4 w-full">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                                        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </span>
                                    Ações Rápidas
                                </h3>
                                <button
                                    onClick={() => navigate('/minhas-viagens')}
                                    className="w-full text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all border border-blue-100 flex flex-col gap-1"
                                >
                                    <span className="font-semibold text-blue-900">Minhas Viagens</span>
                                    <span className="text-sm text-blue-700">Ver histórico de reservas</span>
                                </button>
                                <button
                                    onClick={() => navigate('/hoteis')}
                                    className="w-full text-left p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-all border border-green-100 flex flex-col gap-1"
                                >
                                    <span className="font-semibold text-green-900">Explorar Hotéis</span>
                                    <span className="text-sm text-green-700">Descobrir novos destinos</span>
                                </button>
                            </div>
                            {/* Estatísticas - agora proporcional e robusto */}
                            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6 w-full min-h-[180px] justify-center">
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                                    <span className="inline-flex items-center justify-center w-10 h-10 bg-red-100 rounded-lg">
                                        <HeartIcon className="h-6 w-6 text-red-500" />
                                    </span>
                                    Estatísticas
                                </h3>
                                <div className="flex flex-col items-center justify-center gap-2 flex-1">
                                    <span className="text-gray-700 font-medium text-lg">Hotéis Favoritos</span>
                                    <span className="bg-red-500 text-white px-5 py-2 rounded-full text-lg font-bold min-w-[48px] text-center shadow">
                                        {savedHotels?.length || 0}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Seção de Hotéis Favoritos */}
                {savedHotels && savedHotels.length > 0 && (
                    <div className="mt-12">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="p-3 bg-red-100 rounded-xl">
                                    <HeartIcon className="h-8 w-8 text-red-500" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">Meus Hotéis Favoritos</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {savedHotels.slice(0, 8).map((hotel, index) => (
                                    <HotelCard key={hotel.id || index} hotel={hotel} />
                                ))}
                            </div>
                            {savedHotels.length > 8 && (
                                <div className="text-center mt-8">
                                    <button
                                        onClick={() => navigate('/minhas-viagens')}
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                                    >
                                        Ver Todos os Favoritos ({savedHotels.length})
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {savedHotels && savedHotels.length === 0 && (
                    <div className="mt-12">
                        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                            <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6">
                                <HeartIcon className="h-12 w-12 text-gray-400 mx-auto" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Nenhum hotel favorito ainda</h3>
                            <p className="text-gray-600 mb-8 text-lg">
                                Explore nossa seleção incrível de hotéis e adicione seus favoritos aqui
                            </p>
                            <button
                                onClick={() => navigate('/hoteis')}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
                            >
                                Explorar Hotéis Agora
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;
