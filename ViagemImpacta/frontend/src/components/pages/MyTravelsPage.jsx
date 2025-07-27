

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
    logout, 
    updateUser,
    removeSavedHotel
  } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(currentUser || {});
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [updateError, setUpdateError] = useState('');

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
    if(currentUser) {
      // Debug temporário - remover após confirmar funcionamento
      console.log('Dados do currentUser:', currentUser);
      console.log('Nome extraído:', getUserDisplayName());
      
      setFormData({
        ...currentUser,
        name: getUserFullName(), // Usa a função para obter o nome completo
        email: currentUser.Email || currentUser.email || '', // Campo Email do backend
        phone: currentUser.Phone || currentUser.phone || '', // Campo Phone do backend
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

  if (!currentUser) {
    return <div className="text-center p-10">Carregando perfil...</div>;
  }
  
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
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
      // Validações básicas no frontend
      if (!formData.name?.trim()) {
        throw new Error('Nome é obrigatório');
      }

      if (!formData.email?.trim()) {
        throw new Error('Email é obrigatório');
      }

      // Validação simples de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        throw new Error('Por favor, insira um email válido');
      }

      // Chama a função de atualização do contexto
      const result = await updateUser(formData);
      
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
        <div className="flex justify-between items-center mb-8">
            <button
                onClick={() => navigate(-1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition-colors"
            >
                ← Voltar
            </button>
            
        </div>

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
                  <input id="name" type="text" value={formData.name || ''} onChange={handleFormChange} className="mt-1 block w-full p-2 border rounded-md mb-2" placeholder="Nome completo" required />
                  <input id="email" type="email" value={formData.email || ''} onChange={handleFormChange} className="mt-1 block w-full p-2 border rounded-md mb-2" placeholder="Seu email" required />
                  <input id="phone" type="text" value={formData.phone || ''} onChange={handleFormChange} className="mt-1 block w-full p-2 border rounded-md mb-4" placeholder="Telefone" />
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={handleSaveChanges} 
                      disabled={isUpdating}
                      className={`flex-1 ${isUpdating ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white font-bold py-2 px-6 rounded-full transition-colors`}
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
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
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

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Hotéis que Você Já Visitou</h2>
          {visitedHotels?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {visitedHotels.map(hotel => <HotelCard key={hotel.id} hotel={hotel} />)}
            </div>
          ) : (
            <p className="text-center text-gray-600">Você ainda não tem hotéis visitados.</p>
          )}
        </section>

        <hr className="my-12" />

        <section>
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Sua Lista de Desejos</h2>
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
            <p className="text-center text-gray-600">Sua lista de desejos está vazia.</p>
          )}
        </section>
    </div>
  );
}

export default MyTravelsPage;