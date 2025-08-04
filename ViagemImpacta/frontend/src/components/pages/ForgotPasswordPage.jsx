// src/pages/ForgotPasswordPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // 1. Importar o Link do React Router

// 2. O componente não precisa mais de props
function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Email enviado:", email);

    
    try {
      const response = await fetch('https://localhost:7010/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Se as credenciais estiverem corretas, um link de recuperação foi enviado para o seu email.');
      } else {
        setMessage('Ocorreu um erro. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro ao enviar solicitação de redefinição:', error);
      setMessage('Erro de conexão com o servidor.');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <div className="bg-white shadow-lg rounded-xl flex max-w-4xl w-full overflow-hidden my-8">
        {/* Coluna da Esquerda: Imagem */}
        <div className="w-1/2 hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=1887&auto=format&fit=crop"
            alt="Pessoa usando um laptop"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Coluna da Direita: Formulário de Recuperação */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Esqueceu sua Senha?</h2>
          <p className="text-gray-600 text-md mb-6 text-center">
            Não se preocupe! Informe seu email para enviarmos um link de recuperação.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="seuemail@exemplo.com"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {message && (
              <p className="text-center text-sm text-green-600 mt-4 bg-green-50 p-3 rounded-lg">
                {message}
              </p>
            )}

            <div className="flex items-center justify-between mt-6">
              <button
                type="submit"
                className="main-action-button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Enviar Link de Recuperação
              </button>
            </div>
          </form>

          <div className="text-center mt-6 text-sm">
            {/* 3. Substituir o <a> por um componente <Link> */}
            <Link to="/login" className="font-bold text-blue-600 hover:text-blue-800 transition">
              Lembrou da senha? Voltar para login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPasswordPage;