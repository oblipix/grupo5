/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import HotelCard from './HotelCard';
import ImageModal from './ImageModal'; // Seu componente ImageModal

// Importando a imagem principal do hotel Rio de Janeiro
import mainImageRio from '../assets/images/entradaprincipalRJ.png'; 
import ImageCorredor from '../assets/images/corredorRJ.png'; 
import ImagePiscina from '../assets/images/piscinaRJ.png';
import ImageQuartoCasal from '../assets/images/quartoCasalRJ.png';
import ImageRestaurante from '../assets/images/restauranteRJ.png';
import ImageJardim from '../assets/images/jardimRJ.png';
import ImageQuartoFamilia from '../assets/images/quartoFamiliaRJ.png';
import ImageEstacionamento from '../assets/images/estacionamentoRJ.png';
import ImageSalaCinema from '../assets/images/salacinemaRJ.png';
import ImageSalaArtes from '../assets/images/saladeartesRJ.png';
import ImageLavanderia from '../assets/images/lavanderiaRJ.png';
import ImageAcademia from '../assets/images/academiaRJ.png'; 
import ImageBanheiro from '../assets/images/banheiroRJ.png'; 

// Importando a imagem principal do hotel Rio Grande do Sul

import mainImageRS from '../assets/images/entradaprincipalRS.png'; 
import ImageCorredorRS from '../assets/images/corredorRS.png'; 
import ImagePiscinaRS from '../assets/images/piscinaRS.png';
import ImageQuartoCasalRS from '../assets/images/quartoCasalRS.png';
import ImageRestauranteRS from '../assets/images/restauranteRS.png';
import ImageJardimRS from '../assets/images/jardimRS.png';
import ImageQuartoFamiliaRS from '../assets/images/quartoFamiliaRS.png';
import ImageEstacionamentoRS from '../assets/images/estacionamentoRS.png';
import ImageSalaCinemaRS from '../assets/images/salacinemaRS.png';
import ImageSalaArtesRS from '../assets/images/saladeartesRS.png';
import ImageLavanderiaRS from '../assets/images/lavanderiaRS.png';
import ImageAcademiaRS from '../assets/images/academiaRS.png';
import ImageBanheiroRS from '../assets/images/banheiroRS.png';



// Importando a imagem principal do hotel Pernambuco

import mainImagePE from '../assets/images/entradaprincipalPE.png'; 
import ImageCorredorPE from '../assets/images/corredorPE.png'; 
import ImagePiscinaPE from '../assets/images/piscinaPE.png';
import ImageQuartoCasalPE from '../assets/images/quartoCasalPE.png';
import ImageRestaurantePE from '../assets/images/restaurantePE.png';
import ImageJardimPE from '../assets/images/jardimPE.png';
import ImageQuartoFamiliaPE from '../assets/images/quartoFamiliaPE.png';
import ImageEstacionamentoPE from '../assets/images/estacionamentoPE.png';
import ImageSalaCinemaPE from '../assets/images/salacinemaPE.png';
import ImageSalaArtesPE from '../assets/images/saladeartesPE.png';
import ImageLavanderiaPE from '../assets/images/lavanderiaPE.png';
import ImageAcademiaPE from '../assets/images/academiaPE.png';
import ImageBanheiroPE from '../assets/images/banheiroPE.png';
import ImageJaguzzaPE from '../assets/images/areajaguzzaPE.png'; 





// Importando a imagem principal do hotel Gararanhus

import mainImageGA from '../assets/images/entradaprincipalGA.png'; 
import ImageCorredorGA from '../assets/images/corredorGA.png'; 
import ImagePiscinaGA from '../assets/images/piscinaGA.png';
import ImageQuartoCasalGA from '../assets/images/quartoCasalGA.png';
import ImageRestauranteGA from '../assets/images/restauranteGA.png';
import ImageJardimGA from '../assets/images/jardimGA.png';
import ImageQuartoFamiliaGA from '../assets/images/quartoFamiliaGA.png';
import ImageEstacionamentoGA from '../assets/images/estacionamentoGA.png';
import ImageSalaCinemaGA from '../assets/images/salacinemaGA.png';
import ImageSalaArtesGA from '../assets/images/saladeartesGA.png';
import ImageLavanderiaGA from '../assets/images/lavanderiaGA.png';
import ImageAcademiaGA from '../assets/images/academiaGA.png';
import ImageBanheiroGA from '../assets/images/banheiroGA.png';





// Importando a imagem principal do hotel brasilia

import mainImageBSB from '../assets/images/entradaprincipalBSB.png'; 
import ImageCorredorBSB from '../assets/images/corredorBSB.png'; 
import ImagePiscinaBSB from '../assets/images/piscinaBSB.png';
import ImageQuartoCasalBSB from '../assets/images/quartoCasalBSB.png';
import ImageRestauranteBSB from '../assets/images/restauranteBSB.png';
import ImageJardimBSB from '../assets/images/jardimBSB.png';
import ImageQuartoFamiliaBSB from '../assets/images/quartoFamiliaBSB.png';
import ImageEstacionamentoBSB from '../assets/images/estacionamentoBSB.png';
import ImageSalaCinemaBSB from '../assets/images/salacinemaBSB.png';
import ImageSalaArtesBSB from '../assets/images/saladeartesBSB.png';
import ImageLavanderiaBSB from '../assets/images/lavanderiaBSB.png';
import ImageAcademiaBSB from '../assets/images/academiaBSB.png';
import ImageBanheiroBSB from '../assets/images/banheiroBSB.png';



// Importando a imagem principal do hotel Belo horizonte

import mainImageBH from '../assets/images/entradaprincipalBH.png'; 
import ImageCorredorBH from '../assets/images/corredorBH.png'; 
import ImagePiscinaBH from '../assets/images/piscinaBH.png';
import ImageQuartoCasalBH from '../assets/images/quartoCasalBH.png';
import ImageRestauranteBH from '../assets/images/restauranteBH.png';
import ImageJardimBH from '../assets/images/jardimBH.png';
import ImageQuartoFamiliaBH from '../assets/images/quartoFamiliaBH.png';
import ImageEstacionamentoBH from '../assets/images/estacionamentoBH.png';
import ImageSalaCinemaBH from '../assets/images/salacinemaBH.png';
import ImageSalaArtesBH from '../assets/images/saladeartesBH.png';
import ImageLavanderiaBH from '../assets/images/lavanderiaBH.png';
import ImageAcademiaBH from '../assets/images/academiaBH.png';
import ImageBanheiroBH from '../assets/images/banheiroBH.png';





// FUNÇÃO AUXILIAR PARA REMOVER ACENTOS
const removeAccents = (str) => {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

// Dados de exemplo para Hotéis (COLOQUE O CONTEÚDO DO PASSO 1 AQUI)
const allHotelsData = [
  {
    id: 1,
    mainImageUrl: mainImageRio, // URL da imagem principal do hotel
    title: 'Tripz Rio de Janeiro: Paraíso Carioca',
    description: 'Descubra o luxo à beira-mar no coração do Rio! Com vistas deslumbrantes do oceano, nosso hotel oferece uma experiência inesquecível com spa completo, gastronomia refinada e serviço impecável para sua estadia na Cidade Maravilhosa.',
    location: 'Rio de Janeiro, Brasil',
    mapUrl: 'https://maps.google.com/?cid=5826605051265667662&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ', 
    galleryImages: [
      { id: 'h1m1', url: ImageCorredor, alt: 'Hotel Tripz Rio de Janeiro - Corredor' }, 
      { id: 'h1g1', url: ImagePiscina , alt: 'Hotel Tripz Rio de Janeiro - Piscina' },
      { id: 'h1g2', url: ImageQuartoCasal, alt: 'Hotel Tripz Rio de Janeiro - Quarto Casal' },
      { id: 'h1g3', url: ImageRestaurante, alt: 'Hotel Tripz Rio de Janeiro - Restaurante' },
      { id: 'h1g4', url: ImageJardim, alt: 'Hotel Tripz Rio de Janeiro - Jardim' },
      { id: 'h1g5', url: ImageQuartoFamilia, alt: 'Hotel Tripz Rio de Janeiro - Quarto Família' },
      { id: 'h1g6', url: ImageEstacionamento, alt: 'Hotel Tripz Rio de Janeiro - Estacionamento' },
      { id: 'h1g7', url: ImageSalaCinema, alt: 'Hotel Tripz Rio de Janeiro - Sala de Cinema' },
      { id: 'h1g8', url: ImageSalaArtes, alt: 'Hotel Tripz Rio de Janeiro - Sala de Artes' },
      { id: 'h1g9', url: ImageLavanderia , alt: 'Hotel Tripz Rio de Janeiro - Lavanderia' },
      { id: 'h1g10', url: ImageAcademia , alt: 'Hotel Tripz Rio de Janeiro - Academia' },
      { id: 'h1g11', url: ImageBanheiro , alt: 'Hotel Tripz Rio de Janeiro - Banheiro' }
    ]
  },
  {
    id: 2,
    mainImageUrl: mainImageRS,
    title: 'Tripz Gramado: Charme Serrano',
    description: 'Viva a magia da Serra Gaúcha no nosso aconchegante refúgio em Gramado! Desfrute de trilhas ecológicas, uma culinária regional de dar água na boca e a tranquilidade das montanhas, perfeito para uma escapada romântica ou em família.',
    location: 'Gramado, Brasil',
    mapUrl: 'https://maps.google.com/?cid=12041541218583555750&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ',
    galleryImages: [
      { id: 'h2m1', url: ImageCorredorRS, alt: 'Hotel Tripz RS - Corredor' }, 
      { id: 'h2g1', url: ImagePiscinaRS , alt: 'Hotel Tripz RS - Piscina' },
      { id: 'h2g2', url: ImageQuartoCasalRS, alt: 'Hotel Tripz RS - Quarto Casal' },
      { id: 'h2g3', url: ImageRestauranteRS, alt: 'Hotel Tripz RS - Restaurante' },
      { id: 'h2g4', url: ImageJardimRS, alt: 'Hotel Tripz RS - Jardim' },
      { id: 'h2g5', url: ImageQuartoFamiliaRS, alt: 'Hotel Tripz RS - Quarto Família' },
      { id: 'h2g6', url: ImageEstacionamentoRS, alt: 'Hotel Tripz RS - Estacionamento' },
      { id: 'h2g7', url: ImageSalaCinemaRS, alt: 'Hotel Tripz RS - Sala de Cinema' },
      { id: 'h2g8', url: ImageSalaArtesRS, alt: 'Hotel Tripz RS - Sala de Artes' },
      { id: 'h2g9', url: ImageLavanderiaRS , alt: 'Hotel Tripz RS - Lavanderia' },
      { id: 'h2g10', url: ImageAcademiaRS , alt: 'Hotel Tripz RS - Academia' },
      { id: 'h2g11', url: ImageBanheiroRS , alt: 'Hotel Tripz RS - Banheiro' } 
    ]
  },
  {
    id: 3,
    mainImageUrl: mainImagePE,
    title: 'Tripz Recife: Urbano e Conectado',
    description: 'Hospede-se no coração pulsante de Recife! Nosso hotel moderno é ideal para viajantes a negócios e turistas que desejam explorar a cidade, com fácil acesso aos principais pontos e toda a comodidade que você precisa.',
    location: 'Recife, Pernambuco',
    mapUrl: 'https://maps.google.com/?cid=4368198245613338580&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ',
    galleryImages: [
      { id: 'h3m1', url: ImageCorredorPE, alt: 'Hotel Tripz Recife - Corredor' }, 
      { id: 'h3g1', url: ImagePiscinaPE , alt: 'Hotel Tripz Recife - Piscina' },
      { id: 'h3g2', url: ImageQuartoCasalPE, alt: 'Hotel Tripz Recife - Quarto Casal' },
      { id: 'h3g3', url: ImageRestaurantePE, alt: 'Hotel Tripz Recife - Restaurante' },
      { id: 'h3g4', url: ImageJardimPE, alt: 'Hotel Tripz Recife - Jardim' },
      { id: 'h3g5', url: ImageQuartoFamiliaPE, alt: 'Hotel Tripz Recife - Quarto Família' },
      { id: 'h3g6', url: ImageEstacionamentoPE, alt: 'Hotel Tripz Recife - Estacionamento' },
      { id: 'h3g7', url: ImageSalaCinemaPE, alt: 'Hotel Tripz Recife - Sala de Cinema' },
      { id: 'h3g8', url: ImageSalaArtesPE, alt: 'Hotel Tripz Recife - Sala de Artes' },
      { id: 'h3g9', url: ImageLavanderiaPE , alt: 'Hotel Tripz Recife - Lavanderia' },
      { id: 'h3g10', url: ImageAcademiaPE , alt: 'Hotel Tripz Recife - Academia' },
      { id: 'h3g11', url: ImageBanheiroPE , alt: 'Hotel Tripz Recife - Banheiro' },
      { id: 'h3g12', url: ImageJaguzzaPE , alt: 'Hotel Tripz Recife - Jaguzza' },
    ]
  },
  {
    id: 4,
    mainImageUrl: mainImageGA,
    title: 'Tripz Garanhuns: Paraíso do Agreste',
    description: 'Descubra a tranquilidade em Garanhuns! Nosso refúgio oferece o ambiente perfeito para relaxar e se conectar com a natureza, com paisagens exuberantes e um clima agradável. Ideal para quem busca sossego e atividades ao ar livre.',
    location: 'Garanhus, Pernambuco',
    mapUrl: 'https://maps.google.com/?cid=5826605051265667662&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ',
    galleryImages: [
     
        { id: 'h4m1', url: ImageCorredorGA, alt: 'Hotel Tripz Garanhus - Corredor' }, 
        { id: 'h4g1', url: ImagePiscinaGA , alt: 'Hotel Tripz Garanhus - Piscina' },
        { id: 'h4g2', url: ImageQuartoCasalGA, alt: 'Hotel Tripz Garanhus - Quarto Casal' },
        { id: 'h4g3', url: ImageRestauranteGA, alt: 'Hotel Tripz Garanhus - Restaurante' },
        { id: 'h4g4', url: ImageJardimGA, alt: 'Hotel Tripz Garanhus - Jardim' },
        { id: 'h4g5', url: ImageQuartoFamiliaGA, alt: 'Hotel TripzGaranhus - Quarto Família' },
        { id: 'h4g6', url: ImageEstacionamentoGA, alt: 'Hotel Tripz Garanhus - Estacionamento' },
        { id: 'h4g7', url: ImageSalaCinemaGA, alt: 'Hotel Tripz Garanhus - Sala de Cinema' },
        { id: 'h4g8', url: ImageSalaArtesGA, alt: 'Hotel Tripz Garanhus - Sala de Artes' },
        { id: 'h4g9', url: ImageLavanderiaGA , alt: 'Hotel Tripz Garanhus - Lavanderia' },
        { id: 'h4g10', url: ImageAcademiaGA , alt: 'Hotel Tripz Garanhus - Academia' },
        { id: 'h4g11', url: ImageBanheiroGA , alt: 'Hotel Tripz Garanhus - Banheiro' }
    ]
  },


  {
    id: 5,
    mainImageUrl: mainImageBSB,
    title: 'Tripz Brasilia',
    description: 'Um refúgio tropical com praias privativas, esportes aquáticos e bangalôs sobre a água.',
    location: 'Brasília',
    mapUrl: 'https://maps.google.com/?cid=8323902137611668004&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ',
    galleryImages: [
     
        { id: 'h5m1', url: ImageCorredorBSB, alt: 'Hotel Tripz Brasília - Corredor' }, 
        { id: 'h5g1', url: ImagePiscinaBSB , alt: 'Hotel Tripz Brasília - Piscina' },
        { id: 'h5g2', url: ImageQuartoCasalBSB, alt: 'Hotel Tripz Brasília - Quarto Casal' },
        { id: 'h5g3', url: ImageRestauranteBSB, alt: 'Hotel Tripz Brasília - Restaurante' },
        { id: 'h5g4', url: ImageJardimBSB, alt: 'Hotel Tripz Brasília - Jardim' },
        { id: 'h5g5', url: ImageQuartoFamiliaBSB, alt: 'Hotel Tripz Brasília - Quarto Família'},
        { id: 'h5g6', url: ImageEstacionamentoBSB, alt: 'Hotel Tripz Brasília - Estacionamento' },
        { id: 'h5g7', url: ImageSalaCinemaBSB, alt: 'Hotel Tripz Brasília - Sala de Cinema' },
        { id: 'h5g8', url: ImageSalaArtesBSB, alt: 'Hotel Tripz Brasília - Sala de Artes' },
        { id: 'h5g9', url: ImageLavanderiaBSB , alt: 'Hotel Tripz Brasília - Lavanderia' },
        { id: 'h5g10', url: ImageAcademiaBSB , alt: 'Hotel Tripz Brasília - Academia' },
        { id: 'h6g11', url: ImageBanheiroBSB, alt: 'Hotel Tripz Brasília - Banheiro' }
    ]
  },

  {
    id: 6,
    mainImageUrl: mainImageBH,
    title: 'Tripz Belo Horizonte: Encanto Mineiro',
    description: 'Descubra a capital de Minas Gerais no nosso charmoso hotel em Belo Horizonte. Ideal para explorar a rica cultura local, a deliciosa gastronomia mineira e os principais pontos turísticos. Conforto e conveniência esperam por você no coração da cidade.',
    location: 'Belo Horizonte, Minas Gerais',
    mapUrl: 'https://www.google.com/maps/place/Belo+Horizonte,+MG',
    galleryImages: [
     
        { id: 'h6m1', url: ImageCorredorBH, alt: 'Hotel Tripz BH - Corredor' }, 
        { id: 'h6g1', url: ImagePiscinaBH , alt: 'Hotel Tripz BH - Piscina' },
        { id: 'h6g2', url: ImageQuartoCasalBH, alt: 'Hotel Tripz BH - Quarto Casal' },
        { id: 'h6g3', url: ImageRestauranteBH, alt: 'Hotel Tripz BH - Restaurante' },
        { id: 'h6g4', url: ImageJardimBH, alt: 'Hotel Tripz BH - Jardim' },
        { id: 'h6g5', url: ImageQuartoFamiliaBH, alt: 'Hotel Tripz BH - Quarto Família'},
        { id: 'h6g6', url: ImageEstacionamentoBH, alt: 'Hotel Tripz BH - Estacionamento' },
        { id: 'h6g7', url: ImageSalaCinemaBH, alt: 'Hotel Tripz BH - Sala de Cinema' },
        { id: 'h6g8', url: ImageSalaArtesBH, alt: 'Hotel Tripz BH - Sala de Artes' },
        { id: 'h6g9', url: ImageLavanderiaBH , alt: 'Hotel Tripz BH - Lavanderia' },
        { id: 'h6g10', url: ImageAcademiaBH , alt: 'Hotel Tripz BH - Academia' },
        { id: 'h6g11', url: ImageBanheiroBH, alt: 'Hotel Tripz BH - Banheiro' }
    ]
  },





];


function HotelsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPageHotels, setCurrentPageHotels] = useState(1);
  const hotelsPerPage = 2;

  // === ESTADOS PARA O MODAL DA GALERIA ===
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]); // Array de objetos {id, url, alt}
  const [initialImageId, setInitialImageId] = useState(null); // ID da imagem clicada para iniciar o modal
  // ===========================================

  const processedSearchTerm = removeAccents(searchTerm).toLowerCase();

  const filteredHotels = allHotelsData.filter(hotel => {
    const processedTitle = removeAccents(hotel.title).toLowerCase();
    const processedLocation = removeAccents(hotel.location).toLowerCase();
    const processedDescription = removeAccents(hotel.description).toLowerCase();

    return processedTitle.includes(processedSearchTerm) ||
             processedLocation.includes(processedSearchTerm) ||
             processedDescription.includes(processedSearchTerm);
  });

  const indexOfLastHotel = currentPageHotels * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);

  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

  const paginate = (pageNumber) => setCurrentPageHotels(pageNumber);

  // === FUNÇÃO PARA GERENCIAR O MODAL DA GALERIA ===
  const handleImageClick = (imagesArray, clickedImageId) => {
    setModalImages(imagesArray); // `imagesArray` já deve vir no formato {id, url, alt}
    setInitialImageId(clickedImageId); // Passa o ID da imagem clicada
    setIsModalOpen(true); // Abre o modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalImages([]); // Limpa as imagens ao fechar
    setInitialImageId(null); // Limpa o ID inicial
  };
  // =========================================================

  return (
    <section id="hotels-section" className="bg-white min-h-screen py-8">
      <div className="container mx-auto px-6">
        {/* Ferramenta de Busca */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Buscar Hotéis</h2>
          <input
            type="text"
            placeholder="Pesquise por nome, localização ou descrição do hotel..."
            className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredHotels.length === 0 && searchTerm && (
              <p className="text-gray-600 text-center text-lg mt-4">
                Nenhum hotel encontrado para "{searchTerm}" :( <br />
                Tente ajustar sua busca.
              </p>
          )}
        </div>

        <p className="explore">
          Explore uma seleção de hotéis incríveis e encontre a hospedagem perfeita para sua próxima aventura!
          Utilize a busca acima para refinar sua pesquisa por destino ou tipo de acomodação.
        </p>


        {/* Listagem de Hotéis */}
        {filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentHotels.map(hotel => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onImageClick={handleImageClick} // Passa a função para o HotelCard
              />
            ))}
          </div>
        ) : (
          !searchTerm && (
            <p className="text-gray-600 text-center text-lg">Nenhum hotel disponível.</p>
          )
        )}

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-4 py-2 rounded-md ${currentPageHotels === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {number}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* === RENDERIZAÇÃO CONDICIONAL DO MODAL DA GALERIA === */}
      {isModalOpen && (
        <ImageModal
          images={modalImages} // Array de objetos {id, url, alt}
          initialImageId={initialImageId} // ID da imagem clicada para iniciar
          onClose={handleCloseModal}
        />
      )}
      {/* =================================================== */}
    </section>
  );
}

export default HotelsPage;