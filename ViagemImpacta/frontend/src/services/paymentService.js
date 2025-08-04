// src/services/paymentService.js

const API_BASE_URL = 'https://localhost:7010/api';

/**
 * Serviço para gerenciar operações relacionadas a pagamentos
 * Integra com o Stripe através da API do backend
 */
class PaymentService {

  /**
   * Inicia o processo de checkout com Stripe
   * @param {number} reservationId - ID da reserva para fazer o pagamento
   * @returns {Promise<Object>} URL de checkout do Stripe
   */
  async createCheckoutSession(reservationId) {
    try {
      console.log('Creating checkout session for reservation ID:', reservationId);
      const token = localStorage.getItem('authToken');
      console.log('Auth token exists:', !!token);
      
      const response = await fetch(`https://localhost:7010/api/Stripe/checkout?id=${reservationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Checkout response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Checkout error response:', errorText);

        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }

        throw new Error(errorData.message || `Erro ao criar sessão de pagamento: ${response.status} ${response.statusText}`);
      }

      const checkoutData = await response.json();
      return checkoutData;

    } catch (error) {
      console.error('Erro no serviço de pagamento:', error);
      throw new Error(error.message || 'Não foi possível iniciar o pagamento. Tente novamente mais tarde.');
    }
  }

  /**
   * Redireciona para o checkout do Stripe
   * @param {string} checkoutUrl - URL do checkout retornada pela API
   */
  redirectToStripeCheckout(checkoutUrl) {
    if (checkoutUrl) {
      window.location.href = checkoutUrl.result;
    } else {
      throw new Error('URL de checkout inválida');
    }
  }

  /**
   * Processo completo de pagamento: criar reserva e redirecionar para checkout
   * @param {Object} reservationData - Dados da reserva
   * @returns {Promise<void>} Redireciona para o Stripe
   */
  async processReservationAndPayment(reservationData) {
    try {
      // Primeiro, criar a reserva
      const reservationResponse = await fetch(`${API_BASE_URL}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(reservationData)
      });
      console.log('Reserva response status:', reservationResponse.status);
      if (!reservationResponse.ok) {
        if (reservationResponse.status === 400) {
          throw new Error('Não foi possível criar sua reserva! Verifique seus dados ou ligue para nós para verificar a disponibilidade de quartos.');
        }
        if (reservationResponse.status === 401) {
          throw new Error('Você precisa estar logado para fazer uma reserva. Por favor, faça login e tente novamente.');
        }
        const errorData = await reservationResponse.json().catch(() => ({}));
        throw new Error(errorData.message || `Erro ao criar reserva: ${reservationResponse.status} ${reservationResponse.statusText}`);
      }

      const reservation = await reservationResponse.json();
      console.log('Reserva criada com sucesso:', reservation);
      console.log('Reservation ID:', reservation.reservationId || reservation.ReservationId);

      const reservationId = reservation.reservationId || reservation.ReservationId;
      if (!reservationId) {
        throw new Error('ID da reserva não foi retornado pelo servidor');
      }

      // Depois, criar a sessão de checkout do Stripe
      const checkoutData = await this.createCheckoutSession(reservationId);

      // Redirecionar para o Stripe
      this.redirectToStripeCheckout(checkoutData.url);

    } catch (error) {
      console.error('Erro no processo de reserva e pagamento:', error);
      throw error;
    }
  }

  /**
   * Formata os dados da reserva para envio ao backend
   * @param {Object} formData - Dados do formulário
   * @param {Object} room - Dados do quarto
   * @param {Object} hotel - Dados do hotel
   * @param {number} userId - ID do usuário
   * @returns {Object} Dados formatados para o backend
   */
  formatReservationData(formData, room, hotel, userId) {
    return {
      UserId: userId,
      RoomId: room.id || 1, // Fallback se o ID não estiver disponível
      HotelId: hotel.id,
      CheckIn: formData.checkIn,
      CheckOut: formData.checkOut,
      NumberOfGuests: parseInt(formData.numberOfGuests),
      SpecialRequests: formData.specialRequests || '',
      Travellers: formData.travellers.map(traveller => ({
        FirstName: traveller.firstName,
        LastName: traveller.lastName,
        Cpf: traveller.cpf.replace(/\D/g, '') // Remove caracteres não numéricos do CPF
      }))
    };
  }
}

// Exporta uma instância única do serviço
export const paymentService = new PaymentService();
export default paymentService;
