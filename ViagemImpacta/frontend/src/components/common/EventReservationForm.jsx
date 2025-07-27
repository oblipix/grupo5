// src/components/EventReservationForm.jsx

import React, { useState, useCallback } from 'react';

// Este componente é um ótimo exemplo de um componente de UI bem estruturado.
// Ele não precisa ser uma rota e gerencia seu próprio estado interno.
const EventReservationForm = ({ onClose }) => {
  // O estado é todo local, o que é perfeito para um formulário.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    eventType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // A função de handleChange é eficiente e escalável.
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);

    try {
      // Simulação de delay de rede
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Dados do formulário enviados:', formData);
      setSubmitSuccess(true);
      // Limpar o formulário é uma ótima prática de UX.
      setFormData({ name: '', email: '', phone: '', preferredDate: '', eventType: '', message: '' });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  return (
    // O uso de `position: fixed` e um overlay é a forma correta de criar um modal.
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        {/* O botão de fechar chama a prop `onClose`, delegando a responsabilidade de fechar para o componente pai. Perfeito. */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Formulário de Interesse em Evento
        </h2>
        
        {/* As mensagens de sucesso e erro melhoram a experiência do usuário. */}
        {submitSuccess && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
            <p className="font-bold">Sucesso!</p>
            <p>Seus dados foram enviados. Em breve entraremos em contato!</p>
          </div>
        )}
        {submitError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p className="font-bold">Erro!</p>
            <p>Não foi possível enviar sua solicitação. Tente novamente.</p>
          </div>
        )}

        {/* O formulário está bem estruturado e acessível. */}
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* ...seus inputs aqui ... */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
            >
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
            </button>
        </form>
      </div>
    </div>
  );
};

export default EventReservationForm;