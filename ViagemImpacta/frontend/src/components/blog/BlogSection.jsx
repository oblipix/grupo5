// src/blog/BlogSection.jsx

import React from 'react';
import { blogPosts } from '../data/blog-posts.js'; // Caminho para os dados do blog
import BlogPostCard from '../blog/BlogPostCard.jsx';

function BlogSection({ id, title }) { // Recebe o ID como prop
  return (
    // A tag <section> está corretamente recebendo o ID aqui
    <section id={id} className="bg-gray-100 py-20 px-6">
      <div className="container mx-auto">
        <div className="section-title">
          <h2 className="text-3xl font-bold">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 pb-8 px-4 cards-grid">
          {blogPosts.map((post) => (
            <BlogPostCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;