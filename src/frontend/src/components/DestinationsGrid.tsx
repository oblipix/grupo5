
import Card from './Card'; // Importe o componente Card

// Dados mockados para os destinos
// No futuro, você puxará isso do seu banco de dados
interface Destination {
  id: number;
  image: string;
  title: string;
  description: string;
}

const mockDestinations: Destination[] = [
  {
    id: 1,
    image: '/src/assets/images/maldives.jpg', // Certifique-se de ter essas imagens
    title: 'Maldivas',
    description: 'Praias paradisíacas e águas cristalinas.',
  },
  {
    id: 2,
    image: '/src/assets/images/paris.jpg',
    title: 'Paris, França',
    description: 'A cidade luz, romance e cultura.',
  },
  {
    id: 3,
    image: '/src/assets/images/tokyo.jpg',
    title: 'Tóquio, Japão',
    description: 'Metrópole vibrante e tradição milenar.',
  },
  {
    id: 4,
    image: '/src/assets/images/rio.jpg',
    title: 'Rio de Janeiro, Brasil',
    description: 'Belezas naturais e alegria contagiante.',
  },
  {
    id: 5,
    image: '/src/assets/images/machu-picchu.jpg',
    title: 'Machu Picchu, Peru',
    description: 'Misticismo e história inca.',
  },
  {
    id: 6,
    image: '/src/assets/images/new-york.jpg',
    title: 'Nova York, EUA',
    description: 'A cidade que nunca dorme.',
  },
];

function DestinationsGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Destinos Populares
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockDestinations.map((destination) => (
            <Card
              key={destination.id}
              image={destination.image}
              title={destination.title}
              description={destination.description}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="bg-primary-blue text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105">
            Ver Todos os Destinos
          </button>
        </div>
      </div>
    </section>
  );
}

export default DestinationsGrid;