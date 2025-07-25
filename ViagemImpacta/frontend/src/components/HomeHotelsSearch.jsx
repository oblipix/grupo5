// src/components/HotelSearchForm.js
import React, { useState } from 'react';

const HotelSearchForm = ({ onSearch }) => {
    // Definir a data atual como valor mínimo para check-in
    const today = new Date().toISOString().split('T')[0];

    const [destination, setDestination] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(2); // Valor padrão: 2 adultos
    const [minRating, setMinRating] = useState(0); // Avaliação mínima em estrelas
    const [maxPrice, setMaxPrice] = useState(5000); // Preço máximo (ajuste conforme seu range de preços em allHotelsData)
    const [amenities, setAmenities] = useState({
        hasWifi: false,
        hasParking: false,
        hasRestaurant: false,
        hasPool: false,
        hasGym: false,
        hasSpa: false,
        hasKidsArea: false, // Adicionada esta comodidade
    });
    const [roomType, setRoomType] = useState('all'); // 'all', 'couple', 'family', 'premium'

    const handleAmenityChange = (e) => {
        setAmenities({
            ...amenities,
            [e.target.name]: e.target.checked,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validação básica de datas (mantida)
        if (checkIn && checkOut && new Date(checkIn) > new Date(checkOut)) {
            alert('A data de Check-in não pode ser posterior à data de Check-out.');
            return;
        }

        const searchCriteria = {
            destination,
            checkIn,
            checkOut,
            guests,
            minRating,
            maxPrice,
            amenities,
            roomType,
        };
        onSearch(searchCriteria);
        console.log("Critérios de busca de hotéis:", searchCriteria);
    };

    return (
        <section className="bg-white rounded-t-[50px] shadow-lg -mt-10 md:-mt-18 relative z-20 py-8 px-6">
            <div className="container mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Linha de seleção Um Hotel / Múltiplos Hotéis (mantida desabilitada) */}
                    <div className="flex items-center space-x-4 mb-6">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="hotelType"
                                value="single"
                                defaultChecked
                                className="form-radio text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">Um Hotel</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="hotelType"
                                value="multiple"
                                disabled
                                className="form-radio text-blue-600 opacity-50 cursor-not-allowed"
                            />
                            <span className="ml-2 text-gray-700">Múltiplos Hotéis</span>
                        </label>
                    </div>

                    {/* Campos de Destino, Check-in, Check-out, Passageiros */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Destino</label>
                            <input
                                type="text"
                                id="destination"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Para onde vai?"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                            <input
                                type="date"
                                id="checkIn"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                min={today}
                            />
                        </div>
                        <div>
                            <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                            <input
                                type="date"
                                id="checkOut"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                min={checkIn || today}
                            />
                        </div>
                        <div>
                            <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Passageiros</label>
                            <select
                                id="guests"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={guests}
                                onChange={(e) => setGuests(Number(e.target.value))}
                            >
                                {[...Array(10).keys()].map(i => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1} {i + 1 === 1 ? 'Pessoa' : 'Pessoas'}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Linha de Avaliação e Preço Máximo */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="minRating" className="block text-sm font-medium text-gray-700 mb-1">Avaliação Mínima (estrelas)</label>
                            <select
                                id="minRating"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={minRating}
                                onChange={(e) => setMinRating(Number(e.target.value))}
                            >
                                <option value="0">Qualquer</option>
                                <option value="1">1 estrela ou mais</option>
                                <option value="2">2 estrelas ou mais</option>
                                <option value="3">3 estrelas ou mais</option>
                                <option value="4">4 estrelas ou mais</option>
                                <option value="4.5">4.5 estrelas ou mais</option>
                                <option value="5">5 estrelas</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">Preço Máximo (R$)</label>
                            <input
                                type="range"
                                id="maxPrice"
                                min="100"
                                max="10000" // Ajuste este max conforme o maior preço em allHotelsData
                                step="100"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                className="mt-2 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-thumb-blue"
                            />
                            <p className="text-right text-sm text-gray-600">Até R$ {maxPrice.toLocaleString('pt-BR')}</p>
                        </div>
                    </div>

                    {/* Comodidades (checkboxes) */}
                    <div>
                        <span className="block text-sm font-medium text-gray-700 mb-2">Comodidades</span>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name="hasWifi"
                                    checked={amenities.hasWifi}
                                    onChange={handleAmenityChange}
                                    className="form-checkbox text-blue-600 rounded"
                                />
                                <span className="ml-2 text-gray-700">Wi-Fi</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name="hasParking"
                                    checked={amenities.hasParking}
                                    onChange={handleAmenityChange}
                                    className="form-checkbox text-blue-600 rounded"
                                />
                                <span className="ml-2 text-gray-700">Estacionamento</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name="hasRestaurant"
                                    checked={amenities.hasRestaurant}
                                    onChange={handleAmenityChange}
                                    className="form-checkbox text-blue-600 rounded"
                                />
                                <span className="ml-2 text-gray-700">Restaurante</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name="hasPool"
                                    checked={amenities.hasPool}
                                    onChange={handleAmenityChange}
                                    className="form-checkbox text-blue-600 rounded"
                                />
                                <span className="ml-2 text-gray-700">Piscina</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name="hasGym"
                                    checked={amenities.hasGym}
                                    onChange={handleAmenityChange}
                                    className="form-checkbox text-blue-600 rounded"
                                />
                                <span className="ml-2 text-gray-700">Academia</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name="hasSpa"
                                    checked={amenities.hasSpa}
                                    onChange={handleAmenityChange}
                                    className="form-checkbox text-blue-600 rounded"
                                />
                                <span className="ml-2 text-gray-700">Spa</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name="hasKidsArea"
                                    checked={amenities.hasKidsArea}
                                    onChange={handleAmenityChange}
                                    className="form-checkbox text-blue-600 rounded"
                                />
                                <span className="ml-2 text-gray-700">Área Kids</span>
                            </label>
                        </div>
                    </div>

                    {/* Tipo de Acomodação */}
                    <div>
                        <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Acomodação</label>
                        <select
                            id="roomType"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                        >
                            <option value="all">Todos</option>
                            <option value="couple">Quarto Casal</option>
                            <option value="family">Quarto Família</option>
                            <option value="premium">Suíte/Quarto Luxo</option>
                            {/* Adicione mais opções conforme seus `roomOptions.type` */}
                        </select>
                    </div>

                    {/* Botão de Pesquisar */}
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
                        >
                            Pesquisar Hotéis
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default HotelSearchForm;