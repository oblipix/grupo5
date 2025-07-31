/* eslint-disable no-unused-vars */


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HotelCard from '../hotels/HotelCard'; // Usando o card unificado

function MyTravelsPage() {
  const navigate = useNavigate();
  // Pegando TUDO do contexto, incluindo as listas de hotéis e a função de remover
  const {
    currentUser,
    isLoggedIn,
    savedHotels,
    visitedHotels,
    reservationHistory, // Adiciona histórico de reservas
    logout,
    updateUser,
    removeSavedHotel,
    loadReservationHistory, // Adiciona função para carregar reservas
    token
  } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(currentUser || {});
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [updateError, setUpdateError] = useState('');

  // Função para obter o número de hóspedes
  const getNumberOfGuests = (reservation) => {
    // Tenta diferentes campos possíveis
    const numberOfGuests = reservation.numberOfGuests || 
                          reservation.NumberOfGuests || 
                          reservation.numberofguests || 
                          reservation.guests || 
                          reservation.Guests;
    
    // Se não encontrar o campo, conta os viajantes como fallback
    if (numberOfGuests !== undefined && numberOfGuests !== null && numberOfGuests !== 0) {
      return numberOfGuests;
    }
    
    const travellers = reservation.travellers || reservation.Travellers;
    if (travellers && Array.isArray(travellers) && travellers.length > 0) {
      return travellers.length;
    }
    
    return 'Não informado';
  };

  // Função para formatar o tipo de quarto
  const formatRoomType = (roomType) => {
    if (!roomType && roomType !== 0) return 'Não informado';
    
    console.log('🏠 Formatando roomType:', roomType, 'tipo:', typeof roomType);
    
    // Se for um número (enum), converte para string
    if (typeof roomType === 'number') {
      switch (roomType) {
        case 0: return 'Standard';
        case 1: return 'Luxo';
        case 2: return 'Suíte';
        default: return 'Não informado';
      }
    }
    
    // Se for string, verifica se é um enum como string
    if (typeof roomType === 'string') {
      const lowerRoomType = roomType.toLowerCase();
      switch (lowerRoomType) {
        case 'standard':
        case '0':
          return 'Standard';
        case 'luxo':
        case '1':
          return 'Luxo';
        case 'suite':
        case 'suíte':
        case '2':
          return 'Suíte';
        default:
          // Se não encontrar correspondência, retorna a string formatada
          return roomType.charAt(0).toUpperCase() + roomType.slice(1).toLowerCase();
      }
    }
    
    // Fallback: retorna como está
    return roomType.toString();
  };

  // Função para extrair primeiro e último nome do usuário
  const getUserDisplayName = () => {
    if (!currentUser) return 'Usuário';

    // Primeiro tenta diferentes campos que podem conter o nome completo
    const possibleNameFields = [
      currentUser.FirstName && currentUser.LastName ? `${currentUser.FirstName} ${currentUser.LastName}` : null,
      currentUser.name,
      currentUser.fullName,
      currentUser.firstName && currentUser.lastName ? `${currentUser.firstName} ${currentUser.lastName}` : null,
      currentUser.username,
    ];

    for (const nameField of possibleNameFields) {
      if (nameField && typeof nameField === 'string' && nameField.trim()) {
        const nameParts = nameField.trim().split(' ').filter(part => part.length > 0);
        if (nameParts.length >= 2) {
          // Retorna primeiro nome + último nome
          return `${nameParts[0]} ${nameParts[nameParts.length - 1]}`;
        } else if (nameParts.length === 1) {
          // Se só tem um nome, retorna ele
          return nameParts[0];
        }
      }
    }

    // Se não encontrar nome, tenta extrair do email
    if (currentUser.Email && typeof currentUser.Email === 'string') {
      const emailPart = currentUser.Email.split('@')[0];
      // Capitaliza a primeira letra
      return emailPart.charAt(0).toUpperCase() + emailPart.slice(1);
    }

    if (currentUser.email && typeof currentUser.email === 'string') {
      const emailPart = currentUser.email.split('@')[0];
      // Capitaliza a primeira letra
      return emailPart.charAt(0).toUpperCase() + emailPart.slice(1);
    }

    return 'Usuário';
  };

  // Função para extrair nome completo para edição
  const getUserFullName = () => {
    if (!currentUser) return '';

    return (currentUser.FirstName && currentUser.LastName ? `${currentUser.FirstName} ${currentUser.LastName}` : '') ||
      currentUser.name ||
      currentUser.fullName ||
      (currentUser.firstName && currentUser.lastName ? `${currentUser.firstName} ${currentUser.lastName}` : '') ||
      currentUser.username ||
      '';
  };

  useEffect(() => {
    if (currentUser) {
      // Extrai primeiro e último nome do nome completo
      const fullName = getUserFullName();
      const nameParts = fullName.trim().split(' ').filter(part => part.length > 0);
      const firstName = nameParts[0] || '';
      const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';

      setFormData({
        ...currentUser,
        name: fullName, // Mantém o nome completo para compatibilidade
        firstName: currentUser.FirstName || firstName,
        lastName: currentUser.LastName || lastName,
        email: currentUser.Email || currentUser.email || '', // Campo Email do backend
        phone: currentUser.Phone || currentUser.phone || '', // Campo Phone do backend
        cpf: currentUser.Cpf || currentUser.cpf || '', // Campo CPF do backend
        birthDate: currentUser.BirthDate || currentUser.birthDate || '', // Campo BirthDate do backend
        points: currentUser.points || 0,
        avatar: currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(getUserDisplayName())}&background=3B82F6&color=ffffff&size=200`
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  // Debug e força carregamento de reservas
  useEffect(() => {
    console.log('🔍 Debug MyTravelsPage:');
    console.log('- isLoggedIn:', isLoggedIn);
    console.log('- currentUser:', currentUser);
    console.log('- reservationHistory:', reservationHistory);
    console.log('- token:', token ? 'Token presente' : 'Token ausente');
    
    // Log detalhado das reservas
    if (reservationHistory && reservationHistory.length > 0) {
      console.log('📋 Estrutura das reservas:');
      reservationHistory.forEach((reservation, index) => {
        console.log(`Reserva ${index + 1}:`, reservation);
        console.log(`- ID: ${reservation.id || reservation.ReservationId || reservation.reservationId}`);
        console.log(`- Hotel: ${reservation.hotelName || reservation.HotelName}`);
        console.log(`- RoomType: ${reservation.roomType || reservation.RoomType} (tipo: ${typeof (reservation.roomType || reservation.RoomType)})`);
        console.log(`- RoomType formatado: ${formatRoomType(reservation.roomType || reservation.RoomType)}`);
        console.log(`- CheckIn: ${reservation.checkIn || reservation.CheckIn || reservation.checkInDate}`);
        console.log(`- CheckOut: ${reservation.checkOut || reservation.CheckOut || reservation.checkOutDate}`);
        console.log(`- NumberOfGuests: ${reservation.numberOfGuests || reservation.NumberOfGuests} (tipo: ${typeof (reservation.numberOfGuests || reservation.NumberOfGuests)})`);
        console.log(`- Travellers: ${JSON.stringify(reservation.travellers || reservation.Travellers)}`);
        console.log('- Todos os campos disponíveis:', Object.keys(reservation));
      });
    }
    
    // Se o usuário está logado mas não há reservas carregadas, tenta carregar
    if (isLoggedIn && currentUser && token && loadReservationHistory) {
      const userId = currentUser.UserId || currentUser.userId || currentUser.id;
      if (userId && (!reservationHistory || reservationHistory.length === 0)) {
        console.log('🔄 Tentando recarregar reservas para userId:', userId);
        loadReservationHistory(userId, token).catch(error => {
          console.error('❌ Erro ao recarregar reservas:', error);
        });
      }
    }
  }, [isLoggedIn, currentUser, token, reservationHistory, loadReservationHistory]);

  if (!currentUser) {
    return <div className="text-center p-10">Carregando perfil...</div>;
  }

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    
    // Formatação para telefone
    if (id === 'phone') {
      // Remove tudo que não é número
      const numbers = value.replace(/\D/g, '');
      // Aplica a máscara (XX) XXXXX-XXXX
      const formatted = numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      setFormData(prev => ({ ...prev, [id]: formatted }));
    }
    // Formatação para CPF
    else if (id === 'cpf') {
      // Remove tudo que não é número
      const numbers = value.replace(/\D/g, '');
      // Aplica a máscara XXX.XXX.XXX-XX
      const formatted = numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      setFormData(prev => ({ ...prev, [id]: formatted }));
    }
    else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    // Limpa mensagens anteriores
    setUpdateMessage('');
    setUpdateError('');
    setIsUpdating(true);

    try {
      console.log('FormData antes de validar:', formData);

      // Validações básicas no frontend
      if (!formData.firstName?.trim() || !formData.lastName?.trim()) {
        throw new Error('Primeiro nome e último nome são obrigatórios');
      }

      if (!formData.email?.trim()) {
        throw new Error('Email é obrigatório');
      }

      // Validação simples de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        throw new Error('Por favor, insira um email válido');
      }

      // Validação de telefone (se preenchido, deve ter 11 dígitos)
      if (formData.phone?.trim()) {
        const phoneNumbers = formData.phone.replace(/\D/g, '');
        if (phoneNumbers.length !== 11) {
          throw new Error('Telefone deve ter 11 dígitos (com DDD)');
        }
      }

      // Validação de CPF (se preenchido, deve ter 11 dígitos)
      if (formData.cpf?.trim()) {
        const cpfNumbers = formData.cpf.replace(/\D/g, '');
        if (cpfNumbers.length !== 11) {
          throw new Error('CPF deve ter 11 dígitos');
        }
      }

      // Prepara os dados no formato correto para o backend
      const updateData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() || '',
        cpf: formData.cpf?.trim() || '',
        birthDate: formData.birthDate?.trim() || ''
      };

      console.log('UpdateData preparado:', updateData);

      // Chama a função de atualização do contexto
      const result = await updateUser(updateData);

      if (result.success) {
        setUpdateMessage(result.message);
        setIsEditing(false);

        // Remove a mensagem de sucesso após 3 segundos
        setTimeout(() => {
          setUpdateMessage('');
        }, 3000);
      }

    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
      setUpdateError(error.message || 'Erro ao atualizar perfil. Tente novamente.');

      // Remove a mensagem de erro após 5 segundos
      setTimeout(() => {
        setUpdateError('');
      }, 5000);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="container mx-auto p-6 md:p-10 bg-white shadow-lg rounded-lg my-8 animate-fade-in">


      <h1 className="text-4xl font-extrabold text-blue-800 mb-8 text-center">Meu Perfil Tripz</h1>

      {/* ==================================================================== */}
      {/* INÍCIO DO JSX DO PERFIL (agora usando o estado 'formData')          */}
      {/* ==================================================================== */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        {/* Coluna do Avatar e Edição de Perfil */}
        <div className="flex flex-col items-center md:w-1/3">
          <div className="relative mb-6 group">
            <img
              src={formData.avatar}
              alt="Avatar do Usuário"
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-400 shadow-md"
            />
            {isEditing && (
              <label htmlFor="avatar-upload" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" title="Mudar Avatar">
                <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.218A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.218A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </label>
            )}
          </div>
          <div className="text-center w-full px-4">
            {/* Mensagens de sucesso e erro */}
            {updateMessage && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
                {updateMessage}
              </div>
            )}

            {updateError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                {updateError}
              </div>
            )}

            {isEditing ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2 text-left">
                      Primeiro Nome
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={formData.firstName || ''}
                      onChange={handleFormChange}
                      className="block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Primeiro nome"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2 text-left">
                      Último Nome
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={formData.lastName || ''}
                      onChange={handleFormChange}
                      className="block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Último nome"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 text-left">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email || ''}
                    onChange={handleFormChange}
                    className="block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Seu email"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2 text-left">
                    Telefone (opcional)
                  </label>
                  <input
                    id="phone"
                    type="text"
                    value={formData.phone || ''}
                    onChange={handleFormChange}
                    className="block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(11) 99999-9999"
                    maxLength="15"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="cpf" className="block text-gray-700 text-sm font-bold mb-2 text-left">
                    CPF (opcional)
                  </label>
                  <input
                    id="cpf"
                    type="text"
                    value={formData.cpf || ''}
                    onChange={handleFormChange}
                    className="block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="000.000.000-00"
                    maxLength="14"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="birthDate" className="block text-gray-700 text-sm font-bold mb-2 text-left">
                    Data de Nascimento (opcional)
                  </label>
                  <input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate || ''}
                    onChange={handleFormChange}
                    className="block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveChanges}
                    disabled={isUpdating}
                    className={`main-action-button flex-1 ${isUpdating ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white font-bold py-2 px-6 rounded-full transition-colors`}
                  >
                    {isUpdating ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Salvando...
                      </span>
                    ) : (
                      'Salvar Alterações'
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setUpdateError('');
                      setUpdateMessage('');
                    }}
                    disabled={isUpdating}
                    className="main-action-button flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{getUserDisplayName()}</h2>
                <p className="text-lg text-gray-600 mb-4">{currentUser?.Email || currentUser?.email || formData.email}</p>
                <button onClick={() => setIsEditing(true)} className="main-action-button w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full">Editar Perfil</button>
              </>
            )}
          </div>
        </div>

        {/* Coluna do Club de Pontuação */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg shadow-xl md:w-2/3 flex flex-col items-center justify-center text-center">
          <h3 className="text-3xl font-extrabold mb-3">Tripz Club Fidelidade</h3>
          <p className="text-lg mb-4">Seus pontos valem experiências incríveis!</p>
          <div className="flex items-baseline mb-4">
            <span className="text-6xl font-black text-yellow-300">{formData.points}</span>
            <span className="text-2xl font-semibold ml-2">pontos</span>
          </div>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full shadow-lg">Ver Recompensas</button>
        </div>
      </div>
      {/* ==================================================================== */}
      {/* FIM DO JSX DO PERFIL                                               */}
      {/* ==================================================================== */}

      <hr className="my-12" />

      {/* Seção de Histórico de Reservas */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-800 text-center flex-1">Histórico de Reservas</h2>
        </div>
        
        {reservationHistory?.length > 0 ? (
          <div className="space-y-6">
            {reservationHistory.map(reservation => (
              <div key={reservation.id || reservation.ReservationId || reservation.reservationId} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  {/* Informações da reserva */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 lg:mb-0">
                    {/* Imagem do hotel */}
                    {reservation.hotelImage && (
                      <img 
                        src={reservation.hotelImage} 
                        alt={reservation.hotelName}
                        className="w-full sm:w-24 h-24 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/96x96?text=Hotel';
                        }}
                      />
                    )}
                    
                    {/* Detalhes da reserva */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        {reservation.hotelName || reservation.HotelName}
                      </h3>
                      {reservation.location && (
                        <p className="text-gray-600 mb-2">📍 {reservation.location}</p>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                        <p><strong>Quarto:</strong> {formatRoomType(reservation.roomType || reservation.RoomType)}</p>
                        <p><strong>Hóspedes:</strong> {getNumberOfGuests(reservation)}</p>
                        <p><strong>Check-in:</strong> {new Date(reservation.checkIn || reservation.CheckIn || reservation.checkInDate).toLocaleDateString('pt-BR')}</p>
                        <p><strong>Check-out:</strong> {new Date(reservation.checkOut || reservation.CheckOut || reservation.checkOutDate).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status e valor */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="text-center sm:text-right">
                      <p className="text-2xl font-bold text-green-600">
                        R$ {(reservation.totalPrice || reservation.TotalPrice || 0).toFixed(2).replace('.', ',')}
                      </p>
                      <p className="text-sm text-gray-500">
                        Reservado em {new Date(reservation.reservationDate || reservation.ReservationDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="flex flex-col items-center sm:items-end gap-2">
                   
                      
                      {/* Botões de ação */}
                      <div className="flex gap-2">
                        <button 
                          onClick={() => navigate(`/hoteis/${reservation.hotelId || reservation.HotelId}`)}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition"
                        >
                          Ver Hotel
                        </button>
                        {(reservation.isConfirmed || reservation.IsConfirmed) && (
                          <button 
                            className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition"
                            onClick={() => {
                              // Aqui você pode implementar funcionalidade para baixar comprovante
                              alert('Funcionalidade de comprovante em desenvolvimento');
                            }}
                          >
                            Comprovante
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Informações dos viajantes */}
                {(reservation.travellers || reservation.Travellers) && (reservation.travellers || reservation.Travellers).length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Viajantes:</p>
                    <div className="flex flex-wrap gap-2">
                      {(reservation.travellers || reservation.Travellers).map((traveller, index) => (
                        <span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">
                          {traveller.firstName || traveller.FirstName} {traveller.lastName || traveller.LastName}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏨</div>
            <p className="text-gray-600 text-lg mb-4">Você ainda não fez nenhuma reserva.</p>
            <button 
              onClick={() => navigate('/hoteis')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Explorar Hotéis
            </button>
          </div>
        )}
      </section>

      <hr className="my-12" />

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Hotéis que Você Já Visitou</h2>
        {visitedHotels?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visitedHotels.map(hotel => <HotelCard key={hotel.id} hotel={hotel} />)}
          </div>
        ) : (
          <div className="text-center p-8">
            <div className="w-40 h-40 mx-auto mb-4 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Corpo do mascote (mala de viagem) */}
                <rect x="20" y="35" width="60" height="50" rx="5" ry="5" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
                
                {/* Detalhes da mala */}
                <rect x="30" y="45" width="40" height="30" rx="2" ry="2" fill="#60a5fa" stroke="#1e40af" strokeWidth="1" />
                
                {/* Alça da mala */}
                <path d="M40 35 Q50 15 60 35" fill="none" stroke="#1e40af" strokeWidth="3" />
                
                {/* Rosto animado */}
                <circle cx="40" cy="60" r="5" fill="white" /> {/* Olho esquerdo */}
                <circle cx="60" cy="60" r="5" fill="white" /> {/* Olho direito */}
                <circle cx="40" cy="60" r="2" fill="#1e40af" /> {/* Pupila esquerda */}
                <circle cx="60" cy="60" r="2" fill="#1e40af" /> {/* Pupila direita */}
                
                {/* Lágrimas */}
                <path d="M37 65 C37 69, 36 73, 34 77" stroke="#60a5fa" strokeWidth="2" fill="none" /> {/* Lágrima esquerda */}
                <path d="M63 65 C63 69, 64 73, 66 77" stroke="#60a5fa" strokeWidth="2" fill="none" /> {/* Lágrima direita */}
                <circle cx="34" cy="77" r="1.5" fill="#60a5fa" /> {/* Gota esquerda */}
                <circle cx="66" cy="77" r="1.5" fill="#60a5fa" /> {/* Gota direita */}
                
                {/* Boca triste */}
                <path d="M35 75 Q50 70 65 75" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                
                {/* Chapéu de viagem */}
                <path d="M30 40 L50 30 L70 40" fill="#fcd34d" stroke="#1e40af" strokeWidth="1" />
                
                {/* Adesivos de viagem na mala */}
                <circle cx="25" cy="45" r="3" fill="#f87171" />
                <circle cx="75" cy="50" r="3" fill="#34d399" />
                <circle cx="30" cy="80" r="3" fill="#a78bfa" />
                
               
              </svg>
            </div>
            <p className="text-center text-gray-600 text-lg font-semibold">Você ainda não tem hotéis visitados</p>
            <p className="text-center text-blue-500 text-sm mt-2">Tripz está esperando para acompanhar você em sua próxima aventura!</p>
          </div>
        )}
      </section>

      <hr className="my-12" />

      <section>
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Sua Tripz de Desejos</h2>
        {savedHotels?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedHotels.map(hotel => (
              <div key={hotel.id} className="relative group">
                <HotelCard hotel={hotel} />
                <button onClick={() => removeSavedHotel(hotel.id)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" title="Remover da lista de desejos">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8">
            <div className="w-40 h-40 mx-auto mb-4 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Corpo principal do avião (fuselagem) */}
                <path d="M25 50 L80 50 C85 50, 90 45, 90 40 C90 35, 85 30, 80 30 L25 30 C20 30, 15 35, 15 40 C15 45, 20 50, 25 50 Z" fill="#3b82f6" stroke="#1e40af" strokeWidth="1.5" />
                
                {/* Nariz arredondado do avião */}
                <circle cx="15" cy="40" r="10" fill="#3b82f6" stroke="#1e40af" strokeWidth="1.5" />
                
                {/* Cauda do avião */}
                <path d="M80 30 L90 15 L95 15 L90 40 L80 50 L80 30" fill="#3b82f6" stroke="#1e40af" strokeWidth="1.5" />
                <path d="M85 25 L90 22" stroke="#1e40af" strokeWidth="0.8" />
                
                {/* Asa superior - redesenhada */}
                <path d="M45 30 L58 18 L70 12 L75 16 L65 28 L50 30 Z" fill="#60a5fa" stroke="#1e40af" strokeWidth="1" />
                <path d="M58 18 L62 22" stroke="#1e40af" strokeWidth="0.8" fill="none" />
                
                {/* Asa inferior - redesenhada */}
                <path d="M45 50 L58 62 L70 68 L75 64 L65 52 L50 50 Z" fill="#60a5fa" stroke="#1e40af" strokeWidth="1" />
                <path d="M58 62 L62 58" stroke="#1e40af" strokeWidth="0.8" fill="none" />
                
                {/* Janelas do avião */}
                <circle cx="30" cy="40" r="3" fill="white" stroke="#1e40af" strokeWidth="0.7" />
                <circle cx="45" cy="40" r="3" fill="white" stroke="#1e40af" strokeWidth="0.7" />
                <circle cx="60" cy="40" r="3" fill="white" stroke="#1e40af" strokeWidth="0.7" />
                <circle cx="75" cy="40" r="3" fill="white" stroke="#1e40af" strokeWidth="0.7" />
                
                {/* Cabine do piloto (vidro) */}
                <path d="M15 35 C20 30, 25 30, 25 35 L25 45 C25 50, 20 50, 15 45 Z" fill="#a5f3fc" stroke="#1e40af" strokeWidth="1" />
                
                {/* Detalhes na cabine */}
                <path d="M20 35 L20 45" stroke="#1e40af" strokeWidth="0.5" fill="none" />
                <path d="M15 40 L25 40" stroke="#1e40af" strokeWidth="0.5" fill="none" opacity="0.7" />
                
                {/* Brilho da cabine */}
                <circle cx="18" cy="37" r="1.5" fill="white" opacity="0.7" />
                
                {/* Detalhes decorativos */}
                <path d="M80 40 L85 40" stroke="#1e40af" strokeWidth="1" />
                <path d="M15 55 Q50 60 85 55" fill="none" stroke="#1e40af" strokeWidth="0.8" />
                
                {/* Marca "Tripz" na lateral do avião */}
                <path d="M33 43 L55 43" stroke="#fcd34d" strokeWidth="2" strokeLinecap="round" />
                <circle cx="60" cy="43" r="2" fill="#fcd34d" />
                
                {/* Faixa decorativa */}
                <path d="M25 36 L75 36" stroke="#fcd34d" strokeWidth="1" opacity="0.8" strokeDasharray="2,1" />
                
                {/* Estrelas (representando desejos) */}
                <path d="M80 20 L82 23 L86 23 L83 26 L84 30 L80 28 L76 30 L77 26 L74 23 L78 23 Z" fill="#fcd34d" />
                <path d="M30 15 L32 18 L36 18 L33 21 L34 25 L30 23 L26 25 L27 21 L24 18 L28 18 Z" fill="#fcd34d" />
                <path d="M60 65 L62 68 L66 68 L63 71 L64 75 L60 73 L56 75 L57 71 L54 68 L58 68 Z" fill="#fcd34d" />
              </svg>
            </div>
            <p className="text-center text-gray-600 text-lg font-semibold">Sua lista de desejos está vazia</p>
            <p className="text-center text-blue-500 text-sm mt-2">Deixe o Tripz te ajudar a encontrar destinos dos seus sonhos!</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default MyTravelsPage;