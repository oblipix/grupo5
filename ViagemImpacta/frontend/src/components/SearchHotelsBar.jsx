import React, { useState, useRef, useEffect } from 'react';
import './SearchForms.css'; // Importando o CSS específico para este componente

// Ícones SVG (mantidos como estavam)
const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const MoneyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
    </svg>
);

const RoomTypeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 12a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zM4 19a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z" />
    </svg>
);

const StarIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5 text-gray-400"} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
    </svg>
);

const roomGuestOptions = [
    { rooms: 1, adults: 1, children: 0, label: "1 Quarto, 1 adulto" },
    { rooms: 1, adults: 2, children: 0, label: "1 Quarto, 2 adultos (Casal)" },
    { rooms: 1, adults: 2, children: 1, label: "1 Quarto, 2 adultos, 1 criança" },
    { rooms: 1, adults: 2, children: 2, label: "1 Quarto, 2 adultos, 2 crianças (Família)" },
    { rooms: 1, adults: 3, children: 0, label: "1 Quarto, 3 adultos" },
    { rooms: 1, adults: 4, children: 0, label: "1 Quarto, 4 adultos" },
];

// O Wi-Fi Grátis é um BÔNUS fixo
const BONUS_WIFI = "Wi-Fi Grátis"; 

// Estas são APENAS as comodidades que o usuário pode selecionar com um checkbox
const selectableAmenityOptions = [ 
    "Bar",
    "Piscina",
    "Serviço de Quarto",
    "Academia",
    "Acessibilidade",
    "Estacionamento",
    "Piscina Aquecida",
    "Aceita Animais",
    "Sala de Cinema",
    "Restaurante",
    "Jardim Amplo",
];

const roomTypeOptions = [
    "Standard",
    "Luxo",
    "Com Lareira",
    "Suíte Presidencial",
    "Familiar",
    "Adaptado para Deficientes",
];

function SearchHotelsBar({ onSearch }) {
    const initialDestination = '';
    const initialGuestsInfo = roomGuestOptions[1];
    const initialPriceRange = 5000;
    const initialSelectedAmenities = []; 
    const initialSelectedRoomType = roomTypeOptions[0];

    const [destination, setDestination] = useState(initialDestination);
    const [guestsInfo, setGuestsInfo] = useState(initialGuestsInfo);
    const [priceRange, setPriceRange] = useState(initialPriceRange);
    const [selectedAmenities, setSelectedAmenities] = useState(initialSelectedAmenities);
    const [selectedRoomType, setSelectedRoomType] = useState(initialSelectedRoomType);
    
    const [isAmenitiesDropdownOpen, setIsAmenitiesDropdownOpen] = useState(false);
    const amenitiesDropdownRef = useRef(null);

    const minPrice = 0;
    const maxOverallPrice = 10000;

    const handleAmenityChange = (amenity) => {
        setSelectedAmenities((prevAmenities) =>
            prevAmenities.includes(amenity)
                ? prevAmenities.filter((a) => a !== amenity)
                : [...prevAmenities, amenity]
        );
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (amenitiesDropdownRef.current && !amenitiesDropdownRef.current.contains(event.target)) {
                setIsAmenitiesDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [amenitiesDropdownRef]);

    const handleClearSearch = () => {
        setDestination(initialDestination);
        setGuestsInfo(initialGuestsInfo);
        setPriceRange(initialPriceRange);
        setSelectedAmenities(initialSelectedAmenities);
        setSelectedRoomType(initialSelectedRoomType);
    };

    const handleSearch = () => {
        const searchParams = {
            destination,
            guestsInfo,
            priceRange,
            amenities: [BONUS_WIFI, ...selectedAmenities], 
            roomType: selectedRoomType,
        };
        onSearch(searchParams);
    };

    const getAmenitiesDisplayText = () => {
        const totalSelected = selectedAmenities.length; 
        if (totalSelected === 0) {
            return "Selecione comodidades...";
        } else if (totalSelected === selectableAmenityOptions.length) { 
            return "Todas as comodidades selecionadas";
        } else if (totalSelected === 1) {
            return selectedAmenities[0];
        } else {
            return `${totalSelected} comodidades selecionadas`;
        }
    };

    return (
        <div className="searchHotelsBar p-4 rounded-b-lg shadow-md">
            <div className="max-w-6xl mx-auto py-4 px-6">
                {/* Campos de Busca - Linha 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Destino */}
                    <div className="flex flex-col">
                        <label className="labelForms mb-1">Destino</label>
                        <div className="relative flex items-center bg-white rounded-lg px-3 py-2 shadow-sm">
                            <LocationIcon />
                            <input
                                type="text"
                                placeholder="Para onde vai?"
                                className="flex-grow pl-2 bg-transparent focus:outline-none text-gray-800 placeholder-gray-500"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Passageiros */}
                    <div className="flex flex-col">
                        <label className="labelForms mb-1">Passageiros</label>
                        <div className="relative flex items-center bg-white rounded-lg px-3 py-2 shadow-sm">
                            <UserIcon />
                            <select
                                className="flex-grow pl-2 bg-transparent focus:outline-none text-gray-800 cursor-pointer appearance-none w-full"
                                value={guestsInfo.label}
                                onChange={(e) => setGuestsInfo(roomGuestOptions.find(option => option.label === e.target.value))}
                            >
                                {roomGuestOptions.map((option, index) => (
                                    <option key={index} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 ml-2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Tipo de Quarto */}
                    <div className="flex flex-col">
                        <label className="labelForms mb-1">Tipo de Quarto</label>
                        <div className="relative flex items-center bg-white rounded-lg px-3 py-2 shadow-sm">
                            <RoomTypeIcon />
                            <select
                                className="flex-grow pl-2 bg-transparent focus:outline-none text-gray-800 cursor-pointer appearance-none w-full"
                                value={selectedRoomType}
                                onChange={(e) => setSelectedRoomType(e.target.value)}
                            >
                                {roomTypeOptions.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 ml-2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Comodidades - SEÇÃO AJUSTADA PARA BÔNUS E SELEÇÃO EM GRID */}
                <div className="flex flex-col mb-6">
                    <label className="labelForms mb-1">Comodidades</label>
                    <div className="relative" ref={amenitiesDropdownRef}>
                        {/* Botão/Campo que abre o dropdown */}
                        <div
                            className="amenities-dropdown-trigger relative flex items-center bg-white rounded-lg px-3 py-2 shadow-sm cursor-pointer"
                            onClick={() => setIsAmenitiesDropdownOpen(!isAmenitiesDropdownOpen)}
                        >
                            {/* Ícone de estrela no trigger (como nos outros campos) */}
                            <StarIcon className="h-5 w-5 text-gray-400" />
                            <span className="flex-grow pl-2 text-gray-800">
                                {getAmenitiesDisplayText()}
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 ml-2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {/* Painel do Dropdown de Comodidades */}
                        {isAmenitiesDropdownOpen && (
                            <div className="amenities-dropdown-panel absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {/* Item Bônus: Wi-Fi Grátis (SEM CHECKBOX) */}
                                <div className="comodidade-bonus-item p-3"> {/* Adicionado padding aqui */}
                                    <StarIcon className="star-icon-inline" />
                                    {BONUS_WIFI}
                                </div>

                                {/* Outras Comodidades Selecionáveis (com checkbox e em grid) */}
                                <div className="comodidades-grid p-3"> {/* Volta a usar comodidades-grid com padding */}
                                    {selectableAmenityOptions.map((amenity) => (
                                        <label key={amenity} className="comodidade-item cursor-pointer">
                                            <input
                                                type="checkbox"
                                                value={amenity}
                                                checked={selectedAmenities.includes(amenity)}
                                                onChange={() => handleAmenityChange(amenity)}
                                                className="mr-2"
                                            />
                                            {amenity}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Preço Máximo e Botões de Ação (mantido) */}
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="flex-1 w-full md:w-auto">
                        <label className="labelForms mb-1 block">
                            Preço Máximo: R$ {priceRange.toLocaleString('pt-BR')}
                        </label>
                        <div className="relative flex items-center bg-white rounded-lg px-3 py-2 shadow-sm">
                            <MoneyIcon />
                            <input
                                type="range"
                                min={minPrice}
                                max={maxOverallPrice}
                                value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                className="flex-grow ml-2 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-blue"
                                style={{
                                    '--range-progress': `${((priceRange - minPrice) / (maxOverallPrice - minPrice)) * 100}%`
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row gap-4 w-full md:w-auto mt-4 md:mt-0 justify-center">
                        <button
                            onClick={handleClearSearch}
                            className="main-action-button bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition duration-300 w-full md:w-auto"
                        >
                            Limpar Pesquisa
                        </button>
                        <button
                            onClick={handleSearch}
                            className="bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 w-full md:w-auto search-button"
                        >
                            Pesquisar
                        </button>
                    </div>
                </div>

                <p className="text-right text-blue-800 text-sm mt-4 psearchhotelsbar">
                    Ao continuar, estou de acordo com os <a href="#" className="underline font-bold text-blue-800">Termos de Uso</a>
                </p>
            </div>
        </div>
    );
}

export default SearchHotelsBar;