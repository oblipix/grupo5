import React from 'react';
import PropTypes from 'prop-types';
import { HeartIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { formatCurrency } from '../utils/formatters';

const PackageCard = ({ 
  package: packageData, 
  onCardClick, 
  onSavePackage, 
  isPackageSaved 
}) => {
  const {
    id,
    imageUrl,
    title,
    description,
    type,
    status,
    eventDate,
    priceFrom,
    priceTo,
    reviews
  } = packageData;

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
          onClick={() => onCardClick(id)}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSavePackage(packageData);
          }}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isPackageSaved ? 'bg-red-500' : 'bg-gray-200'
          } hover:scale-110 transition-transform duration-200`}
        >
          <HeartIcon className={`w-6 h-6 ${
            isPackageSaved ? 'text-white' : 'text-gray-600'
          }`} />
        </button>
        <div className="absolute bottom-4 left-4">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
            {type}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 cursor-pointer"
            onClick={() => onCardClick(id)}>
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span className="ml-1 text-gray-700">{averageRating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-gray-500">Data: {eventDate}</span>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-gray-500 text-sm line-through">
              De: {formatCurrency(priceFrom)}
            </p>
            <p className="text-xl font-bold text-green-600">
              Por: {formatCurrency(priceTo)}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${
            status === 'Em Andamento' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

PackageCard.propTypes = {
  package: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    eventDate: PropTypes.string.isRequired,
    priceFrom: PropTypes.number.isRequired,
    priceTo: PropTypes.number.isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        rating: PropTypes.number.isRequired,
        comment: PropTypes.string,
        guestName: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onSavePackage: PropTypes.func.isRequired,
  isPackageSaved: PropTypes.bool.isRequired,
};

export default PackageCard;