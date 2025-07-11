

function HeroSection() {
  return (
    <section
      className="relative bg-cover bg-center h-[500px] md:h-[600px] flex items-center justify-center text-white"
      style={{ backgroundImage: "url('/src/assets/images/hero-image-1.jpg')" }}
      // Certifique-se de que o caminho da imagem está correto!
      // Você pode ter um carrossel de imagens aqui depois
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay escuro */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 animate-fade-in-up">
          Sua Próxima Aventura Começa Aqui
        </h1>
        <p className="text-lg md:text-xl mb-8 animate-fade-in-up delay-200">
          Descubra destinos incríveis e pacotes de viagem perfeitos para você.
        </p>
        <button className="bg-primary-blue text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105 animate-fade-in-up delay-400">
          Explorar Destinos
        </button>
      </div>
    </section>
  );
}

export default HeroSection;