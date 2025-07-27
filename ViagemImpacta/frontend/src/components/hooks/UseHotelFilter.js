

import { useState, useMemo } from 'react';

// Função auxiliar para remover acentos (necessária para a busca)
const removeAccents = (str) => {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

// O nosso custom hook que encapsula toda a lógica de filtro
const useHotelFilter = (allHotelsData, initialParams) => {
  const [filterParams, setFilterParams] = useState(initialParams);

  // useMemo é usado para otimização. Ele só vai recalcular a lista
  // de hotéis se os dados de hotéis ou os filtros mudarem.
  const filteredHotels = useMemo(() => {
    let tempHotels = [...allHotelsData];

    // Filtro por Destino (cidade ou nome do hotel)
    if (filterParams.destination) {
      const normalizedDestination = removeAccents(filterParams.destination).toLowerCase();
      tempHotels = tempHotels.filter(hotel =>
        removeAccents(hotel.location).toLowerCase().includes(normalizedDestination) ||
        removeAccents(hotel.title).toLowerCase().includes(normalizedDestination)
      );
    }

    // Filtro por Avaliação Mínima
    if (filterParams.minRating > 0) {
      tempHotels = tempHotels.filter(hotel => hotel.rating >= filterParams.minRating);
    }

    // Filtro por Preço Máximo
    if (filterParams.maxPrice) {
      tempHotels = tempHotels.filter(hotel => hotel.price <= filterParams.maxPrice);
    }

    // Filtro por Hóspedes e Tipo de Quarto
    if (filterParams.guests || filterParams.roomType) {
        tempHotels = tempHotels.filter(hotel =>
            hotel.roomOptions.some(room => {
                const roomTypeMatches = filterParams.roomType ? room.type.toLowerCase().includes(filterParams.roomType.toLowerCase()) : true;
                const capacityMatches = filterParams.guests ? filterParams.guests <= room.capacity : true;
                return roomTypeMatches && capacityMatches;
            })
        );
    }
    
    // Filtro por Comodidades
    if (filterParams.amenities && filterParams.amenities.length > 0) {
        tempHotels = tempHotels.filter(hotel =>
            filterParams.amenities.every(amenity =>
                hotel.leisureFacilities && hotel.leisureFacilities.includes(amenity)
            )
        );
    }

    return tempHotels;
  }, [allHotelsData, filterParams]);

  // O hook retorna o estado dos filtros, a função para atualizá-los, e a lista de hotéis já filtrada
  return { filterParams, setFilterParams, filteredHotels };
};

export default useHotelFilter;
