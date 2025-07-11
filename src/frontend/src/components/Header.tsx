
import { Link } from 'react-router-dom';
// Importe seu logo aqui se tiver um arquivo de imagem
// import Logo from '../assets/images/logo.png'; // Exemplo

function Header() {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo ou Nome do Site */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          {/* Se tiver um logo de imagem, descomente e ajuste: */}
          {/* <img src={Logo} alt="Viagem.com Logo" className="h-8" /> */}
          Viagem.com
        </Link>

        {/* Navegação Principal */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-primary-blue transition duration-300">Início</Link>
          <Link to="/destinos" className="text-gray-600 hover:text-primary-blue transition duration-300">Destinos</Link>
          <Link to="/pacotes" className="text-gray-600 hover:text-primary-blue transition duration-300">Pacotes</Link>
          <Link to="/sobre" className="text-gray-600 hover:text-primary-blue transition duration-300">Sobre Nós</Link>
          <Link to="/contato" className="text-gray-600 hover:text-primary-blue transition duration-300">Contato</Link>
        </nav>

        {/* Botões de Login/Cadastro */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Cadastre-se
          </Link>
        </div>

       

        <div className="md:hidden">
          {/* Ícone de menu */}
          <button className="text-gray-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;