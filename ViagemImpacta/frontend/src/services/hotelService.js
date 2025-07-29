// src/services/hotelService.js
 
const API_BASE_URL = 'http://localhost:5155/api';
 
/**
 * Serviço para gerenciar operações relacionadas a hotéis
 * Substitui os dados estáticos do hotels.js por chamadas reais à API
 */
class HotelService {
 
  /**
   * Busca todos os hotéis da API
   * @returns {Promise<Array>} Lista de hotéis
   */
  async getAllHotels() {
    try {
      const response = await fetch(`${API_BASE_URL}/hotels`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
 
      if (!response.ok) {
        throw new Error(`Erro ao buscar hotéis: ${response.status} ${response.statusText}`);
      }
 
      const hotels = await response.json();
     
      // Transforma os dados do backend para o formato esperado pelo frontend
      return this.transformHotelsData(hotels);
     
    } catch (error) {
      console.error('Erro no serviço de hotéis:', error);
      throw new Error('Não foi possível carregar os hotéis. Tente novamente mais tarde.');
    }
  }
 
  /**
   * Busca um hotel específico por ID
   * @param {number} id - ID do hotel
   * @returns {Promise<Object>} Dados do hotel
   */
  async getHotelById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/hotels/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
 
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Hotel não encontrado');
        }
        throw new Error(`Erro ao buscar hotel: ${response.status} ${response.statusText}`);
      }
 
      const hotel = await response.json();
      return this.transformSingleHotelData(hotel);
     
    } catch (error) {
      console.error('Erro ao buscar hotel por ID:', error);
      throw error;
    }
  }
 
  /**
   * Busca hotéis por número de estrelas
   * @param {number} stars - Número de estrelas (1-5)
   * @returns {Promise<Array>} Lista de hotéis filtrados
   */
  async getHotelsByStars(stars) {
    try {
      if (stars < 1 || stars > 5) {
        throw new Error('Número de estrelas deve ser entre 1 e 5');
      }
 
      const response = await fetch(`${API_BASE_URL}/hotels/stars/${stars}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
 
      if (!response.ok) {
        throw new Error(`Erro ao buscar hotéis por estrelas: ${response.status} ${response.statusText}`);
      }
 
      const hotels = await response.json();
      return this.transformHotelsData(hotels);
     
    } catch (error) {
      console.error('Erro ao buscar hotéis por estrelas:', error);
      throw error;
    }
  }
 
  /**
   * Busca hotéis por comodidades
   * @param {Object} amenities - Objeto com comodidades (wifi, parking, gym)
   * @returns {Promise<Array>} Lista de hotéis filtrados
   */
  async getHotelsByAmenities(amenities = {}) {
    try {
      const queryParams = new URLSearchParams();
     
      if (amenities.wifi) queryParams.append('wifi', 'true');
      if (amenities.parking) queryParams.append('parking', 'true');
      if (amenities.gym) queryParams.append('gym', 'true');
 
      const response = await fetch(`${API_BASE_URL}/hotels/amenities?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
 
      if (!response.ok) {
        throw new Error(`Erro ao buscar hotéis por comodidades: ${response.status} ${response.statusText}`);
      }
 
      const hotels = await response.json();
      return this.transformHotelsData(hotels);
     
    } catch (error) {
      console.error('Erro ao buscar hotéis por comodidades:', error);
      throw error;
    }
  }
 
  /**
   * Transforma os dados dos hotéis do backend para o formato esperado pelo frontend
   * Mapeia os campos do backend para manter compatibilidade com o código existente
   * @param {Array} backendHotels - Dados dos hotéis do backend
   * @returns {Array} Hotéis no formato do frontend
   */
  transformHotelsData(backendHotels) {
    return backendHotels.map(hotel => this.transformSingleHotelData(hotel));
  }
 
  /**
   * Transforma os dados de um único hotel do backend para o formato do frontend
   * @param {Object} backendHotel - Dados do hotel do backend
   * @returns {Object} Hotel no formato do frontend
   */
  transformSingleHotelData(backendHotel) {
    // Debug: vamos ver o que está vindo do backend
    console.log('Backend Hotel Data:', backendHotel);
    
    return {
      // Mapeia os campos do backend para o frontend
      id: backendHotel.hotelId || backendHotel.HotelId,
      title: backendHotel.name || backendHotel.Name,
      description: this.generateDescription(backendHotel),
      location: `${backendHotel.city || backendHotel.City}, Brasil`,
      price: this.generatePrice(backendHotel),
      rating: this.generateRating(backendHotel),
     
      // Campos específicos do backend
      address: backendHotel.hotelAddress || backendHotel.HotelAddress,
      phone: backendHotel.phone || backendHotel.Phone,
      stars: backendHotel.stars || backendHotel.Stars,
      city: backendHotel.city || backendHotel.City,
     
      // Comodidades/Amenities
      hasWifi: backendHotel.wifi || backendHotel.Wifi || false,
      parking: backendHotel.parking || backendHotel.Parking || false,
      hasGym: backendHotel.gym || backendHotel.Gym || false,
      hasRestaurant: backendHotel.restaurant || backendHotel.Restaurant || false,
      hasBar: backendHotel.bar || backendHotel.Bar || false,
      hasPool: backendHotel.pool || backendHotel.Pool || false,
      roomService: backendHotel.roomService || backendHotel.RoomService || false,
      accessibility: backendHotel.accessibility || backendHotel.Accessibility || false,
      warmPool: backendHotel.warmPool || backendHotel.WarmPool || false,
      theater: backendHotel.theater || backendHotel.Theater || false,
      garden: backendHotel.garden || backendHotel.Garden || false,
      petFriendly: backendHotel.petFriendly || backendHotel.PetFriendly || false,
      breakfastIncludes: backendHotel.breakfastIncludes || backendHotel.BreakfastIncludes || false,
     
      // Campos que precisam ser gerados ou vir de outras fontes
      mainImageUrl: this.generateImageUrl(backendHotel),
      galleryImages: this.generateGalleryImages(backendHotel),
     
      // Coordenadas geográficas (podem vir do backend futuramente)
      lat: this.getCoordinatesForCity(backendHotel.city || backendHotel.City).lat,
      lng: this.getCoordinatesForCity(backendHotel.city || backendHotel.City).lng,
      markerColor: this.generateMarkerColor(backendHotel),
     
      // Campos adicionais para compatibilidade
      totalRooms: backendHotel.roomCount || backendHotel.RoomCount || 50,
      totalBathrooms: backendHotel.roomCount || backendHotel.RoomCount || 50,
      elevators: 4,
      mapUrl: this.generateMapUrl(backendHotel),
     
      // Dados dos quartos - agora usando dados reais do backend
      leisureFacilities: this.generateLeisureFacilities(backendHotel),
      roomOptions: this.generateRoomOptions(backendHotel),
      feedbacks: this.generateFeedbacks(backendHotel)
    };
  }
 
  /**
   * Gera uma descrição baseada nas características do hotel
   */
  generateDescription(hotel) {
    const city = hotel.city || hotel.City || 'Brasil';
    const stars = hotel.stars || hotel.Stars || 3;
   
    const descriptions = {
      'Rio de Janeiro': 'Descubra o luxo à beira-mar no coração do Rio! Com vistas deslumbrantes, nosso hotel oferece uma experiência inesquecível.',
      'Gramado': 'Viva a magia da Serra Gaúcha no nosso aconchegante refúgio! Desfrute da tranquilidade das montanhas.',
      'Recife': 'Hospede-se no coração pulsante de Recife! Nosso hotel moderno é ideal para explorar a cidade.',
      'Garanhuns': 'Descubra a tranquilidade em Garanhuns! Nosso refúgio oferece o ambiente perfeito para relaxar.',
      'Brasília': 'Um refúgio moderno na capital federal com toda comodidade que você precisa.',
      'Belo Horizonte': 'Descubra a capital de Minas Gerais no nosso charmoso hotel com toda hospitalidade mineira.'
    };
   
    return descriptions[city] || `Experimente o conforto e a qualidade em nosso hotel ${stars} estrelas em ${city}.`;
  }
 
  /**
   * Gera preço baseado nos quartos reais ou nas estrelas
   */
  generatePrice(hotel) {
    // Se tem quartos com preços reais, usa o menor preço
    if (hotel.rooms && Array.isArray(hotel.rooms) && hotel.rooms.length > 0) {
      const prices = hotel.rooms.map(room => 
        parseFloat(room.averageDailyPrice || room.AverageDailyPrice || 0)
      ).filter(price => price > 0);
      
      if (prices.length > 0) {
        return Math.min(...prices);
      }
    }
    
    // Fallback: gera preço baseado nas estrelas
    const stars = hotel.stars || hotel.Stars || 3;
    const basePrice = stars * 200;
    return basePrice + Math.floor(Math.random() * 500);
  }
 
  /**
   * Gera rating baseado nas estrelas
   */
  generateRating(hotel) {
    const stars = hotel.stars || hotel.Stars || 3;
    return Math.min(stars + (Math.random() * 0.5), 5.0);
  }
 
  /**
   * Gera URL de imagem baseada no ID do hotel
   */
  generateImageUrl(hotel) {
    const id = hotel.hotelId || hotel.HotelId || 1;
    return `https://picsum.photos/id/${(id * 100) % 1000}/800/600`;
  }
 
  /**
   * Gera galeria de imagens
   */
  generateGalleryImages(hotel) {
    const id = hotel.hotelId || hotel.HotelId || 1;
    const images = [];
   
    for (let i = 1; i <= 8; i++) {
      images.push({
        id: `h${id}g${i}`,
        url: `https://picsum.photos/id/${((id * 100) + i) % 1000}/800/600`,
        alt: `${hotel.name || hotel.Name} - Imagem ${i}`
      });
    }
   
    return images;
  }
 
  /**
   * Retorna coordenadas baseadas na cidade
   */
  getCoordinatesForCity(city) {
    const coordinates = {
      'Rio de Janeiro': { lat: -22.9068, lng: -43.1729 },
      'Gramado': { lat: -29.3797, lng: -50.8732 },
      'Recife': { lat: -8.0578, lng: -34.8820 },
      'Garanhuns': { lat: -8.8913, lng: -36.4942 },
      'Brasília': { lat: -15.7797, lng: -47.9297 },
      'Belo Horizonte': { lat: -19.9190, lng: -43.9388 }
    };
   
    return coordinates[city] || { lat: -23.5505, lng: -46.6333 }; // São Paulo como padrão
  }
 
  /**
   * Gera cor do marcador baseada na localização
   */
  generateMarkerColor(hotel) {
    const colors = ['#EF4444', '#3B82F6', '#22C55E', '#A855F7', '#EAB308', '#F97316'];
    const id = hotel.hotelId || hotel.HotelId || 1;
    return colors[id % colors.length];
  }
 
  /**
   * Gera URL do Google Maps
   */
  generateMapUrl(hotel) {
    const city = hotel.city || hotel.City || 'Brasil';
    return `https://www.google.com/maps/search/${encodeURIComponent(city)}`;
  }
 
  /**
   * Gera facilidades de lazer baseadas nas comodidades do backend
   */
  generateLeisureFacilities(hotel) {
    const facilities = [];
   
    // Usa dados reais do backend
    if (hotel.pool || hotel.Pool) facilities.push('Piscina');
    if (hotel.gym || hotel.Gym) facilities.push('Academia');
    if (hotel.theater || hotel.Theater) facilities.push('Sala de Cinema');
    if (hotel.bar || hotel.Bar) facilities.push('Bar');
    if (hotel.restaurant || hotel.Restaurant) facilities.push('Restaurante');
    if (hotel.garden || hotel.Garden) facilities.push('Jardim');
    if (hotel.warmPool || hotel.WarmPool) facilities.push('Piscina Aquecida');
    if (hotel.wifi || hotel.Wifi) facilities.push('Wi-Fi Grátis');
    if (hotel.parking || hotel.Parking) facilities.push('Estacionamento');
    if (hotel.roomService || hotel.RoomService) facilities.push('Serviço de Quarto');
    if (hotel.accessibility || hotel.Accessibility) facilities.push('Acessibilidade');
    if (hotel.petFriendly || hotel.PetFriendly) facilities.push('Pet Friendly');
    if (hotel.breakfastIncludes || hotel.BreakfastIncludes) facilities.push('Café da Manhã Incluso');
   
    // Se não há facilidades específicas, adiciona básicas
    if (facilities.length === 0) {
      facilities.push('Recepção 24h', 'Serviço de Limpeza');
    }
   
    return facilities;
  }
 
  /**
   * Gera opções de quartos baseadas nos dados reais do backend
   */
  generateRoomOptions(hotel) {
    // Debug: vamos ver se os quartos estão chegando
    console.log('Hotel rooms data:', hotel.rooms);
    console.log('Full hotel object:', hotel);
    
    // Se o hotel tem dados de quartos do backend, usa eles
    if (hotel.rooms && Array.isArray(hotel.rooms) && hotel.rooms.length > 0) {
      console.log('Using real room data from backend');
      return hotel.rooms.map(room => {
        const roomData = {
          id: room.roomId || room.RoomId || room.id, // Mapea o ID corretamente
          type: this.getRoomTypeName(room.typeName || room.TypeName),
          description: this.getRoomDescription(room.typeName || room.TypeName, room.capacity || room.Capacity),
          price: parseFloat(room.averageDailyPrice || room.AverageDailyPrice || 0),
          capacity: room.capacity || room.Capacity || 2,
          minCapacity: 1,
          available: room.totalRooms || room.TotalRooms || 1,
          bathrooms: 1,
          beds: this.getBedConfiguration(room.capacity || room.Capacity)
        };
        console.log('Mapped room data:', roomData);
        return roomData;
      });
    }
    
    // Fallback: gera opções básicas se não há dados do backend
    console.log('Using fallback room data - no backend data found');
    const stars = hotel.stars || hotel.Stars || 3;
    const basePrice = stars * 150;
   
    return [
      {
        id: 999, // ID temporário para quartos fallback
        type: 'Quarto Standard',
        description: 'Conforto e praticidade para sua estadia.',
        price: basePrice,
        capacity: 2,
        minCapacity: 1,
        available: 5,
        bathrooms: 1,
        beds: '1 Cama Casal'
      }
    ];
  }

  /**
   * Converte o enum RoomType para nome legível
   */
  getRoomTypeName(roomType) {
    const typeNames = {
      0: 'Quarto Standard',
      1: 'Quarto Luxo', 
      2: 'Suíte',
      'Standard': 'Quarto Standard',
      'Luxo': 'Quarto Luxo',
      'Suite': 'Suíte'
    };
    
    return typeNames[roomType] || 'Quarto Standard';
  }

  /**
   * Gera descrição baseada no tipo e capacidade do quarto
   */
  getRoomDescription(roomType, capacity) {
    const descriptions = {
      'Standard': `Conforto essencial para até ${capacity} pessoa${capacity > 1 ? 's' : ''}.`,
      'Luxo': `Elegância e sofisticação para até ${capacity} pessoa${capacity > 1 ? 's' : ''}.`,
      'Suite': `Máximo luxo e espaço amplo para até ${capacity} pessoa${capacity > 1 ? 's' : ''}.`,
      0: `Conforto essencial para até ${capacity} pessoa${capacity > 1 ? 's' : ''}.`,
      1: `Elegância e sofisticação para até ${capacity} pessoa${capacity > 1 ? 's' : ''}.`,
      2: `Máximo luxo e espaço amplo para até ${capacity} pessoa${capacity > 1 ? 's' : ''}.`
    };
    
    return descriptions[roomType] || `Acomodação confortável para até ${capacity} pessoa${capacity > 1 ? 's' : ''}.`;
  }

  /**
   * Define configuração de camas baseada na capacidade
   */
  getBedConfiguration(capacity) {
    if (capacity <= 1) return '1 Cama Solteiro';
    if (capacity === 2) return '1 Cama Casal';
    if (capacity === 3) return '1 Cama Casal + 1 Solteiro';
    if (capacity >= 4) return '2 Camas Casal';
    return '1 Cama Casal';
  }
 
  /**
   * Gera feedbacks de exemplo (temporário até implementar no backend)
   */
  generateFeedbacks() {
    return [
      {
        id: 1,
        rating: 5,
        comment: 'Excelente hotel, recomendo!',
        guestName: 'João S.'
      },
      {
        id: 2,
        rating: 4,
        comment: 'Boa localização e atendimento.',
        guestName: 'Maria C.'
      }
    ];
  }
}
 
// Exporta uma instância única do serviço
export const hotelService = new HotelService();
export default hotelService;