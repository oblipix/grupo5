import React, { useState } from 'react';

// UserSettingsModal: Modal para editar dados do usuário e foto de perfil
// Recebe props: isOpen (boolean), onClose (função para fechar), userData (dados atuais), onSave (função para salvar dados)
function UserSettingsModal({ isOpen, onClose, userData = {}, onSave }) {
  const [name, setName] = useState(userData.name || 'Nome do Usuário');
  const [email, setEmail] = useState(userData.email || 'email@exemplo.com');
  const [cep, setCep] = useState(userData.cep || '');
  const [street, setStreet] = useState(userData.street || '');
  const [avatarUrl, setAvatarUrl] = useState(userData.avatarUrl || 'https://picsum.photos/id/1005/100/100'); // Imagem de perfil padrão

  if (!isOpen) return null; // Não renderiza se não estiver aberto

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { name, email, cep, street, avatarUrl };
    onSave(updatedData); // Chama a função onSave passada pelo App.jsx
    onClose(); // Fecha o modal
  };

  // Simula upload de imagem (apenas para visualização)
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result); // Define a URL da imagem para o preview
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      onClick={onClose} // Fecha o modal ao clicar no fundo escuro
    >
      <div
        className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full transform transition-all duration-300 scale-95 opacity-0 animate-scaleIn"
        onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do modal o feche
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Configurações do Perfil</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar e Upload */}
          <div className="flex flex-col items-center mb-6">
            <img src={avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-blue-500" />
            <input
              type="file"
              accept="image/*"
              className="hidden" // Esconde o input de arquivo padrão
              id="avatarUpload"
              onChange={handleAvatarChange}
            />
            <label htmlFor="avatarUpload" className="main-action-button text-white px-4 py-2 rounded-md cursor-pointer text-sm">
              Alterar Foto
            </label>
          </div>

          {/* Campos de Texto */}
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-1">Nome:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-1">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div>
            <label htmlFor="cep" className="block text-gray-700 text-sm font-bold mb-1">CEP:</label>
            <input type="text" id="cep" value={cep} onChange={(e) => setCep(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div>
            <label htmlFor="street" className="block text-gray-700 text-sm font-bold mb-1">Rua:</label>
            <input type="text" id="street" value={street} onChange={(e) => setStreet(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancelar
            </button>
            <button type="submit"
              className="main-action-button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserSettingsModal;