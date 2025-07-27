// src/pages/BlogPostDetailsPage.jsx

import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // 1. Importar hooks e Link
import { blogPosts } from '../data/blog-posts'; // 2. Importar os dados do blog
import '../styles/BlogPostDetailsPage.css'; // Importar estilos específicos

function BlogPostDetailsPage() {
  // 3. Obter o ID da URL e a função de navegação
  const { id } = useParams(); // O nome 'id' deve corresponder ao da sua rota, ex: /blog/:id
  const navigate = useNavigate();

  // 4. Encontrar o post específico na lista de dados
  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="container mx-auto py-8 px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Postagem não encontrada.</h2>
        <button
          onClick={() => navigate('/')} // Navega para a home se o post não existir
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Voltar para a Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-6">
      {/* 5. O botão "Voltar" usa a função navigate */}
      <button
        onClick={() => navigate(-1)} // Volta para a página anterior (a lista de posts)
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-8"
      >
        &larr; Voltar
      </button>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-auto max-h-96 object-cover rounded-lg mb-6"
        />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>

        {/* 6. A categoria agora é um Link, navegando para uma rota de categoria */}
        <p className="text-gray-600 text-sm mb-6">
          Categoria: {' '}
          <Link
            to={`/blog/categoria/${post.category}`} // Ex: /blog/categoria/Planejamento
            className="text-blue-600 hover:text-blue-800 font-semibold underline"
          >
            {post.category}
          </Link>
        </p>

        {/* Conteúdo completo da postagem */}
        <div
          className="prose max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.fullContent }}
        />

        <p className="text-gray-700 mt-6 pt-4 border-t border-gray-200">
          Esperamos que essas dicas tornem sua próxima viagem ainda mais incrível!
        </p>
      </div>
    </div>
  );
}

export default BlogPostDetailsPage;