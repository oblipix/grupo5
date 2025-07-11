
import HeroSection from '../components/HeroSection';
import DestinationsGrid from '../components/DestinationsGrid';
import HowItWorks from '../components/HowItWorks';
// Importe outras seções que você queira adicionar, como Testimonials, CallToAction, etc.

function Home() {
  return (
    <div className="home-page">
      <HeroSection />
      <DestinationsGrid />
      <HowItWorks />
      {/* Adicione outras seções aqui */}
    </div>
  );
}

export default Home;