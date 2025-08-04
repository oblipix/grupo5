

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../layout/Icons'; // Importa o nosso arquivo central de ícones
import '../styles/SearchForms.css'; // Importa o CSS específico do SearchHotelsBar
import { hotelService } from '../../services/hotelService'; // Importa o serviço de hotéis
import DateErrorModal from '../modals/DateErrorModal'; // Importa o modal de erro de data

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

// --- COMPONENTE PRINCIPAL ---
function SearchHotelsBar() {
    const navigate = useNavigate();

    // Estado para detectar se é mobile
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

    // Função para obter a data mínima permitida (amanhã)
    const getMinDate = () => {
        const today = new Date();
        const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    // Função para obter a data de hoje para comparação
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    // Estado interno do formulário
    const [destination, setDestination] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [roomTypeOptions, setRoomTypeOptions] = useState([]); // Estado para tipos de quarto do backend
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [guestsInfo, setGuestsInfo] = useState(roomGuestOptions[1]); // Padrão: casal
    const [priceRange, setPriceRange] = useState(5000);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [isAmenitiesDropdownOpen, setIsAmenitiesDropdownOpen] = useState(false);

    // Estado para o modal de erro de data
    const [dateErrorModal, setDateErrorModal] = useState({
        isOpen: false,
        message: '',
        title: 'Data não permitida'
    });

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
    const [isLoadingRoomTypes, setIsLoadingRoomTypes] = useState(true);

    // Refs para detectar cliques fora dos dropdowns
    const amenitiesDropdownRef = useRef(null);

    // Função para buscar tipos de quarto do backend
    const fetchRoomTypes = async () => {
        try {
            setIsLoadingRoomTypes(true);
            
            // Usa o serviço para buscar tipos de quarto
            const roomTypes = await hotelService.getRoomTypes();
            setRoomTypeOptions(roomTypes);

            // Define o primeiro tipo como padrão
            if (roomTypes.length > 0) {
                setSelectedRoomType(roomTypes[0].name || roomTypes[0]);
            }
        } catch (error) {
            console.error('Erro ao carregar tipos de quarto:', error);
            // Fallback: define tipos padrão se a API falhar
            const fallbackTypes = [
                { name: 'Standard' },
                { name: 'Luxo' },
                { name: 'Suíte' }
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

    // useEffect para lidar com cliques fora do dropdown de comodidades
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (amenitiesDropdownRef.current && !amenitiesDropdownRef.current.contains(event.target)) {
                setIsAmenitiesDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Função para gerenciar seleção de comodidades
    const handleAmenityChange = (amenity) => {
        setSelectedAmenities(prev => 
            prev.includes(amenity) 
                ? prev.filter(item => item !== amenity)
                : [...prev, amenity]
        );
    };

    // Função para validar e atualizar datas
    const handleDateChange = (field, value) => {
        // Valida se a data não é anterior a amanhã (ou igual a hoje)
        const minDate = getMinDate();
        const today = getTodayDate();
        
        if (value && (value < minDate || value === today)) {
            // Se a data for inválida (hoje ou anterior), mostra modal e não atualiza o estado
            setDateErrorModal({
                isOpen: true,
                message: 'Só é permitido agendar em datas posteriores ao dia de hoje!',
                title: 'Data não permitida'
            });
            return;
        }

        // Validação adicional para check-out: deve ser posterior ao check-in
        if (field === 'checkOut' && checkInDate && value && value <= checkInDate) {
            // Se check-out for anterior ou igual ao check-in, mostra modal
            setDateErrorModal({
                isOpen: true,
                message: 'A data de check-out deve ser posterior à data de check-in!',
                title: 'Data inválida'
            });
            return;
        }

        if (field === 'checkIn') {
            setCheckInDate(value);
            // Se a data de check-out já selecionada for anterior à nova data de check-in, limpa check-out
            if (checkOutDate && value && checkOutDate <= value) {
                setCheckOutDate('');
            }
        }
        if (field === 'checkOut') setCheckOutDate(value);
    };

    // Função para realizar a pesquisa
    const handleSearch = () => {
        const searchParams = new URLSearchParams();
        
        if (destination) searchParams.append('destino', destination);
        if (checkInDate) searchParams.append('checkIn', checkInDate);
        if (checkOutDate) searchParams.append('checkOut', checkOutDate);
        if (guestsInfo.rooms) searchParams.append('quartos', guestsInfo.rooms);
        if (guestsInfo.adults || guestsInfo.children) searchParams.append('hospedes', guestsInfo.adults + guestsInfo.children);
        if (priceRange < 10000) searchParams.append('precoMaximo', priceRange);
        if (selectedAmenities.length > 0) searchParams.append('comodidades', selectedAmenities.join(','));
        if (selectedRoomType) searchParams.append('tipoQuarto', selectedRoomType);

        navigate(`/hoteis?${searchParams.toString()}`);
    };

    // Função para limpar os filtros do formulário
    const handleClearSearch = () => {
        setDestination('');
        setCheckInDate('');
        setCheckOutDate('');
        setGuestsInfo(roomGuestOptions[1]);
        setPriceRange(5000);
        setSelectedAmenities([]);
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
                                min={getMinDate()}
                                className="flex-grow pl-2 bg-transparent focus:outline-none text-gray-800 date-tooltip"
                                value={checkInDate}
                                onChange={(e) => handleDateChange('checkIn', e.target.value)}
                                onInvalid={(e) => {
                                    e.preventDefault();
                                    alert('Só é permitido agendar em datas posteriores ao dia de hoje!');
                                }}
                                onBlur={(e) => {
                                    // Validação adicional ao sair do campo
                                    const value = e.target.value;
                                    const today = getTodayDate();
                                    if (value && value <= today) {
                                        e.target.value = '';
                                        setCheckInDate('');
                                        alert('Só é permitido agendar em datas posteriores ao dia de hoje!');
                                    }
                                }}
                                title="Só é permitido agendar em datas posteriores ao dia de hoje"
                            />
                            {checkInDate && checkInDate < getMinDate() && (
                                <div className="date-invalid-icon" title="Data não permitida - Só é permitido agendar em datas posteriores ao dia de hoje">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
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
                                min={checkInDate || getMinDate()}
                                className="flex-grow pl-2 bg-transparent focus:outline-none text-gray-800 date-tooltip"
                                value={checkOutDate}
                                onChange={(e) => handleDateChange('checkOut', e.target.value)}
                                onInvalid={(e) => {
                                    e.preventDefault();
                                    alert('Só é permitido agendar em datas posteriores ao dia de hoje!');
                                }}
                                onBlur={(e) => {
                                    // Validação adicional ao sair do campo
                                    const value = e.target.value;
                                    const today = getTodayDate();
                                    if (value && (value <= today || value <= checkInDate)) {
                                        e.target.value = '';
                                        setCheckOutDate('');
                                        alert('A data de check-out deve ser posterior ao check-in e ao dia de hoje!');
                                    }
                                }}
                                title="Só é permitido agendar em datas posteriores ao dia de hoje"
                            />
                            {checkOutDate && checkOutDate < (checkInDate || getMinDate()) && (
                                <div className="date-invalid-icon" title="Data não permitida - Só é permitido agendar em datas posteriores ao dia de hoje">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
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
                        <label className="labelForms mb-1">Preço Máximo: R$ {priceRange.toLocaleString('pt-BR')}</label>
                        <div className="relative flex items-center bg-white rounded-lg px-3 py-2 shadow-sm">
                            <Icons.Money />
                            <input
                                type="range" min={0} max={10000} value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                className="flex-grow ml-2 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col mb-6">
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
                            <div className="amenities-dropdown-panel">
                                <div className="comodidades-grid">
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

                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="flex-1 w-full md:w-auto">
                        <label className="labelForms mb-1 block">Preço Máximo: R$ {priceRange.toLocaleString('pt-BR')}</label>
                        <div className="relative flex items-center bg-white rounded-lg px-3 py-2 shadow-sm">
                            <Icons.Money />
                            <input
                                type="range" min={0} max={10000} value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                className="flex-grow ml-2 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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

            {/* Modal de erro de data */}
            <DateErrorModal
                isOpen={dateErrorModal.isOpen}
                onClose={() => setDateErrorModal({ ...dateErrorModal, isOpen: false })}
                message={dateErrorModal.message}
                title={dateErrorModal.title}
            />
        </div>
    );
}

export default SearchHotelsBar;
