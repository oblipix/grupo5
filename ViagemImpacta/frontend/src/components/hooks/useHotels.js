// src/components/hooks/useHotels.js

import { useState, useEffect, useCallback } from 'react';
import { hotelService } from '../../services/hotelService';

/**
* Hook customizado para gerenciar o estado dos hotéis
* Substitui o uso direto do allHotelsData por chamadas à API
*/
export const useHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState(new Map());

  /**
   * Carrega todos os hotéis da API
   */
  const loadAllHotels = useCallback(async (forceRefresh = false) => {
    const cacheKey = 'all_hotels';

    // Verifica se já temos os dados em cache
    if (!forceRefresh && cache.has(cacheKey)) {
      setHotels(cache.get(cacheKey));
      return cache.get(cacheKey);
    }

    setLoading(true);
    setError(null);

    try {
      const hotelsData = await hotelService.getAllHotels();
      setHotels(hotelsData);

      // Atualiza o cache
      setCache(prev => new Map(prev).set(cacheKey, hotelsData));

      return hotelsData;
    } catch (err) {
      setError(err.message);
      console.error('Erro ao carregar hotéis:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [cache]);

  /**
   * Busca um hotel específico por ID
   */
  const getHotelById = useCallback(async (id) => {
    const cacheKey = `hotel_${id}`;

    // Verifica cache primeiro
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    setError(null);

    try {
      const hotel = await hotelService.getHotelById(id);

      // Atualiza o cache
      setCache(prev => new Map(prev).set(cacheKey, hotel));

      return hotel;
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar hotel por ID:', err);
      throw err;
    }
  }, [cache]);

  /**
   * Busca hotéis por estrelas
   */
  const getHotelsByStars = useCallback(async (stars) => {
    const cacheKey = `hotels_stars_${stars}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    setLoading(true);
    setError(null);

    try {
      const hotelsData = await hotelService.getHotelsByStars(stars);

      // Atualiza o cache
      setCache(prev => new Map(prev).set(cacheKey, hotelsData));

      return hotelsData;
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar hotéis por estrelas:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [cache]);

  /**
   * Busca hotéis por comodidades
   */
  const getHotelsByAmenities = useCallback(async (amenities) => {
    const cacheKey = `hotels_amenities_${JSON.stringify(amenities)}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    setLoading(true);
    setError(null);

    try {
      const hotelsData = await hotelService.getHotelsByAmenities(amenities);

      // Atualiza o cache
      setCache(prev => new Map(prev).set(cacheKey, hotelsData));

      return hotelsData;
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar hotéis por comodidades:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [cache]);

  /**
   * Limpa o cache
   */
  const clearCache = useCallback(() => {
    setCache(new Map());
  }, []);

  /**
   * Recarrega os dados
   */
  const refresh = useCallback(() => {
    clearCache();
    return loadAllHotels(true);
  }, [clearCache, loadAllHotels]);

  // Carrega os hotéis automaticamente quando o hook é usado
  useEffect(() => {
    loadAllHotels();
  }, [loadAllHotels]);

  return {
    hotels,
    loading,
    error,
    loadAllHotels,
    getHotelById,
    getHotelsByStars,
    getHotelsByAmenities,
    clearCache,
    refresh
  };
};

export default useHotels;

 