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
              className="block group h-full relative overflow-hidden rounded-lg shadow-md
                         transform transition-all duration-300
                         hover:scale-105 hover:shadow-xl"> {/* Hover na borda removido aqui */}
            {/* O container interno para o fundo e o conteúdo */}
            <div className="bg-white h-full flex flex-col">
                <div className="relative w-full h-48 overflow-hidden">
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" // Efeito de zoom na imagem
                    />
                </div>
                <div className="p-4 flex-grow flex flex-col">
                    <div>
                        {/* <<<<< AQUI ESTÁ A MUDANÇA NA TAG DE CATEGORIA >>>>> */}
                        <p className="inline-flex items-center text-xs font-semibold
                                      bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full uppercase mb-1">
                            <TagIcon className="h-3 w-3 mr-1" /> {/* Ícone de tag */}
                            {post.category}
                        </p>
                        <h3 className="font-bold text-lg mb-2 text-gray-800
                                       group-hover:text-blue-700 transition-colors line-clamp-2">
                            {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {post.description}
                        </p>
                    </div>
                    {/* 4. O botão "Ler Mais" com background */}
                    <div className="mt-auto"> {/* Mantém o "Ler Mais" no final */}
                        <span
                            className="main-action-button inline-block bg-blue-600 text-white font-semibold text-sm
                                       px-4 py-2 rounded-full transition-colors duration-200
                                       group-hover:bg-blue-700" // Cor do background muda no hover
                        >
                            Ler Mais &rarr;
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default BlogPostCard;