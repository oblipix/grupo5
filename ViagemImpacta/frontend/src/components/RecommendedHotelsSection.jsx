import React from 'react';

const RecommendedHotelsSection = ({ hotels, onHotelClick }) => {
    // Ordena os hotéis pela avaliação (maior primeiro) e pega os 3 primeiros, por exemplo
    const topRatedHotels = [...hotels].sort((a, b) => b.rating - a.rating).slice(0, 3);

    return (
        <section id="recomendado-viajantes" className="py-12 bg-gray-50 px-6">
            <div className="container mx-auto">
                <h2 className="TitleSection">
                    Hotéis Mais Avaliados <span className="text-yellow-500">★</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {topRatedHotels.map(hotel => (
                        <div key={hotel.id} className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                            <img src={hotel.mainImageUrl} alt={hotel.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="font-bold text-2xl text-gray-800 mb-2">{hotel.title}</h3>
                                {/* LINHA ALTERADA AQUI: Adicionado o ícone de localização SVG */}
                                <p className="text-gray-600 mb-3 text-lg flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-1 text-blue-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {hotel.location}
                                </p>
                                <div className="flex items-center mb-4">
                                    <span className="text-yellow-500 text-xl font-bold mr-1">{hotel.rating}</span>
                                    <span className="text-gray-500 text-lg">/ 5.0</span>
                                    <span className="ml-2 text-gray-500 text-base">({hotel.feedbacks.length} avaliações)</span>
                                </div>
                                <p className="text-gray-700 text-base mb-4 line-clamp-3">{hotel.description}</p>
                                <button
                                    onClick={() => onHotelClick(hotel.id)}
                                    className="main-action-button w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
                                >
                                    Ver Detalhes
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecommendedHotelsSection;