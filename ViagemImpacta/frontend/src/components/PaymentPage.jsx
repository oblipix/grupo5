
import React from 'react';

function PaymentPage({ hotel, room, onBackToHotelDetails, onCompletePayment }) {
  if (!hotel || !room) {
    return (
      <div className="container mx-auto py-8 px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalhes da reserva não encontrados.</h2>
        <button
          onClick={onBackToHotelDetails}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Voltar para o Hotel
        </button>
      </div>
    );
  }

  const handlePaymentSubmit = () => {
    alert(`Simulando pagamento de R$ ${room.price.toFixed(2).replace('.', ',')} para o quarto ${room.type} no hotel ${hotel.title}!`);
    // Aqui você integraria com um gateway de pagamento real
    if (onCompletePayment) {
      onCompletePayment(); // Sinaliza que o pagamento "foi concluído"
    }
  };

  return (
    <div className="container mx-auto py-8 px-6">
      <button
        onClick={onBackToHotelDetails}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-8 transition duration-300"
      >
        ← Voltar para {hotel.title}
      </button>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-6 text-center">Finalizar Reserva</h1>

        <div className="border border-blue-200 rounded-lg p-6 mb-8 bg-blue-50">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Resumo da Reserva</h2>
          <p className="text-lg text-gray-800 mb-2"><strong>Hotel:</strong> {hotel.title}</p>
          <p className="text-lg text-gray-800 mb-2"><strong>Quarto:</strong> {room.type}</p>
          <p className="text-lg text-gray-800 mb-2"><strong>Capacidade:</strong> {room.capacity} pessoas</p>
          <p className="text-2xl font-bold text-green-600 mb-4">Total a Pagar: R$ {room.price.toFixed(2).replace('.', ',')}</p>
        </div>

       {/*  <h2 className="text-2xl font-bold text-gray-800 mb-4">Dados de Pagamento</h2>
       
        <form className="space-y-4 mb-8">
          <div>
            <label htmlFor="cardName" className="block text-gray-700 text-sm font-bold mb-2">Nome no Cartão</label>
            <input type="text" id="cardName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Seu nome completo" />
          </div>
          <div>
            <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-bold mb-2">Número do Cartão</label>
            <input type="text" id="cardNumber" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="XXXX XXXX XXXX XXXX" />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="expiryDate" className="block text-gray-700 text-sm font-bold mb-2">Validade (MM/AA)</label>
              <input type="text" id="expiryDate" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="MM/AA" />
            </div>
            <div className="w-1/2">
              <label htmlFor="cvv" className="block text-gray-700 text-sm font-bold mb-2">CVV</label>
              <input type="text" id="cvv" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="XXX" />
            </div>
          </div>
        </form> */}

        <button
          onClick={handlePaymentSubmit}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 w-full text-xl
          reservation-button"
        >
          Confirmar Pagamento
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;