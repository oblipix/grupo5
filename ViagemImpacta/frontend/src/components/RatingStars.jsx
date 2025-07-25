// src/components/RatingStars.js
import React from 'react';

function RatingStars({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674h4.914c.95 0 1.371 1.24.588 1.81l-3.976 2.888 1.519 4.674c.3.921-.755 1.688-1.539 1.157L10 17.635l-4.067 2.954c-.783.53-1.838-.236-1.539-1.157l1.519-4.674-3.976-2.888c-.784-.57-.362-1.81.588-1.81h4.914l1.519-4.674z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674h4.914c.95 0 1.371 1.24.588 1.81l-3.976 2.888 1.519 4.674c.3.921-.755 1.688-1.539 1.157L10 17.635l-4.067 2.954c-.783.53-1.838-.236-1.539-1.157l1.519-4.674-3.976-2.888c-.784-.57-.362-1.81.588-1.81h4.914l1.519-4.674z" clipRule="evenodd" fill="url(#half-star)" />
          <defs>
            <linearGradient id="half-star">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674h4.914c.95 0 1.371 1.24.588 1.81l-3.976 2.888 1.519 4.674c.3.921-.755 1.688-1.539 1.157L10 17.635l-4.067 2.954c-.783.53-1.838-.236-1.539-1.157l1.519-4.674-3.976-2.888c-.784-.57-.362-1.81.588-1.81h4.914l1.519-4.674z" />
        </svg>
      ))}
      <span className="ml-2 text-gray-700 text-sm">{rating.toFixed(1)}</span>
    </div>
  );
}

export default RatingStars;