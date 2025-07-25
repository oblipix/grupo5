/* eslint-disable no-unused-vars */
// src/components/PromotionDetailsPage.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './PromotionDetailsPage.css'; // Importando o CSS específico para este componente

// Componente simples para exibir estrelas
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<span key={i} className="text-yellow-500 text-2xl">★</span>); // Estrela preenchida
    } else {
      stars.push(<span key={i} className="text-gray-300 text-2xl">★</span>); // Estrela vazia
    }
  }
  return <div className="flex items-center">{stars}</div>;
};

// Função auxiliar para formatar moeda
const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

// --- FUNÇÃO PARA PARSEAR A DATA DD/MM/YYYY ---
const parseDateString = (dateString) => {
  if (!dateString) return null;
  const [day, month, year] = dateString.split('/').map(Number);
  // O mês em JavaScript é base 0 (janeiro é 0, dezembro é 11)
  return new Date(year, month - 1, day); 
};
// --- FIM DA FUNÇÃO DE PARSEAMENTO ---


// =========================================================================
// O componente PromotionDetailsPage agora recebe 'onNavigateToPurchase'
const PromotionDetailsPage = ({ promotionData, onBack, onNavigateToPurchase }) => { 
// =========================================================================
  if (!promotionData) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-xl text-red-600 mb-4">Ops! Promoção não encontrada.</p>
        <button 
          onClick={onBack} 
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
        >
          ← Voltar
        </button>
      </div>
    );
  }

  // --- Exemplo de Dados de Disponibilidade para o Calendário ---
  // IMPORTANTE: Mantenha as datas aqui no formato 'YYYY-MM-DD' para a comparação funcionar corretamente!
  const allReservationDates = [
    { promotionId: 18, date: '2025-12-24', status: 'available' }, // Natal: 24 disponível
    { promotionId: 18, date: '2025-12-25', status: 'booked' },    // Natal: 25 reservado
    { promotionId: 16, date: '2026-12-31', status: 'booked' },    // Réveillon: 31 reservado
    { promotionId: 13, date: '2027-02-15', status: 'available' }, // Carnaval: 15 disponível
    { promotionId: 14, date: '2026-04-05', status: 'booked' }, // Páscoa BH: 05 reservado
    { promotionId: 15, date: '2026-04-05', status: 'available' }, // Páscoa Garanhuns: 05 disponível
    { promotionId: 17, date: '2026-06-12', status: 'booked' }, // Dia dos Namorados: 12 reservado
    { promotionId: 17, date: '2026-06-13', status: 'available' }, // Dia dos Namorados: 13 disponível
    // Adicione mais datas e status conforme necessário para suas promoções
  ];

  const currentPromotionReservationDates = allReservationDates.filter(
    (item) => item.promotionId === promotionData.id
  );

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      
      let classes = '';

      // 1. Verifica se é uma data específica do evento para aplicar o destaque
      if (promotionData.eventSpecificDates && promotionData.eventSpecificDates.includes(dateString)) {
        classes += ' react-calendar__tile--event-highlight'; // Classe para destaque do evento
      }

      // 2. Verifica o status da reserva (reservado ou disponível)
      const reservation = currentPromotionReservationDates.find(d => d.date === dateString);
      if (reservation) {
        if (reservation.status === 'booked') {
          classes += ' react-calendar__tile--booked';
        }
        if (reservation.status === 'available') {
          classes += ' react-calendar__tile--available';
        }
      }
      return classes.trim(); // Retorna todas as classes aplicadas, removendo espaços extras
    }
    return null;
  };

  // Define a data inicial do calendário usando a eventDate da promoção (parseada)
  const initialCalendarDate = promotionData.eventDate ? parseDateString(promotionData.eventDate) : new Date();

  // --- FUNÇÃO PARA DESABILITAR DIAS NÃO ESPECÍFICOS (CORRIGIDA E USADA) ---
  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      
      // Desabilita o dia se ele não estiver na lista de datas específicas do evento
      // E se promotionData.eventSpecificDates existir e não estiver vazio
      return (promotionData.eventSpecificDates && promotionData.eventSpecificDates.length > 0) 
             && !promotionData.eventSpecificDates.includes(dateString);
    }
    return false; // Não desabilita em outras visualizações (ano, década)
  };
  // --- FIM DA FUNÇÃO ---

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      {/* Botão para Voltar */}
      <button 
        onClick={onBack} 
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 mb-6 main-action-button"
      >
        ← Voltar para Promoções
      </button>

      {/* Título e Imagem da Promoção */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6 text-center">{promotionData.title}</h1>
      
      <div className="w-full flex justify-center mb-8">
        <img 
          src={promotionData.imageUrl} 
          alt={promotionData.title} 
          className="w-full max-w-4xl h-96 object-cover rounded-xl shadow-xl border-4 border-gray-100"
        />
      </div>
      
      {/* Descrição da Promoção */}
      <p className="text-gray-700 text-xl leading-relaxed text-center mb-10">{promotionData.description}</p>

      {/* Seção de Preços "De X por Y" */}
      {promotionData.priceFrom && promotionData.priceTo && (
        <div className="text-center mb-10">
          <p className="text-2xl text-blue-400 line-through">De: {formatCurrency(promotionData.priceFrom)}</p>
          <p className="text-5xl font-bold text-blue-600 mt-2">Por: {formatCurrency(promotionData.priceTo)}</p>
          <p className="text-lg text-gray-500 mt-1">Preço por pessoa em apartamento duplo. Consulte condições.</p>
        </div>
      )}

      {/* Seção de Pacotes (Casal, Solteiro, Família) */}
      {promotionData.packagePrices && (
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2 border-gray-200">
            Opções de Pacote
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promotionData.packagePrices.solteiro && (
              <div className="border border-blue-200 p-6 rounded-lg bg-blue-50 text-center shadow-md">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Pacote Individual</h3>
                <p className="text-3xl font-bold text-blue-700">{formatCurrency(promotionData.packagePrices.solteiro)}</p>
                <p className="text-gray-600 text-sm mt-1">por pessoa</p>
              </div>
            )}
            {promotionData.packagePrices.casal && (
              <div className="border border-purple-200 p-6 rounded-lg bg-purple-50 text-center shadow-md">
                <h3 className="text-xl font-semibold text-purple-800 mb-2">Pacote Casal</h3>
                <p className="text-3xl font-bold text-purple-700">{formatCurrency(promotionData.packagePrices.casal)}</p>
                <p className="text-gray-600 text-sm mt-1">por casal</p>
              </div>
            )}
            {promotionData.packagePrices.familia && (
              <div className="border border-green-200 p-6 rounded-lg bg-green-50 text-center shadow-md">
                <h3 className="text-xl font-semibold text-green-800 mb-2">Pacote Família</h3>
                <p className="text-3xl font-bold text-green-700">{formatCurrency(promotionData.packagePrices.familia)}</p>
                <p className="text-gray-600 text-sm mt-1">para 2 adultos + 2 crianças*</p>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            *Consulte condições e número de pessoas incluídas no pacote família.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Seção de Disponibilidade e Reservas */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2 border-gray-200">
            Disponibilidade e Reservas
          </h2>
          <div className="border border-gray-300 p-6 rounded-lg bg-gray-50 shadow-inner">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Escolha sua data:</h3>
            <div className="flex justify-center">
              <Calendar
                tileClassName={tileClassName}
                tileDisabled={tileDisabled} // <-- ATENÇÃO AQUI: Propriedade aplicada
                activeStartDate={initialCalendarDate} 
                minDate={new Date()} 
              />
            </div>
            {/* Mensagens explicativas atualizadas */}
            <p className="text-gray-600 mt-6 text-sm">
              * Dias em <span className="text-blue-400 font-semibold">Azul</span> são datas do evento.
            </p>
            <p className="text-gray-600 text-sm">
              * Datas em <span className="text-grey-500 font-semibold">Cinza</span> estão reservadas.
            </p>
            <p className="text-gray-600 text-sm">
              * Datas em <span className="text-yellow-500 font-semibold">Amarelo</span> estão disponíveis.
            </p>
            {promotionData.eventSpecificDates && promotionData.eventSpecificDates.length > 0 && (
                <p className="text-gray-600 text-sm mt-4">
                    * Dias em <span className="text-gray-400 font-semibold">cinza claro</span> não fazem parte deste evento.
                </p>
            )}
            <p className="text-red-500 text-sm mt-4 font-medium">
              **Lembre-se:** A disponibilidade real deve vir do seu sistema de reservas.
            </p>
          </div>
        </div>

        {/* Detalhes Adicionais da Promoção */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2 border-gray-200">
                Mais Detalhes
            </h2>
            <ul className="list-none text-gray-700 space-y-5 text-lg">
                <li className="flex items-center p-3 rounded-md bg-blue-50 hover:bg-blue-100 transition duration-200">
                    <span className="material-icons mr-4 text-blue-600 text-3xl"> </span> 
                    <div>
                        <strong className="block text-gray-900">Tipo de Pacote:</strong> 
                        <span className="text-gray-700">{promotionData.type}</span>
                    </div>
                </li>
                <li className="flex items-center p-3 rounded-md bg-green-50 hover:bg-green-100 transition duration-200">
                    <span className="material-icons mr-4 text-green-600 text-3xl"> </span> 
                    <div>
                        <strong className="block text-gray-900">Status Atual:</strong> 
                        <span className="text-gray-700">{promotionData.status}</span>
                    </div>
                </li>
                <li className="flex items-center p-3 rounded-md bg-purple-50 hover:bg-purple-100 transition duration-200">
                    <span className="material-icons mr-4 text-purple-600 text-3xl"> </span> 
                    <div>
                        <strong className="block text-gray-900">Inclusões:</strong> 
                        <span className="text-gray-700">Café da manhã, Wi-Fi de alta velocidade, acesso à piscina e academia.</span>
                    </div>
                </li>
                <li className="flex items-center p-3 rounded-md bg-yellow-50 hover:bg-yellow-100 transition duration-200">
                    <span className="material-icons mr-4 text-yellow-600 text-3xl"> </span> 
                    <div>
                        <strong className="block text-gray-900">Período:</strong> 
                        <span className="text-gray-700">Consulte as datas disponíveis no calendário acima.</span>
                    </div>
                </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Seção de Avaliações e Feedbacks */}
      {promotionData.reviews && promotionData.reviews.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2 border-gray-200">
            Avaliações e Feedbacks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotionData.reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <StarRating rating={review.rating} />
                  <span className="text-gray-600 text-sm font-semibold">{review.guestName}</span>
                </div>
                <p className="text-gray-700 italic">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botão de Reservar Agora no final da página */}
      <div className="mt-12 text-center">
        <button 
          onClick={() => onNavigateToPurchase(promotionData)} 
          className="px-10 py-4 bg-green-600 text-white font-bold text-xl rounded-full hover:bg-green-700 transition duration-300 shadow-lg transform hover:scale-105 promotion-data-button"
        >
          Reservar Agora!
        </button>
      </div>
    </div>
  );
};

export default PromotionDetailsPage;