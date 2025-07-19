import React from 'react';

function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-8 mt-12 border-t border-gray-200"> {/* Removi px-6 daqui */}
      {/* O container mx-auto já está aqui, perfeito! */}
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left"> {/* Adicionei px-6 aqui */}
        {/* Logo ou Nome da Empresa */}
        <div className="mb-4 md:mb-0">
          <span className="logo">Tripz</span>
          <p className="text-gray-600 text-sm mt-1">
            &copy; {new Date().getFullYear()} Tripz. Todos os direitos reservados.
          </p>
        </div>

        {/* Links de Navegação do Footer */}
        <nav>
          <ul className="flex flex-wrap justify-center md:justify-end space-x-4 text-sm">
            <li>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Contato
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Privacidade
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Termos de Uso
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;