// src/services/reservationService.js

const API_BASE_URL = 'https://localhost:7010/api';

/**
 * Serviço para gerenciar operações relacionadas a reservas
 * Integra com a API do backend para criar e gerenciar reservas
 */
class ReservationService {

  /**
   * Cria uma nova reserva
   * @param {Object} reservationData - Dados da reserva
   * @param {number} reservationData.userId - ID do usuário
   * @param {number} reservationData.roomId - ID do quarto
   * @param {number} reservationData.hotelId - ID do hotel
   * @param {string} reservationData.checkIn - Data de check-in (YYYY-MM-DD)
   * @param {string} reservationData.checkOut - Data de check-out (YYYY-MM-DD)
   * @param {number} reservationData.numberOfGuests - Número de hóspedes
   * @param {string} reservationData.specialRequests - Solicitações especiais (opcional)
   * @returns {Promise<Object>} Reserva criada
   */
  async createReservation(reservationData) {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          UserId: reservationData.userId,
          RoomId: reservationData.roomId,
          HotelId: reservationData.hotelId,
          CheckIn: reservationData.checkIn,
          CheckOut: reservationData.checkOut,
          NumberOfGuests: reservationData.numberOfGuests,
          SpecialRequests: reservationData.specialRequests || '',
          Travellers: reservationData.travellers.map(traveller => ({
            FirstName: traveller.firstName,
            LastName: traveller.lastName,
            Cpf: traveller.cpf
          }))
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erro ao criar reserva: ${response.status} ${response.statusText}`);
      }

      const reservation = await response.json();
      return reservation;
      
    } catch (error) {
      console.error('Erro no serviço de reservas:', error);
      throw new Error(error.message || 'Não foi possível criar a reserva. Tente novamente mais tarde.');
    }
  }

  /**
   * Busca reserva por ID
   * @param {number} id - ID da reserva
   * @returns {Promise<Object>} Dados da reserva
   */
  async getReservationById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar reserva: ${response.status} ${response.statusText}`);
      }

      const reservation = await response.json();
      return reservation;
      
    } catch (error) {
      console.error('Erro ao buscar reserva:', error);
      throw error;
    }
  }

  /**
   * Busca reservas de um usuário
   * @param {number} userId - ID do usuário
   * @returns {Promise<Array>} Lista de reservas do usuário
   */
  async getReservationsByUser(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar reservas: ${response.status} ${response.statusText}`);
      }

      const reservations = await response.json();
      return reservations;
      
    } catch (error) {
      console.error('Erro ao buscar reservas:', error);
      throw error;
    }
  }

  /**
   * Valida dados de reserva antes do envio
   * @param {Object} reservationData - Dados a serem validados
   * @returns {Object} Objeto com isValid e errors
   */
  validateReservationData(reservationData) {
    console.log('Validating reservation data:', reservationData);
    const errors = [];

    if (!reservationData.userId || reservationData.userId <= 0) {
      errors.push('Usuário deve estar logado para fazer reserva');
    }

    if (!reservationData.roomId || reservationData.roomId <= 0) {
      console.log('Room ID issue:', reservationData.roomId);
      errors.push('Erro interno: ID do quarto não encontrado');
    }

    if (!reservationData.hotelId || reservationData.hotelId <= 0) {
      console.log('Hotel ID issue:', reservationData.hotelId);
      errors.push('Erro interno: ID do hotel não encontrado');
    }

    if (!reservationData.checkIn) {
      errors.push('Data de check-in é obrigatória');
    }

    if (!reservationData.checkOut) {
      errors.push('Data de check-out é obrigatória');
    }

    if (reservationData.checkIn && reservationData.checkOut) {
      const checkInDate = new Date(reservationData.checkIn);
      const checkOutDate = new Date(reservationData.checkOut);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Permite reservas para hoje
      if (checkInDate < today) {
        errors.push('Data de check-in não pode ser anterior a hoje');
      }

      if (checkOutDate <= checkInDate) {
        errors.push('Data de check-out deve ser posterior ao check-in');
      }
    }

    if (!reservationData.numberOfGuests || reservationData.numberOfGuests < 1 || reservationData.numberOfGuests > 20) {
      errors.push('Número de hóspedes deve ser entre 1 e 20');
    }

    // Validação dos viajantes
    if (!reservationData.travellers || !Array.isArray(reservationData.travellers) || reservationData.travellers.length === 0) {
      errors.push('Dados dos viajantes são obrigatórios');
    } else {
      reservationData.travellers.forEach((traveller, index) => {
        if (!traveller.firstName || traveller.firstName.trim().length === 0) {
          errors.push(`Nome do viajante ${index + 1} é obrigatório`);
        }
        if (!traveller.lastName || traveller.lastName.trim().length === 0) {
          errors.push(`Sobrenome do viajante ${index + 1} é obrigatório`);
        }
        if (!traveller.cpf || traveller.cpf.length !== 11 || !/^\d{11}$/.test(traveller.cpf)) {
          errors.push(`CPF do viajante ${index + 1} deve conter exatamente 11 dígitos numéricos`);
        }
      });

      if (reservationData.travellers.length !== reservationData.numberOfGuests) {
        errors.push('Número de viajantes deve corresponder ao número de hóspedes');
      }
    }

    console.log('Validation result:', { isValid: errors.length === 0, errors });
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Calcula o valor total da reserva
   * @param {number} dailyPrice - Preço diário do quarto
   * @param {string} checkIn - Data de check-in
   * @param {string} checkOut - Data de check-out
   * @returns {Object} Cálculo da reserva
   */
  calculateReservationTotal(dailyPrice, checkIn, checkOut) {
    try {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      const subtotal = dailyPrice * daysDiff;
      // TAXAS REMOVIDAS - MOSTRAR APENAS VALOR CRU
      // const taxes = subtotal * 0.1; // 10% de taxas
      const taxes = 0; // Taxa zerada
      const total = subtotal; // Total = subtotal sem taxas

      return {
        days: daysDiff,
        dailyPrice,
        subtotal,
        taxes,
        total
      };
    } catch (error) {
      console.error('Erro ao calcular total da reserva:', error);
      return {
        days: 0,
        dailyPrice: 0,
        subtotal: 0,
        taxes: 0,
        total: 0
      };
    }
  }
}

// Exporta uma instância única do serviço
export const reservationService = new ReservationService();
export default reservationService;
