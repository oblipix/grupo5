/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import TravelCard from './TravelCard'; // Reutiliza o TravelCard para exibir hotéis
import RecommendedHotelCard from './RecommendedHotelCard'; // Reutiliza para hotéis da lista de desejos

function MyTravelsPage({
  user, // Prop para receber os dados do usuário logado
  onUpdateUser, // Função para atualizar os dados do usuário
  onBack, // Função para voltar à página anterior
  onLogout, // NOVA PROPRIEDADE: Função para fazer logout
  savedHotels, // Hotéis salvos (lista de desejos)
  visitedHotels, // Hotéis que o usuário já visitou (histórico)
  onRemoveSavedHotel // Função para remover hotel da lista de desejos
}) {
  const [isEditing, setIsEditing] = useState(false);
  // Estados para os dados do usuário, com valores padrão ou do usuário
  const [userName, setUserName] = useState(user?.name || 'Nome do Usuário');
  const [userEmail, setUserEmail] = useState(user?.email || 'email@exemplo.com');
  const [userPhone, setUserPhone] = useState(user?.phone || '(XX) XXXXX-XXXX'); // Novo campo: Telefone
  const [userAddress, setUserAddress] = useState(user?.address || 'Rua Exemplo, 123 - Bairro Teste'); // Novo campo: Endereço
  const [userCity, setUserCity] = useState(user?.city || 'Cidade Exemplo'); // Novo campo: Cidade
  const [userState, setUserState] = useState(user?.state || 'UF'); // Novo campo: Estado
  const [userZipCode, setUserZipCode] = useState(user?.zipCode || '00000-000'); // Novo campo: CEP
  const [userAvatar, setUserAvatar] = useState(user?.avatar || 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Avatar');
  const [userPoints, setUserPoints] = useState(user?.points || 1250); // Simula pontos do clube

  // Função para simular o upload de avatar
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserAvatar(reader.result);
        // Em um ambiente real, você faria o upload para um servidor aqui
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    // Objeto com os dados atualizados do usuário
    const updatedUser = {
      ...user,
      name: userName,
      email: userEmail,
      phone: userPhone,
      address: userAddress,
      city: userCity,
      state: userState,
      zipCode: userZipCode,
      avatar: userAvatar,
      points: userPoints, // Manter os pontos, se não forem editáveis aqui
    };
    onUpdateUser(updatedUser); // Chama a função para atualizar no estado pai (App.jsx)
    setIsEditing(false);
    alert('Informações atualizadas com sucesso!');
  };

  return (
    <div className="container mx-auto p-6 md:p-10 bg-white shadow-lg rounded-lg my-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={onBack}
          className="main-action-button bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300"
        >
          ← Voltar
        </button>
        <button
          onClick={onLogout}
          className="main-action-button bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Sair
        </button>
      </div>

      <h1 className="text-4xl font-extrabold text-blue-800 mb-8 text-center">Meu Perfil Tripz</h1>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        {/* Coluna do Avatar e Info Básicas */}
        <div className="flex flex-col items-center md:w-1/3">
          <div className="relative mb-6 group">
            <img
              src={userAvatar}
              alt="Avatar do Usuário"
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-400 shadow-md transition-transform duration-300 group-hover:scale-105"
            />
            {isEditing && (
              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                title="Mudar Avatar"
              >
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.218A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.218A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </label>
            )}
          </div>
          <div className="text-center w-full px-4">
            {isEditing ? (
              <>
                {/* Campos editáveis */}
                <div className="mb-4">
                  <label htmlFor="userName" className="block text-left text-sm font-medium text-gray-700">Nome Completo</label>
                  <input
                    id="userName"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
                    placeholder="Seu nome"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="userEmail" className="block text-left text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="userEmail"
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
                    placeholder="seu.email@exemplo.com"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="userPhone" className="block text-left text-sm font-medium text-gray-700">Telefone</label>
                  <input
                    id="userPhone"
                    type="text"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
                    placeholder="(XX) XXXXX-XXXX"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="userAddress" className="block text-left text-sm font-medium text-gray-700">Endereço</label>
                  <input
                    id="userAddress"
                    type="text"
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
                    placeholder="Rua, Número, Complemento"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label htmlFor="userCity" className="block text-left text-sm font-medium text-gray-700">Cidade</label>
                    <input
                      id="userCity"
                      type="text"
                      value={userCity}
                      onChange={(e) => setUserCity(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
                      placeholder="Cidade"
                    />
                  </div>
                  <div>
                    <label htmlFor="userState" className="block text-left text-sm font-medium text-gray-700">UF</label>
                    <input
                      id="userState"
                      type="text"
                      value={userState}
                      onChange={(e) => setUserState(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
                      placeholder="UF"
                      maxLength="2"
                    />
                  </div>
                  <div>
                    <label htmlFor="userZipCode" className="block text-left text-sm font-medium text-gray-700">CEP</label>
                    <input
                      id="userZipCode"
                      type="text"
                      value={userZipCode}
                      onChange={(e) => setUserZipCode(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
                      placeholder="00000-000"
                      maxLength="9"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveChanges}
                  className="main-action-button bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 shadow-md w-full"
                >
                  Salvar Alterações
                </button>
              </>
            ) : (
              <>
                {/* Informações em modo de visualização */}
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{userName}</h2>
                <p className="text-lg text-gray-600 mb-2">{userEmail}</p>
                <p className="text-md text-gray-600 mb-2">{userPhone}</p>
                <p className="text-md text-gray-600 mb-2">{userAddress}</p>
                <p className="text-md text-gray-600 mb-4">{userCity}, {userState} - {userZipCode}</p>

                <button
                  onClick={() => setIsEditing(true)}
                  className="main-action-button bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 shadow-md w-full"
                >
                  Editar Perfil
                </button>
              </>
            )}
          </div>
        </div>

        {/* Coluna do Club de Pontuação */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg shadow-xl md:w-2/3 flex flex-col items-center justify-center text-center">
          <h3 className="text-3xl font-extrabold mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Tripz Club Fidelidade
          </h3>
          <p className="text-lg mb-4">Seus pontos valem diárias e experiências incríveis!</p>
          <div className="flex items-baseline mb-4">
            <span className="text-6xl font-black text-yellow-300 drop-shadow-lg">{userPoints}</span>
            <span className="text-2xl font-semibold ml-2">pontos</span>
          </div>
          <p className="text-sm opacity-90 mb-6">Acumule mais pontos a cada reserva e troca por diárias em hotéis selecionados ou descontos exclusivos.</p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
            Ver Recompensas
          </button>
        </div>
      </div>

      <hr className="my-12 border-t-2 border-gray-200" />

      {/* Hotéis que o cliente já visitou */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Hotéis que Você Já Visitou</h2>
        {visitedHotels && visitedHotels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visitedHotels.map(hotel => (
              <RecommendedHotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            Você ainda não tem hotéis registrados como visitados. Que tal começar sua próxima aventura?
          </p>
        )}
      </section>

      <hr className="my-12 border-t-2 border-gray-200" />

      {/* Lista de Desejos (Hotéis Salvos) */}
      <section>
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Sua Lista de Desejos (Hotéis Salvos)</h2>
        {savedHotels && savedHotels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedHotels.map(hotel => (
              <div key={hotel.id} className="relative">
                <RecommendedHotelCard hotel={hotel} />
                <button
                  onClick={() => onRemoveSavedHotel(hotel.id)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-md transition duration-300"
                  title="Remover da lista de desejos"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            Sua lista de desejos está vazia. Comece a explorar nossos hotéis e salve seus favoritos!
          </p>
        )}
      </section>
    </div>
  );
}

export default MyTravelsPage;