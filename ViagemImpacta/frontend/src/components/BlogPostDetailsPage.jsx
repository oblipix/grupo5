
import React from 'react';
import './BlogPostDetailsPage.css'; // Mantenha a importação do CSS

// Adicione onCategoryClick como uma prop
function BlogPostDetailsPage({ postId, allBlogPosts, onBack, onCategoryClick }) {
  const post = allBlogPosts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="container mx-auto py-8 px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Postagem não encontrada.</h2>
        <button
          onClick={onBack}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Voltar para Dicas de Viagem
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-6">
      <button
        onClick={onBack}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-8 transition duration-300"
      >
        &larr; Voltar para Dicas de Viagem
      </button>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />
        <h1 className="TittleDetails">{post.title}</h1>

        {/* Tornar a categoria clicável */}
        <p className="text-gray-600 text-sm mb-6">
          Categoria: {' '}
          <button
            onClick={() => onCategoryClick(post.category)} // Chama a função com a categoria do post
            className="text-blue-600 hover:text-blue-800 font-semibold underline cursor-pointer focus:outline-none"
          >
            {post.category}
          </button>
        </p>

        {/* Conteúdo completo da postagem */}
        <div
          className="prose max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.fullContent }}
        />

        <p className="text-gray-700 mt-6 pt-4 border-t border-gray-200">
          Esperamos que essas dicas tornem sua próxima viagem ainda mais incrível! Compartilhe com seus amigos viajantes!
        </p>
      </div>
    </div>
  );
}

export default BlogPostDetailsPage;