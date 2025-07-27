// src/components/UserSettingsModal.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

function UserSettingsModal({ isOpen, onClose }) {
  const { currentUser, updateUser } = useAuth();
  const [formData, setFormData] = useState(currentUser || {});

  useEffect(() => {
    if (currentUser) {
      setFormData(currentUser);
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateUser(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">Configurações do Perfil</h2>
        
        <div className="flex flex-col items-center mb-6">
          <img src={formData.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-blue-500" />
          <input type="file" accept="image/*" className="hidden" id="avatarUpload" onChange={handleAvatarChange} />
          <label htmlFor="avatarUpload" className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer text-sm hover:bg-blue-700">
            Alterar Foto
          </label>
        </div>

        <label>Nome:</label>
        <input name="name" value={formData.name || ''} onChange={handleChange} className="border p-2 w-full mb-4 rounded"/>
        
        <label>Email:</label>
        <input name="email" value={formData.email || ''} onChange={handleChange} className="border p-2 w-full mb-4 rounded"/>
        
        {/* Adicione outros campos aqui se necessário */}

        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Cancelar</button>
          <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Salvar</button>
        </div>
      </div>
    </div>
  );
}

export default UserSettingsModal;
