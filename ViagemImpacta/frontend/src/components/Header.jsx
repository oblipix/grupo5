import React from 'react';

function Header({ onNavigateToMyTravels, onNavigateToHome, onNavigateToInstitutional, currentPage }) {
  
  const getButtonClasses = (pageName) => {
    let isActive = currentPage === pageName;

    // Condição especial para o botão 'Minhas Viagens'
    if (pageName === 'myTravels') {
      isActive = ['myTravels', 'login', 'register'].includes(currentPage);
    }

    // ✅ Lógica atualizada para usar a nova classe CSS para o efeito
    return `
      buttonHeader 
      text-gray-300 hover:text-white 
      font-medium focus:outline-none 
      transition-colors duration-300
      ${isActive ? 'active-link' : ''}
    `;
  };

  return (
    <header className="w-full bg-slate-900 shadow-lg py-4 sticky top-0 z-50">
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        <div
          className="flex items-center cursor-pointer"
          onClick={onNavigateToHome}
        >
          <span className="logo">
            Tripz
          </span>
        </div>

        <nav>
          <ul className="flex items-center space-x-8">
            <li>
              <button
                onClick={onNavigateToHome}
                className={getButtonClasses('home')}
              >
                Início
              </button>
            </li>
            
            <li>
              <button
                onClick={onNavigateToInstitutional}
                className={getButtonClasses('institutional')}
              >
                Institucional
              </button>
            </li>

            <li>
              <button
                onClick={onNavigateToMyTravels}
                className={getButtonClasses('myTravels')}
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