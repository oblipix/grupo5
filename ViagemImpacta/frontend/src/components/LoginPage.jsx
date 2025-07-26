import React, { useState } from 'react';
import MyTravelsPage from './MyTravelsPage';
import RegisterPage from './RegisterPage';

// Componente de Login
// Aceita props para navegar para o cadastro (onNavigateToRegister) e para lidar com o sucesso do login (onLoginSuccess)
function LoginPage({ onNavigateToRegister, onLoginSuccess }) {
  // --- ESTADOS DO COMPONENTE ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Estado para armazenar mensagens de erro
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o status de carregamento

  // --- FUNÇÃO DE LOGIN ---
  // Função assíncrona que faz a chamada para a API
  const login = async (email, password) => {
    // Inicia o carregamento e limpa erros anteriores
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5155/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      // Se a resposta da API não for 'ok' (status 2xx), trata como um erro
      if (!response.ok) {
        const errorData = await response.text(); // Pega a mensagem de erro do corpo da resposta
        throw new Error(errorData || 'Falha ao fazer login. Verifique suas credenciais.');
      }

      // Se a resposta for 'ok', converte para JSON
      const data = await response.json();
      console.log('Login bem-sucedido:', data);
      return data;

    } catch (error) {
      console.error('Erro no login:', error);
      // Propaga o erro para ser tratado no handleSubmit
      throw error;
    } finally {
      // Garante que o estado de carregamento seja desativado ao final da chamada
      setIsLoading(false);
    }
  };

  // --- HANDLER PARA SUBMISSÃO DO FORMULÁRIO ---
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)

    try {
      // Chama a função de login e aguarda o resultado
      const loginData = await login(email, password);
      // Se o login for bem-sucedido, chama a função onLoginSuccess passada via props
      if (onLoginSuccess) {
        onLoginSuccess(loginData);
      }
      alert('Login realizado com sucesso!'); // Feedback para o usuário

    } catch (err) {
      // Se ocorrer um erro na função login, atualiza o estado de erro
      setError(err.message);
    }
  };

  // --- HANDLER PARA "ESQUECEU A SENHA" ---
  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert('Link de recuperação de senha enviado para o seu email (funcionalidade simulada)!');
  };

  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white shadow-2xl rounded-xl flex max-w-4xl w-full overflow-hidden my-8">
        {/* Coluna da Esquerda: Imagem */}
        <div className="w-1/2 hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1524686612423-3d942a9615e8?q=80&w=1887&auto=format&fit=crop"
            alt="Vista da janela do avião"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src='https://picsum.photos/id/10/800/600'; }}
          />
        </div>

        {/* Coluna da Direita: Formulário de Login */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Login
          </h2>
          <p className="text-gray-600 text-sm mb-8 text-center">
            Bem-vindo de volta! Por favor, insira suas credenciais.
          </p>

          {/* Formulário com o handler de submissão */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="seuemail@exemplo.com"
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Exibição da mensagem de erro */}
            {error && (
              <p className="text-red-500 text-xs italic text-center bg-red-100 p-2 rounded-lg">{error}</p>
            )}

            <div className="flex items-center justify-between mt-4">
              <a
                href="#"
                onClick={handleForgotPassword}
                className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800 transition"
              >
                Esqueceu sua senha?
              </a>
            </div>

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={isLoading} // Desabilita o botão durante o carregamento
              className="main-action-button w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                // Animação de carregamento simples
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="text-center mt-8 text-sm">
            <p className="text-gray-600">Não tem uma conta?</p>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigateToRegister(); }}
              className="font-bold text-blue-600 hover:text-blue-800 transition"
            >
              Cadastrar-se
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- COMPONENTE PRINCIPAL DA APLICAÇÃO (EXEMPLO DE USO) ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('login'); // 'login' ou 'register'
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ ADICIONANDO ESTE ESTADO
  const [loggedInUser, setLoggedInUser] = useState(null); // ✅ ADICIONANDO ESTE ESTADO
  const handleNavigateToRegister = () => {
    setCurrentPage('register');
    console.log("Navegando para a página de registro...");
  };

  const handleNavigateToLogin = () => {
    setCurrentPage('login');
    console.log("Navegando para a página de login...");
  };

  // Esta é a versão correta, do seu App.js completo
  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setLoggedInUser(userData);
    // ✅ Esta é a linha que faz o redirecionamento
    setCurrentPage('MyTravelsPage'); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Renderiza a página atual com base no estado
  switch (currentPage) {
    case 'login':
      return <LoginPage onNavigateToRegister={handleNavigateToRegister} onLoginSuccess={handleLoginSuccess} />;
    case 'register':
      return <RegisterPage onNavigateToLogin={handleNavigateToLogin} />;
    case 'MyTravelsPage':
      return <MyTravelsPage loggedInUser={loggedInUser} onLogout={() => {
        setIsLoggedIn(false);
        setLoggedInUser(null);
        setCurrentPage('login');
      }} />;
    default:
      return <LoginPage onNavigateToRegister={handleNavigateToRegister} onLoginSuccess={handleLoginSuccess} />;
  }
}
