// src/components/BlogPostCard.js
import React from 'react';

// 'wrapperClasses' é a prop
function BlogPostCard({ post, onCardClick, wrapperClasses }) { 
  const handleClick = () => {
    if (onCardClick) {
      onCardClick(post.id);
    }
  };

  return (
    // Removi o 'p-2' daqui, ele será gerenciado pelo gap do grid ou por padding interno do card
    // O wrapperClasses agora só definirá a largura no grid
    <div className={wrapperClasses}>
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer h-full flex flex-col transition-transform duration-200 hover:scale-[1.02]"
        onClick={handleClick}
      >
        <div className="relative w-full h-40 overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex-grow flex flex-col justify-between"> {/* Padding interno do card */}
          <div>
            <h3 className="font-bold text-lg mb-1 text-gray-800">
              {post.title}
            </h3>
            <p className="text-gray-600 text-sm mb-2">{post.description}</p>
          </div>
          <button
            className="main-action-button text-white px-4 py-2 rounded-md transition duration-300 text-sm mt-auto self-start"
            onClick={handleClick}
          >
            Ler Mais
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogPostCard;