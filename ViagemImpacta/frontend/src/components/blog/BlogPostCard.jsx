// src/components/BlogPostCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { TagIcon } from '@heroicons/react/24/solid'; // Importando o ícone de tag

function BlogPostCard({ post }) {
    if (!post) {
        return null;
    }

    return (
        // 3. O card inteiro agora é um Link para a rota de detalhes do post
        // Removida a classe hover:border-2 e hover:border-blue-500
        <Link to={`/blog/${post.id}`}
              className="block group w-full relative rounded-lg shadow-md
                         transform transition-all duration-300
                         hover:scale-105 hover:shadow-xl">
            {/* O container interno para o fundo e o conteúdo */}
            <div className="bg-white w-full flex flex-col rounded-lg overflow-hidden">
                <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" // Efeito de zoom na imagem
                    />
                </div>
                <div className="p-6 text-center">
                    <div>
                        {/* Categoria centralizada */}
                        <div className="flex justify-center mb-2">
                            <p className="inline-flex items-center text-xs font-semibold
                                          bg-gray-200 text-yellow-800 px-2 py-1 rounded-full uppercase">
                                <TagIcon className="h-3 w-3 mr-1" /> {/* Ícone de tag */}
                                {post.category}
                            </p>
                        </div>
                        <h3 className="text-blue-800 font-bold text-lg mb-3 text-center
                                       group-hover:text-blue-900 transition-colors line-clamp-2">
                            {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 text-center">
                            {post.description}
                        </p>
                    </div>
                    {/* Botão "Ler Mais" delicado centralizado */}
                    <div className="flex justify-center mt-4">
                        <span className="read-more-button">
                            Ler Mais
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default BlogPostCard;