/* eslint-disable no-unused-vars */
// src/components/NewsletterSection.jsx
import React, { useState } from 'react';

function NewsletterSection() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage(''); // Limpa mensagens anteriores
        setIsSubmitting(true);

        // Simula uma chamada de API
        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simula delay de rede
            if (email.includes('@') && email.includes('.')) {
                setMessage('Obrigado por se inscrever! Em breve você receberá nossas novidades.');
                setEmail(''); // Limpa o campo de e-mail
            } else {
                setMessage('Por favor, insira um e-mail válido.');
            }
        } catch (error) {
            setMessage('Ocorreu um erro. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="NewsLetterSection text-blue-900 py-16 px-6 shadow-lg">
            <div className="container mx-auto text-center max-w-full">
                <h2 className="text-2xl font-bold mb-4">Receba Nossas Melhores Ofertas!</h2>
                <p className="text-1xl mb-8 opacity-90 max-w-2xl mx-auto">
                    Assine nossa newsletter e seja o primeiro a saber sobre promoções exclusivas, novos destinos e dicas de viagem imperdíveis.
                </p>
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
                    <input
                        type="email"
                        placeholder="Seu melhor e-mail aqui..."
                        className="flex-grow p-3 rounded-lg border-2 border-white focus:outline-none focus:border-blue-300 bg-white bg-opacity-20 text-gray-800 placeholder-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="event-submit bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Enviando...' : 'Assinar Agora'}
                    </button>
                </form>
                {message && (
                    <p className={`mt-4 text-sm font-medium ${message.includes('Obrigado') ? 'text-green-200' : 'text-red-200'}`}>
                        {message}
                    </p>
                )}
            </div>
        </section>
    );
}

export default NewsletterSection;