
import React, { useState } from 'react';

// Aceita uma prop para navegar de volta para a tela de login
function ForgotPasswordPage({ onNavigateToLogin }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // Para exibir mensagens ao usuário

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação do envio de e-mail de recuperação
    console.log('Solicitação de recuperação de senha para:', email);
    setMessage('Se as credenciais estiverem corretas, um link de recuperação foi enviado para o seu email.');
    // Em uma aplicação real, aqui você faria uma chamada a um backend
    // para enviar o e-mail de recuperação.
    // Após o envio, você pode redirecionar para a tela de login ou manter a mensagem.
    // setTimeout(() => {
    //   onNavigateToLogin();
    // }, 3000); // Volta para login após 3 segundos
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full overflow-hidden">
        {/* Coluna da Esquerda: Imagem */}
        <div className="w-1/2 hidden md:block">
          <img
            src="https://picsum.photos/id/20/800/600" // Imagem de exemplo para recuperação
            alt="Cadeado e chave"
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
              <p className={`text-center text-sm ${message.includes('enviado') ? 'text-green-600' : 'text-red-600'} mt-4`}>
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
            <a
              href="#"
              onClick={onNavigateToLogin} // Volta para a tela de login
              className="font-bold text-blue-600 hover:text-blue-800 transition"
            >
              Lembrou da senha? Voltar para login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPasswordPage;