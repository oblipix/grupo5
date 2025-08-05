/* eslint-disable no-unused-vars */


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext'; // Importa o contexto de modal
import ScrollReveal from '../common/ScrollReveal.jsx';
import AnimatedSection from '../common/AnimatedSection.jsx';
import ReviewModal from '../modals/ReviewModal.jsx'; // Importa o componente de modal de avaliação

function MyTravelsPage() {
  const navigate = useNavigate();
  // Pegando apenas o necessário do contexto para reservas
  const {
    currentUser,
    isLoggedIn,
    reservationHistory, // Apenas histórico de reservas
    logout,
    loadReservationHistory, // Função para carregar reservas
    token,
    isLoadingAuth
  } = useAuth();

  // Hook do contexto de modal
  const { showModal } = useModal();

  // Estados para paginação do histórico de reservas
  const [currentReservationPage, setCurrentReservationPage] = useState(1);
  const reservationsPerPage = 2;

  // Estado para o modal de avaliação
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReservationForReview, setSelectedReservationForReview] = useState(null);

  // Função para verificar se o usuário pode avaliar o hotel
  const canRateHotel = (reservation) => {
    return reservation.isConfirmed || reservation.IsConfirmed;
  };

  // Função para abrir o modal de avaliação
  const openReviewModal = (reservation) => {
    if (canRateHotel(reservation)) {
      console.log('Abrindo modal de avaliação');
      setSelectedReservationForReview(reservation);
      setIsReviewModalOpen(true);
    }
  };

  // Função para fechar o modal de avaliação
  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setSelectedReservationForReview(null);
  };

  // Função para lidar com o envio da avaliação
  const handleReviewSubmitted = (reviewData) => {
    console.log('Avaliação enviada:', reviewData);
    showModal({
      title: '✅ Avaliação Enviada!',
      message: 'Sua avaliação foi enviada com sucesso. Obrigado pelo seu feedback!',
      actionText: 'OK',
      showHeader: true
    });
    closeReviewModal();
  };

  // Função para obter o número de hóspedes
  const getNumberOfGuests = (reservation) => {
    // Tenta diferentes campos possíveis
    const numberOfGuests = reservation.numberOfGuests || 
                          reservation.NumberOfGuests || 
                          reservation.numberofguests || 
                          reservation.guests || 
                          reservation.Guests;
    
    // Se não encontrar o campo, conta os viajantes como fallback
    if (numberOfGuests !== undefined && numberOfGuests !== null && numberOfGuests !== 0) {
      return numberOfGuests;
    }
    
    const travellers = reservation.travellers || reservation.Travellers;
    if (travellers && Array.isArray(travellers) && travellers.length > 0) {
      return travellers.length;
    }
    
    return 'Não informado';
  };

  // Função para formatar o tipo de quarto
  const formatRoomType = (roomType) => {
    if (!roomType && roomType !== 0) return 'Não informado';
    
    console.log('🏠 Formatando roomType:', roomType, 'tipo:', typeof roomType);
    
    // Se for um número (enum), converte para string
    if (typeof roomType === 'number') {
      switch (roomType) {
        case 0: return 'Standard';
        case 1: return 'Luxo';
        case 2: return 'Suíte';
        default: return 'Não informado';
      }
    }
    
    // Se for string, verifica se é um enum como string
    if (typeof roomType === 'string') {
      const lowerRoomType = roomType.toLowerCase();
      switch (lowerRoomType) {
        case 'standard':
        case '0':
          return 'Standard';
        case 'luxo':
        case '1':
          return 'Luxo';
        case 'suite':
        case 'suíte':
        case '2':
          return 'Suíte';
        default:
          // Se não encontrar correspondência, retorna a string formatada
          return roomType.charAt(0).toUpperCase() + roomType.slice(1).toLowerCase();
      }
    }
    
    // Fallback: retorna como está
    return roomType.toString();
  };

  // Função para determinar o status da reserva
  const getReservationStatus = (reservation) => {
    const isConfirmed = reservation.isConfirmed || reservation.IsConfirmed;
    
    if (isConfirmed) {
      return {
        text: 'Confirmada',
        className: 'bg-green-100 text-green-800 border-green-200'
      };
    } else {
      return {
        text: 'Pendente',
        className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
      };
    }
  };

  // Função para extrair primeiro e último nome do usuário
  const getUserDisplayName = () => {
    if (!currentUser) return 'Usuário';

    // Primeiro tenta diferentes campos que podem conter o nome completo
    const possibleNameFields = [
      currentUser.FirstName && currentUser.LastName ? `${currentUser.FirstName} ${currentUser.LastName}` : null,
      currentUser.name,
      currentUser.fullName,
      currentUser.firstName && currentUser.lastName ? `${currentUser.firstName} ${currentUser.lastName}` : null,
      currentUser.username,
    ];

    for (const nameField of possibleNameFields) {
      if (nameField && typeof nameField === 'string' && nameField.trim()) {
        const nameParts = nameField.trim().split(' ').filter(part => part.length > 0);
        if (nameParts.length >= 2) {
          // Retorna primeiro nome + último nome
          return `${nameParts[0]} ${nameParts[nameParts.length - 1]}`;
        } else if (nameParts.length === 1) {
          // Se só tem um nome, retorna ele
          return nameParts[0];
        }
      }
    }

    // Se não encontrar nome, tenta extrair do email
    if (currentUser.Email && typeof currentUser.Email === 'string') {
      const emailPart = currentUser.Email.split('@')[0];
      // Capitaliza a primeira letra
      return emailPart.charAt(0).toUpperCase() + emailPart.slice(1);
    }

    if (currentUser.email && typeof currentUser.email === 'string') {
      const emailPart = currentUser.email.split('@')[0];
      // Capitaliza a primeira letra
      return emailPart.charAt(0).toUpperCase() + emailPart.slice(1);
    }

    return 'Usuário';
  };
  
  // Funções para paginação do histórico de reservas
  const getCurrentReservations = () => {
    if (!reservationHistory || reservationHistory.length === 0) return [];
    
    const startIndex = (currentReservationPage - 1) * reservationsPerPage;
    const endIndex = startIndex + reservationsPerPage;
    return reservationHistory.slice(startIndex, endIndex);
  };
  
  const getTotalReservationPages = () => {
    if (!reservationHistory || reservationHistory.length === 0) return 0;
    return Math.ceil(reservationHistory.length / reservationsPerPage);
  };
  
  const handleReservationPageChange = (pageNumber) => {
    setCurrentReservationPage(pageNumber);
  };
  
  // Função para gerar e baixar o comprovante de reserva - corrigida e aprimorada
  const downloadReceipt = (reservation) => {
    try {
      console.log('Iniciando download do comprovante para a reserva:', reservation);
      
      // Garantir que a reserva está marcada como confirmada para geração do comprovante
      const confirmedReservation = {...reservation, isConfirmed: true, IsConfirmed: true};
      
      // Chama a função que gera o conteúdo HTML
      const receiptContent = generateReceiptContent(confirmedReservation);
      console.log('Conteúdo do comprovante gerado com sucesso, tamanho:', receiptContent?.length || 0);
      
      if (!receiptContent) {
        console.error('Conteúdo do comprovante vazio ou inválido');
        showModal({
          title: '⚠️ Erro na Geração',
          message: 'Não foi possível gerar o comprovante. Por favor, tente novamente.',
          actionText: 'OK',
          showHeader: true
        });
        return;
      }
      
      // Criação de um blob para download
      const blob = new Blob([receiptContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      console.log('Blob URL criado:', url);
      
      // Criação do link para download
      const link = document.createElement('a');
      link.href = url;
      const reservationId = reservation.id || reservation.ReservationId || reservation.reservationId || 'tripz';
      const hotelName = reservation.hotelName || reservation.HotelName || 'hotel';
      link.download = `comprovante_${hotelName.replace(/\s+/g, '_').toLowerCase()}_${reservationId}.html`;
      
      console.log('Link para download configurado:', link.download);
      
      // Adiciona o link ao DOM
      document.body.appendChild(link);
      
      console.log('Link de download criado, iniciando clique...');
      // Clica no link para iniciar o download
      link.click();
      
      // Limpeza
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        console.log('Download finalizado e recursos liberados.');
      }, 100);
      
      // Feedback visual para o usuário usando modal
      showModal({
        title: '🎉 Comprovante Baixado!',
        message: 'Seu comprovante foi baixado com sucesso! Você pode encontrá-lo na pasta de downloads.',
        actionText: 'OK',
        showHeader: true
      });
    } catch (error) {
      console.error('Erro ao baixar comprovante:', error);
      console.error('Stack trace:', error.stack);
      showModal({
        title: '❌ Erro no Download',
        message: 'Ocorreu um erro ao baixar o comprovante. Por favor, tente novamente.',
        actionText: 'Tentar Novamente',
        showHeader: true
      });
    }
  };
  
  // Estado para modal de visualização do comprovante
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [currentReceiptContent, setCurrentReceiptContent] = useState('');
  const [currentReservation, setCurrentReservation] = useState(null);

  // Função para detectar se é mobile
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
  };
  
  // Função para visualizar o comprovante - otimizada para mobile
  const viewReceipt = (reservation) => {
    try {
      console.log('Abrindo comprovante para visualização:', reservation);
      
      // Garantir que a reserva está marcada como confirmada para geração do comprovante
      const confirmedReservation = {...reservation, isConfirmed: true, IsConfirmed: true};
      
      // Chama a função que gera o conteúdo HTML
      const receiptContent = generateReceiptContent(confirmedReservation);
      console.log('Conteúdo do comprovante gerado com sucesso, tamanho:', receiptContent?.length || 0);
      
      if (!receiptContent) {
        console.error('Conteúdo do comprovante vazio ou inválido');
        showModal({
          title: '⚠️ Erro na Geração',
          message: 'Não foi possível gerar o comprovante. Por favor, tente novamente.',
          actionText: 'OK',
          showHeader: true
        });
        return;
      }

      // Se for mobile, usar modal em vez de popup
      if (isMobile()) {
        setCurrentReceiptContent(receiptContent);
        setCurrentReservation(confirmedReservation);
        setShowReceiptModal(true);
        return;
      }
      
      // Desktop: usar popup como antes
      const receiptWindow = window.open('', '_blank');
      console.log('Janela aberta:', !!receiptWindow);
      
      // Verifica se a janela foi aberta com sucesso
      if (!receiptWindow) {
        // Se popup falhou, usar modal como fallback
        setCurrentReceiptContent(receiptContent);
        setCurrentReservation(confirmedReservation);
        setShowReceiptModal(true);
        return;
      }
      
      // Escreve o conteúdo HTML na nova janela
      receiptWindow.document.open();
      receiptWindow.document.write(receiptContent);
      receiptWindow.document.close();
      console.log('Conteúdo escrito na nova janela');
      
      // Adiciona botões de impressão e download na nova janela
      setTimeout(() => {
        try {
          // Container para os botões
          const buttonContainer = receiptWindow.document.createElement('div');
          buttonContainer.style.position = 'fixed';
          buttonContainer.style.top = '10px';
          buttonContainer.style.right = '10px';
          buttonContainer.style.display = 'flex';
          buttonContainer.style.gap = '10px';
          buttonContainer.style.zIndex = '9999';
          buttonContainer.className = 'no-print';
          
          // Botão de impressão
          const printButton = receiptWindow.document.createElement('button');
          printButton.textContent = 'Imprimir';
          printButton.style.padding = '8px 16px';
          printButton.style.backgroundColor = '#3b82f6';
          printButton.style.color = 'white';
          printButton.style.border = 'none';
          printButton.style.borderRadius = '4px';
          printButton.style.cursor = 'pointer';
          printButton.style.fontFamily = 'Arial, sans-serif';
          printButton.style.fontSize = '14px';
          printButton.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
          printButton.className = 'no-print';
          
          printButton.addEventListener('click', () => {
            console.log('Botão de impressão clicado');
            receiptWindow.print();
          });
          
          // Botão de fechar
          const closeButton = receiptWindow.document.createElement('button');
          closeButton.textContent = 'Fechar';
          closeButton.style.padding = '8px 16px';
          closeButton.style.backgroundColor = '#6b7280';
          closeButton.style.color = 'white';
          closeButton.style.border = 'none';
          closeButton.style.borderRadius = '4px';
          closeButton.style.cursor = 'pointer';
          closeButton.style.fontFamily = 'Arial, sans-serif';
          closeButton.style.fontSize = '14px';
          closeButton.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
          closeButton.className = 'no-print';
          
          closeButton.addEventListener('click', () => {
            console.log('Botão de fechar clicado');
            receiptWindow.close();
          });
          
          // Adiciona botões ao container
          buttonContainer.appendChild(printButton);
          buttonContainer.appendChild(closeButton);
          
          // Adiciona container ao documento
          receiptWindow.document.body.appendChild(buttonContainer);
          console.log('Botões adicionados com sucesso');
          
          // Adiciona estilo para esconder os botões na impressão
          const style = receiptWindow.document.createElement('style');
          style.textContent = `
            @media print {
              .no-print {
                display: none !important;
              }
              @page {
                margin: 1cm;
              }
              body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
          `;
          receiptWindow.document.head.appendChild(style);
          
        } catch (error) {
          console.error('Erro ao adicionar botões:', error);
          console.error('Stack trace:', error.stack);
        }
      }, 500);
      
    } catch (error) {
      console.error('Erro ao visualizar comprovante:', error);
      console.error('Stack trace:', error.stack);
      // Se houver erro, tentar usar modal como fallback
      if (!showReceiptModal) {
        const confirmedReservation = {...reservation, isConfirmed: true, IsConfirmed: true};
        const receiptContent = generateReceiptContent(confirmedReservation);
        if (receiptContent) {
          setCurrentReceiptContent(receiptContent);
          setCurrentReservation(confirmedReservation);
          setShowReceiptModal(true);
        } else {
          showModal({
            title: '❌ Erro na Visualização',
            message: 'Ocorreu um erro ao visualizar o comprovante. Por favor, tente novamente.',
            actionText: 'OK',
            showHeader: true
          });
        }
      }
    }
  };
  
  // Função para gerar o conteúdo HTML do comprovante
  const generateReceiptContent = (reservation) => {
    console.log('Gerando conteúdo do comprovante para reserva:', reservation);
    
    // Extrai dados da reserva (com verificações de segurança para diferentes formatos)
    const hotelName = reservation.hotelName || reservation.HotelName || 'Hotel';
    const roomType = formatRoomType(reservation.roomType || reservation.RoomType);
    
    // Tratamento de datas com verificação de valores válidos
    let checkIn, checkOut;
    try {
      const checkInDate = new Date(reservation.checkIn || reservation.CheckIn || reservation.checkInDate);
      checkIn = isNaN(checkInDate.getTime()) ? 'Data não informada' : checkInDate.toLocaleDateString('pt-BR');
    } catch (e) {
      console.error('Erro ao processar data de check-in:', e);
      checkIn = 'Data não informada';
    }
    
    try {
      const checkOutDate = new Date(reservation.checkOut || reservation.CheckOut || reservation.checkOutDate);
      checkOut = isNaN(checkOutDate.getTime()) ? 'Data não informada' : checkOutDate.toLocaleDateString('pt-BR');
    } catch (e) {
      console.error('Erro ao processar data de check-out:', e);
      checkOut = 'Data não informada';
    }
    
    // Valor total com tratamento para evitar NaN
    const totalPriceValue = reservation.totalPrice || reservation.TotalPrice || 0;
    const totalPrice = isNaN(totalPriceValue) ? '0,00' : Number(totalPriceValue).toFixed(2).replace('.', ',');
    
    // Outras informações
    let reservationDate;
    try {
      const resDate = new Date(reservation.reservationDate || reservation.ReservationDate);
      reservationDate = isNaN(resDate.getTime()) ? 'Data não informada' : resDate.toLocaleDateString('pt-BR');
    } catch (e) {
      console.error('Erro ao processar data da reserva:', e);
      reservationDate = 'Data não informada';
    }
    
    const reservationId = reservation.id || reservation.ReservationId || reservation.reservationId || 'N/A';
    const location = reservation.location || 'Localização não informada';
    const guests = getNumberOfGuests(reservation);
    
    // Nome do cliente e email
    const clientName = getUserDisplayName();
    const clientEmail = currentUser?.Email || currentUser?.email || 'email@exemplo.com';
    
    // Informações adicionais (com fallbacks para diferentes estruturas de dados)
    const hotelDescription = reservation.hotelDescription || reservation.HotelDescription || 'Hotel de qualidade com excelente localização';
    const amenities = reservation.amenities || reservation.Amenities || [];
    const amenitiesList = Array.isArray(amenities) 
      ? amenities.join(', ') 
      : typeof amenities === 'string' 
        ? amenities 
        : 'Informações não disponíveis';
    
    // Dados dos viajantes
    const travellers = reservation.travellers || reservation.Travellers || [];
    const travellersList = Array.isArray(travellers) && travellers.length > 0
      ? travellers.map(t => `${t.firstName || t.FirstName || ''} ${t.lastName || t.LastName || ''}`).join(', ')
      : 'Informações não disponíveis';
    
    // Método de pagamento (com fallbacks)
    const paymentMethod = reservation.paymentMethod || reservation.PaymentMethod || 'Cartão de Crédito';
    const paymentMethodDisplay = paymentMethod.toLowerCase().includes('boleto') ? 'Boleto Bancário' : 
                                 paymentMethod.toLowerCase().includes('pix') ? 'PIX' : 
                                 'Cartão de Crédito';
    
    // Cálculo de duração da estadia
    const checkInDate = new Date(reservation.checkIn || reservation.CheckIn || reservation.checkInDate);
    const checkOutDate = new Date(reservation.checkOut || reservation.CheckOut || reservation.checkOutDate);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)) || 1;
    
    // Criação do conteúdo HTML para o comprovante
    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Comprovante de Reserva - ${hotelName}</title>
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9fafb;
          }
          .receipt-container {
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 30px;
          }
          .receipt-header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 20px;
            position: relative;
          }
          .receipt-header h1 {
            color: #1e40af;
            margin-bottom: 5px;
            font-weight: 800;
          }
          .brand {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
          }
          .logo {
            font-size: 35px;
            padding: 8px;
            font-weight: 400;
            background: linear-gradient(to right, #1e3a8a, #60a5fa) !important;
            background-image: linear-gradient(to right, #1e3a8a, #60a5fa) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
            color: transparent !important;
            font-family: "Pacifico", cursive !important;
            font-style: normal !important;
            z-index: 1;
            height: 70px;
            margin: 0;
            letter-spacing: -1px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
          .confirmation-id {
            background-color: #f0f9ff;
            border: 1px solid #bfdbfe;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
          }
          .section {
            margin: 30px 0;
            padding: 20px;
            border-radius: 8px;
            background-color: #f8fafc;
            border-left: 4px solid #3b82f6;
          }
          .section h2 {
            color: #1e40af;
            margin-top: 0;
            font-size: 20px;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 10px;
          }
          .detail-row {
            display: flex;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px dashed #e5e7eb;
            flex-wrap: wrap;
          }
          .detail-row:last-child {
            border-bottom: none;
          }
          .detail-label {
            font-weight: bold;
            width: 40%;
            color: #4b5563;
            min-width: 120px;
          }
          .detail-value {
            width: 60%;
            word-break: break-word;
            overflow-wrap: break-word;
          }
          @media (max-width: 600px) {
            .detail-row {
              flex-direction: column;
              gap: 4px;
            }
            .detail-label {
              width: 100%;
              min-width: auto;
              margin-bottom: 2px;
            }
            .detail-value {
              width: 100%;
              padding-left: 0;
            }
          }
          .price-section {
            margin: 30px 0;
            text-align: right;
            background-color: #1e40af;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
          }
          .price-detail {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            margin-bottom: 5px;
          }
          .total-price-label {
            font-size: 16px;
            font-weight: bold;
            margin-top: 10px;
            border-top: 1px solid rgba(255, 255, 255, 0.3);
            padding-top: 10px;
          }
          .total-price {
            font-size: 28px;
            font-weight: bold;
            color: white;
          }
          .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 14px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
            padding-top: 20px;
          }
          .amenities-list {
            list-style-type: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-wrap: wrap;
          }
          .amenity-item {
            background-color: #e0f2fe;
            border-radius: 20px;
            padding: 5px 12px;
            margin: 4px;
            font-size: 13px;
            color: #0369a1;
          }
          .travellers-list {
            list-style-type: none;
            padding: 0;
          }
          .traveller-item {
            padding: 5px 0;
            border-bottom: 1px dotted #e5e7eb;
          }
          .traveller-item:last-child {
            border-bottom: none;
          }
          .payment-method {
            background-color: #f0fdf4;
            border-radius: 8px;
            padding: 10px 15px;
            border-left: 4px solid #22c55e;
            display: inline-block;
            font-weight: bold;
            color: #090d50ff;
          }
          .hotel-image {
            width: 100%;
            height: 150px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 15px;
            border: 1px solid #e5e7eb;
          }
          .important-notice {
            background-color: #fffbeb;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            border: 1px dashed #fbbf24;
          }
          .important-notice h3 {
            margin-top: 0;
            color: #b45309;
          }
          .barcode {
            text-align: center;
            margin: 20px 0;
          }
          .barcode img {
            max-width: 80%;
            height: 60px;
          }
          @media print {
            body {
              padding: 0;
              font-size: 12pt;
              background-color: white;
            }
            .receipt-container {
              box-shadow: none;
              padding: 10px;
            }
            .no-print {
              display: none !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <div class="receipt-header">
            <div class="brand">
              <h1 class="logo">Tripz</h1>
            </div>
            <h1>Comprovante de Reserva</h1>
            <p>Emitido em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
          </div>
          
          <div class="confirmation-id">
            <p><strong>Código da Reserva:</strong> #${reservationId}</p>
            <p><strong>Status:</strong> CONFIRMADO</p>
          </div>
          
          <div class="section">
            <h2>Detalhes do Hotel</h2>
            ${reservation.hotelImage ? `<img src="${reservation.hotelImage}" alt="${hotelName}" class="hotel-image" onerror="this.src='https://via.placeholder.com/800x400?text=Tripz+Hotel';this.onerror='';">` : ''}
            
            <div class="detail-row">
              <div class="detail-label">Hotel:</div>
              <div class="detail-value"><strong>${hotelName}</strong></div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Descrição:</div>
              <div class="detail-value">${hotelDescription}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Localização:</div>
              <div class="detail-value">${location}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">O Hotel Oferece:</div>
              <div class="detail-value">
                <div class="amenities-list">
                  ${Array.isArray(amenities) && amenities.length > 0 
                    ? amenities.map(amenity => `<span class="amenity-item">${amenity}</span>`).join('\n                  ') 
                    : '<span class="amenity-item">Informações não disponíveis</span>'}
                </div>
              </div>
            </div>
          </div>
          
          <div class="section">
            <h2>Detalhes da Reserva</h2>
            
            <div class="detail-row">
              <div class="detail-label">Tipo de Quarto:</div>
              <div class="detail-value"><strong>${roomType}</strong></div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Check-in:</div>
              <div class="detail-value">${checkIn} (a partir das 14:00)</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Check-out:</div>
              <div class="detail-value">${checkOut} (até as 12:00)</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Duração da Estadia:</div>
              <div class="detail-value">${nights} ${nights === 1 ? 'noite' : 'noites'}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Data da Reserva:</div>
              <div class="detail-value">${reservationDate}</div>
            </div>
          </div>
          
          <div class="section">
            <h2>Informações de Hóspedes</h2>
            
            <div class="detail-row">
              <div class="detail-label">Titular da Reserva:</div>
              <div class="detail-value"><strong>${clientName}</strong></div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Email de Contato:</div>
              <div class="detail-value">${clientEmail}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Número de Hóspedes:</div>
              <div class="detail-value">${guests}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Viajantes:</div>
              <div class="detail-value">
                ${Array.isArray(travellers) && travellers.length > 0 
                  ? '<ul class="travellers-list">' + 
                    travellers.map((t, i) => `<li class="traveller-item">${i+1}. ${t.firstName || t.FirstName || ''} ${t.lastName || t.LastName || ''}</li>`).join('') +
                    '</ul>'
                  : travellersList}
              </div>
            </div>
          </div>
          
          <div class="price-section">
            <div class="price-detail">
              <span>${roomType}</span>
              <span>R$ ${totalPrice}</span>
            </div>
            <div class="price-detail">
              <span>Taxa de serviço</span>
              <span>Incluso</span>
            </div>
            <div class="price-detail">
              <span>Impostos</span>
              <span>Incluso</span>
            </div>
            <div class="total-price-label">Valor Total</div>
            <div class="total-price">R$ ${totalPrice}</div>
            <div style="margin-top: 10px; font-size: 14px">
              <span>Forma de Pagamento: <span class="payment-method">${paymentMethodDisplay}</span></span>
            </div>
          </div>
          
          <div class="important-notice">
            <h3>Informações Importantes</h3>
            <p>• Apresente este comprovante no momento do check-in juntamente com seu documento de identificação com foto.</p>
            <p>• Caso necessário, o hotel poderá solicitar um cartão de crédito para garantia de extras.</p>
            <p>• Recomendamos chegar com antecedência para evitar atrasos no processo de check-in.</p>
          </div>
          
          <div class="barcode">
            <img src="https://barcode.tec-it.com/barcode.ashx?data=TRIPZ${reservationId}&code=Code128&dpi=96" alt="Código de Barras">
          </div>
          
          <div class="footer">
            <p>Este é um comprovante oficial da sua reserva na Tripz.</p>
            <p>Em caso de dúvidas, entre em contato pelo email: suporte@tripz.com.br</p>
            <p>WhatsApp: (11) 98765-4321</p>
            <p>&copy; ${new Date().getFullYear()} Tripz - Todos os direitos reservados.</p>
            <p class="no-print"><em>Para melhor visualização, recomendamos imprimir este comprovante ou salvá-lo como PDF.</em></p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  // Função para extrair nome completo para edição
  const getUserFullName = () => {
    if (!currentUser) return '';

    return (currentUser.FirstName && currentUser.LastName ? `${currentUser.FirstName} ${currentUser.LastName}` : '') ||
      currentUser.name ||
      currentUser.fullName ||
      (currentUser.firstName && currentUser.lastName ? `${currentUser.firstName} ${currentUser.lastName}` : '') ||
      currentUser.username ||
      '';
  };

  useEffect(() => {
    if (!isLoadingAuth && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, isLoadingAuth, navigate]);

  // Carregamento inicial de reservas (apenas quando necessário)
  useEffect(() => {
    // Se o usuário está logado mas não há reservas carregadas, tenta carregar uma única vez
    if (isLoggedIn && currentUser && token && loadReservationHistory) {
      const userId = currentUser.UserId || currentUser.userId || currentUser.id;
      if (userId && (!reservationHistory || reservationHistory.length === 0)) {
        loadReservationHistory(userId, token).catch(error => {
          console.error('Erro ao carregar reservas:', error);
        });
      }
    }
  }, [isLoggedIn, currentUser, token]); // Removido reservationHistory e loadReservationHistory das dependências para evitar loop

  if (!currentUser) {
    return <div className="text-center p-10">Carregando perfil...</div>;
  }

  return (
    <div className="container mx-auto p-6 md:p-10 bg-white shadow-lg rounded-lg my-8 animate-fade-in">
      <style jsx="true">{`
        .receipt-button {
          transition: all 0.2s ease;
        }
        .receipt-button:active {
          transform: scale(0.95);
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        /* Esconde qualquer tag pendente que não esteja dentro da seção de status */
        .reservation-card > .pendente,
        .reservation-card > span.pendente,
        .reservation-card > div > .pendente,
        .reservation-card > span[class*="pendente"],
        .reservation-card > span.bg-yellow-100 {
          display: none !important;
        }
        /* Apenas a tag dentro da seção de status da reserva será exibida */
        .reservation-card .mt-4.pt-4.border-t.border-gray-200 .pendente,
        .reservation-card .mt-4.pt-4.border-t.border-gray-200 span[class*="pendente"],
        .reservation-card .mt-4.pt-4.border-t.border-gray-200 span.bg-yellow-100 {
          display: inline-flex !important;
        }
      `}</style>


      <ScrollReveal animation="fadeUp" delay={200}>
        <h1 className="text-4xl font-extrabold text-blue-800 mb-8 text-center">Minhas Viagens</h1>
      </ScrollReveal>

      {/* Seção de Histórico de Reservas */}
      <AnimatedSection animation="fadeUp" delay={500}>
        <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          {reservationHistory?.length > 0 && (
            <div className="text-sm text-gray-600">
              Página {currentReservationPage} de {getTotalReservationPages()} • {reservationHistory.length} reserva(s) total
            </div>
          )}
        </div>
        
              
        {reservationHistory?.length > 0 ? (
          <>
            <div className="space-y-6">
              {getCurrentReservations().map((reservation, index) => (
                <ScrollReveal key={reservation.id || reservation.ReservationId || reservation.reservationId} animation="fadeUp" delay={index * 150}>
                  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 relative reservation-card">
                  {/* Removemos qualquer tag de status que possa estar aparecendo no topo */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    {/* Informações da reserva */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 lg:mb-0">
                      {/* Imagem do hotel */}
                      {reservation.hotelImage && (
                        <img 
                          src={reservation.hotelImage} 
                          alt={reservation.hotelName}
                          className="w-full sm:w-24 h-24 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/96x96?text=Hotel';
                          }}
                        />
                      )}
                      
                      {/* Detalhes da reserva */}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">
                          {reservation.hotelName || reservation.HotelName}
                        </h3>
                        {reservation.location && (
                          <p className="text-gray-600 mb-2">📍 {reservation.location}</p>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                          <p><strong>Quarto:</strong> {formatRoomType(reservation.roomType || reservation.RoomType)}</p>
                          <p><strong>Hóspedes:</strong> {getNumberOfGuests(reservation)}</p>
                          <p><strong>Check-in:</strong> {new Date(reservation.checkIn || reservation.CheckIn || reservation.checkInDate).toLocaleDateString('pt-BR')}</p>
                          <p><strong>Check-out:</strong> {new Date(reservation.checkOut || reservation.CheckOut || reservation.checkOutDate).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status e valor */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="text-center sm:text-right">
                        <p className="text-2xl font-bold text-blue-900">
                          R$ {(reservation.totalPrice || reservation.TotalPrice || 0).toFixed(2).replace('.', ',')}
                        </p>
                        <p className="text-sm text-gray-500">
                          Reservado em {new Date(reservation.reservationDate || reservation.ReservationDate).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div className="flex flex-col items-center sm:items-end gap-2">
                        {/* Badge de Status da Reserva */}
                        {/* <span 
                          // className={`px-2 py-1 rounded text-xs font-semibold border ${getReservationStatus(reservation).className}`}
                          onClick={() => console.log('Reservation status:', reservation.id, 'is confirmed:', !!(reservation.isConfirmed || reservation.IsConfirmed))}
                        >
                          {getReservationStatus(reservation).text}
                        </span> */}
                        
                        {/* Botões de ação */}
                        <div className="flex gap-2">
                          <button 
                            onClick={() => navigate(`/hoteis/${reservation.hotelId || reservation.HotelId}`)}
                            className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition"
                          >
                            Ver Hotel
                          </button>
                          
                          {/* Botão de avaliação - só aparece para reservas confirmadas */}
                          {canRateHotel(reservation) && (
                            <button 
                              onClick={() => openReviewModal(reservation)}
                              className="px-3 py-1 bg-yellow-600 text-white rounded text-xs hover:bg-yellow-700 transition flex items-center"
                              title="Avaliar hotel"
                            >
                              <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              Avaliar
                            </button>
                          )}
                          
                          {/* Botões de comprovante sempre visíveis, independentemente do status */}
                          <div className="flex gap-2">
                            <button 
                              onClick={(e) => {
                                console.log('Clique no botão de download:', reservation);
                                // Forçar a reserva como confirmada para garantir que o comprovante seja gerado
                                const confirmedReservation = {...reservation, isConfirmed: true, IsConfirmed: true};
                                downloadReceipt(confirmedReservation);
                              }}
                              className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition flex items-center receipt-button"
                              title="Baixar comprovante"
                            >
                              <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Baixar
                            </button>
                            
                            <button 
                              onClick={(e) => {
                                console.log('Clique no botão de visualização:', reservation);
                                // Forçar a reserva como confirmada para garantir que o comprovante seja gerado
                                const confirmedReservation = {...reservation, isConfirmed: true, IsConfirmed: true};
                                viewReceipt(confirmedReservation);
                              }}
                              className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition flex items-center receipt-button"
                              title="Visualizar comprovante"
                            >
                              <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              Visualizar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Informações de Status da Reserva */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Status da Reserva:</p>
                        <p className="text-xs text-gray-500">
                          {(reservation.isConfirmed || reservation.IsConfirmed) 
                            ? 'Sua reserva foi confirmada e está garantida.' 
                            : 'Sua reserva está pendente de confirmação. Você receberá um e-mail quando for confirmada.'}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getReservationStatus(reservation).className}`}>
                        {getReservationStatus(reservation).text}
                      </span>
                    </div>
                  </div>
                  
                  {/* Informações dos viajantes */}
                  {(reservation.travellers || reservation.Travellers) && (reservation.travellers || reservation.Travellers).length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Viajantes:</p>
                      <div className="flex flex-wrap gap-2">
                        {(reservation.travellers || reservation.Travellers).map((traveller, index) => (
                          <span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">
                            {traveller.firstName || traveller.FirstName} {traveller.lastName || traveller.LastName}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
            
            {/* Controles de Paginação */}
            {getTotalReservationPages() > 1 && (
              <div className="mt-8 flex justify-center items-center space-x-2">
                {/* Botão Anterior */}
                <button
                  onClick={() => handleReservationPageChange(currentReservationPage - 1)}
                  disabled={currentReservationPage === 1}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    currentReservationPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  ← Anterior
                </button>
                
                {/* Números das Páginas */}
                {Array.from({ length: getTotalReservationPages() }, (_, index) => index + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handleReservationPageChange(pageNumber)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      currentReservationPage === pageNumber
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
                
                {/* Botão Próximo */}
                <button
                  onClick={() => handleReservationPageChange(currentReservationPage + 1)}
                  disabled={currentReservationPage === getTotalReservationPages()}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    currentReservationPage === getTotalReservationPages()
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Próximo →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏨</div>
            <p className="text-gray-600 text-lg mb-4">Você ainda não fez nenhuma reserva.</p>
            <button 
              onClick={() => navigate('/hoteis')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Explorar Hotéis
            </button>
          </div>
        )}
        </section>
      </AnimatedSection>

      {/* Modal para visualização do comprovante (otimizado para mobile) */}
      {showReceiptModal && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
        >
          <div 
            className="bg-white bg-opacity-95 rounded-xl shadow-2xl w-full max-w-6xl flex flex-col"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            {/* Header do Modal */}
            <div 
              className="flex justify-between items-center p-4 border-b border-gray-200 border-opacity-30 rounded-t-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.1))',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}
            >
              <h3 className="text-lg font-semibold text-gray-800">Comprovante de Reserva</h3>
              <div className="flex gap-2">
                {/* Botão de impressão */}
                <button
                  onClick={() => {
                    const printWindow = window.open('', '_blank');
                    if (printWindow) {
                      printWindow.document.write(currentReceiptContent);
                      printWindow.document.close();
                      setTimeout(() => {
                        printWindow.print();
                        printWindow.close();
                      }, 500);
                    } else {
                      // Fallback para mobile: criar um iframe temporário
                      const iframe = document.createElement('iframe');
                      iframe.style.display = 'none';
                      document.body.appendChild(iframe);
                      iframe.contentDocument.write(currentReceiptContent);
                      iframe.contentDocument.close();
                      iframe.contentWindow.print();
                      setTimeout(() => {
                        document.body.removeChild(iframe);
                      }, 1000);
                    }
                  }}
                  className="px-3 py-2 bg-blue-600 bg-opacity-90 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center text-sm backdrop-blur-sm"
                  title="Imprimir comprovante"
                  style={{
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                  }}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z" />
                  </svg>
                  <span className="hidden sm:inline">Imprimir</span>
                </button>
                
                {/* Botão de download */}
                <button
                  onClick={() => {
                    if (currentReservation) {
                      downloadReceipt(currentReservation);
                    }
                  }}
                  className="px-3 py-2 bg-green-600 bg-opacity-90 text-white rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center text-sm backdrop-blur-sm"
                  title="Baixar comprovante"
                  style={{
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                  }}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="hidden sm:inline">Baixar</span>
                </button>
                
                {/* Botão de fechar */}
                <button
                  onClick={() => {
                    setShowReceiptModal(false);
                    setCurrentReceiptContent('');
                    setCurrentReservation(null);
                  }}
                  className="px-3 py-2 bg-gray-500 bg-opacity-90 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 flex items-center text-sm backdrop-blur-sm"
                  title="Fechar"
                  style={{
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                  }}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="hidden sm:inline">Fechar</span>
                </button>
              </div>
            </div>
            
            {/* Conteúdo do Modal - Iframe com o comprovante */}
            <div className="flex-1 overflow-hidden rounded-b-xl">
              <iframe
                srcDoc={currentReceiptContent}
                className="w-full h-full border-0 rounded-b-xl"
                title="Comprovante de Reserva"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                style={{
                  minHeight: '70vh'
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal de Avaliação */}
      {isReviewModalOpen && selectedReservationForReview && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={closeReviewModal}
          reservation={selectedReservationForReview}
          onReviewSubmitted={handleReviewSubmitted}
        />
      )}
    </div>
  );
}

export default MyTravelsPage;