// src/components/pages/PaymentSuccessPage.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isLoggedIn, addReservationToHistory, updateReservationStatus } = useAuth();
  const [countdown, setCountdown] = useState(5);
  const [reservationAdded, setReservationAdded] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
  }, [isLoggedIn, navigate]);

  // Process reservation when payment is successful
  useEffect(() => {
    if (isLoggedIn && !reservationAdded) {
      const sessionId = searchParams.get('session_id');
      
      if (sessionId) {
        // Tenta recuperar dados da reserva do sessionStorage
        const reservationDataString = sessionStorage.getItem('pendingReservation');
        
        if (reservationDataString) {
          try {
            const reservationData = JSON.parse(reservationDataString);
            
            // Adiciona a reserva ao histórico com status confirmed
            const confirmedReservation = {
              ...reservationData,
              status: 'confirmed',
              paymentSessionId: sessionId
            };
            
            addReservationToHistory(confirmedReservation);
            
            // Limpa os dados da sessão
            sessionStorage.removeItem('pendingReservation');
            
            setReservationAdded(true);
            
          } catch (error) {
            console.error('Erro ao processar dados da reserva:', error);
          }
        } else {
          // Se não encontrou no sessionStorage, evita loop infinito
          setReservationAdded(true);
        }
      }
    }
  }, [isLoggedIn, searchParams, addReservationToHistory, reservationAdded]);

  // Countdown to redirect to my travels page
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/minhas-viagens');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-green-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Pagamento Realizado com Sucesso!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Sua reserva foi confirmada e o pagamento foi processado com sucesso. 
          Você receberá um email de confirmação em breve.
        </p>

        {sessionId && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">ID da Sessão de Pagamento:</p>
            <p className="text-sm font-mono text-gray-700 break-all">{sessionId}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => navigate('/minhas-viagens')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition font-medium"
          >
            Ver Minhas Reservas
          </button>
          
          <button
            onClick={() => navigate('/hoteis')}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition font-medium"
          >
            Explorar Mais Hotéis
          </button>
        </div>

        {/* Auto redirect message */}
        <p className="mt-6 text-sm text-gray-500">
          Redirecionando para suas viagens em {countdown} segundos...
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
