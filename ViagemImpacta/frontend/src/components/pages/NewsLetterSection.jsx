// src/components/NewsletterSection.jsx

import React, { useState } from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import '../styles/NewsletterSection.css'; // Mantenha a importação para outros estilos

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Por favor, insira um e-mail.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    // Simulação de envio para API
    setTimeout(() => {
      setIsSubmitted(true);
      setEmail('');
    }, 1000);
  };

  return (
    // Adicione a classe 'bg' se for o background que você definiu no CSS
    <section className="bg-blue-600 py-12 px-6 bg"> 
      <div className="container mx-auto max-w-4xl text-center">
        <div className="flex items-center justify-center mb-6">
          <EnvelopeIcon className="h-12 w-12 text-blue-700" />
        </div>
        <h2 className="text-3xl font-bold text-blue-900 mb-4">
          Receba Ofertas Exclusivas
        </h2>
        <p className="text-blue-800 mb-8">
          Inscreva-se em nossa newsletter e receba promoções especiais, 
          dicas de viagem e novidades em primeira mão!
        </p>

        {isSubmitted ? (
          <div className="bg-green-500 text-white p-4 rounded-lg inline-block">
            Obrigado por se inscrever! Em breve você receberá nossas novidades.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                // <<<<<<<<<<<< CLASSES TAILWIND AJUSTADAS AQUI >>>>>>>>>>>>
                // Removido 'newsletter-input' (não é necessário se o CSS foi limpo)
                // Usando bg-white para o fundo do input
                // focus:border-blue-500 para uma borda azul clara no focus (não 'ring')
                // focus:ring-blue-500 para um ring azul claro no focus
                // shadow-md para uma sombra suave
                // text-gray-800 para a cor do texto padrão
                className="bg-white flex-grow px-19 py-3 rounded-lg border border-gray-300
                           focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500
                           shadow-sm text-gray-800 placeholder-gray-500 transition-all duration-200"
              />
              <button
                type="submit"
                // Adicione a classe 'insc-action-button' se você quiser o gradiente
                className="text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 insc-action-button"
              >
                Inscrever-se
              </button>
            </div>
            {error && (
              <p className="text-red-300 mt-2 text-sm">{error}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;