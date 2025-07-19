import React, { useState } from 'react';

// Aceita uma prop para navegar de volta para a tela de login
function RegisterPage({ onNavigateToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    // Lógica de registro simulada
    console.log('Tentativa de Cadastro:', { email, password });
    alert('Cadastro realizado com sucesso! Faça login para continuar.');
    onNavigateToLogin(); // Volta para a tela de login após o cadastro
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full overflow-hidden">
        {/* Coluna da Esquerda: Imagem */}
        <div className="w-1/2 hidden md:block">
          <img
            src="https://picsum.photos/id/11/800/600" // Imagem de exemplo
            alt="Sinalização de destinos"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Coluna da Direita: Formulário de Cadastro */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Cadastro</h2>
          <p className="text-gray-600 text-sm mb-6 text-center">
            Crie sua conta para começar a explorar o mundo!
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
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Senha
              </label>
              <input
                type="password"
                id="password"
                placeholder="********"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                Confirmar Senha
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="********"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="main-action-button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Cadastre-se
              </button>
            </div>
          </form>

          <div className="text-center mt-6 text-sm">
            <a
              href="#"
              onClick={onNavigateToLogin} // Volta para a tela de login
              className="font-bold text-blue-600 hover:text-blue-800 transition"
            >
              Já tem uma conta? Faça login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;