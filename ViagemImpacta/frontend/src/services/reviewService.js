// src/services/reviewService.js

// URL base da sua API .NET - usando a mesma URL que funciona no reservationService
const API_URL = 'https://localhost:7010/api';

// Função para obter o token do localStorage
const getAuthToken = () => {
    return localStorage.getItem('authToken') || localStorage.getItem('token');
};

// Função para fazer requisições autenticadas
const makeAuthenticatedRequest = async (url, options = {}) => {
    const token = getAuthToken();
    
    console.log('� REVIEW SERVICE - Verificações detalhadas:');
    console.log('  Token presente:', !!token);
    console.log('  Token value (primeiros 20 chars):', token ? token.substring(0, 20) + '...' : 'null');
    console.log('  URL da requisição:', url);
    console.log('  Método HTTP:', options.method || 'GET');
    console.log('  Timestamp:', new Date().toISOString());
    
    if (!token) {
        console.error('❌ REVIEW SERVICE - Token não encontrado no localStorage');
        throw new Error('Token de autenticação não encontrado. Faça login novamente.');
    }

    try {
        console.log('🚀 REVIEW SERVICE - Iniciando requisição...');
        
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...options.headers
            }
        });

        console.log('📡 REVIEW SERVICE - Status da resposta:', response.status);
        console.log('📡 REVIEW SERVICE - Headers da resposta:', [...response.headers.entries()]);

        // Se retornar 401, o token está inválido/expirado
        if (response.status === 401) {
            console.error('🚫 REVIEW SERVICE - Token inválido (401)');
            console.error('🚫 REVIEW SERVICE - Resposta completa:', response);
            console.error('🚫 REVIEW SERVICE - Headers da resposta 401:', [...response.headers.entries()]);
            console.error('🚫 REVIEW SERVICE - Stack trace:', new Error().stack);
            
            // TEMPORÁRIO: Não disparar evento tokenExpired para debug
            console.error('🚫 REVIEW SERVICE - DEBUG: NÃO disparando tokenExpired para investigar o erro');
            
            // IMPORTANTE: NÃO remove os tokens aqui, deixa o AuthContext fazer isso
            // localStorage.removeItem('authToken');
            // localStorage.removeItem('token');
            
            // COMENTADO TEMPORARIAMENTE PARA DEBUG
            // window.dispatchEvent(new CustomEvent('tokenExpired'));
            
            // Tenta ler o corpo da resposta para mais detalhes
            try {
                const errorBody = await response.text();
                console.error('🚫 REVIEW SERVICE - Corpo da resposta 401:', errorBody);
                throw new Error(`Erro 401: ${errorBody || 'Token inválido'}`);
            } catch (readError) {
                console.error('🚫 REVIEW SERVICE - Erro ao ler corpo da resposta:', readError);
                throw new Error('Erro 401: Token inválido');
            }
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ REVIEW SERVICE - Erro na resposta:', errorText);
            throw new Error(errorText || `Erro HTTP: ${response.status}`);
        }

        // Tenta parsear como JSON
        try {
            const data = await response.json();
            console.log('✅ REVIEW SERVICE - Resposta JSON:', data);
            return data;
        } catch {
            // Se não for JSON, retorna como texto
            const text = await response.text();
            console.log('✅ REVIEW SERVICE - Resposta texto:', text);
            return text;
        }

    } catch (error) {
        console.error('💥 REVIEW SERVICE - Erro na requisição:', error.message);
        throw error;
    }
};

export const reviewService = {
    // Avaliar um hotel
    async rateHotel(reviewData) {
        console.log('📊 REVIEW SERVICE - Enviando avaliação:', reviewData);
        
        try {
            const response = await makeAuthenticatedRequest(`${API_URL}/Reviews`, {
                method: 'POST',
                body: JSON.stringify(reviewData)
            });
            
            console.log('✅ REVIEW SERVICE - Avaliação enviada com sucesso');
            return response;
        } catch (error) {
            console.error('❌ REVIEW SERVICE - Erro ao enviar avaliação:', error.message);
            throw error;
        }
    },

    // Buscar reviews de um hotel e calcular média
    async getHotelReviews(hotelId) {
        console.log('📊 REVIEW SERVICE - Buscando reviews do hotel:', hotelId);
        
        try {
            // Requisição COM autenticação pois o backend exige
            const response = await fetch(`${API_URL}/Reviews/hotel/${hotelId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAuthToken()}`
                }
            });

            if (!response.ok) {
                // Se não encontrar reviews, retorna dados vazios ao invés de erro
                if (response.status === 404) {
                    console.log('📊 REVIEW SERVICE - Nenhuma review encontrada para o hotel');
                    return { reviews: [], averageRating: 0, totalReviews: 0 };
                }
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const reviews = await response.json();
            console.log('✅ REVIEW SERVICE - Reviews encontradas:', reviews);

            // Calcula a média das avaliações
            if (reviews && reviews.length > 0) {
                const totalRating = reviews.reduce((sum, review) => sum + (review.rating || review.Rating || 0), 0);
                const averageRating = totalRating / reviews.length;
                
                return {
                    reviews: reviews,
                    averageRating: Math.round(averageRating * 10) / 10, // Arredonda para 1 casa decimal
                    totalReviews: reviews.length
                };
            } else {
                return { reviews: [], averageRating: 0, totalReviews: 0 };
            }
        } catch (error) {
            console.error('❌ REVIEW SERVICE - Erro ao buscar reviews:', error.message);
            // Em caso de erro, retorna dados vazios para não quebrar a UI
            return { reviews: [], averageRating: 0, totalReviews: 0 };
        }
    }
};

export default reviewService;