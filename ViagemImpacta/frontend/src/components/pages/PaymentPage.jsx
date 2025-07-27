// src/pages/PaymentPage.jsx

import React from 'react';
// 1. Importar hooks do router e useLocation para ler os parâmetros da URL
import { useNavigate, useLocation } from 'react-router-dom';

// 2. Importar todas as fontes de dados necessárias
import { allHotelsData } from '../data/hotels.js';
import { allPromotionalTravels } from '../data/promotions.js';

// Função auxiliar para formatar moeda
const formatCurrency = (value) => {
    if (typeof value !== 'number') return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 3. Usar URLSearchParams para ler os parâmetros da URL (ex: /payment?type=promotion&id=13&package=casal)
    const queryParams = new URLSearchParams(location.search);
    const purchaseType = queryParams.get('type'); // 'promotion' ou 'hotel'
    const itemId = parseInt(queryParams.get('id'));
    const subItemId = queryParams.get('subitem'); // Pode ser o tipo de pacote ('casal') ou o tipo de quarto

    let purchaseDetails = null;

    // 4. Lógica para carregar os detalhes da compra com base no tipo
    if (purchaseType === 'promotion' && itemId && subItemId) {
        const promotion = allPromotionalTravels.find(p => p.id === itemId);
        if (promotion && promotion.packagePrices[subItemId]) {
            purchaseDetails = {
                type: 'Promoção',
                title: promotion.title,
                itemDescription: `Pacote ${subItemId.charAt(0).toUpperCase() + subItemId.slice(1)}`,
                price: promotion.packagePrices[subItemId]
            };
        }
    } else if (purchaseType === 'hotel' && itemId && subItemId) {
        const hotel = allHotelsData.find(h => h.id === itemId);
        const room = hotel?.roomOptions.find(r => r.type === subItemId);
        if (hotel && room) {
            purchaseDetails = {
                type: 'Reserva de Hotel',
                title: hotel.title,
                itemDescription: `Quarto: ${room.type}`,
                price: room.price
            };
        }
    }

    // Se os detalhes da compra não puderem ser encontrados, exibe um erro
    if (!purchaseDetails) {
        return (
            <div className="container mx-auto py-58 px-6 text-center">
                <h2 className="text-2xl font-bold text-red-700 mb-4">Erro: Detalhes da sua compra não foram encontrados.</h2>
                <p className="text-gray-600 mb-6">Isso pode ter acontecido por um link inválido ou a sessão ter expirado.</p>
                <button
                    onClick={() => navigate('/')}
                    className="reservation-button bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    Voltar para a Página Inicial
                </button>
            </div>
        );
    }

    const handlePaymentSubmit = () => {
        // Lógica de pagamento real iria aqui
        alert(`Pagamento de ${formatCurrency(purchaseDetails.price)} para "${purchaseDetails.title}" confirmado com sucesso!`);
        
        // 5. Após o "pagamento", navega para uma página de confirmação ou de "minhas viagens"
        navigate('/minhas-viagens'); 
    };

    return (
        <div className="container mx-auto py-8 px-6">
            {/* 6. O botão "Voltar" agora usa o hook de navegação */}
            <button
                onClick={() => navigate(-1)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-8 transition duration-300"
            >
                ← Voltar
            </button>

            <div className="bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-extrabold text-blue-800 mb-6 text-center">Finalizar Pagamento</h1>

                {/* Resumo da Compra (agora dinâmico) */}
                <div className="border border-blue-200 rounded-lg p-6 mb-8 bg-blue-50">
                    <h2 className="text-2xl font-bold text-blue-700 mb-4">Resumo da Compra</h2>
                    <p className="text-lg text-gray-800 mb-2"><strong>Produto:</strong> {purchaseDetails.type}</p>
                    <p className="text-lg text-gray-800 mb-2"><strong>Detalhe:</strong> {purchaseDetails.title}</p>
                    <p className="text-lg text-gray-800 mb-2"><strong>Item:</strong> {purchaseDetails.itemDescription}</p>
                    <p className="text-2xl font-bold text-green-600 mt-4">Total a Pagar: {formatCurrency(purchaseDetails.price)}</p>
                </div>

                {/* Formulário de Pagamento (mantido comentado como no seu original) */}
                {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">Dados de Pagamento</h2> ... */}

                <button
                    onClick={handlePaymentSubmit}
                    className="reservation-button bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 w-full text-xl"
                >
                    Confirmar e Pagar
                </button>
            </div>
        </div>
    );
};

export default PaymentPage;