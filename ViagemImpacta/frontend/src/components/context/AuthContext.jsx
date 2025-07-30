/* eslint-disable react-refresh/only-export-components */
// src/components/context/AuthContext.jsx
 
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
 
const AuthContext = createContext(null);
 
// --- DADOS DE EXEMPLO (usados apenas para saved/visited se não vierem do backend no login) ---
// Em um cenário real, mockVisitedHotels e mockSavedHotels seriam carregados do backend após o login
// ou gerenciados via outras chamadas de API.
const mockVisitedHotels = [
    { id: 1, mainImageUrl: 'https://picsum.photos/id/1000/800/600', title: 'Hotel Grandioso', location: 'Paris, França', price: 1200, rating: 4.8, description: 'Estadia de luxo inesquecível.', feedbacks: [] },
    { id: 2, mainImageUrl: 'https://picsum.photos/id/1002/800/600', title: 'Pousada da Mata', location: 'Bonito, Brasil', price: 800, rating: 4.9, description: 'Natureza exuberante e tranquilidade.', feedbacks: [] },
];
 
const mockSavedHotels = [
    { id: 3, mainImageUrl: 'https://picsum.photos/id/1004/800/600', title: 'Resort Ilha Bela', location: 'Maldivas', price: 3500, rating: 4.9, description: 'Praias privativas e mergulho.', feedbacks: [] },
    { id: 4, mainImageUrl: 'https://picsum.photos/id/1006/800/600', title: 'Hotel Urbano', location: 'Nova York, EUA', price: 2200, rating: 4.7, description: 'Moderno e central, para explorar a cidade.', feedbacks: [] },
];
// --- FIM DOS DADOS DE EXEMPLO ---
 
 
export const AuthProvider = ({ children }) => {
    // Estados do contexto
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null); // Adicionado para armazenar o token JWT
    const [savedHotels, setSavedHotels] = useState([]);
    const [visitedHotels, setVisitedHotels] = useState([]);
    const [reservationHistory, setReservationHistory] = useState([]); // Histórico de reservas
    const [isLoadingAuth, setIsLoadingAuth] = useState(true); // Para indicar que a checagem inicial está acontecendo
 
    // Usar navigate de forma segura - hooks devem ser chamados sempre na mesma ordem
    const navigate = useNavigate();
 
    // Efeito para verificar autenticação no localStorage ao carregar a aplicação
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('authUser');
        const storedReservations = localStorage.getItem('userReservations');

        if (storedToken && storedUser) {
            try {
                const user = JSON.parse(storedUser);
                if (user && typeof user === 'object' && user.email) {
                    setCurrentUser(user);
                    setToken(storedToken);
                    setIsLoggedIn(true);
                    // Em um cenário real, você carregaria saved/visited hotels do backend aqui após a autenticação
                    // Por enquanto, continuam mockados ou persistidos de alguma forma se houver
                    setSavedHotels(mockSavedHotels); // Mantém mockado por enquanto
                    setVisitedHotels(mockVisitedHotels); // Mantém mockado por enquanto
                    
                    // Carrega histórico de reservas do localStorage
                    if (storedReservations) {
                        try {
                            const reservations = JSON.parse(storedReservations);
                            setReservationHistory(Array.isArray(reservations) ? reservations : []);
                        } catch (e) {
                            console.error("Erro ao carregar histórico de reservas:", e);
                            setReservationHistory([]);
                        }
                    } else {
                        setReservationHistory([]);
                    }
                } else {
                    // Se os dados do usuário são inválidos, limpa o localStorage
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('authUser');
                    localStorage.removeItem('userReservations');
                }
            } catch (e) {
                console.error("Falha ao analisar dados de usuário armazenados:", e);
                // Se houver erro, assume que os dados estão corrompidos e desloga
                localStorage.removeItem('authToken');
                localStorage.removeItem('authUser');
                localStorage.removeItem('userReservations');
                setCurrentUser(null);
                setIsLoggedIn(false);
                setToken(null);
                setReservationHistory([]);
            }
        }
        setIsLoadingAuth(false); // A checagem inicial terminou
    }, []); // Array de dependências vazio para rodar apenas uma vez no mount    // <<<<<<<<<<<< FUNÇÃO DE LOGIN COM CHAMADA AO BACKEND >>>>>>>>>>>>
    const login = async (email, password) => {
        // Validações básicas antes da requisição
        if (!email || !password) {
            throw new Error("Email e senha são obrigatórios");
        }
 
        if (typeof email !== 'string' || typeof password !== 'string') {
            throw new Error("Email e senha devem ser strings válidas");
        }
 
        try {
            const response = await fetch('https://localhost:7010/api/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password: password
                })
            });
 
            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                // Tenta extrair mensagem de erro da resposta
                let errorMessage = 'Erro no login';
 
                // Trata especificamente o erro 401 (Unauthorized)
                if (response.status === 401) {
                    errorMessage = 'Email ou senha inválidos';
                } else if (response.status === 404) {
                    errorMessage = 'Usuário não encontrado';
                } else if (response.status === 400) {
                    errorMessage = 'Dados de login inválidos';
                } else {
                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.message || errorData.error || `Erro ${response.status}: ${response.statusText}`;
                    } catch {
                        // Se não conseguir parsear o JSON do erro
                        errorMessage = `Erro ${response.status}: ${response.statusText}`;
                    }
                }
 
                throw new Error(errorMessage);
            }
 
            // Parse da resposta JSON
            const data = await response.json();
            console.log('Login bem-sucedido (dados do backend):', data);
 
            // Verificação mais robusta dos dados recebidos
            if (!data || typeof data !== 'object') {
                throw new Error("Resposta inválida do servidor");
            }
 
            // Tenta extrair token de diferentes possíveis propriedades
            const receivedToken = data.token || data.accessToken || data.jwt || data.authToken;
 
            // Tenta extrair informações do usuário de diferentes possíveis propriedades
            const userInfo = data.user || data.profile || data.userData || data;
 
            // Debug: mostra o que foi extraído
            console.log('userInfo extraído:', userInfo);
            console.log('Token extraído:', receivedToken);
 
            // Validação mais rigorosa dos dados recebidos
            if (!userInfo || typeof userInfo !== 'object') {
                throw new Error("Informações do usuário não encontradas na resposta");
            }
 
            if (!userInfo.email || typeof userInfo.email !== 'string') {
                throw new Error("Email do usuário inválido recebido da API");
            }
 
            // Atualiza estados locais
            setToken(receivedToken || null);
            setCurrentUser(userInfo);
            setIsLoggedIn(true);
 
            // Salva no localStorage para persistência da sessão
            if (receivedToken) {
                localStorage.setItem('authToken', receivedToken);
            }
            localStorage.setItem('authUser', JSON.stringify(userInfo));
 
            // Em um cenário real, aqui você faria chamadas para carregar
            // os hotéis salvos e visitados do usuário real, usando o token.
            // Por enquanto, continuam mockados
            setSavedHotels(mockSavedHotels);
            setVisitedHotels(mockVisitedHotels);
 
            // Redireciona para a página principal após o login
            try {
                navigate('/minhas-viagens');
            } catch (navError) {
                console.error('Erro na navegação:', navError);
                // Se a navegação falhar, ainda considera o login bem-sucedido
            }
 
        } catch (error) {
            console.error('Erro no login:', error);
 
            // Limpa dados em caso de erro
            setCurrentUser(null);
            setIsLoggedIn(false);
            setToken(null);
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUser');
 
            // Re-lança o erro para que o componente de Login possa exibir a mensagem
            throw error;
        }
    };
 
    // <<<<<<<<<<<< FUNÇÃO DE LOGOUT >>>>>>>>>>>>
    const logout = () => {
        setCurrentUser(null);
        setIsLoggedIn(false);
        setToken(null);
        setSavedHotels([]); // Limpa hotéis salvos/visitados ao deslogar
        setVisitedHotels([]);
        setReservationHistory([]); // Limpa histórico de reservas
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        localStorage.removeItem('userReservations');

        // Navega para login de forma segura
        try {
            navigate('/login');
        } catch (navError) {
            console.warn('Não foi possível navegar para /login:', navError);
            // Fallback: recarregar a página para ir para a rota padrão
            window.location.href = '/login';
        }
    };    const updateUser = async (updatedData) => {
        // Validações básicas
        if (!updatedData || typeof updatedData !== 'object') {
            throw new Error("Dados de atualização inválidos");
        }
 
        if (!token) {
            throw new Error("Token de autenticação não encontrado. Faça login novamente.");
        }
 
        if (!currentUser?.UserId && !currentUser?.userId) {
            throw new Error("ID do usuário não encontrado. Faça login novamente.");
        }
 
        try {
            // Obtém o ID do usuário (pode vir como UserId ou userId)
            const userId = currentUser.UserId || currentUser.userId;
 
            // Prepara os dados para envio conforme o DTO esperado pelo backend
            const dataToSend = {
                UserId: userId,
                FirstName: updatedData.firstName?.trim() || currentUser.FirstName,
                LastName: updatedData.lastName?.trim() || currentUser.LastName,
                Email: updatedData.email?.trim() || currentUser.Email,
                Phone: updatedData.phone?.trim() || currentUser.Phone || null,
                Cpf: updatedData.cpf?.trim() || currentUser.Cpf || null,
                BirthDate: updatedData.birthDate?.trim() || currentUser.BirthDate || null
            };

            // Limpa telefone e CPF (remove formatação)
            if (dataToSend.Phone) {
                dataToSend.Phone = dataToSend.Phone.replace(/\D/g, ''); // Remove tudo que não é número
            }
            if (dataToSend.Cpf) {
                dataToSend.Cpf = dataToSend.Cpf.replace(/\D/g, ''); // Remove tudo que não é número
            }

            // Valida formato da data de nascimento (deve ser YYYY-MM-DD para DateOnly)
            if (dataToSend.BirthDate) {
                // Verifica se é uma data válida no formato correto
                if (!/^\d{4}-\d{2}-\d{2}$/.test(dataToSend.BirthDate)) {
                    throw new Error('Data de nascimento deve estar no formato correto (YYYY-MM-DD)');
                }
                // Valida se é uma data real
                const dateObj = new Date(dataToSend.BirthDate);
                if (isNaN(dateObj.getTime())) {
                    throw new Error('Data de nascimento inválida');
                }
            }

            // Remove campos null para não enviar ao backend
            Object.keys(dataToSend).forEach(key => {
                if (dataToSend[key] === null && (key === 'Phone' || key === 'Cpf' || key === 'BirthDate')) {
                    // Para campos opcionais, pode manter null ou remover
                    // Vou remover para evitar problemas
                    delete dataToSend[key];
                }
            });
 
            console.log('Dados finais para envio:', dataToSend);
            console.log('BirthDate type:', typeof dataToSend.BirthDate);
            console.log('BirthDate value:', dataToSend.BirthDate);

            const response = await fetch(`https://localhost:7010/api/Users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Envia o token de autenticação
                },
                body: JSON.stringify(dataToSend)
            }); 
            if (!response.ok) {
                // Tenta extrair mensagem de erro da resposta
                let errorMessage = 'Erro ao atualizar perfil';
 
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || errorData || `Erro ${response.status}: ${response.statusText}`;
                } catch {
                    errorMessage = `Erro ${response.status}: ${response.statusText}`;
                }
 
                throw new Error(errorMessage);
            }
 
            // Parse da resposta
            const responseData = await response.json();
            console.log('Perfil atualizado com sucesso:', responseData);
 
            // Os dados atualizados vêm diretamente na resposta
            const updatedUserInfo = responseData;
 
            // Atualiza o estado local com os dados retornados pela API
            setCurrentUser(updatedUserInfo);
 
            // Atualiza também no localStorage
            localStorage.setItem('authUser', JSON.stringify(updatedUserInfo));
 
            return { success: true, message: 'Perfil atualizado com sucesso!' };
 
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
 
            // Re-lança o erro para que o componente possa tratar
            throw error;
        }
    };
 
    const removeSavedHotel = (hotelId) => {
        // Em um cenário real, você faria uma chamada de API para remover o hotel do backend.
        setSavedHotels(prevHotels => prevHotels.filter(hotel => hotel.id !== hotelId));
        alert("Hotel removido da sua lista de desejos!"); // Considere usar uma toast notification aqui.
    };
 
    const addSavedHotel = (hotel) => {
        // Em um cenário real, você faria uma chamada de API para adicionar o hotel no backend.
        setSavedHotels(prevHotels => [...prevHotels, hotel]);
        alert("Hotel adicionado à sua lista de desejos!"); // Considere usar uma toast notification aqui.
    }

    // <<<<<<<<<<<< FUNÇÃO PARA ADICIONAR RESERVA AO HISTÓRICO >>>>>>>>>>>>
    const addReservationToHistory = (reservationData) => {
        try {
            // Cria objeto da reserva com dados completos
            const newReservation = {
                id: reservationData.reservationId || Date.now(), // ID da reserva ou timestamp como fallback
                hotelId: reservationData.hotelId,
                hotelName: reservationData.hotelName,
                hotelImage: reservationData.hotelImage || reservationData.mainImageUrl,
                roomType: reservationData.roomType,
                checkInDate: reservationData.checkInDate,
                checkOutDate: reservationData.checkOutDate,
                totalPrice: reservationData.totalPrice,
                numberOfGuests: reservationData.numberOfGuests,
                travellers: reservationData.travellers || [],
                reservationDate: new Date().toISOString(), // Data da reserva
                status: reservationData.status || 'confirmed', // Status da reserva
                location: reservationData.location
            };

            // Atualiza o estado
            setReservationHistory(prevHistory => {
                const updatedHistory = [newReservation, ...prevHistory]; // Adiciona no início (mais recente primeiro)
                
                // Salva no localStorage
                localStorage.setItem('userReservations', JSON.stringify(updatedHistory));
                
                return updatedHistory;
            });
            
        } catch (error) {
            console.error('Erro ao adicionar reserva ao histórico:', error);
        }
    };

    // Função para atualizar status de uma reserva (de pending para confirmed)
    const updateReservationStatus = (reservationId, newStatus = 'confirmed') => {
        try {
            setReservationHistory(prevHistory => {
                const updatedHistory = prevHistory.map(reservation => {
                    if (reservation.id === reservationId || reservation.reservationId === reservationId) {
                        return { ...reservation, status: newStatus };
                    }
                    return reservation;
                });
                
                // Salva no localStorage
                localStorage.setItem('userReservations', JSON.stringify(updatedHistory));
                
                return updatedHistory;
            });
            
        } catch (error) {
            console.error('Erro ao atualizar status da reserva:', error);
        }
    };
 
    // <<<<<<<<<<<< FUNÇÃO DE REGISTRO/CADASTRO >>>>>>>>>>>>
    const register = async (firstName, lastName, email, password) => {
        // Validações básicas antes da requisição
        if (!firstName || !lastName || !email || !password) {
            throw new Error("Todos os campos são obrigatórios");
        }
 
        if (typeof firstName !== 'string' || typeof lastName !== 'string' ||
            typeof email !== 'string' || typeof password !== 'string') {
            throw new Error("Todos os campos devem ser strings válidas");
        }
 
        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            throw new Error("Por favor, insira um email válido");
        }
 
        // Validação de senha
        if (password.length < 6) {
            throw new Error("A senha deve ter pelo menos 6 caracteres");
        }
 
        try {
            // Validação extra de nome para evitar caracteres especiais
            const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
            if (!nameRegex.test(firstName.trim())) {
                throw new Error("Primeiro nome não pode conter números ou caracteres especiais");
            }
            if (!nameRegex.test(lastName.trim())) {
                throw new Error("Último nome não pode conter números ou caracteres especiais");
            }
 
            const dataToSend = {
                FirstName: firstName.trim(),
                LastName: lastName.trim(),
                Email: email.trim(),
                Password: password,
                roles: 0 // 0 = User (conforme enum Roles)
            };
 
            console.log('Dados validados - enviando para registro:', {
                ...dataToSend,
                Password: '***',
                firstNameLength: dataToSend.FirstName.length,
                lastNameLength: dataToSend.LastName.length,
                emailLength: dataToSend.Email.length,
                passwordLength: password.length
            });

            const response = await fetch('https://localhost:7010/api/Users/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });            if (!response.ok) {
                // Tenta extrair mensagem de erro da resposta
                let errorMessage = 'Erro no cadastro';
 
                try {
                    const errorData = await response.json();
                    console.log('Erro detalhado do backend:', errorData);
 
                    // Se for um objeto com ModelState (validações do ASP.NET)
                    if (errorData.errors) {
                        const errors = Object.values(errorData.errors).flat();
                        errorMessage = errors.join(', ');
                    } else if (errorData.title && errorData.detail) {
                        // Formato de erro padrão do ASP.NET Core
                        errorMessage = `${errorData.title}: ${errorData.detail}`;
                    } else {
                        errorMessage = errorData.message || errorData.error || errorData || `Erro ${response.status}: ${response.statusText}`;
                    }
                } catch {
                    errorMessage = `Erro ${response.status}: ${response.statusText}`;
                }
 
                console.error('Erro no cadastro - Status:', response.status, 'Message:', errorMessage);
                throw new Error(errorMessage);
            }
 
            // Parse da resposta JSON
            const data = await response.json();
            console.log('Cadastro bem-sucedido:', data);
 
            // Não faz login automático, apenas retorna sucesso
            return {
                success: true,
                message: 'Cadastro realizado com sucesso! Você pode fazer login agora.',
                user: data
            };
 
        } catch (error) {
            console.error('Erro no cadastro:', error);
 
            // Verifica se é um erro de rede (fetch falhou)
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Não foi possível conectar com o servidor. Verifique se o backend está rodando em https://localhost:7010');
            }
 
            // Re-lança o erro para que o componente possa exibir a mensagem
            throw error;
        }
    };
 
    const value = {
        currentUser,
        isLoggedIn,
        token, // Expor o token se outros componentes precisarem dele para APIs
        savedHotels,
        visitedHotels,
        reservationHistory, // Expor histórico de reservas
        isLoadingAuth, // Expor para que a aplicação possa mostrar um loader enquanto checa a sessão
        login,
        logout,
        register, // Adiciona a função de registro
        updateUser,
        addSavedHotel,
        removeSavedHotel,
        addReservationToHistory, // Adiciona função para salvar reservas
        updateReservationStatus // Adiciona função para atualizar status
    };
 
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
 
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};