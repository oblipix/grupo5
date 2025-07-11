

function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Como Funciona
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Passo 1 */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <div className="text-primary-blue text-5xl mb-4">
              <i className="fas fa-search"></i> {/* Ícone de busca */}
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">1. Encontre seu Destino</h3>
            <p className="text-gray-600">
              Explore nossa vasta seleção de destinos e pacotes de viagem.
            </p>
          </div>

          {/* Passo 2 */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <div className="text-primary-blue text-5xl mb-4">
              <i className="fas fa-book-open"></i> {/* Ícone de reserva */}
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">2. Reserve com Facilidade</h3>
            <p className="text-gray-600">
              Processo de reserva simples e seguro em poucos cliques.
            </p>
          </div>

          {/* Passo 3 */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <div className="text-primary-blue text-5xl mb-4">
              <i className="fas fa-plane-departure"></i> {/* Ícone de avião */}
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">3. Viaje e Aproveite</h3>
            <p className="text-gray-600">
              Desfrute de uma experiência de viagem inesquecível.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;