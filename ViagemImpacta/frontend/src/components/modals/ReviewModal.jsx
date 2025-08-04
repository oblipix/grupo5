// src/components/ReviewModal.js
import React, { useState } from 'react';
import { reviewService } from '../../services/reviewService';
import AuthService from '../../services/AuthService'; // Use seu AuthService para verificar o login

const ReviewModal = ({ isOpen, onClose, reservation, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Por favor, selecione uma avaliação de 1 a 5 estrelas.');
      return;
    }

    if (comment.trim().length < 5) {
      setError('Por favor, escreva um comentário com pelo menos 5 caracteres.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const reviewData = {
        HotelId: reservation.hotelId || reservation.HotelId,
        Rating: rating,
        Comment: comment.trim()
      };

      await reviewService.rateHotel(reviewData);
      
      onReviewSubmitted(reviewData);
      
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Erro no submit da avaliação:', error);
      
      if (error.message.includes('Sessão expirada') || error.message.includes('Token')) {
        setError('Sua sessão expirou. Você será redirecionado para o login.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setError(error.message || 'Erro ao enviar avaliação. Tente novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setRating(0);
      setComment('');
      setError('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Avaliar {reservation.hotelName || reservation.HotelName}
          </h3>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Hotel Info */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Como foi sua experiência no {reservation.hotelName || reservation.HotelName}?
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Check-in: {new Date(reservation.checkIn || reservation.CheckIn).toLocaleDateString('pt-BR')} • 
              Check-out: {new Date(reservation.checkOut || reservation.CheckOut).toLocaleDateString('pt-BR')}
            </p>
          </div>

          {/* Rating Stars */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avaliação *
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="text-2xl focus:outline-none transition-colors"
                  disabled={isSubmitting}
                >
                  <svg
                    className={`w-8 h-8 transition-all duration-200 ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400 fill-current transform scale-110'
                        : 'text-gray-300 hover:text-yellow-200'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                {rating === 1 && 'Muito ruim'}
                {rating === 2 && 'Ruim'}
                {rating === 3 && 'Regular'}
                {rating === 4 && 'Bom'}
                {rating === 5 && 'Excelente'}
              </p>
            )}
          </div>

          {/* Comment */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comentário *
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Conte-nos sobre sua experiência no hotel..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={isSubmitting}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              {comment.length}/500 caracteres (mínimo 5)
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Validation Messages */}
          {!error && (rating === 0 || comment.trim().length < 5) && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-700">
                Para enviar sua avaliação:
                {rating === 0 && (
                  <span className="block">• Selecione uma avaliação de 1 a 5 estrelas</span>
                )}
                {comment.trim().length < 5 && (
                  <span className="block">• Escreva um comentário com pelo menos 5 caracteres</span>
                )}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || rating === 0 || comment.trim().length < 5}
              className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 flex items-center transition-all duration-200 ${
                isSubmitting || rating === 0 || comment.trim().length < 5
                  ? 'text-gray-400 bg-gray-300 cursor-not-allowed'
                  : 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 hover:scale-105'
              }`}
              title={
                rating === 0 ? 'Selecione uma avaliação de 1 a 5 estrelas' :
                comment.trim().length < 5 ? 'Escreva um comentário com pelo menos 5 caracteres' :
                'Enviar avaliação'
              }
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                'Enviar Avaliação'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;