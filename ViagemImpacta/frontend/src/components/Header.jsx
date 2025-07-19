import React from 'react'; // Não precisamos mais de useState aqui

// === ATUALIZADO: Removido onSearch, Adicionado onNavigateToFlights e currentPage nas props ===
function Header({ onNavigateToMyTravels, onNavigateToHome,  currentPage }) {
  // REMOVIDO: const [searchTerm, setSearchTerm] = useState('');

  // REMOVIDAS: handleSearchSubmit, handleSearchChange, handleKeyDown

  return (
    <header className="w-full bg-white shadow-md py-4 sticky top-0 z-20">
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo - Clicável para ir para a Home */}
        <div
          className="flex items-center cursor-pointer"
          onClick={onNavigateToHome} // === CLIQUE NO LOGO PARA IR PARA A HOME ===
        >
          <span className="logo">Tripz</span>
        </div>

        {/* REMOVIDO: Barra de Busca (o <form> completo com input e botão de busca) */}

        {/* Navegação Principal */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              {/* Link "Início" - Clicável para ir para a Home */}
              <button
                onClick={onNavigateToHome}
                className={`text-gray-700 hover:text-blue-600 font-medium focus:outline-none ${currentPage === 'home' ? 'text-blue-600' : ''}`}
              >
                Início
              </button>
            </li>
            
            <li>
              {/* Link "Minhas Viagens" - Clicável para ir para Login (ou MyTravels se logado) */}
              <button
                onClick={onNavigateToMyTravels} // === CLIQUE PARA IR PARA LOGIN/MINHAS VIAGENS ===
                className={`text-gray-700 hover:text-blue-600 font-medium focus:outline-none ${currentPage === 'myTravels' || currentPage === 'login' || currentPage === 'register' ? 'text-blue-600' : ''}`}
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