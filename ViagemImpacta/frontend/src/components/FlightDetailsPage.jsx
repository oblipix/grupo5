/* eslint-disable no-unused-vars */
import React from 'react';
// Importa removeAccents do App.jsx (ou define localmente se não exportado)
import { removeAccents } from '../App'; 

// Dados de exemplo de um voo detalhado (similar ao que uma API retornaria)
// No futuro, isso viria de uma prop 'flightData'
const dummyFlightDetails = {
    id: 401,
    origin: 'São Paulo',
    originCode: 'GRU',
    destination: 'Jaguaruna',
    destinationCode: 'JJG',
    date: 'quarta, 10 de set.',
    dateFull: '10/09/2025',
    passengers: 1,
    class: 'Economy',
    outboundFlights: [
        {
            id: 1,
            time: '07:55',
            origin: 'GRU',
            duration: '1 h 25 min.',
            destination: 'JJG',
            price: 153.34,
            taxIncluded: true,
            direct: true,
            airline: 'LATAM Airlines Brasil',
            cheapest: true,
            fastest: false,
        },
        {
            id: 2,
            time: '17:20',
            origin: 'GRU',
            duration: '1 h 25 min.',
            destination: 'JJG',
            price: 153.34,
            taxIncluded: true,
            direct: true,
            airline: 'LATAM Airlines Brasil',
            cheapest: false,
            fastest: true,
        },
        // Adicione mais voos de ida se necessário
    ],
    // outboundFlights: [], // Descomente para testar "nenhum voo"
    returnFlights: [], // Vôos de volta (não implementado neste layout, mas a estrutura estaria aqui)
};


// Componente FlightDetailsPage: Exibe os detalhes de um voo selecionado
function FlightDetailsPage({ flightData, onBack }) {
    if (!flightData) {
        return (
            <section className="bg-white rounded-t-3xl shadow-md -mt-10 md:-mt-20 relative z-10 py-8 px-6 text-center">
                <p className="text-gray-700 text-xl">Detalhes do voo não encontrados.</p>
                <button
                    onClick={onBack}
                    className="mt-4 main-action-button text-white px-6 py-2 rounded-md transition"
                >
                    Voltar
                </button>
            </section>
        );
    }

    // Usaremos os dados de exemplo por enquanto, no futuro viria de 'flightData'
    const currentFlightDetails = dummyFlightDetails; // OU flightData, se você passar dados completos

    return (
        <section className="bg-white rounded-t-3xl shadow-md -mt-10 md:-mt-20 relative z-10 py-8 px-6">
            <div className="container mx-auto">
                {/* Botão de Voltar */}
                <button
                    onClick={onBack}
                    className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Voltar
                </button>

                {/* Cabeçalho de Navegação de Voo */}
                <div className="flex items-center justify-between text-gray-800 mb-6 border-b pb-4">
                    <div className="flex items-center space-x-2">
                        <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9v-2h2v2zm0-4H9v-2h2v2zm0-4H9V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg> {/* Ícone de avião */}
                        <span className="font-semibold text-lg">{currentFlightDetails.originCode}</span>
                        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 12h-11m6.5-6l6 6-6 6"></path></svg> {/* Seta */}
                        <span className="font-semibold text-lg">{currentFlightDetails.destinationCode}</span>
                    </div>
                    <div className="text-right">
                        <p className="text-sm">{currentFlightDetails.date}</p>
                        <p className="text-xs text-gray-500">{currentFlightDetails.passengers} passageiro(s), {currentFlightDetails.class}</p>
                    </div>
                </div>

                {/* Navegação de Datas */}
                <div className="flex justify-center gap-2 mb-6">
                    <button className="p-2 rounded-full hover:bg-gray-200">{'<'}</button>
                    <button className="bg-blue-600 text-white p-2 rounded-full">dom, 07/09</button>
                    <button className="p-2 rounded-full hover:bg-gray-200">seg, 08/09</button>
                    <button className="p-2 rounded-full hover:bg-gray-200">ter, 09/09</button>
                    <button className="bg-blue-600 text-white p-2 rounded-full">qua, 10/09</button> {/* Data selecionada */}
                    <button className="p-2 rounded-full hover:bg-gray-200">qui, 11/09</button>
                    <button className="p-2 rounded-full hover:bg-gray-200">sex, 12/09</button>
                    <button className="p-2 rounded-full hover:bg-gray-200">sáb, 13/09</button>
                    <button className="p-2 rounded-full hover:bg-gray-200">{'>'}</button>
                </div>

                {/* Título da Seção de Voos de Ida */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Escolha um voo de ida</h2>

                {/* Filtros de Organização */}
                <div className="text-right mb-6">
                    <span className="text-gray-700 text-sm">Organizar por: </span>
                    <select className="p-2 border rounded-md text-sm">
                        <option>Mais baratos</option>
                        <option>Mais rápidos</option>
                    </select>
                </div>

                {/* Listagem de Voos de Ida */}
                {currentFlightDetails.outboundFlights.length > 0 ? (
                    <div className="space-y-4">
                        {currentFlightDetails.outboundFlights.map(flight => (
                            <div key={flight.id} className={`bg-white p-6 rounded-lg shadow-sm border ${flight.cheapest ? 'border-green-500' : (flight.fastest ? 'border-blue-500' : 'border-gray-200')}`}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="text-gray-800 text-2xl font-bold">{flight.time}</div>
                                        <div className="text-gray-600 text-sm">{flight.origin}</div>
                                        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 12h-11m6.5-6l6 6-6 6"></path></svg>
                                        <div className="text-gray-800 text-2xl font-bold">{flight.destination}</div>
                                    </div>
                                    <span className="text-gray-600 text-sm">{flight.duration}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {flight.cheapest && (
                                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Recomendado</span>
                                        )}
                                        {flight.fastest && (
                                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Mais rápido</span>
                                        )}
                                        {flight.category && (
                                            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{flight.category}</span>
                                        )}
                                        {flight.direct && (
                                            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">Direto</span>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-blue-600">Por pessoa a partir de BRL {flight.price.toFixed(2)}</p>
                                        <p className="text-gray-600 text-xs">Inclui taxas e impostos</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center text-lg">Nenhum voo de ida encontrado.</p>
                )}

            </div>
        </section>
    );
}

export default FlightDetailsPage;