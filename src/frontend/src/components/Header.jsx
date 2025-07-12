import React, { useState } from 'react';

// Aceita a prop 'onSearch' que é a função de busca vinda do App.jsx
function Header({ onSearch }) { 
  const [searchTerm, setSearchTerm] = useState(''); // Estado local para o texto do input

  // Função chamada ao clicar na lupa ou pressionar Enter
  const handleSearch = () => {
    if (searchTerm.trim()) { // Verifica se há algo além de espaços em branco
      console.log('Iniciando busca por:', searchTerm); // Log para depuração
      // === PONTO CRUCIAL: Chama a função onSearch passada do App.jsx ===
      onSearch(searchTerm); // Passa o termo de busca para o componente pai
      setSearchTerm(''); // Limpa o campo de busca após a ação
    } else {
      console.log("Termo de busca vazio. Nenhuma ação será realizada.");
      // Se a busca estiver vazia, pode limpar os resultados existentes no pai
      onSearch(''); // Chama onSearch com string vazia para resetar resultados
    }
  };

  // Lida com a tecla pressionada no input
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch(); // Ativa a busca se a tecla for Enter
    }
  };

  return (
    <header className="w-full bg-white shadow-md py-4">
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-2xl font-bold text-blue-600">Tripz</span>
        </div>

        {/* Barra de Busca */}
        <div className="flex-grow flex justify-center mx-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado ao digitar
              onKeyDown={handleKeyDown} // Detecta a tecla Enter
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
              onClick={handleSearch} // Ativa a busca ao clicar na lupa
              aria-label="Search"
            >
              {/* Ícone de Lupa (SVG) */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Navegação Principal */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
                Início
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
                Minhas Viagens
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;