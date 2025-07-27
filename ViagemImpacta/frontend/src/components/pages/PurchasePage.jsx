// src/pages/PurchasePage.jsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // 1. Importar hooks do router

// 2. Importar os dados de todas as promoções
// (Certifique-se de ter criado este arquivo 'promotions.js' na pasta 'src/data')
import { allPromotionalTravels } from '../data/promotions.js';

const PurchasePage = () => {
    // 3. Obter o ID da promoção da URL e a função de navegação
    const { packageId } = useParams(); // O nome 'packageId' deve ser o mesmo usado na rota em main.jsx (ex: '/purchase/:packageId')
    const navigate = useNavigate();

    // 4. Encontrar a promoção específica na lista de dados
    const promotionData = allPromotionalTravels.find(p => p.id === parseInt(packageId));

    const [selectedPackageType, setSelectedPackageType] = useState(null);

    // Função auxiliar para formatar valores para moeda brasileira
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    // Se a promoção não for encontrada, exibe uma mensagem de erro
    if (!promotionData) {
        return (
            <div className="container mx-auto p-4 text-center">
                <p className="text-xl text-red-600 mb-4">Erro: Dados da promoção não foram encontrados.</p>
                <button onClick={() => navigate('/')} className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300">
                    Voltar para a Home
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
            {/* 5. O botão "Voltar" agora usa a função navigate para voltar à página anterior */}
            <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 mb-6"
            >
                ← Voltar para Detalhes da Promoção
            </button>

            {/* Título da Página de Compra */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
                Finalizar Compra: {promotionData.title}
            </h1>

            {/* O restante do seu JSX continua exatamente o mesmo */}
            <div className="mb-8 text-center">
                <img
                    src={promotionData.imageUrl}
                    alt={promotionData.title}
                    className="w-full max-w-lg h-64 object-cover rounded-lg mx-auto shadow-md"
                />
                <p className="text-xl text-gray-700 mt-4">{promotionData.description.substring(0, 150)}...</p>
            </div>

            <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 pb-2 border-gray-200 text-center">
                Selecione o Tipo de Pacote
            </h2>

            {promotionData.packagePrices ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {Object.entries(promotionData.packagePrices).map(([type, price]) => (
                        <button
                            key={type}
                            onClick={() => setSelectedPackageType(type)}
                            className={`p-6 border-2 rounded-lg text-center cursor-pointer transition duration-300 ease-in-out
                                ${selectedPackageType === type ? 'border-green-500 bg-green-100 shadow-lg transform scale-105' : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'}`
                            }
                        >
                            <h3 className="text-2xl font-bold capitalize mb-2">
                                {type === 'solteiro' ? 'Pacote Individual' : type === 'casal' ? 'Pacote Casal' : 'Pacote Família'}
                            </h3>
                            <p className="text-4xl font-extrabold text-blue-700">
                                {formatCurrency(price)}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                {type === 'solteiro' ? 'por pessoa' : type === 'casal' ? 'por casal' : 'para família'}
                            </p>
                        </button>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">Nenhuma opção de pacote disponível para esta promoção.</p>
            )}

            {selectedPackageType && (
                <div className="mt-10 p-6 bg-blue-50 rounded-lg border border-blue-200 shadow-inner text-center">
                    <h3 className="text-2xl font-bold text-blue-800 mb-4">Resumo da Sua Seleção:</h3>
                    <p className="text-xl text-gray-700 mb-2">
                        <strong>Promoção:</strong> {promotionData.title}
                    </p>
                    <p className="text-xl text-gray-700 mb-4">
                        <strong>Tipo de Pacote:</strong> <span className="capitalize font-semibold ml-2">
                            {selectedPackageType === 'solteiro' ? 'Individual' : selectedPackageType === 'casal' ? 'Casal' : 'Família'}
                        </span>
                    </p>

                    <p className="text-4xl font-extrabold text-green-700">
                        Total: {formatCurrency(promotionData.packagePrices[selectedPackageType])}
                    </p>

                    <div className="mt-8">
                        {/* 6. O botão de continuar agora navega para a rota de pagamento */}
                        <button 
                            onClick={() => navigate('/payment')}
                            className="main-action-button px-10 py-4 bg-green-600 text-white font-bold text-xl rounded-full hover:bg-green-700 transition duration-300 shadow-lg transform hover:scale-105"
                        >
                            Continuar para Pagamento
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PurchasePage;