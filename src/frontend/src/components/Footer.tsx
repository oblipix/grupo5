
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-8 mt-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Coluna 1: Sobre Nós */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Viagem.com</h3>
          <p className="text-gray-400 text-sm">
            Seu portal para as melhores aventuras e destinos inesquecíveis ao redor do mundo.
          </p>
        </div>

        {/* Coluna 2: Links Rápidos */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Links Rápidos</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-400 hover:text-white transition duration-300 text-sm">Início</Link></li>
            <li><Link to="/destinos" className="text-gray-400 hover:text-white transition duration-300 text-sm">Destinos</Link></li>
            <li><Link to="/pacotes" className="text-gray-400 hover:text-white transition duration-300 text-sm">Pacotes</Link></li>
            <li><Link to="/blog" className="text-gray-400 hover:text-white transition duration-300 text-sm">Blog</Link></li>
            <li><Link to="/faq" className="text-gray-400 hover:text-white transition duration-300 text-sm">FAQ</Link></li>
          </ul>
        </div>

        {/* Coluna 3: Contato */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contato</h3>
          <p className="text-gray-400 text-sm">Email: contato@viagem.com</p>
          <p className="text-gray-400 text-sm">Telefone: (XX) XXXX-XXXX</p>
          <div className="flex space-x-4 mt-4">
            {/* Ícones de redes sociais (ex: Font Awesome ou SVG) */}
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Viagem.com. Todos os direitos reservados.
      </div>
    </footer>
  );
}

export default Footer;