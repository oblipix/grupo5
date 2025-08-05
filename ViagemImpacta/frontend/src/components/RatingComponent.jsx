import React from 'react';

const RatingComponent = ({ 
  rating = 0, 
  maxRating = 5, 
  size = 'md', 
  showNumber = true, 
  className = '',
  readOnly = true 
}) => {
  // Definir tamanhos das estrelas
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  };

  const starSize = sizes[size] || sizes.md;

  // Função para renderizar as estrelas
  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= maxRating; i++) {
      const isFilled = i <= rating;
      const isHalfFilled = i - 0.5 <= rating && i > rating;
      
      stars.push(
        <div key={i} className="relative">
          {/* Estrela vazia (fundo) */}
          <svg
            className={`${starSize} text-gray-300`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          
          {/* Estrela preenchida */}
          {(isFilled || isHalfFilled) && (
            <svg
              className={`${starSize} text-yellow-400 absolute top-0 left-0`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              style={{ 
                clipPath: isHalfFilled ? 'inset(0 50% 0 0)' : 'none'
              }}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          )}
        </div>
      );
    }
    
    return stars;
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {/* Estrelas */}
      <div className="flex space-x-0.5">
        {renderStars()}
      </div>
      
      {/* Número da avaliação */}
      {showNumber && (
        <span className={`
          text-gray-600 font-medium ml-2
          ${size === 'sm' ? 'text-xs' : ''}
          ${size === 'md' ? 'text-sm' : ''}
          ${size === 'lg' ? 'text-base' : ''}
          ${size === 'xl' ? 'text-lg' : ''}
        `}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

// Componente para exibir rating com contagem de avaliações
export const RatingWithCount = ({ 
  rating = 0, 
  count = 0, 
  size = 'md', 
  className = '' 
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <RatingComponent 
        rating={rating} 
        size={size} 
        showNumber={true}
      />
      <span className={`
        text-gray-500
        ${size === 'sm' ? 'text-xs' : ''}
        ${size === 'md' ? 'text-sm' : ''}
        ${size === 'lg' ? 'text-base' : ''}
        ${size === 'xl' ? 'text-lg' : ''}
      `}>
        ({count} {count === 1 ? 'avaliação' : 'avaliações'})
      </span>
    </div>
  );
};

// Componente interativo para seleção de rating
export const InteractiveRating = ({ 
  rating = 0, 
  onRatingChange, 
  maxRating = 5, 
  size = 'lg',
  className = '' 
}) => {
  const [hoveredRating, setHoveredRating] = React.useState(0);
  const [selectedRating, setSelectedRating] = React.useState(rating);

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10'
  };

  const starSize = sizes[size] || sizes.lg;

  const handleStarClick = (starValue) => {
    setSelectedRating(starValue);
    if (onRatingChange) {
      onRatingChange(starValue);
    }
  };

  const handleStarHover = (starValue) => {
    setHoveredRating(starValue);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const renderInteractiveStars = () => {
    const stars = [];
    
    for (let i = 1; i <= maxRating; i++) {
      const isFilled = i <= (hoveredRating || selectedRating);
      
      stars.push(
        <button
          key={i}
          type="button"
          className={`
            ${starSize} transition-all duration-150 ease-in-out
            ${isFilled ? 'text-yellow-400' : 'text-gray-300'}
            hover:text-yellow-400 hover:scale-110 focus:outline-none focus:ring-2 
            focus:ring-yellow-400 focus:ring-opacity-50 rounded
          `}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={handleMouseLeave}
          aria-label={`Avaliar com ${i} ${i === 1 ? 'estrela' : 'estrelas'}`}
        >
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      );
    }
    
    return stars;
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className="flex space-x-1">
        {renderInteractiveStars()}
      </div>
      {selectedRating > 0 && (
        <span className="ml-2 text-sm text-gray-600 font-medium">
          {selectedRating} de {maxRating}
        </span>
      )}
    </div>
  );
};

export default RatingComponent;
