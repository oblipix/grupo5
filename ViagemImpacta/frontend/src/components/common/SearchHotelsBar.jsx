

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Icons } from '../layout/Icons'; // Importa o nosso arquivo central de ícones
import '../styles/SearchForms.css'; // Importa o CSS específico do SearchHotelsBar
import { hotelService } from '../../services/hotelService'; // Importa o serviço de hotéis
import { Range } from 'react-range';
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

const selectableAmenitiesOptions = [
    'wifi',
    'parking', 
    'gym',
    'restaurant',
    'bar',
    'pool',
    'roomService',
    'accessibility',
    'petFriendly',
    'warmPool',
    'theater',
    'garden',
    'breakfastIncludes'
];

const amenityLabels = {
    'wifi': 'Wi-Fi Grátis',
    'parking': 'Estacionamento',
    'gym': 'Academia',
    'restaurant': 'Restaurante',
    'bar': 'Bar',
    'pool': 'Piscina',
    'roomService': 'Serviço de Quarto',
    'accessibility': 'Acessibilidade',
    'petFriendly': 'Pet Friendly',
    'warmPool': 'Piscina Aquecida',
    'theater': 'Sala de Cinema',
    'garden': 'Jardim Amplo',
    'breakfastIncludes': 'Café da Manhã Incluso'
};

// Removido roomTypeOptions - agora será carregado do backend

// --- COMPONENTE PRINCIPAL ---
function SearchHotelsBar({ enableOnChange = true, onSearch, loadingState }) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    
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

    // Estado interno do formulário - DEVE vir antes dos useEffects
    const [destination, setDestination] = useState('');
    const [guestsInfo, setGuestsInfo] = useState(roomGuestOptions[1]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [roomTypeOptions, setRoomTypeOptions] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [isAmenitiesDropdownOpen, setIsAmenitiesDropdownOpen] = useState(false);
    const [isLoadingRoomTypes, setIsLoadingRoomTypes] = useState(true);
    const amenitiesDropdownRef = useRef(null);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    
    // Ref para timeout do debounce
    const debounceTimeout = useRef(null);
    
    const amenitiesFromUrl = searchParams.get('amenities');
    const [selectedAmenities, setSelectedAmenities] = useState(() => {
        return amenitiesFromUrl ? amenitiesFromUrl.split(',') : [];
    });

    // Estado para o modal de erro de data
    const [dateErrorModal, setDateErrorModal] = useState({
        isOpen: false,
        message: '',
        title: 'Data não permitida'
    });

    useEffect(() => {
        const amenitiesFromUrl = searchParams.get('amenities');
        const amenitiesArray = amenitiesFromUrl ? amenitiesFromUrl.split(',') : [];
        setSelectedAmenities(amenitiesArray);
    }, [searchParams]);

    // Cleanup do timeout quando componente é desmontado
    useEffect(() => {
        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, []);

    // useEffect para sincronização INICIAL dos campos com URL (apenas na primeira carga)
    useEffect(() => {
        const destFromUrl = searchParams.get('destination');
        const guestsFromUrl = searchParams.get('guests');
        const minPriceFromUrl = searchParams.get('minPrice');
        const maxPriceFromUrl = searchParams.get('maxPrice');
        const roomTypeFromUrl = searchParams.get('roomType');
        const checkInFromUrl = searchParams.get('checkIn');
        const checkOutFromUrl = searchParams.get('checkOut');
        
        // ✅ Sincronização apenas na carga inicial - evita loops e conflitos
        if (destFromUrl && destination === '') setDestination(destFromUrl);
        if (guestsFromUrl) {
            const guestCount = Number(guestsFromUrl);
            const matchingOption = roomGuestOptions.find(option => 
                (option.adults + option.children) === guestCount
            );
            // Só atualiza se ainda estiver no valor padrão (index 1)
            if (matchingOption && guestsInfo === roomGuestOptions[1] && matchingOption !== guestsInfo) {
                setGuestsInfo(matchingOption);
            }
        }
        // ✅ REMOVIDO: Sincronização contínua dos preços para evitar interferência no slider
        // Os preços agora são sincronizados apenas uma vez na carga inicial
        if (minPriceFromUrl && minPrice === 0) setMinPrice(Number(minPriceFromUrl));
        if (maxPriceFromUrl && maxPrice === 10000) setMaxPrice(Number(maxPriceFromUrl));
        if (roomTypeFromUrl && selectedRoomType === '') setSelectedRoomType(roomTypeFromUrl);
        if (checkInFromUrl && checkInDate === '') setCheckInDate(checkInFromUrl);
        if (checkOutFromUrl && checkOutDate === '') setCheckOutDate(checkOutFromUrl);
    }, [searchParams]);

    // Função para atualizar URL com debounce
    const updateDestinationInURL = (value) => {
        if (enableOnChange) {
            const newSearchParams = new URLSearchParams(searchParams);
            if (value.trim()) {
                newSearchParams.set('destination', value);
            } else {
                newSearchParams.delete('destination');
            }
            setSearchParams(newSearchParams);
        }
    };

    // Funções onChange - destino com debounce (como "onFinalChange")
    const handleDestinationChange = (value) => {
        setDestination(value);
        
        // Limpa timeout anterior
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        
        // Configura novo timeout para atualizar URL após parar de digitar
        debounceTimeout.current = setTimeout(() => {
            updateDestinationInURL(value);
        }, 500); // 500ms de delay
    };

    // Função para quando sai do campo (onBlur)
    const handleDestinationBlur = () => {
        // Força atualização imediata quando sai do campo
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        updateDestinationInURL(destination);
    };

    // Função para quando pressiona Enter
    const handleDestinationKeyPress = (e) => {
        if (e.key === 'Enter') {
            // Força atualização imediata quando pressiona Enter
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
            updateDestinationInURL(destination);
        }
    };

    // Função onChange que atualiza URL imediatamente (para datas)

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
        
        if (enableOnChange){
        const newSearchParams = new URLSearchParams(searchParams);
        if (value) {
            newSearchParams.set(field, value);
        } else {
            newSearchParams.delete(field);
        }
        // Se estiver limpando check-out devido a conflito com check-in, também remove da URL
        if (field === 'checkIn' && checkOutDate && value && checkOutDate <= value) {
            newSearchParams.delete('checkOut');
        }
        setSearchParams(newSearchParams);
    }
};

    const handleGuestsChange = (option) => {
        setGuestsInfo(option);
        if (enableOnChange) {
            const newSearchParams = new URLSearchParams(searchParams);
            const totalGuests = option.adults + option.children;
            newSearchParams.set('guests', totalGuests);
            setSearchParams(newSearchParams);
        }
    };

    const handleRoomTypeChange = (value) => {
        setSelectedRoomType(value);
        if (enableOnChange) {
            const newSearchParams = new URLSearchParams(searchParams);
            if (value) {
                newSearchParams.set('roomType', value);
            } else {
                newSearchParams.delete('roomType');
            }
            setSearchParams(newSearchParams);
        }
    };

    const handlePriceChange = ([newMin, newMax]) => {
        // Apenas atualiza estado local para feedback visual imediato
        setMinPrice(newMin);
        setMaxPrice(newMax);
    };

    const handlePriceFinalChange = ([newMin, newMax]) => {
        // Atualiza URL apenas quando usuário solta o slider
        if (enableOnChange) {
            const newSearchParams = new URLSearchParams(searchParams);
            if (newMin > 0) newSearchParams.set('minPrice', newMin);
            else newSearchParams.delete('minPrice');
            if (newMax < 10000) newSearchParams.set('maxPrice', newMax);
            else newSearchParams.delete('maxPrice');
            setSearchParams(newSearchParams);
        }
    };

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
            
            // ✅ NÃO define mais o primeiro tipo como padrão
            // O padrão agora é string vazia = "Todos os tipos"
            
        } catch (error) {
            console.error('Erro ao carregar tipos de quarto:', error);
            // Fallback para dados locais em caso de erro
            const fallbackTypes = [
                { id: 1, name: 'Standard' },
                { id: 2, name: 'Luxo' },
                { id: 3, name: 'Suíte' }
            ];
            setRoomTypeOptions(fallbackTypes);
            // ✅ NÃO define mais fallback como padrão
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

   const handleAmenityChange = (amenityKey) => {
  const amenitiesArr = Array.isArray(selectedAmenities) ? selectedAmenities : [];
  const newAmenities = amenitiesArr.includes(amenityKey)
    ? amenitiesArr.filter((a) => a !== amenityKey)
    : [...amenitiesArr, amenityKey];
  
  setSelectedAmenities(newAmenities);
    // Atualiza URL imediatamente somente se enableOnChange estiver habilitado
  if (enableOnChange) {
    const newSearchParams = new URLSearchParams(searchParams);
    if (newAmenities.length > 0) {
      newSearchParams.set('amenities', newAmenities.join(','));
    } else {
      newSearchParams.delete('amenities');
    }
    setSearchParams(newSearchParams);
  }
};

    // Função que navega para a página de resultados com os filtros na URL
    const handleSearch = () => {
        // Se onSearch foi fornecido (HomePage), chama a função personalizada
        if (onSearch && typeof onSearch === 'function') {
            onSearch({
                destination,
                minPrice,
                maxPrice,
                selectedAmenities,
                selectedRoomType,
                guests: guestsInfo ? (guestsInfo.adults + guestsInfo.children) : undefined,
                checkIn: checkInDate,
                checkOut: checkOutDate
            });
        } else {
            // Caso contrário, atualiza URL diretamente (HotelsPage)
            const newSearchParams = new URLSearchParams();

            if (destination) newSearchParams.set('destination', destination);
            if (checkInDate) newSearchParams.set('checkIn', checkInDate);
            if (checkOutDate) newSearchParams.set('checkOut', checkOutDate);
            if (guestsInfo) {
                const totalGuests = guestsInfo.adults + guestsInfo.children;
                newSearchParams.set('guests', totalGuests);
            }
            if (minPrice > 0) newSearchParams.set('minPrice', minPrice);
            if (maxPrice < 10000) newSearchParams.set('maxPrice', maxPrice);
            if (selectedRoomType) newSearchParams.set('roomType', selectedRoomType);
            
            if (selectedAmenities.length > 0) {
                newSearchParams.set('amenities', selectedAmenities.join(','));
            }
            
            newSearchParams.set('page', '1');
            setSearchParams(newSearchParams);
        }
    };

    // Função para limpar os filtros do formulário
    const handleClearSearch = () => {
  setDestination('');
  setCheckInDate('');
  setCheckOutDate('');
  setGuestsInfo(roomGuestOptions[1]);
  setMinPrice(0);
  setMaxPrice(10000);
  setSelectedAmenities([]);
  // ✅ CORRIGIDO: Limpar define como vazio = "Todos os tipos"
  setSelectedRoomType('');
   setSearchParams(new URLSearchParams());
};
    

    const getAmenitiesDisplayText = () => {
    const amenitiesArr = Array.isArray(selectedAmenities) ? selectedAmenities : [];
    const totalSelected = amenitiesArr.length;
    if (totalSelected === 0) return "Selecione comodidades...";
    if (totalSelected === 1) {
        return amenityLabels[amenitiesArr[0]] || amenitiesArr[0]; // ✅ Usar mapeamento
    }
    return `${totalSelected} comodidades selecionadas`;
};

    return (
        <>
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
                                onChange={(e) => handleDestinationChange(e.target.value)}
                                onBlur={handleDestinationBlur}
                                onKeyPress={handleDestinationKeyPress}
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
                                className={`flex-grow pl-2 bg-transparent focus:outline-none text-gray-800 date-tooltip ${
                                    checkInDate && checkInDate <= getTodayDate() ? 'date-forbidden' : ''
                                }`}
                                value={checkInDate}
                                onChange={(e) => handleDateChange('checkIn', e.target.value)}
                                onInvalid={(e) => {
                                    e.preventDefault();
                                    setDateErrorModal({
                                        isOpen: true,
                                        message: 'Só é permitido agendar em datas posteriores ao dia de hoje!',
                                        title: 'Data não permitida'
                                    });
                                }}
                                onBlur={(e) => {
                                    // Validação adicional ao sair do campo
                                    const value = e.target.value;
                                    const today = getTodayDate();
                                    if (value && value <= today) {
                                        e.target.value = '';
                                        setCheckInDate('');
                                        setDateErrorModal({
                                            isOpen: true,
                                            message: 'Só é permitido agendar em datas posteriores ao dia de hoje!',
                                            title: 'Data não permitida'
                                        });
                                    }
                                }}
                                onMouseEnter={(e) => {
                                    if (checkInDate && checkInDate <= getTodayDate()) {
                                        e.target.style.cursor = 'not-allowed';
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
                                className={`flex-grow pl-2 bg-transparent focus:outline-none text-gray-800 date-tooltip ${
                                    checkOutDate && (checkOutDate <= getTodayDate() || checkOutDate <= checkInDate) ? 'date-forbidden' : ''
                                }`}
                                value={checkOutDate}
                                onChange={(e) => handleDateChange('checkOut', e.target.value)}
                                onInvalid={(e) => {
                                    e.preventDefault();
                                    setDateErrorModal({
                                        isOpen: true,
                                        message: 'Só é permitido agendar em datas posteriores ao dia de hoje!',
                                        title: 'Data não permitida'
                                    });
                                }}
                                onBlur={(e) => {
                                    // Validação adicional ao sair do campo
                                    const value = e.target.value;
                                    const today = getTodayDate();
                                    if (value && (value <= today || value <= checkInDate)) {
                                        e.target.value = '';
                                        setCheckOutDate('');
                                        setDateErrorModal({
                                            isOpen: true,
                                            message: 'A data de check-out deve ser posterior ao check-in e ao dia de hoje!',
                                            title: 'Data inválida'
                                        });
                                    }
                                }}
                                onMouseEnter={(e) => {
                                    if (checkOutDate && (checkOutDate <= getTodayDate() || checkOutDate <= checkInDate)) {
                                        e.target.style.cursor = 'not-allowed';
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
                        <label className="labelForms mb-1">Hóspedes</label>
                        <div className="relative flex items-center bg-white rounded-lg px-3 py-2 shadow-sm">
                            <Icons.User />
                            <select
                                className="flex-grow pl-2 bg-transparent focus:outline-none text-gray-800 cursor-pointer appearance-none w-full text-sm"
                                value={getGuestLabel(guestsInfo)}
                                onChange={(e) => {
                                    const selectedOption = roomGuestOptions.find(option => 
                                        getGuestLabel(option) === e.target.value
                                    );
                                    if (selectedOption) handleGuestsChange(selectedOption);
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
                                onChange={(e) => handleRoomTypeChange(e.target.value)}
                                disabled={isLoadingRoomTypes}
                            >
                                {isLoadingRoomTypes ? (
                                    <option>Carregando tipos de quarto...</option>
                                ) : (
                                    <>
                                        {/* ✅ NOVA OPÇÃO: Todos os tipos como padrão */}
                                        <option value="">Todos os tipos de quarto</option>
                                        {roomTypeOptions.map((type, index) => (
                                            <option key={index} value={type.name || type}>
                                                Apenas {type.name || type}
                                            </option>
                                        ))}
                                    </>
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
                                       {selectableAmenitiesOptions.map((amenity) => (
                                            <label key={amenity} className="comodidade-item">
                                                <input
                                                    type="checkbox"
                                                    value={amenity}
                                                    checked={selectedAmenities.includes(amenity)}
                                                    onChange={() => handleAmenityChange(amenity)}
                                                    className="mr-3 h-4 w-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500" 
                                                />
                                                <span className="text-sm font-medium text-gray-800">{amenityLabels[amenity]}</span>
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
                        <label className="labelForms mb-1 block">Preço: R$ {minPrice.toLocaleString('pt-BR')} - R$ {maxPrice.toLocaleString('pt-BR')}</label>
                        <div className="relative flex items-center bg-white rounded-lg px-3 py-4 shadow-sm">
                            <Icons.Money />
                            <div className="flex-1 px-4">
                                <Range
                                    step={1}
                                    min={0}
                                    max={10000}
                                    values={[minPrice, maxPrice]}
                                    onChange={handlePriceChange}
                                    onFinalChange={handlePriceFinalChange}
                                    renderTrack={({ props, children }) => {
                                        // Calcula a posição dos thumbs em porcentagem
                                        const left = (minPrice / 10000) * 100;
                                        const right = (maxPrice / 10000) * 100;
                                        return (
                                            <div
                                            {...props}
                                            className="h-2 w-full rounded bg-gray-200 relative"
                                            >
                                            {/* faixa preenchida entre os thumbs */}
                                            <div
                                                className="absolute h-full bg-blue-700 rounded pointer-events-none"
                                                style={{
                                                    left: `${left}%`,
                                                    width: `${Math.max(right - left, 1)}%`,
                                                }}
                                            ></div>
                                            {children}
                                            </div>
                                        );
                                    }}
                                    renderThumb={({ props }) => { 
                                        const { key, ...rest } = props;
                                        return (
                                            <div
                                                key={key}
                                                {...rest}
                                                className="h-6 w-6 bg-blue-800 rounded-full shadow-lg border-2 border-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                style={{ ...props.style }}
                                            ></div>
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                           
                    <div className="flex flex-row gap-4 w-full md:w-auto mt-4 md:mt-0 justify-center">
                        <button onClick={handleClearSearch} className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400">
                            Limpar
                        </button>
                        <button 
                            onClick={handleSearch} 
                            disabled={loadingState?.isLoading}
                            className={`px-8 py-3 rounded-lg font-semibold search-button transition-all duration-200 ${
                                loadingState?.isLoading 
                                    ? 'bg-blue-400 text-white cursor-not-allowed' 
                                    : 'bg-blue-800 text-white hover:bg-blue-700'
                            }`}
                        >
                            {loadingState?.isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    <span className="text-sm">{loadingState.loadingMessage || 'Pesquisando...'}</span>
                                </div>
                            ) : (
                                'Pesquisar'
                            )}
                        </button>
                    </div>
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
        </>
    );
}

export default SearchHotelsBar;