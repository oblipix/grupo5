// src/services/reviewService.js
import axios from 'axios';

// URL base da sua API .NET (VERIFIQUE A PORTA E PROTOCOLO!)
const API_URL = 'https://localhost:7010/api'; // Exemplo: HTTPS na porta 7010

// Função que faz a requisição autenticada, encapsulando a lógica do token e tratamento de erro 401
const makeAuthenticatedRequest = async (url, options = {}) => {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    
    if (!token) {
        throw new Error('Token de autenticação não encontrado. Faça login novamente.');
    }

    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers
        }
    };

    try {
        const response = await fetch(url, config);
        
        if (response.status === 401) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('token');
            window.dispatchEvent(new CustomEvent('tokenExpired'));
            throw new Error('Sessão expirada. Faça login novamente.');
        }
        
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || `Erro HTTP: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            return await response.text();
        }
    } catch (error) {
        throw error;
    }
};

export const reviewService = {
  // Avaliar um hotel
  async rateHotel(reviewData) {
    try {
      const response = await makeAuthenticatedRequest(`${API_URL}/Reviews`, {
        method: 'POST',
        body: JSON.stringify(reviewData)
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Verificar se o usuário pode avaliar um hotel
  async canRateHotel(hotelId) {
    try {
      const response = await makeAuthenticatedRequest(`${API_URL}/Review/can-rate/${hotelId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obter avaliação média de um hotel
  async getHotelRating(hotelId) {
    try {
      const response = await makeAuthenticatedRequest(`${API_URL}/Review/hotel-rating/${hotelId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obter todas as avaliações de um hotel
  async getHotelReviews(hotelId) {
    try {
      const response = await makeAuthenticatedRequest(`${API_URL}/Reviews/hotel/${hotelId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
};

export default reviewService; // Exportação padrão também