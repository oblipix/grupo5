/* eslint-disable react-refresh/only-export-components */
// src/components/context/AuthContext.jsx
 
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import reservationService from '../../services/reservationService';
 
const AuthContext = createContext(null);
 
// APIs de hotéis para uso no contexto de autenticação
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7010/api';
const HOTELS_API = {
    SAVED: `${API_BASE_URL}/Hotels/saved`,
    VISITED: `${API_BASE_URL}/Hotels/visited`,
    SAVE: `${API_BASE_URL}/Hotels/save`,
    REMOVE: `${API_BASE_URL}/Hotels/remove`,
    RESERVATIONS: `${API_BASE_URL}/Reservations`,
    MARK_VISITED: `${API_BASE_URL}/Hotels/markVisited`
};
 
 
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
 
    // Função auxiliar para buscar dados do usuário autenticado
    const fetchUserHotels = async (token, userId) => {
        try {
            // TEMPORÁRIO: Desabilitando chamadas para endpoints de hotéis que retornam 404
            console.log('📝 FETCH HOTELS - Carregando apenas do localStorage (endpoints de hotéis desabilitados)');
            
            // Carrega apenas do localStorage para evitar erros 404
            loadSavedHotelsFromLocalStorage();
            
            // COMENTADO TEMPORARIAMENTE - Endpoints não existem no backend
            /*
            // Tenta buscar do backend e atualizar
            try {
                // Busca hotéis salvos
                const savedResponse = await fetch(`${HOTELS_API.SAVED}/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                // Busca hotéis visitados
                const visitedResponse = await fetch(`${HOTELS_API.VISITED}/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (savedResponse.ok) {
                    const savedData = await savedResponse.json();
                    // Mescla dados do backend com localStorage, priorizando o backend
                    const localSavedHotels = JSON.parse(localStorage.getItem('savedHotels') || '[]');
                    
                    // Combina os dois arrays evitando duplicatas por id
                    const combinedHotels = [...savedData];
                    localSavedHotels.forEach(localHotel => {
                        if (!combinedHotels.some(h => h.id === localHotel.id)) {
                            combinedHotels.push(localHotel);
                        }
                    });
                    
                    setSavedHotels(combinedHotels);
                    // Atualiza localStorage com dados combinados
                    localStorage.setItem('savedHotels', JSON.stringify(combinedHotels));
                } else {
                    console.warn('Erro ao buscar hotéis salvos do backend:', savedResponse.status);
                    // Mantém os dados do localStorage já carregados
                }
                
                if (visitedResponse.ok) {
                    const visitedData = await visitedResponse.json();
                    setVisitedHotels(visitedData);
                } else {
                    console.warn('Erro ao buscar hotéis visitados do backend:', visitedResponse.status);
                    // Mantém os dados anteriores
                }
            } catch (backendError) {
                console.warn('Erro ao buscar dados do backend, usando localStorage:', backendError);
                // Já carregamos do localStorage, então continuamos com esses dados
            }
            */
        } catch (error) {
            console.error('Erro ao buscar dados de hotéis do usuário:', error);
            // Tenta carregar do localStorage como último recurso
            loadSavedHotelsFromLocalStorage();
        }
    };

    // Função para verificar reservas e marcar hotéis como visitados após o check-in
    const checkReservationsAndMarkVisited = async (token, userId) => {
        if (!token || !userId) return;
        
        // TEMPORÁRIO: Desabilitando verificação de hotéis visitados
        console.log('📝 CHECK RESERVATIONS - Função desabilitada temporariamente (endpoints não existem)');
        return;
        
        /*
        try {
            // Buscar reservas do usuário
            const reservationsResponse = await fetch(`${HOTELS_API.RESERVATIONS}/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!reservationsResponse.ok) {
                console.error('Erro ao buscar reservas:', reservationsResponse.status);
                return;
            }
            
            const reservations = await reservationsResponse.json();
            const today = new Date();
            
            // Verifica cada reserva
            for (const reservation of reservations) {
                // Verifica se a data de check-in foi há pelo menos um dia
                const checkInDate = new Date(reservation.checkInDate);
                const oneDayAfterCheckIn = new Date(checkInDate);
                oneDayAfterCheckIn.setDate(oneDayAfterCheckIn.getDate() + 1);
                
                // Se hoje é pelo menos um dia após o check-in, marca como visitado
                if (today >= oneDayAfterCheckIn && !reservation.markedAsVisited) {
                    try {
                        // Marca o hotel como visitado
                        const markResponse = await fetch(`${HOTELS_API.MARK_VISITED}/${userId}/${reservation.hotelId}`, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                reservationId: reservation.id,
                                markedAsVisited: true
                            })
                        });
                        
                        if (markResponse.ok) {
                            console.log(`Hotel ${reservation.hotelId} marcado como visitado automaticamente.`);
                            // Não recarrega imediatamente para evitar muitas chamadas de API - será recarregado na próxima atualização
                        } else {
                            console.error('Erro ao marcar hotel como visitado:', markResponse.status);
                        }
                    } catch (markError) {
                        console.error('Erro ao marcar hotel como visitado:', markError);
                    }
                }
            }
            
            // Recarrega a lista de hotéis visitados após as verificações
            fetchUserHotels(token, userId);
            
        } catch (error) {
            console.error('Erro ao verificar reservas:', error);
        }
        */
    };

    // Função para carregar hotéis salvos do localStorage
    const loadSavedHotelsFromLocalStorage = () => {
        try {
            const localSavedHotels = localStorage.getItem('savedHotels');
            if (localSavedHotels) {
                const parsedHotels = JSON.parse(localSavedHotels);
                if (Array.isArray(parsedHotels)) {
                    setSavedHotels(parsedHotels);
                    console.log('Hotéis carregados do localStorage:', parsedHotels.length);
                }
            }
        } catch (error) {
            console.error('Erro ao carregar hotéis do localStorage:', error);
        }
    };
    
    // Efeito para verificar autenticação no localStorage ao carregar a aplicação
    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('authToken');
            const storedUser = localStorage.getItem('authUser');
     
            // Sempre tenta carregar hotéis do localStorage primeiro
            loadSavedHotelsFromLocalStorage();
     
            if (storedToken && storedUser) {
                try {
                    const user = JSON.parse(storedUser);
                    
                    if (user && typeof user === 'object' && (user.email || user.Email)) {
                        setCurrentUser(user);
                        setToken(storedToken);
                        setIsLoggedIn(true);
                        
                        // Busca os dados de hotéis do usuário do backend
                        const userId = user.UserId || user.userId || user.id;
                        if (userId) {
                            await fetchUserHotels(storedToken, userId);
                            
                            // Busca o histórico de reservas do backend
                            try {
                                await loadReservationHistory(userId, storedToken);
                            } catch (reservationError) {
                                console.error('Erro ao carregar reservas na inicialização:', reservationError);
                                setReservationHistory([]);
                            }
                            
                            // Verifica reservas e marca hotéis como visitados automaticamente
                            await checkReservationsAndMarkVisited(storedToken, userId);
                        } else {
                            console.error("ID do usuário não encontrado nos dados armazenados");
                            setSavedHotels([]);
                            setVisitedHotels([]);
                            setReservationHistory([]);
                        }
                    } else {
                        // Se os dados do usuário são inválidos, limpa o localStorage
                        localStorage.removeItem('authToken');
                        localStorage.removeItem('authUser');
                    }
                } catch (e) {
                    console.error("Falha ao analisar dados de usuário armazenados:", e);
                    // Se houver erro, assume que os dados estão corrompidos e desloga
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('authUser');
                    setCurrentUser(null);
                    setIsLoggedIn(false);
                    setToken(null);
                }
            }
            setIsLoadingAuth(false); // A checagem inicial terminou
        };
        
        initAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Array de dependências vazio para rodar apenas uma vez no mount
    
    // Efeito para verificar diariamente se há reservas que devem ser marcadas como visitadas
    useEffect(() => {
        let checkInterval;
        
        // Se o usuário estiver logado, configura uma verificação diária
        if (isLoggedIn && token && currentUser) {
            // Executa verificação inicial
            const userId = currentUser.UserId || currentUser.userId || currentUser.id;
            if (userId) {
                const checkVisited = async () => {
                    await checkReservationsAndMarkVisited(token, userId);
                };
                checkVisited();
            }
            
            // Configura verificação diária às 00:01
            const scheduleNextCheck = () => {
                const now = new Date();
                const tomorrow = new Date(now);
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(0, 1, 0, 0); // 00:01:00 do dia seguinte
                
                const timeToNextCheck = tomorrow - now;
                return setTimeout(() => {
                    if (isLoggedIn && token && currentUser) {
                        const userId = currentUser.UserId || currentUser.userId || currentUser.id;
                        if (userId) {
                            const checkVisited = async () => {
                                await checkReservationsAndMarkVisited(token, userId);
                            };
                            checkVisited();
                        }
                    }
                    // Agenda próxima verificação
                    checkInterval = scheduleNextCheck();
                }, timeToNextCheck);
            };
            
            // Inicia o agendamento
            checkInterval = scheduleNextCheck();
        }
        
        // Limpar o intervalo quando o componente for desmontado ou o usuário deslogar
        return () => {
            if (checkInterval) {
                clearTimeout(checkInterval);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn, token, currentUser]);

    // Efeito para escutar eventos de token expirado
    useEffect(() => {
        const handleTokenExpired = () => {
            console.log('🚨 === EVENTO tokenExpired DETECTADO NO AUTHCONTEXT ===');
            console.log('🚨 Stack trace:', new Error().stack);
            console.log('🚨 Token atual no localStorage:', localStorage.getItem('authToken') ? 'EXISTS' : 'NULL');
            console.log('🚨 User atual no state:', currentUser ? 'EXISTS' : 'NULL');
            console.log('🚨 isLoggedIn atual:', isLoggedIn);
            console.log('🚨 Timestamp:', new Date().toISOString());
            
            console.log('🔄 Executando logout automático...');
            
            // Executa logout diretamente sem depender da referência da função
            setCurrentUser(null);
            setIsLoggedIn(false);
            setToken(null);
            setSavedHotels([]);
            setVisitedHotels([]);   
            setReservationHistory([]);
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUser');

            console.log('🔄 Estado limpo, navegando para login...');
            // Navega para login de forma segura
            try {
                navigate('/login');
            } catch (navError) {
                console.warn('⚠️ Não foi possível navegar para /login:', navError);
                window.location.href = '/login';
            }
        };

        console.log('✅ Adicionando listener para tokenExpired');
        // Adiciona o listener para o evento personalizado
        window.addEventListener('tokenExpired', handleTokenExpired);

        // Remove o listener quando o componente for desmontado
        return () => {
            console.log('❌ Removendo listener para tokenExpired');
            window.removeEventListener('tokenExpired', handleTokenExpired);
        };
    }, [navigate, currentUser, isLoggedIn]);

    // Função para carregar o histórico de reservas do backend
    const loadReservationHistory = async (userId, token) => {
        if (!userId || !token) {
            console.warn('userId ou token não fornecidos para carregar reservas');
            return;
        }

        try {
            console.log('Carregando histórico de reservas do backend para o usuário:', userId, 'tipo:', typeof userId);
            
            // Garante que userId seja um número
            const numericUserId = parseInt(userId, 10);
            if (isNaN(numericUserId)) {
                throw new Error(`userId inválido: ${userId}`);
            }
            
            const reservations = await reservationService.getUserReservations(numericUserId);
            
            if (Array.isArray(reservations)) {
                setReservationHistory(reservations);
                console.log('Histórico de reservas carregado do backend:', reservations.length, 'reservas');
            } else {
                console.warn('Resposta inválida do backend para reservas:', reservations);
                setReservationHistory([]);
            }
        } catch (error) {
            console.error('Erro ao carregar histórico de reservas do backend:', error);
            // Em caso de erro, mantém o array vazio
            setReservationHistory([]);
        }
    };
 
    // <<<<<<<<<<<< FUNÇÃO DE LOGIN COM CHAMADA AO BACKEND >>>>>>>>>>>>
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
 
            // Verificação mais robusta dos dados recebidos
            if (!data || typeof data !== 'object') {
                throw new Error("Resposta inválida do servidor");
            }
 
            // Tenta extrair token de diferentes possíveis propriedades
            const receivedToken = data.token || data.accessToken || data.jwt || data.authToken;
 
            // Tenta extrair informações do usuário de diferentes possíveis propriedades
            const userInfo = data.user || data.profile || data.userData || data;
 
            // Validação mais rigorosa dos dados recebidos
            if (!userInfo || typeof userInfo !== 'object') {
                throw new Error("Informações do usuário não encontradas na resposta");
            }
 
            if (!(userInfo.email || userInfo.Email) || typeof (userInfo.email || userInfo.Email) !== 'string') {
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
 
            // Buscar hotéis salvos e visitados do backend
            const userId = userInfo.UserId || userInfo.userId || userInfo.id;
            if (userId && receivedToken) {
                try {
                    await fetchUserHotels(receivedToken, userId);
                } catch (fetchError) {
                    console.error('Erro ao buscar hotéis do usuário:', fetchError);
                    // Continue o login mesmo se a busca de hotéis falhar
                    setSavedHotels([]);
                    setVisitedHotels([]);
                }

                // Buscar histórico de reservas do backend
                try {
                    await loadReservationHistory(userId, receivedToken);
                } catch (reservationError) {
                    console.error('Erro ao buscar reservas do usuário:', reservationError);
                    // Continue o login mesmo se a busca de reservas falhar
                    setReservationHistory([]);
                }
            } else {
                console.warn('ID do usuário ou token não encontrado, não é possível buscar hotéis e reservas');
                setSavedHotels([]);
                setVisitedHotels([]);
                setReservationHistory([]);
            }
 
            // Redireciona para a página principal após o login
            try {
                navigate('/');
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
        console.log('=== EXECUTANDO LOGOUT ===');
        console.log('Stack trace do logout:', new Error().stack);
        
        setCurrentUser(null);
        setIsLoggedIn(false);
        setToken(null);
        setSavedHotels([]); // Limpa hotéis salvos/visitados ao deslogar
        setVisitedHotels([]);
        setReservationHistory([]); // Limpa histórico de reservas do estado local
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');

        console.log('Estado limpo, navegando para login...');

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

            // Formatar data de nascimento para ISO se fornecida
            if (dataToSend.BirthDate && dataToSend.BirthDate !== '') {
                try {
                    // Se a data já está no formato dd/mm/yyyy ou yyyy-mm-dd
                    const dateStr = dataToSend.BirthDate;
                    let date;
                    
                    if (dateStr.includes('/')) {
                        // Formato dd/mm/yyyy
                        const parts = dateStr.split('/');
                        if (parts.length === 3) {
                            date = new Date(parts[2], parts[1] - 1, parts[0]); // year, month-1, day
                        }
                    } else if (dateStr.includes('-')) {
                        // Formato yyyy-mm-dd
                        date = new Date(dateStr);
                    }
                    
                    if (date && !isNaN(date.getTime())) {
                        dataToSend.BirthDate = date.toISOString().split('T')[0]; // Formato yyyy-mm-dd
                    }
                } catch (error) {
                    console.warn('Erro ao formatar data de nascimento:', error);
                    // Mantém a data original se houver erro
                }
            }

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
 
            // Os dados atualizados vêm diretamente na resposta
            const updatedUserInfo = responseData;
 
            // Atualiza o estado local com os dados retornados pela API
            setCurrentUser(updatedUserInfo);
 
            // Atualiza também no localStorage
            localStorage.setItem('authUser', JSON.stringify(updatedUserInfo));
            
            console.log('✅ Estado de autenticação mantido após atualização do perfil');
 
            return { success: true, message: 'Perfil atualizado com sucesso!' };
 
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
 
            // Re-lança o erro para que o componente possa tratar
            throw error;
        }
    };
 
    const removeSavedHotel = async (hotelId) => {
        // Verificar login apenas se necessário - não deveria acontecer já que o botão só aparece logado
        if (!isLoggedIn || !currentUser) {
            console.warn("Tentativa de remover hotel sem estar logado");
            window.location.href = '/login';
            return;
        }
        
        // Se chegou aqui, o usuário está logado
        try {
            // Encontra o hotel para passar informações para o modal
            const hotelToRemove = savedHotels.find(hotel => hotel.id === hotelId);
            if (!hotelToRemove) {
                throw new Error("Hotel não encontrado na lista de favoritos.");
            }
            
            // Mostramos o modal de confirmação de remoção IMEDIATAMENTE
            const modalEvent = new CustomEvent('showRemoveWishlistModal', { 
                detail: { 
                    hotel: hotelToRemove,
                    onConfirm: () => {
                        // Usuário confirma a remoção - modal fechará automaticamente
                    }
                } 
            });
            window.dispatchEvent(modalEvent);
            
            const userId = currentUser.UserId || currentUser.userId || currentUser.id;
            
            // Atualiza o UI em segundo plano
            const updatedHotels = savedHotels.filter(hotel => hotel.id !== hotelId);
            setSavedHotels(updatedHotels);
            localStorage.setItem('savedHotels', JSON.stringify(updatedHotels));
            
            // Tenta enviar requisição para o backend em segundo plano
            try {
                fetch(`${HOTELS_API.REMOVE}/${userId}/${hotelId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if (!response.ok) {
                        console.warn('Backend não pôde remover o hotel, usando apenas localStorage:', response.status);
                    }
                }).catch(apiError => {
                    console.warn('Erro ao comunicar com a API, usando localStorage:', apiError);
                });
            } catch (apiError) {
                console.warn('Erro ao iniciar requisição para a API:', apiError);
            }
            
        } catch (error) {
            console.error('Erro ao remover hotel:', error);
            alert(error.message || "Erro ao remover hotel. Tente novamente.");
        }
    };
 
    const addSavedHotel = async (hotel) => {
        // Verificar login apenas se necessário - não deveria acontecer já que o botão só aparece logado
        if (!isLoggedIn || !currentUser) {
            console.warn("Tentativa de salvar hotel sem estar logado");
            window.location.href = '/login';
            return;
        }
        
        // Se chegou aqui, o usuário está logado
        try {
            const userId = currentUser.UserId || currentUser.userId || currentUser.id;
            
            if (!userId) {
                throw new Error("ID do usuário não encontrado. Por favor, faça login novamente.");
            }
            
            // Verifica se o hotel já existe na lista de favoritos antes de continuar
            const hotelExists = savedHotels.some(h => h.id === hotel.id);
            if (hotelExists) {
                alert("Este hotel já está na sua lista de desejos!");
                return;
            }
            
            // Mostramos o modal IMEDIATAMENTE para feedback instantâneo
            // Criamos um evento personalizado com a função de callback para navegação
            const modalEvent = new CustomEvent('showWishlistModal', { 
                detail: { 
                    hotel: hotel,
                    onConfirm: () => {
                        // Navega para a página de perfil onde ficam os hotéis favoritos
                        console.log("Redirecionando para Perfil");
                        // Usando navigate se disponível, senão usa window.location
                        if (typeof navigate === 'function') {
                            navigate('/perfil');
                        } else {
                            window.location.href = '/perfil';
                        }
                    }
                } 
            });
            window.dispatchEvent(modalEvent);
            
            // Atualiza o UI e salva no localStorage em segundo plano
            const updatedSavedHotels = [...savedHotels, hotel];
            setSavedHotels(updatedSavedHotels);
            localStorage.setItem('savedHotels', JSON.stringify(updatedSavedHotels));
            
            // Tenta enviar requisição para o backend em segundo plano
            try {
                fetch(`${HOTELS_API.SAVE}/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        hotelId: hotel.id
                    })
                }).then(response => {
                    if (!response.ok) {
                        console.warn('Backend não pôde salvar o hotel, usando apenas localStorage:', response.status);
                    }
                }).catch(apiError => {
                    console.warn('Erro ao comunicar com a API, usando localStorage:', apiError);
                });
            } catch (apiError) {
                console.warn('Erro ao iniciar requisição para a API:', apiError);
            }
            
        } catch (error) {
            console.error('Erro ao adicionar hotel:', error);
            alert(error.message || "Erro ao adicionar hotel. Tente novamente.");
        }
    }

    // <<<<<<<<<<<< FUNÇÃO PARA ADICIONAR RESERVA AO HISTÓRICO >>>>>>>>>>>>
    const addReservationToHistory = async (reservationData) => {
        try {
            const userId = currentUser?.UserId || currentUser?.userId;
            if (!userId) {
                console.error('Usuário não encontrado para adicionar reserva');
                return;
            }

            // Cria objeto da reserva com dados completos
            const newReservation = {
                id: reservationData.reservationId || Date.now(), // ID da reserva ou timestamp como fallback
                userId: userId, // Associa a reserva ao usuário atual
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

            console.log('Nova reserva criada:', newReservation);

            // Salva a reserva via API do backend
            try {
                // Criar a reserva usando o reservationService
                const savedReservation = await reservationService.createReservation({
                    userId: newReservation.userId,
                    roomId: reservationData.roomId, // Precisa do roomId para a API
                    hotelId: newReservation.hotelId,
                    checkIn: newReservation.checkInDate,
                    checkOut: newReservation.checkOutDate,
                    numberOfGuests: newReservation.numberOfGuests,
                    specialRequests: reservationData.specialRequests || '',
                    travellers: newReservation.travellers
                });
                
                console.log('Reserva salva no backend:', savedReservation);
                
                // Recarrega o histórico de reservas do backend para ter os dados atualizados
                await loadReservationHistory(userId, token);
                
                console.log('Reserva salva com sucesso e histórico atualizado');
            } catch (apiError) {
                console.error('Erro ao salvar reserva via API:', apiError);
                // Em caso de erro na API, ainda adiciona ao estado local como fallback
                setReservationHistory(prevHistory => {
                    const updatedHistory = [newReservation, ...prevHistory];
                    console.log('Reserva adicionada ao estado local (fallback):', updatedHistory);
                    return updatedHistory;
                });
                // Re-lança o erro para que o componente possa tratar
                throw apiError;
            }
            
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
                
                // TODO: Implementar chamada para a API do backend para atualizar o status
                // reservationService.updateReservationStatus(reservationId, newStatus);
                
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
 
            // Função para capitalizar a primeira letra de cada palavra
            const capitalizeWords = (str) => {
                return str
                    .toLowerCase()
                    .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
            };

            const dataToSend = {
                FirstName: capitalizeWords(firstName.trim()),
                LastName: capitalizeWords(lastName.trim()),
                Email: email.trim().toLowerCase(),
                Password: password
            };

            // Versão alternativa dos dados caso a primeira falhe
            const alternativeData = {
                firstName: capitalizeWords(firstName.trim()),
                lastName: capitalizeWords(lastName.trim()),
                email: email.trim().toLowerCase(),
                password: password
            };
            const attemptConfigs = [
                { url: 'https://localhost:7010/api/Users/createUser', data: dataToSend },
                { url: 'https://localhost:7010/api/Users/createUser', data: alternativeData },
                { url: 'https://localhost:7010/api/Users', data: dataToSend },
                { url: 'https://localhost:7010/api/Users', data: alternativeData },
                { url: 'https://localhost:7010/api/Auth/register', data: dataToSend },
                { url: 'https://localhost:7010/api/Auth/register', data: alternativeData }
            ];
            
            let lastError = null;
            let lastResponse = null;
            
            for (let i = 0; i < attemptConfigs.length; i++) {
                const config = attemptConfigs[i];
                
                try {
                    console.log(`Tentativa ${i + 1}: ${config.url}`);
                    
                    const response = await fetch(config.url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(config.data)
                    });
                    
                    lastResponse = response;
                    
                    if (response.ok) {
                        console.log('✅ Cadastro realizado com sucesso!');
                        // Parse da resposta JSON
                        const data = await response.json();
                        return {
                            success: true,
                            message: 'Cadastro realizado com sucesso! Você pode fazer login agora.',
                            user: data
                        };
                    } else {
                        // Se não foi bem-sucedido, guarda o erro mas continua tentando
                        const errorText = await response.text();
                        lastError = errorText;
                        console.log(`❌ Tentativa ${i + 1} falhou:`, response.status, errorText);
                        
                        // Se for erro 409 (Conflict) ou 400 com "já existe" - usuário já existe, é sucesso!
                        if (response.status === 409 || 
                            (response.status === 400 && errorText.toLowerCase().includes('já existe'))) {
                            console.log('✅ Usuário já existe - tratando como sucesso');
                            return {
                                success: true,
                                message: 'Cadastro realizado com sucesso! Você pode fazer login agora.',
                                user: { email: email.trim().toLowerCase() }
                            };
                        }
                    }
                } catch (fetchError) {
                    lastError = fetchError.message;
                    console.log(`❌ Erro na tentativa ${i + 1}:`, fetchError.message);
                }
            }
            
            // Se chegou aqui, todas as tentativas falharam
            console.log('❌ Todas as tentativas falharam');
            let errorMessage = 'Erro no cadastro';
            
            if (lastError) {
                try {
                    const errorData = JSON.parse(lastError);
                    if (errorData.errors) {
                        const errors = Object.values(errorData.errors).flat();
                        errorMessage = errors.join(', ');
                    } else if (errorData.title && errorData.detail) {
                        errorMessage = `${errorData.title}: ${errorData.detail}`;
                    } else if (errorData.message) {
                        errorMessage = errorData.message;
                    } else if (errorData.error) {
                        errorMessage = errorData.error;
                    } else {
                        errorMessage = lastError;
                    }
                } catch (parseError) {
                    errorMessage = lastError;
                }
            } else if (lastResponse) {
                errorMessage = `Erro ${lastResponse.status}: ${lastResponse.statusText}`;
            }
            
            throw new Error(errorMessage);
 
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
 
    // Função para adicionar um hotel à lista de visitados (após uma reserva)
    const addVisitedHotel = async (hotel) => {
        if (!token || !isLoggedIn || !currentUser) {
            console.warn("Usuário não autenticado ao tentar marcar hotel como visitado");
            return;
        }
        
        try {
            const userId = currentUser.UserId || currentUser.userId || currentUser.id;
            
            // Atualiza o UI imediatamente
            setVisitedHotels(prevVisitedHotels => {
                // Verifica se já existe para não duplicar
                if (prevVisitedHotels.some(h => h.id === hotel.id)) {
                    return prevVisitedHotels;
                }
                return [...prevVisitedHotels, hotel];
            });
            
            // Envia para o backend
            const response = await fetch(`${API_BASE_URL}/Hotels/visited/${userId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    hotelId: hotel.id
                })
            });
            
            if (!response.ok) {
                console.error('Erro ao adicionar hotel visitado:', response.status);
                // Recarregar os dados atualizados em caso de falha
                fetchUserHotels(token, userId);
            }
            
        } catch (error) {
            console.error('Erro ao salvar hotel visitado:', error);
        }
    };
    
    // Função para recarregar manualmente os dados de hotéis do usuário
    const refreshUserHotels = async () => {
        // Sempre tenta carregar do localStorage primeiro para garantir dados imediatos
        loadSavedHotelsFromLocalStorage();
        
        // Depois tenta atualizar com dados do backend se possível
        if (token && isLoggedIn && currentUser) {
            const userId = currentUser.UserId || currentUser.userId || currentUser.id;
            if (userId) {
                try {
                    await fetchUserHotels(token, userId);
                    return true;
                } catch (error) {
                    console.warn('Não foi possível atualizar do backend, usando localStorage:', error);
                    return true; // Retorna true porque pelo menos temos os dados do localStorage
                }
            }
        }
        return false;
    };

    const value = {
        currentUser,
        isLoggedIn,
        token,
        savedHotels,
        visitedHotels,
        isLoadingAuth,
        login,
        logout,
        register,
        updateUser,
        addSavedHotel,
        removeSavedHotel,
        addVisitedHotel,
        refreshUserHotels,
        checkReservationsAndMarkVisited, // Expondo o método para uso em outros componentes se necessário
        addReservationToHistory, // Adicionando a função que estava faltando
        reservationHistory, // Expondo o histórico de reservas também
        updateReservationStatus, // Expondo a função de atualizar status
        loadReservationHistory // Expondo a função para recarregar reservas
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