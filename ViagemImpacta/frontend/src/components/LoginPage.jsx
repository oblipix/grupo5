import React, { useState } from 'react';

// Aceita uma prop para navegar para a tela de cadastro
function LoginPage({ onNavigateToRegister, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticação simulada
    console.log('Tentativa de Login:', { email, password });
    if (email === 'teste@email.com' && password === '123456') {
      alert('Login bem-sucedido!');
      onLoginSuccess(); // Notifica o App.jsx que o login foi feito
    } else {
      alert('Email ou senha incorretos.');
    }
  };

 const handleForgotPassword = (e) => {
   e.preventDefault();
   alert('Link de recuperação de senha enviado para o seu email (funcionalidade simulada)!');
   // Em uma aplicação real, aqui você redirecionaria para uma página de "Recuperar Senha"
   // ou dispararia uma API para enviar o email de recuperação.
 };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full overflow-hidden">
        {/* Coluna da Esquerda: Imagem */}
        <div className="w-1/2 hidden md:block">
          <img
            src="https://picsum.photos/id/10/800/600" // Imagem de exemplo
            alt="Vista da janela do avião"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Coluna da Direita: Formulário de Login */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>
          <p className="text-gray-600 text-sm mb-6 text-center">
            Bem-vindo de volta! Por favor, insira suas credenciais.
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
            <div className="flex items-center justify-between mt-2"> {/* Ajustei mt-2 para dar mais espaço */}
             {/* Link Esqueceu Senha? */}
             <a
               href="#"
               onClick={handleForgotPassword}
               className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800 transition"
             >
               Esqueceu sua senha?
             </a>

               <button
                 type="submit"
                 className="main-action-button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
               >
                 Login
               </button>
             </div>
           </form>

           <div className="text-center mt-6 text-sm">
             <p className="text-gray-600">Não tem uma conta?</p>
             <a
               href="#"
               onClick={onNavigateToRegister} // Navega para a tela de cadastro
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

 export default LoginPage;