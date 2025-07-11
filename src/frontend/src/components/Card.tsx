
interface CardProps {
  image: string;
  title: string;
  description: string;
  // Se for ter um link para o destino, adicione:
  // link: string;
}

function Card({ image, title, description }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <button className="bg-primary-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
          Ver Detalhes
        </button>
      </div>
    </div>
  );
}

export default Card;