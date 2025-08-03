

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../layout/Icons'; // Importa o nosso arquivo central de ícones
import '../styles/SearchForms.css'; // Importa o CSS específico do SearchHotelsBar
import { hotelService } from '../../services/hotelService'; // Importa o serviço de hotéis
import { Range } from 'react-range';

// --- DADOS E OPÇÕES DO FORMULÁRIO ---
const roomGuestOptions = [
    { 
        rooms: 1, 
        adults: 1, 
        children: 0, 
        label: "1 Pessoa",
        mobileLabel: "1 Pessoa"
    },
    { 
        rooms: 1, 
        adults: 2, 
        children: 0, 
        label: "2 Pessoas",
        mobileLabel: "2 Pessoas"
    },
    { 
        rooms: 1, 
        adults: 2, 
        children: 1, 
        label: "3 Pessoas",
        mobileLabel: "3 Pessoas"
    },
    { 
        rooms: 1, 
        adults: 2, 
        children: 2, 
        label: "4 Pessoas",
        mobileLabel: "4 Pessoas"
    },
];

const selectableAmenityOptions = [ 
    "Bar", "Piscina", "Serviço de Quarto", "Academia", "Acessibilidade",
    "Estacionamento", "Piscina Aquecida", "Aceita Animais", "Sala de Cinema",
    "Restaurante", "Jardim Amplo",
];

// Removido roomTypeOptions - agora será carregado do backend

// --- COMPONENTE PRINCIPAL ---
function SearchHotelsBar() {
    const navigate = useNavigate();

    // Estado para detectar se é mobile
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

    // Estado interno do formulário
    const [destination, setDestination] = useState('');
    const [guestsInfo, setGuestsInfo] = useState(roomGuestOptions[1]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [roomTypeOptions, setRoomTypeOptions] = useState([]); // Estado para tipos de quarto do backend
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [isAmenitiesDropdownOpen, setIsAmenitiesDropdownOpen] = useState(false);
    const [isLoadingRoomTypes, setIsLoadingRoomTypes] = useState(true);
    const amenitiesDropdownRef = useRef(null);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

    // Função para obter o label apropriado baseado no tamanho da tela
    const getGuestLabel = (option) => {
        return isMobile ? option.mobileLabel : option.label;
    };

    // useEffect para detectar mudanças no tamanho da tela
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Função para buscar tipos de quarto do backend
    const fetchRoomTypes = async () => {
        try {
            setIsLoadingRoomTypes(true);
            
            // Usa o serviço para buscar tipos de quarto
            const roomTypes = await hotelService.getRoomTypes();
            setRoomTypeOptions(roomTypes);
            
            // Define o primeiro tipo como padrão se existir
            if (roomTypes.length > 0) {
                setSelectedRoomType(roomTypes[0].name || roomTypes[0]);
            }
        } catch (error) {
            console.error('Erro ao carregar tipos de quarto:', error);
            // Fallback para dados locais em caso de erro
            const fallbackTypes = [
                { id: 1, name: 'Standard' },
                { id: 2, name: 'Luxo' },
                { id: 3, name: 'Suíte' }
            ];
            setRoomTypeOptions(fallbackTypes);
            setSelectedRoomType(fallbackTypes[0].name);
        } finally {
            setIsLoadingRoomTypes(false);
        }
    };

    // useEffect para carregar os tipos de quarto quando o componente monta
    useEffect(() => {
        fetchRoomTypes();
    }, []);

    // Lógica para fechar o dropdown de comodidades ao clicar fora
    useEffect(() => {
        function handleClickOutside(event) {
            if (amenitiesDropdownRef.current && !amenitiesDropdownRef.current.contains(event.target)) {
                setIsAmenitiesDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [amenitiesDropdownRef]);

    const handleAmenityChange = (amenity) => {
        setSelectedAmenities((prev) =>
            prev.includes(amenity)
                ? prev.filter((a) => a !== amenity)
                : [...prev, amenity]
        );
    };

    // Função que navega para a página de resultados com os filtros na URL
    const handleSearch = () => {
        const searchParams = new URLSearchParams();

        if (destination) searchParams.append('destino', destination);
        if (guestsInfo) searchParams.append('hospedes', guestsInfo.adults);
        if (minPrice > 0) searchParams.append('precoMin', minPrice);
        if (maxPrice < 10000) searchParams.append('precoMax', maxPrice);
        if (selectedAmenities.length > 0) searchParams.append('comodidades', selectedAmenities.join(','));
        if (selectedRoomType) searchParams.append('tipoQuarto', selectedRoomType);
        if (checkInDate) searchParams.append('checkIn', checkInDate);
        if (checkOutDate) searchParams.append('checkOut', checkOutDate);

        navigate(`/hoteis?${searchParams.toString()}`);
    };

    // Função para limpar os filtros do formulário
    const handleClearSearch = () => {
        setDestination('');
        setGuestsInfo(roomGuestOptions[1]);
        setMinPrice(0);
        setMaxPrice(10000);
        setSelectedAmenities([]);
        setCheckInDate('');
        setCheckOutDate('');
        // Define o primeiro tipo de quarto como padrão ao limpar
        if (roomTypeOptions.length > 0) {
            setSelectedRoomType(roomTypeOptions[0].name || roomTypeOptions[0]);
        }
    };
    

    const getAmenitiesDisplayText = () => {
        const totalSelected = selectedAmenities.length;
        if (totalSelected === 0) return "Selecione comodidades...";
        if (totalSelected === 1) return selectedAmenities[0];
        return `${totalSelected} comodidades selecionadas`;
    };

    return (
        <div className={`searchHotelsBar p-4 rounded-b-lg shadow-md relative z-40 bg-slate-100 ${isAmenitiesDropdownOpen ? 'dropdown-open' : ''}`}>
            <div className="max-w-6xl mx-auto py-4 px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex flex-col">
                        <label className="labelForms mb-1">Destino</label>
                        <div className="relative flex items-center bg-white rounded-lg px-3 py-2 shadow-sm">
                            <Icons.Location />
                            <input
                                type="text"
                                placeholder="Para onde vai?"
                                className="flex-grow pl-2 bg-transparent focus:outline-none text-gray-800"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="labelForms mb-1">Check-in</label>
                        <div className="relative flex items-center bg-white rounded-lg px-3 py-2 shadow-sm">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <input
                                type="date"
                                className="flex-grow pl-2 bg-transparent focus:outline-none text-gray-800"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="labelForms mb-1">Check-out</label>
                        <div className="relative flex items-center bg-white rounded-lg px-3 py-2 shadow-sm">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <input
                                type="date"
                                className="flex-grow pl-2 bg-transparent focus:outline-none text-gray-800"
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex flex-col">
                        <label className="labelForms mb-1">Passageiros</label>
                        <div className="relative flex items-center bg-white rounded-lg px-3 py-2 shadow-sm">
                            <Icons.User />
                            <select
                                className="flex-grow pl-2 bg-transparent focus:outline-none text-gray-800 cursor-pointer appearance-none w-full text-sm"
                                value={getGuestLabel(guestsInfo)}
                                onChange={(e) => {
                                    const selectedOption = roomGuestOptions.find(option => 
                                        getGuestLabel(option) === e.target.value
                                    );
                                    setGuestsInfo(selectedOption);
                                }}
                            >
                                {roomGuestOptions.map((option, index) => (
                                    <option key={index} value={getGuestLabel(option)}>
                                        {getGuestLabel(option)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="labelForms mb-1">Tipo de Quarto</label>
                        <div className="relative flex items-center bg-white rounded-lg px-3 py-2 shadow-sm">
                            <Icons.RoomType />
                            <select
                                className="flex-grow pl-2 bg-transparent focus:outline-none text-gray-800 cursor-pointer appearance-none w-full"
                                value={selectedRoomType}
                                onChange={(e) => setSelectedRoomType(e.target.value)}
                                disabled={isLoadingRoomTypes}
                            >
                                {isLoadingRoomTypes ? (
                                    <option>Carregando tipos de quarto...</option>
                                ) : (
                                    roomTypeOptions.map((type, index) => (
                                        <option key={index} value={type.name || type}>
                                            {type.name || type}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="labelForms mb-1">Comodidades</label>
                        <div className="relative" ref={amenitiesDropdownRef}>
                            <div
                                className="amenities-dropdown-trigger relative flex items-center bg-white rounded-lg px-3 py-2 shadow-sm cursor-pointer"
                                onClick={() => setIsAmenitiesDropdownOpen(!isAmenitiesDropdownOpen)}
                            >
                                <Icons.Star className="h-5 w-5 text-gray-400" />
                                <span className="flex-grow pl-2 text-gray-800">{getAmenitiesDisplayText()}</span>
                            </div>
                            {isAmenitiesDropdownOpen && (
                                <div className="amenities-dropdown-panel absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                    <div className="comodidades-grid p-3">
                                        {selectableAmenityOptions.map((amenity) => (
                                            <label key={amenity} className="comodidade-item">
                                                <input 
                                                    type="checkbox" 
                                                    value={amenity} 
                                                    checked={selectedAmenities.includes(amenity)} 
                                                    onChange={() => handleAmenityChange(amenity)} 
                                                    className="mr-3 h-4 w-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500" 
                                                />
                                                <span className="text-sm font-medium text-gray-800">{amenity}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="flex-1 w-full md:w-auto">
                          <label className="labelForms mb-1 block"> Preço: R$ {minPrice.toLocaleString('pt-BR')} - R$ {maxPrice.toLocaleString('pt-BR')}</label>
                        <div className="relative flex items-center bg-white rounded-lg px-3 py-2 shadow-sm">
                            <Icons.Money />
                         <Range
                            step={1}
                            min={0}
                            max={10000}
                            values={[minPrice, maxPrice]}
                            onChange={([newMin, newMax]) => {
                            setMinPrice(newMin);
                            setMaxPrice(newMax);
                            }}
                            renderTrack={({ props, children }) => {
                                // Calcula a posição dos thumbs em porcentagem
                                const left = (minPrice / 10000) * 100;
                                const right = (maxPrice / 10000) * 100;
                                return (
                                    <div
                                    {...props}
                                    className="h-1.5 w-full rounded bg-gray-200 relative mx-2"
                                    >
                                    {/* faixa preenchida entre os thumbs */}
                                    <div
                                        className="absolute h-full bg-blue-700 rounded pointer-events-none"
                                        style={{
                                            left: `${left}%`,
                                             width: `${Math.max(right - left, 1)}%`,
                                            position: 'absolute',
                                            
                                        }}
                                    />
                                    {children}
                                    </div>
                                );
                            }}
                           renderThumb={({ props }) => (
                            <div
                                {...props}
                                className="h-5 w-5 bg-blue-800 rounded-full shadow-md border-2 border-white flex items-center justify-center"
                                style={{ ...props.style }}
                            />
                            )}
                         
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 w-full md:w-auto mt-4 md:mt-0 justify-center">
                        <button onClick={handleClearSearch} className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400">
                            Limpar
                        </button>
                        <button onClick={handleSearch} className="bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 search-button">
                            Pesquisar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchHotelsBar;