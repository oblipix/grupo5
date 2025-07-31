import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, actionText = "OK", showHeader = true }) => {
  // onClose recebe um parâmetro booleano para indicar se o fechamento é pelo X (true) ou pela ação (false)
  useEffect(() => {
    // Previne o scroll do corpo quando o modal está aberto
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Se o modal não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40">
      <div className="bg-white/90 backdrop-filter backdrop-blur-md rounded-xl shadow-2xl w-full max-w-md mx-auto overflow-hidden border border-white/20" 
           onClick={(e) => e.stopPropagation()}>
        
        {showHeader && (
          <div className="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-blue-100/50 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-blue-800">{title}</h3>
            <button 
              onClick={() => onClose(true)} // Indica que o fechamento é pelo X
              className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
              aria-label="Fechar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        
        <div className="p-6 text-gray-700 leading-relaxed">
          {children}
        </div>
        
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50/80 to-white/80 text-right">
          <button
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-8 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
            onClick={() => {
              // Indica que o fechamento é pela ação, não pelo X (botão de ação deve executar o callback)
              onClose(false);
            }}
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
