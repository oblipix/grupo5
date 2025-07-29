// src/components/modals/ReservationModal.jsx

import React, { useState } from 'react';
import { reservationService } from '../../services/reservationService.js';

const ReservationModal = ({ isOpen, onClose, hotel, room, onSuccess }) => {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    numberOfGuests: 1,
    specialRequests: '',
    travellers: [
      {
        firstName: '',
        lastName: '',
        cpf: ''
      }
    ]
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [calculatedTotal, setCalculatedTotal] = useState(null);

  // Simula um usuário logado - em um app real, isso viria do contexto de autenticação
  const currentUserId = 1; // TODO: Pegar do contexto de usuário

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'numberOfGuests') {
      const guestCount = parseInt(value);
      const newTravellers = [];
      
      // Ajusta a lista de viajantes baseado no número de hóspedes
      for (let i = 0; i < guestCount; i++) {
        newTravellers.push(formData.travellers[i] || {
          firstName: '',
          lastName: '',
          cpf: ''
        });
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: guestCount,
        travellers: newTravellers
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Recalcula o total quando as datas mudam
    const checkIn = name === 'checkIn' ? value : formData.checkIn;
    const checkOut = name === 'checkOut' ? value : formData.checkOut;
    
    if (checkIn && checkOut && checkOut > checkIn) {
      const total = reservationService.calculateReservationTotal(room.price, checkIn, checkOut);
      setCalculatedTotal(total);
    }
  };

  const handleTravellerChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      travellers: prev.travellers.map((traveller, i) => 
        i === index ? { ...traveller, [field]: value } : traveller
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    try {
      // Debug: vamos ver os dados que estão sendo enviados
      console.log('Room data:', room);
      console.log('Hotel data:', hotel);

      // Prepara os dados da reserva
      const reservationData = {
        userId: currentUserId,
        roomId: room.id || null,
        hotelId: hotel.id,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        numberOfGuests: parseInt(formData.numberOfGuests),
        specialRequests: formData.specialRequests,
        travellers: formData.travellers.map(traveller => ({
          firstName: traveller.firstName,
          lastName: traveller.lastName,
          cpf: traveller.cpf.replace(/\D/g, '') // Remove caracteres não numéricos do CPF
        }))
      };

      console.log('Reservation data being sent:', reservationData);

      // Se não temos roomId válido, criar um temporário baseado no tipo
      if (!reservationData.roomId) {
        console.warn('Room ID not found, using fallback room selection');
        // Em um sistema real, você criaria uma interface para o usuário selecionar o quarto específico
        // Por enquanto, vamos usar o primeiro quarto disponível do mesmo tipo
        reservationData.roomId = 1; // Fallback temporário
        setErrors(['Aviso: Usando seleção automática de quarto. Em breve implementaremos seleção específica.']);
      }

      // Valida os dados
      const validation = reservationService.validateReservationData(reservationData);
      if (!validation.isValid) {
        console.log('Validation errors:', validation.errors);
        setErrors(validation.errors);
        setLoading(false);
        return;
      }

      // Cria a reserva
      const newReservation = await reservationService.createReservation(reservationData);
      
      // Chama o callback de sucesso
      onSuccess && onSuccess(newReservation);
      
      // Fecha o modal
      onClose();

    } catch (error) {
      console.error('Error creating reservation:', error);
      setErrors([error.message]);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      checkIn: '',
      checkOut: '',
      numberOfGuests: 1,
      specialRequests: '',
      travellers: [
        {
          firstName: '',
          lastName: '',
          cpf: ''
        }
      ]
    });
    setErrors([]);
    setCalculatedTotal(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Fazer Reserva</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Info do Hotel e Quarto */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-lg text-gray-800">{hotel.title}</h3>
            <p className="text-gray-600 text-sm">{hotel.location}</p>
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="font-medium text-gray-800">{room.type}</p>
              <p className="text-sm text-gray-600">{room.description}</p>
              <p className="text-xl font-bold text-blue-600 mt-1">
                R$ {room.price.toFixed(2).replace('.', ',')} / noite
              </p>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit}>
            {/* Erros */}
            {errors.length > 0 && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <ul className="text-red-600 text-sm">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Datas */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-in
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-out
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  min={formData.checkIn || new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Número de hóspedes */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de Hóspedes
              </label>
              <select
                name="numberOfGuests"
                value={formData.numberOfGuests}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'hóspede' : 'hóspedes'}</option>
                ))}
              </select>
            </div>

            {/* Dados dos viajantes */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Dados dos Viajantes</h4>
              {formData.travellers.map((traveller, index) => (
                <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                  <h5 className="font-medium text-gray-700 mb-3">
                    Viajante {index + 1} {index === 0 && '(Responsável pela reserva)'}
                  </h5>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome *
                      </label>
                      <input
                        type="text"
                        value={traveller.firstName}
                        onChange={(e) => handleTravellerChange(index, 'firstName', e.target.value)}
                        placeholder="Nome"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sobrenome *
                      </label>
                      <input
                        type="text"
                        value={traveller.lastName}
                        onChange={(e) => handleTravellerChange(index, 'lastName', e.target.value)}
                        placeholder="Sobrenome"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CPF * (apenas números)
                    </label>
                    <input
                      type="text"
                      value={traveller.cpf}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 11);
                        handleTravellerChange(index, 'cpf', value);
                      }}
                      placeholder="00000000000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      maxLength="11"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Solicitações especiais */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Solicitações Especiais (opcional)
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows="3"
                placeholder="Ex: quarto no andar alto, cama extra..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Resumo do valor */}
            {calculatedTotal && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Resumo da Reserva</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>{calculatedTotal.days} {calculatedTotal.days === 1 ? 'noite' : 'noites'} × R$ {calculatedTotal.dailyPrice.toFixed(2).replace('.', ',')}</span>
                    <span>R$ {calculatedTotal.subtotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxas e impostos</span>
                    <span>R$ {calculatedTotal.taxes.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>R$ {calculatedTotal.total.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Botões */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:bg-blue-300"
              >
                {loading ? 'Processando...' : 'Confirmar Reserva'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
