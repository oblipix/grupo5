import React from 'react';

// Função auxiliar para gerar URLs de imagem aleatórias (se o mainImageUrl ou galleryImages estiverem vazios)
const generateRandomImageUrl = (id, width = 200, height = 150) => {
  return `https://picsum.photos/id/${id % 1000}/${width}/${height}`;
};

// PackageCard: Componente para exibir um card de pacote temático
// Recebe uma prop 'pkg' (objeto de pacote com title, description, imageUrl, location, eventDate, priceFrom, priceTo)
function PackageCard({ pkg }) {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 relative overflow-hidden cursor-pointer w-full md:max-w-md mx-auto">
      {/* Foto Principal do Pacote */}
      <div className="relative w-full h-64 overflow-hidden rounded-t-lg">
        <img
          src={pkg.imageUrl || generateRandomImageUrl(pkg.id, 600, 400)}
          alt={pkg.title}
          className="w-full h-full object-cover"
        />
        {/* Adicione o tema do pacote aqui, se for uma tag sobre a imagem */}
        {pkg.eventDate && (
          <span className="absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-600 text-white whitespace-nowrap z-10">
            {pkg.title.includes('Carnaval') ? 'Carnaval' : 
             pkg.title.includes('Réveillon') ? 'Ano Novo' : 
             pkg.title.includes('Natal') ? 'Fim de Ano' : 'Pacote Temático'}
          </span>
        )}
      </div>

      {/* Conteúdo Principal do Pacote */}
      <div className="p-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.title}</h3>
        <p className="text-gray-600 text-sm mb-2 flex items-center">
          <svg className="w-4 h-4 mr-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
          {pkg.location || 'Localização não informada'}
        </p>
        <p className="text-gray-700 mb-4">{pkg.description}</p>
        
        {/* Preço do Pacote */}
        <div className="flex justify-between items-center mt-auto">
            <span className="text-2xl font-bold text-blue-600">
                A partir de BRL {pkg.priceFrom ? pkg.priceFrom.toFixed(2) : 'N/A'}
            </span>
            {pkg.eventDate && (
                <span className="text-gray-600 text-sm">
                    Data: {pkg.eventDate}
                </span>
            )}
        </div>
      </div>

      {/* Miniaturas de Fotos do Pacote (Reutilizando a estrutura de galleryImages) */}
      {pkg.galleryImages && pkg.galleryImages.length > 0 && (
        <div className="px-4 pb-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {pkg.galleryImages.map((imgItem, index) => ( // imgItem pode ser um objeto {id, url, alt} ou apenas url
              <img
                key={imgItem.id || index}
                src={imgItem.url || imgItem || generateRandomImageUrl(pkg.id + index + 2000, 100, 80)}
                alt={imgItem.alt || `Miniatura do ${pkg.title} ${index + 1}`}
                className="w-20 h-16 object-cover rounded-md flex-shrink-0"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PackageCard;