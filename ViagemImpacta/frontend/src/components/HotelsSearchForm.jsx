import React, { useState } from 'react';
import './SearchForms.css'

function HotelsSearchForm({ onSearch, allHotelsData }) {
    const [destination, setDestination] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [guests, setGuests] = useState(2); // Valor padrão de 2 hóspedes
    const [roomType, setRoomType] = useState('');
    const [minRating, setMinRating] = useState(0); // 0 para sem filtro
    const [maxPrice, setMaxPrice] = useState(5000); // Preço máximo padrão
    // Removido: const [selectedAmenities, setSelectedAmenities] = useState([]);

    // Removido: Coleta todas as comodidades únicas de todos os hotéis para as opções de checkbox
    // const availableAmenities = Array.from(new Set(
    //     allHotelsData.flatMap(hotel => hotel.leisureFacilities || [])
    // )).sort();

    // Coleta todos os tipos de quartos únicos de todos os hotéis para as opções de dropdown
    const availableRoomTypes = Array.from(new Set(
        allHotelsData.flatMap(hotel => hotel.roomOptions ? hotel.roomOptions.map(room => room.type) : [])
    )).sort();

    // Removido: const handleAmenityChange = (event) => {
    //     const { value, checked } = event.target;
    //     if (checked) {
    //         setSelectedAmenities(prev => [...prev, value]);
    //     } else {
    //         setSelectedAmenities(prev => prev.filter(amenity => amenity !== value));
    //     }
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch({
            destination,
            checkInDate,
            checkOutDate,
            guests,
            roomType,
            minRating: parseFloat(minRating),
            maxPrice: parseFloat(maxPrice),
            // Removido: selectedAmenities,
        });
    };

    return (
        <section>
            <div className="container mx-auto max-w-full">
                <form onSubmit={handleSubmit} className="HotelsSeachForm p-8 rounded-xl shadow-lg px-6 -mt-10 md:-mt-10 relative z-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        {/* Campo Destino */}
                        <div>
                            <label htmlFor="destination" className="labelForms">Destino</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                </span>
                                <input
                                    type="text"
                                    id="destination"
                                    placeholder="Para onde vai?"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Campo Check-in */}
                        <div>
                            <label htmlFor="check-in" className="labelForms">Check-in</label>
                            <input
                                type="date"
                                id="check-in"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                            />
                        </div>

                        {/* Campo Check-out */}
                        <div>
                            <label htmlFor="check-out" className="labelForms">Check-out</label>
                            <input
                                type="date"
                                id="check-out"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)}
                            />
                        </div>

                        {/* Campo Hóspedes */}
                        <div>
                            <label htmlFor="guests" className="labelForms">Hóspedes</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h2a2 2 0 002-2V8a2 2 0 00-2-2h-2M4 7v10m0 0h6m-6 0h-2a2 2 0 01-2-2V7a2 2 0 012-2h2m0 0h10M4 7a2 2 0 012-2h2m0 0h8a2 2 0 012 2M4 7v10m0 0h16M4 17h16"/></svg>
                                </span>
                                <input
                                    type="number"
                                    id="guests"
                                    min="1"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                                    value={guests}
                                    onChange={(e) => setGuests(parseInt(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Linha adicional para filtros mais específicos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {/* Tipo de Quarto */}
                        <div>
                            <label htmlFor="room-type" className="labelForms">Tipo de Quarto</label>
                            <select
                                id="room-type"
                                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                            >
                                <option value="">Qualquer</option>
                                {availableRoomTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        {/* Avaliação Mínima */}
                        <div>
                            <label htmlFor="min-rating" className="labelForms">Avaliação Mínima</label>
                            <select
                                id="min-rating"
                                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                                value={minRating}
                                onChange={(e) => setMinRating(e.target.value)}
                            >
                                <option value="0">Qualquer</option>
                                <option value="3">3 Estrelas ou mais</option>
                                <option value="4">4 Estrelas ou mais</option>
                                <option value="4.5">4.5 Estrelas ou mais</option>
                                <option value="5">5 Estrelas</option>
                            </select>
                        </div>

                        {/* Preço Máximo */}
                        <div>
                            <label htmlFor="max-price" className="labelForms">Preço Máximo: R$ {maxPrice.toFixed(2)}</label>
                            <input
                                type="range"
                                id="max-price"
                                min="100" // Defina um mínimo razoável
                                max="5000" // Defina um máximo razoável, baseado nos seus dados
                                step="100"
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-blue-500"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                            />
                        </div>
                    </div>

                    {/* Botão Pesquisar */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="main-action-button bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Pesquisar Hotéis
                        </button>
                    </div>
                    <p className="text-right text-blue-800 text-sm mt-4 psearchhotelsbar"> 
                        Ao continuar, estou de acordo com os <a href="#" className="underline font-bold text-blue-800">Termos de Uso</a> 
                    </p>
                </form>
            </div>
        </section>
    );
}

export default HotelsSearchForm;