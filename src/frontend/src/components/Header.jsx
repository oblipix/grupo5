import React, { useState } from 'react';

// === MUDANÇA AQUI: Adicionadas onNavigateToMyTravels e onNavigateToHome nas props ===
function Header({ onSearch, onNavigateToMyTravels, onNavigateToHome }) { 
  const [searchTerm, setSearchTerm] = useState('');

  // Função chamada ao clicar na lupa ou pressionar Enter (para buscar)
  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Previne o comportamento padrão de recarregar a página
    if (searchTerm.trim()) {
      console.log('Iniciando busca por:', searchTerm);
      onSearch(searchTerm); // Chama a função de busca passada do App.jsx
      setSearchTerm(''); // Limpa o campo de busca
    } else {
      console.log("Termo de busca vazio.");
      onSearch(''); // Limpa a busca no componente pai se o campo estiver vazio
    }
  };

  // Lida com a mudança no input de busca
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Lida com a tecla pressionada no input (para buscar com Enter)
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit(event); // Reutiliza a função de submit
    }
  };

  return (
    <header className="w-full bg-white shadow-md py-4 sticky top-0 z-20">
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo - Clicável para ir para a Home */}
        <div 
          className="flex items-center cursor-pointer"
          onClick={onNavigateToHome} // === CLIQUE NO LOGO PARA IR PARA A HOME ===
        >
          <span className="text-2xl font-bold text-blue-600">Tripz</span>
        </div>

        {/* Barra de Busca */}
        <form onSubmit={handleSearchSubmit} className="flex-grow flex justify-center mx-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            <button
              type="submit" // Mudado para type="submit" para que o form funcione com Enter
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
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
        </form>

        {/* Navegação Principal */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              {/* Link "Início" - Clicável para ir para a Home */}
              <button 
                onClick={onNavigateToHome} 
                className="text-gray-700 hover:text-blue-600 font-medium focus:outline-none"
              >
                Início
              </button>
            </li>
            <li>
              {/* Link "Minhas Viagens" - Clicável para ir para Login (ou MyTravels se logado) */}
              <button 
                onClick={onNavigateToMyTravels} // === CLIQUE PARA IR PARA LOGIN/MINHAS VIAGENS ===
                className="text-gray-700 hover:text-blue-600 font-medium focus:outline-none"
              >
                Minhas Viagens
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;