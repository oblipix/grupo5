import { useEffect, useState } from 'react';
import hotelService from '../../services/hotelService';

export default function useFilteredHotels(filters) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    hotelService.getHotelsWithFilters(filters)
      .then(setHotels)
      .catch(err => setError(err.message || 'Erro ao buscar hotéis'))
      .finally(() => setLoading(false));
  }, [JSON.stringify(filters)]); // Atualiza sempre que filtros mudam

  return { hotels, loading, error };
}