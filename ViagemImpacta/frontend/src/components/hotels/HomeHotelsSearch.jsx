/* eslint-disable no-unused-vars */
// src/components/HotelSearchForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importar useNavigate

// 2. O componente não precisa mais da prop `onSearch`
const HotelSearchForm = () => {
    const navigate = useNavigate(); // Inicializar o hook de navegação

    // A gestão de estado do formulário permanece exatamente a mesma
    const today = new Date().toISOString().split('T')[0];
    const [destination, setDestination] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(2);
    // ... todos os outros `useState` permanecem iguais

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validação de datas
        if (checkIn && checkOut && new Date(checkIn) > new Date(checkOut)) {
            alert('A data de Check-in não pode ser posterior à data de Check-out.');
            return;
        }

        // 3. Construir os parâmetros de busca para a URL
        const searchParams = new URLSearchParams();

        if (destination) searchParams.append('destination', destination);
        if (checkIn) searchParams.append('checkIn', checkIn);
        if (checkOut) searchParams.append('checkOut', checkOut);
        if (guests) searchParams.append('guests', guests);
        // Adicione outros filtros que desejar na URL

        // 4. Navegar para a página de hotéis com os filtros na URL
        navigate(`/hoteis?${searchParams.toString()}`);
    };

    // O JSX do seu formulário permanece exatamente o mesmo, pois o estado é gerenciado internamente
    return (
        <section className="bg-white rounded-t-[50px] shadow-lg -mt-10 md:-mt-18 relative z-20 py-8 px-6">
            <div className="container mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Todo o seu JSX do formulário continua aqui, sem alterações */}
                    {/* ... */}
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                        >
                            Pesquisar Hotéis
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default HotelSearchForm;