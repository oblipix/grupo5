/* eslint-disable no-unused-vars */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // 1. Importar hooks
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './PromotionDetailsPage.css';

// 2. Importar dados de arquivos separados
import { allPromotionalTravels } from '../data/promotions.js';
import { allReservationDates } from '../data/reservations.js';


// --- COMPONENTES E FUNÇÕES AUXILIARES (mantidos como estão) ---
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={i < rating ? "text-yellow-500 text-2xl" : "text-gray-300 text-2xl"}>★</span>
    );
  }
  return <div className="flex items-center">{stars}</div>;
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const parseDateString = (dateString) => {
  if (!dateString) return null;
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day); 
};
// --- FIM DOS AUXILIARES ---


const PromotionDetailsPage = () => {
    // 3. Usar os hooks para obter o ID da URL e a função de navegação
    const { packageId } = useParams(); // O nome do parâmetro deve ser o mesmo da rota em main.jsx
    const navigate = useNavigate();

    // 4. Buscar os dados da promoção com base no ID da URL
    const promotionData = allPromotionalTravels.find(p => p.id === parseInt(packageId));
    
    if (!promotionData) {
        return (
            <div className="container mx-auto p-4 text-center">
                <p className="text-xl text-red-600 mb-4">Ops! Promoção não encontrada.</p>
                <button onClick={() => navigate('/')} className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">
                    ← Voltar para a Home
                </button>
            </div>
        );
    }

    // A lógica do calendário agora usa os dados importados
    const currentPromotionReservationDates = allReservationDates.filter(
        (item) => item.promotionId === promotionData.id
    );

    // Todas as outras funções internas (tileClassName, tileDisabled) permanecem as mesmas
    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            let classes = '';
            if (promotionData.eventSpecificDates && promotionData.eventSpecificDates.includes(dateString)) {
                classes += ' react-calendar__tile--event-highlight';
            }
            const reservation = currentPromotionReservationDates.find(d => d.date === dateString);
            if (reservation) {
                if (reservation.status === 'booked') classes += ' react-calendar__tile--booked';
                if (reservation.status === 'available') classes += ' react-calendar__tile--available';
            }
            return classes.trim();
        }
        return null;
    };
    
    const initialCalendarDate = promotionData.eventDate ? parseDateString(promotionData.eventDate) : new Date();

    const tileDisabled = ({ date, view }) => {
        if (view === 'month') {
            const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            return (promotionData.eventSpecificDates && promotionData.eventSpecificDates.length > 0) && !promotionData.eventSpecificDates.includes(dateString);
        }
        return false;
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
            {/* 5. Botão "Voltar" usa o navigate */}
            <button 
                onClick={() => navigate(-1)} 
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 mb-6 main-action-button"
            >
                ← Voltar
            </button>

            {/* O restante do seu JSX continua o mesmo, pois já depende de `promotionData` */}
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6 text-center">{promotionData.title}</h1>
            {/* ... todo o resto do seu JSX ... */}
            
            {/* 6. Botão "Reservar Agora" usa o navigate para ir para a página de compra com o ID correto */}
            <div className="mt-12 text-center">
                <button 
                    onClick={() => navigate(`/purchase/${promotionData.id}`)} 
                    className="main-action-button px-10 py-4 bg-green-600 text-white font-bold text-xl rounded-full hover:bg-green-700 transition duration-300 shadow-lg transform hover:scale-105 promotion-data-button"
                >
                    Reservar Agora!
                </button>
            </div>
        </div>
    );
};

export default PromotionDetailsPage;