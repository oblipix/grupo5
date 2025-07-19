// src/components/PurchasePage.js
import React, { useState } from 'react';

const PurchasePage = ({ promotionData, onBack }) => {
  // Estado para armazenar o tipo de pacote selecionado (ex: 'casal', 'solteiro', 'familia')
  const [selectedPackageType, setSelectedPackageType] = useState(null);
  // Estado para armazenar as datas selecionadas no calendário (se você for passar isso futuramente)
  // const [selectedDates, setSelectedDates] = useState([]); 

  // Se por algum motivo os dados da promoção não forem carregados, exibe uma mensagem de erro
  if (!promotionData) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-xl text-red-600 mb-4">Erro: Dados da promoção não carregados para compra.</p>
        <button onClick={onBack} className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300">Voltar</button>
      </div>
    );
  }

  // Função auxiliar para formatar valores para moeda brasileira (Real)
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      {/* Botão para voltar para a página de detalhes da promoção */}
      <button 
        onClick={onBack} 
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 mb-6"
      >
        ← Voltar para {promotionData.title}
      </button>

      {/* Título da Página de Compra */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
        Finalizar Compra: {promotionData.title}
      </h1>

      {/* Resumo visual da promoção (imagem e descrição curta) */}
      <div className="mb-8 text-center">
        <img 
          src={promotionData.imageUrl} 
          alt={promotionData.title} 
          className="w-full max-w-lg h-64 object-cover rounded-lg mx-auto shadow-md"
        />
        <p className="text-xl text-gray-700 mt-4">{promotionData.description.substring(0, 150)}...</p> {/* Mostra um trecho da descrição */}
      </div>

      {/* Título da Seção de Seleção de Pacotes */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 pb-2 border-gray-200 text-center">
        Selecione o Tipo de Pacote
      </h2>

      {/* Renderiza as opções de pacote (Casal, Individual, Família) */}
      {promotionData.packagePrices ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Mapeia sobre os preços dos pacotes e cria um botão para cada */}
          {Object.entries(promotionData.packagePrices).map(([type, price]) => (
            <button
              key={type} // Chave única para cada botão
              onClick={() => setSelectedPackageType(type)} // Define o tipo de pacote selecionado no estado
              // Aplica estilos condicionais para destacar o pacote selecionado
              className={`p-6 border-2 rounded-lg text-center cursor-pointer transition duration-300 ease-in-out
                ${selectedPackageType === type ? 'border-green-500 bg-green-100 shadow-lg transform scale-105' : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'}`
              }
            >
              <h3 className="text-2xl font-bold capitalize mb-2">
                {/* Exibe o nome do pacote de forma amigável */}
                {type === 'solteiro' ? 'Pacote Individual' : type === 'casal' ? 'Pacote Casal' : 'Pacote Família'}
              </h3>
              <p className="text-4xl font-extrabold text-blue-700">
                {formatCurrency(price)} {/* Formata e exibe o preço */}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {/* Informação adicional sobre o preço */}
                {type === 'solteiro' ? 'por pessoa' : type === 'casal' ? 'por casal' : 'para família'}
              </p>
            </button>
          ))}
        </div>
      ) : (
        // Mensagem se não houver opções de pacote
        <p className="text-center text-gray-600">Nenhuma opção de pacote disponível para esta promoção.</p>
      )}

      {/* Box de Resumo da Seleção (aparece apenas se um pacote for selecionado) */}
      {selectedPackageType && (
        <div className="mt-10 p-6 bg-blue-50 rounded-lg border border-blue-200 shadow-inner text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">Resumo da Sua Seleção:</h3>
          <p className="text-xl text-gray-700 mb-2">
            **Promoção:** {promotionData.title}
          </p>
          <p className="text-xl text-gray-700 mb-4">
            **Tipo de Pacote:** <span className="capitalize font-semibold ml-2">
              {selectedPackageType === 'solteiro' ? 'Individual' : selectedPackageType === 'casal' ? 'Casal' : 'Família'}
            </span>
          </p>
          {/* Você pode adicionar aqui as datas selecionadas do calendário, se as estiver passando */}
          {/* <p className="text-xl text-gray-700 mb-4">
            **Datas Selecionadas:** {selectedDates.length > 0 ? selectedDates.map(d => d.toLocaleDateString('pt-BR')).join(', ') : 'Nenhuma data selecionada'}
          </p> */}

          <p className="text-4xl font-extrabold text-green-700">
            Total: {formatCurrency(promotionData.packagePrices[selectedPackageType])}
          </p>
          
          {/* Botão para continuar para o pagamento (próxima etapa) */}
          <div className="mt-8">
            <button className="px-10 py-4 bg-green-600 text-white font-bold text-xl rounded-full hover:bg-green-700 transition duration-300 shadow-lg transform hover:scale-105
            next-purchase">
              Continuar para Pagamento
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchasePage;