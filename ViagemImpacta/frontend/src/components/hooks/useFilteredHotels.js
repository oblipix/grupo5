import { useEffect, useState, useMemo } from 'react';
import hotelService from '../../services/hotelService';

export default function useFilteredHotels(filters) {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState('');
  
  // Estados de loading melhorados
  const [loadingState, setLoadingState] = useState({
    isLoading: false,
    loadingMessage: '',
    progress: 0,
    isFirstLoad: true,
    source: 'cache' // 'cache', 'api', 'none'
  });

  // Memoiza filtros para evitar requests desnecessários
  const memoizedFilters = useMemo(() => {
    const cleanFilters = {};
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        cleanFilters[key] = filters[key];
      }
    });
    return cleanFilters;
  }, [
    filters.destination,
    filters.page,
    filters.minPrice,
    filters.maxPrice,
    filters.amenities,
    filters.guests,
    filters.roomType,
    filters.checkIn,
    filters.checkOut,
    filters.estrelas
  ]);

  useEffect(() => {
    // Define mensagem de loading baseada nos filtros
    const getLoadingMessage = () => {
      if (Object.keys(memoizedFilters).length === 0) {
        return 'Carregando todos os hotéis...';
      }
      if (memoizedFilters.destination) {
        return `Buscando hotéis em ${memoizedFilters.destination}...`;
      }
      if (memoizedFilters.amenities) {
        return 'Aplicando filtros de comodidades...';
      }
      if (memoizedFilters.checkIn && memoizedFilters.checkOut) {
        return 'Verificando disponibilidade...';
      }
      return 'Aplicando filtros...';
    };

    setLoadingState(prev => ({
      ...prev,
      isLoading: true,
      loadingMessage: getLoadingMessage(),
      progress: 20,
      source: 'api'
    }));
    setError('');

    // Simula progresso durante a busca
    const progressTimer = setTimeout(() => {
      setLoadingState(prev => ({ ...prev, progress: 60 }));
    }, 200);

    hotelService.getHotelsWithFilters(memoizedFilters)
      .then(hotels => {
        clearTimeout(progressTimer);
        
        setLoadingState(prev => ({
          ...prev,
          progress: 100,
          loadingMessage: `${hotels.length} hotéis encontrados`,
          source: 'api'
        }));

        // Pequeno delay para mostrar o sucesso
        setTimeout(() => {
          setLoadingState(prev => ({
            ...prev,
            isLoading: false,
            isFirstLoad: false,
            progress: 0,
            loadingMessage: ''
          }));
        }, 300);

        setHotels(hotels);
        setError('');
      })
      .catch(err => {
        clearTimeout(progressTimer);
        console.error('❌ Erro:', err);
        
        setLoadingState(prev => ({
          ...prev,
          isLoading: false,
          loadingMessage: 'Erro ao carregar hotéis',
          progress: 0
        }));
        
        setHotels([]);
        setError(err.message || 'Erro ao buscar hotéis');
      });

    // Cleanup
    return () => {
      clearTimeout(progressTimer);
    };
  }, [memoizedFilters]);

  return { 
    hotels, 
    loading: loadingState.isLoading, // Mantém compatibilidade
    loadingState, // Novo estado detalhado
    error 
  };
}