/* eslint-disable no-unused-vars */
// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate
import { useAuth } from '../context/AuthContext'; // Caminho correto para o contexto

function LoginPage() {
    // Obter a função de login do contexto
    const { login } = useAuth();
    const navigate = useNavigate(); // Hook para navegação programática

    // O estado local agora é apenas para o formulário
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Chamar a função de login do contexto (que já faz a requisição e redireciona)
            await login(email, password);
            // Se o login for bem-sucedido, o redirecionamento já é feito dentro da função de login no contexto!
            // Não precisa de alert('Login realizado com sucesso!'); aqui, pois a navegação já indica sucesso.
        } catch (err) {
            // Se o login falhar, o erro lançado pelo contexto é pego aqui
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        // Navegação para a página de recuperação de senha
        navigate('/forgot-password'); // Agora usa navigate
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
            <div className="bg-white shadow-2xl rounded-xl flex max-w-4xl w-full overflow-hidden my-8">
                {/* Coluna da Esquerda: Imagem */}
                <div className="w-1/2 hidden md:block">
                    <img
                        src="https://images.unsplash.com/photo-1524686612423-3d942a9615e8?q=80&w=1887&auto=format&fit=crop"
                        alt="Vista da janela do avião"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/id/10/800/600'; }}
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
                            <Link // Usando Link para navegação
                                to="/forgot-password" // Rota para a página de recuperação de senha
                                className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800 transition"
                            >
                                Esqueceu sua senha?
                            </Link>
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
                        <Link // Usando Link para navegação
                            to="/register" // Rota para a página de cadastro
                            className="font-bold text-blue-600 hover:text-blue-800 transition"
                        >
                            Cadastrar-se
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;