import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaArrowLeft } from 'react-icons/fa';
import '../styles/ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-container flex flex-col items-center justify-center min-h-[80vh] px-4 text-center py-12">
      <div className="w-full max-w-md relative z-10">
        {/* 404 error */}
        <div className="mb-8">
          <h1 className="error-number text-9xl font-extrabold mb-4">404</h1>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded"></div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Página não encontrada
        </h2>
        
        <p className="text-gray-600 mb-8">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
        
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 justify-center">
          <Link
            to="/"
            className="btn-home main-action-button inline-flex items-center justify-center px-5 py-3 rounded-lg text-white transition duration-300 shadow-md"
          >
            <FaHome className="mr-2" />
            Voltar para Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="btn-back inline-flex items-center justify-center px-5 py-3 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition duration-300 shadow-md"
          >
            <FaArrowLeft className="mr-2" />
            Página Anterior
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
