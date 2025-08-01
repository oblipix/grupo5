// src/blog/BlogSection.jsx

import React from 'react';
import { blogPosts } from '../data/blog-posts.js'; // Caminho para os dados do blog
import BlogPostCard from '../blog/BlogPostCard.jsx';

// Importa Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

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
        
        {/* Mobile Swiper - visível apenas em telas pequenas */}
        <div className="block md:hidden">
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={1.1}
            centeredSlides={true}
            pagination={{ 
              clickable: true,
              el: '.blog-swiper-pagination'
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.3,
                spaceBetween: 20,
                centeredSlides: true,
              },
            }}
            className="px-4 py-4"
          >
            {blogPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <div className="relative card-spacing w-full">
                  <BlogPostCard post={post} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Apenas paginação centralizada */}
          <div className="blog-swiper-pagination flex justify-center mt-6"></div>
        </div>

        {/* Desktop Grid - visível apenas em telas médias e grandes */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-10 cards-grid px-2 sm:px-4 lg:px-8 py-4">
          {blogPosts.map((post) => (
            <div key={post.id} className="relative card-spacing w-full">
              <BlogPostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;