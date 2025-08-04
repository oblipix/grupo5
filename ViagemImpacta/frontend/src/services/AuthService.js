import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Serviço para integração com a API de autenticação do back-end
 * 
 * 
 * 
 */
class AuthService {
  /**
   * Realiza o login do usuário
   * @param {Object} credentials - Credenciais do usuário
   * @param {string} credentials.email - Email do usuário
   * @param {string} credentials.password - Senha do usuário
   * @returns {Promise<Object>} Dados do usuário e token
   */
  async login(credentials) {
    try {
      const response = await axios.post(`${API_URL}/Auth/login`, credentials);
      if (response.data && response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Realiza o registro do usuário
   * @param {Object} userData - Dados do usuário
   * @param {string} userData.email - Email do usuário
   * @param {string} userData.password - Senha do usuário
   * @param {string} userData.firstName - Nome do usuário
   * @param {string} userData.lastName - Sobrenome do usuário
   * @returns {Promise<Object>} Dados do usuário criado
   */
  async register(userData) {
    try {
      const response = await axios.post(`${API_URL}/Users/createUser`, userData);
      return response.data;
    } catch (error) {
      console.error('Erro ao realizar cadastro:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Realiza o logout do usuário
   */
  logout() {
    localStorage.removeItem('user');
  }

  /**
   * Obtém o usuário atual
   * @returns {Object|null} Dados do usuário atual
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (e) {
      console.error('Erro ao obter usuário atual:', e);
      return null;
    }
  }

  /**
   * Obtém o token do usuário
   * @returns {string|null} Token JWT do usuário
   */
  getToken() {
    const user = this.getCurrentUser();
    return user?.token;
  }

  /**
   * Verifica se o usuário está autenticado
   * @returns {boolean} True se o usuário estiver autenticado
   */
  isAuthenticated() {
    return !!this.getToken();
  }

  /**
   * Trata erros da API
   * @param {Error} error - Erro da requisição
   * @returns {Error} Erro tratado
   */
  handleError(error) {
    if (error.response) {
      // Resposta do servidor com código de erro
      const { status, data } = error.response;
      
      if (status === 401) {
        return new Error('Email ou senha incorretos');
      }
      
      if (status === 400 && data) {
        return new Error(data);
      }
      
      return new Error(`Erro ${status}: ${data || 'Ocorreu um erro no servidor'}`);
    }
    
    if (error.request) {
      // Requisição foi feita mas não houve resposta
      return new Error('Não foi possível conectar ao servidor. Verifique sua internet.');
    }
    
    // Erro ao configurar a requisição
    return new Error('Ocorreu um erro ao processar sua solicitação');
  }
}

export default new AuthService();
