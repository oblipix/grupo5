// src/pages/InstitutionalPage.jsx

import React from 'react';
import '../styles/InstitutionalPage.css'; // Importar o CSS específico para a página institucional

// 1. Importe os dados da equipe do novo arquivo
import { teamMembers } from '../data/team.js';
import ScrollReveal from '../common/ScrollReveal.jsx';
import AnimatedSection from '../common/AnimatedSection.jsx';

function InstitutionalPage() {
  return (
    <section id="institutional-section" className="bg-white py-12 px-6 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <ScrollReveal animation="fadeUp" delay={200}>
          <h1 className="text-4xl font-extrabold text-blue-800 text-center mb-10">
            Sobre a Tripz: Nossa Jornada
          </h1>
        </ScrollReveal>

        {/* Seção de História */}
        <ScrollReveal animation="slideLeft" delay={400}>
          <div className="mb-12 p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">Nossa História</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nascemos do sonho e do talento de uma equipe de desenvolvedores Full Stack da Avanade. Como parte de um curso inovador da Impacta, promovido pela própria Avanade, mergulhamos no universo da tecnologia com um objetivo claro: transcender o aprendizado teórico e criar algo que realmente gerasse impacto. Foi nesse ambiente de constante desafio e colaboração que a Tripz ganhou vida. Mais do que um projeto de curso, é a materialização do nosso compromisso com a excelência e a paixão por conectar pessoas a experiências inesquecíveis. Cada linha de código em C# e React foi escrita com a visão de construir uma plataforma intuitiva, robusta e que refletisse o cuidado com cada detalhe da jornada do viajante. A Tripz é o legado de um grupo que, impulsionado pela Avanade, transformou conhecimento em inovação e paixão em um portal para o mundo.
            </p>
          </div>
        </ScrollReveal>

        {/* Missão, Visão, Valores */}
        <AnimatedSection animation="fadeUp" delay={600}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Missão */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-blue-200 pb-1">Missão</h3>
              <p className="text-md text-gray-700">Conectar pessoas a destinos incríveis, oferecendo experiências de viagem inesquecíveis através de uma plataforma intuitiva, segura e personalizada.</p>
            </div>
            {/* Visão */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-blue-200 pb-1">Visão</h3>
              <p className="text-md text-gray-700">Ser a principal escolha para viajantes que buscam praticidade e inspiração, reconhecida pela inovação tecnológica e pelo impacto positivo nas jornadas de cada cliente.</p>
            </div>
            {/* Valores */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-blue-200 pb-1">Valores</h3>
                <ul className="list-disc list-inside text-md text-gray-700 space-y-1">
                    <li><b>Inovação:</b> Buscar constantemente soluções criativas e tecnológicas.</li>
                    <li><b>Paixão:</b> Amar o que fazemos e o impacto que geramos.</li>
                    <li><b>Integridade:</b> Agir com honestidade e transparência.</li>
                    <li><b>Colaboração:</b> Acreditar no poder do trabalho em equipe.</li>
                    <li><b>Excelência:</b> Entregar sempre o melhor em cada detalhe.</li>
                </ul>
            </div>
          </div>
        </AnimatedSection>

        {/* Seção dos Criadores */}
        <ScrollReveal animation="zoomIn" delay={800}>
          <div className="mb-10 p-8 bg-blue-50 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-12">Nossos Criadores</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {teamMembers.map((member, index) => (
                <ScrollReveal key={index} animation="fadeUp" delay={900 + (index * 100)}>
                  <div className="relative overflow-hidden rounded-lg shadow-lg institutional-card mx-auto" style={{maxWidth: "220px", height: "260px"}}>
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-3 px-4">
                      <p className="member-name text-sm font-semibold">{member.name}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default InstitutionalPage;