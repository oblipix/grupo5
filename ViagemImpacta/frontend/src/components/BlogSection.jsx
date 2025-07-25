// src/components/BlogSection.js
import React from 'react';
import BlogPostCard from './BlogPostCard';

function BlogSection({ id, title, posts, onCardClick }) {
  return (
    <section id={id} className="bg-white py-8 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="TitleSection text-3xl font-bold text-gray-800 mb-6 text-center">
          {title}
        </h2>
        {/* ATENÇÃO AQUI: Mudando para GRID e definindo colunas e gap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> {/* Ajustei para 4 colunas em lg */}
          {posts.map((post) => (
            <BlogPostCard
              key={post.id}
              post={post}
              onCardClick={onCardClick}
              // PASSA APENAS 'w-full' (para preencher a célula do grid)
              wrapperClasses="w-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;