import React, { useState } from 'react';
import HotelCard from './HotelCard';
import ImageModal from './ImageModal';
import SearchHotelsBar from './SearchHotelsBar';
import HotelDetailsPage from './HotelDetailsPage'; // Importe HotelDetailsPage
import PaymentPage from './PaymentPage'; // NOVO: Importe PaymentPage

// Importando as imagens (mantenha todas as suas importações de imagens aqui)
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
import ImageSuitePremium from '../assets/images/suitepremiumRJ.png';
import ImageSalaJogos from '../assets/images/saladejogosRJ.png';
import ImageSauna from '../assets/images/saunaRJ.png';
import ImageSpa from '../assets/images/spaRJ.png';

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
import ImageChaleRS from '../assets/images/chaleRS.png';


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
import ImageBarzinhoPE from '../assets/images/barzinhoPE.png';


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
import ImageRedariosGA from '../assets/images/redariosGA.png';


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
import ImageSpaBSB from '../assets/images/spaBSB.png';


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
import ImageAreaKidsBH from '../assets/images/kidsBH.png';


// FUNÇÃO AUXILIAR PARA REMOVER ACENTOS
const removeAccents = (str) => {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const allHotelsData = [
  {
    id: 1,
    mainImageUrl: mainImageRio,
    title: 'Tripz Rio de Janeiro: Paraíso Carioca',
    description: 'Descubra o luxo à beira-mar no coração do Rio! Com vistas deslumbrantes do oceano, nosso hotel oferece uma experiência inesquecível com spa completo, gastronomia refinada e serviço impecável para sua estadia na Cidade Maravilhosa.',
    location: 'Rio de Janeiro, Brasil',
    price: 1500.00, // Preço médio para filtro
    mapUrl: 'https://maps.google.com/?cid=5826605051265667662&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ',
    totalRooms: 150, // NOVO
    totalBathrooms: 150, // NOVO (geralmente um por quarto + públicos)
    parking: true, // NOVO
    elevators: 4, // NOVO
    hasRestaurant: true, // NOVO
    hasWifi: true, // NOVO
    leisureFacilities: ['Piscina', 'Academia', 'Sala de Cinema', 'Spa', 'Sauna', 'Salão de Jogos'], // NOVO
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
      { id: 'h1g11', url: ImageBanheiro , alt: 'Hotel Tripz Rio de Janeiro - Banheiro' },
      { id: 'h1g12', url: ImageSuitePremium , alt: 'Hotel Tripz Rio de Janeiro - Suíte Premium' },
      { id: 'h1g13', url: ImageSalaJogos, alt:'Hotel Tripz Rio de Janeiro - Sala de Jogos'},
      { id: 'h1g14', url: ImageSauna, alt:'Hotel Tripz Rio de Janeiro - Sauna'},
      { id: 'h1g15', url: ImageSpa, alt:'Hotel Tripz Rio de Janeiro - Spa'},
    ],
    roomOptions: [
      { type: 'Quarto Casal Padrão', description: 'Conforto para um ou dois, vista para o mar.', price: 1200.00, capacity: 2, minCapacity: 1, available: 5, bathrooms: 1, beds: '1 Cama King' },
      { type: 'Quarto Família Plus', description: 'Comodidade para até 4 pessoas.', price: 1600.00, capacity: 4, minCapacity: 2, available: 4, bathrooms: 1, beds: '1 Cama Casal, 3 solteiros' },
      { type: 'Suíte Premium', description: 'Luxo e exclusividade para até 2 pessoas.', price: 3500.00, capacity: 2, minCapacity: 1, available: 1, bathrooms: 2, beds: '1 Cama King' },
    ]
  },
  {
    id: 2,
    mainImageUrl: mainImageRS,
    title: 'Tripz Gramado: Charme Serrano',
    description: 'Viva a magia da Serra Gaúcha no nosso aconchegante refúgio em Gramado! Desfrute de trilhas ecológicas, uma culinária regional de dar água na boca e a tranquilidade das montanhas, perfeito para uma escapada romântica ou em família.',
    location: 'Gramado, Brasil',
    price: 1100.00, // Preço médio para filtro
    mapUrl: 'https://maps.google.com/?cid=12041541218583555750&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ',
    totalRooms: 80, // NOVO
    totalBathrooms: 85, // NOVO
    parking: true, // NOVO
    elevators: 4, // NOVO
    hasRestaurant: true, // NOVO
    hasWifi: true, // NOVO
    leisureFacilities: ['Piscina Aquecida','Sala de Cinema', 'Lareira Comunal', 'Jardim Amplo', 'Trilhas'], // NOVO
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
      { id: 'h2g11', url: ImageBanheiroRS , alt: 'Hotel Tripz RS - Banheiro' },
      { id: 'h2g12', url: ImageChaleRS , alt: 'Hotel Tripz RS - Chalé com Lareira' },
    ],
    roomOptions: [
      { type: 'Quarto Casal Standard', description: 'Aconchegante para um ou duas pessoas.', price: 900.00, capacity: 2, minCapacity: 1, available: 8, bathrooms: 1, beds: '1 Cama Queen' },
      { type: 'Quarto Família Confort', description: 'Ideal para famílias, até 3 pessoas.', price: 1300.00, capacity: 3, minCapacity: 2, available: 4, bathrooms: 1, beds: '1 Cama Casal + 1 Solteiro' },
      { type: 'Chalé com Lareira', description: 'Charme rústico e conforto, perfeito para um ou dois casais.', price: 1800.00, capacity: 2, minCapacity: 1, available: 2, bathrooms: 1, beds: '1 Cama King' }
    ]
  },
  {
    id: 3,
    mainImageUrl: mainImagePE,
    title: 'Tripz Recife: Urbano e Conectado',
    description: 'Hospede-se no coração pulsante de Recife! Nosso hotel moderno é ideal para viajantes a negócios e turistas que desejam explorar a cidade, com fácil acesso aos principais pontos e toda a comodidade que você precisa.',
    location: 'Recife, Pernambuco',
    price: 900.00,
    mapUrl: 'https://maps.google.com/?cid=4368198245613338580&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ',
    totalRooms: 120,
    totalBathrooms: 125,
    parking: true,
    elevators: 4,
    hasRestaurant: true,
    hasWifi: true,
    leisureFacilities: ['Piscina','Sala de Cinema', 'Academia', 'Bar', 'Jaguzza'],
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
      { id: 'h3g13', url: ImageBarzinhoPE , alt: 'Hotel Tripz Recife - Barzinho' },
    ],
    roomOptions: [
      { type: 'Quarto Casal Padrão', description: 'Conforto e praticidade para um ou dois.', price: 750.00, capacity: 2, minCapacity: 1, available: 10, bathrooms: 1, beds: '1 Cama Casal' },
      { type: 'Quarto Casal Superior', description: 'Vista para a cidade, ideal para lazer para um ou dois.', price: 1000.00, capacity: 2, minCapacity: 1, available: 6, bathrooms: 1, beds: '1 Cama Casal' },
      { type: 'Quarto Família Premium', description: 'Amplo e moderno, para até 4 pessoas.', price: 1500.00, capacity: 4, minCapacity: 2, available: 3, bathrooms: 2, beds: '2 Camas Casal' }
    ]
  },
  {
    id: 4,
    mainImageUrl: mainImageGA,
    title: 'Tripz Garanhuns: Paraíso do Agreste',
    description: 'Descubra a tranquilidade em Garanhuns! Nosso refúgio oferece o ambiente perfeito para relaxar e se conectar com a natureza, com paisagens exuberantes e um clima agradável. Ideal para quem busca sossego e atividades ao ar livre.',
    location: 'Garanhus, Pernambuco',
    price: 800.00, // Preço médio para filtro
    mapUrl: 'https://maps.google.com/?cid=5826605051265667662&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ',
    totalRooms: 70, // NOVO
    totalBathrooms: 70, // NOVO
    parking: true, // NOVO
    elevators: 4, // NOVO
    hasRestaurant: true, // NOVO
    hasWifi: false, // NOVO (exemplo de hotel sem wi-fi para variação)
    leisureFacilities: ['Jardins', 'Sala de Cinema', 'Piscina', 'Redário'], // NOVO
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
      { id: 'h4g11', url: ImageBanheiroGA , alt: 'Hotel Tripz Garanhus - Banheiro' },
      { id: 'h4g11', url: ImageRedariosGA , alt: 'Hotel Tripz Garanhus - Redários' },
    ],
    roomOptions: [
      { type: 'Quarto Casal Standard', description: 'Básico e confortável para um ou dois.', price: 650.00, capacity: 2, minCapacity: 1, available: 7, bathrooms: 1, beds: '1 Cama Queen' },
      { type: 'Suíte Familiar', description: 'Duas camas de casal, para até 4 pessoas.', price: 1300.00, capacity: 4, minCapacity: 2, available: 2, bathrooms: 1, beds: '2 Camas Casal' }
    ]
  },
  {
    id: 5,
    mainImageUrl: mainImageBSB,
    title: 'Tripz Brasilia',
    description: 'Um refúgio tropical com praias privativas, esportes aquáticos e bangalôs sobre a água.',
    location: 'Brasília',
    price: 1300.00, // Preço médio para filtro
    mapUrl: 'https://maps.google.com/?cid=8323902137611668004&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ',
    totalRooms: 100, // NOVO
    totalBathrooms: 100, // NOVO
    parking: true, // NOVO
    elevators: 4, // NOVO
    hasRestaurant: true, // NOVO
    hasWifi: true, // NOVO
    leisureFacilities: ['Piscina', 'Academia','Sala de Cinema', 'Bar na piscina', 'Spa'], // NOVO
    galleryImages: [
      { id: 'h5m1', url: ImageCorredorBSB, alt: 'Hotel Tripz Brasília - Corredor' },
      { id: 'h5g1', url: ImagePiscinaBSB , alt: 'Hotel Tripz Brasília - Piscida' },
      { id: 'h5g2', url: ImageQuartoCasalBSB, alt: 'Hotel Tripz Brasília - Quarto Casal' },
      { id: 'h5g3', url: ImageRestauranteBSB, alt: 'Hotel Tripz Brasília - Restaurante' },
      { id: 'h5g4', url: ImageJardimBSB, alt: 'Hotel Tripz Brasília - Jardim' },
      { id: 'h5g5', url: ImageQuartoFamiliaBSB, alt: 'Hotel Tripz Brasília - Quarto Família'},
      { id: 'h5g6', url: ImageEstacionamentoBSB, alt: 'Hotel Tripz Brasília - Estacionamento' },
      { id: 'h5g7', url: ImageSalaCinemaBSB, alt: 'Hotel Tripz Brasília - Sala de Cinema' },
      { id: 'h5g8', url: ImageSalaArtesBSB, alt: 'Hotel Tripz Brasília - Sala de Artes' },
      { id: 'h5g9', url: ImageLavanderiaBSB , alt: 'Hotel Tripz Brasília - Lavanderia' },
      { id: 'h5g10', url: ImageAcademiaBSB , alt: 'Hotel Tripz Brasília - Academia' },
      { id: 'h6g11', url: ImageBanheiroBSB, alt: 'Hotel Tripz Brasília - Banheiro' },
      { id: 'h6g12', url: ImageSpaBSB, alt: 'Hotel Tripz Brasília - Spa' }
    ],
    roomOptions: [
      { type: 'Quarto Casal Standard', description: 'Básico e confortável para um ou dois.', price: 650.00, capacity: 2, minCapacity: 1, available: 7, bathrooms: 1, beds: '1 Cama Queen' },
      { type: 'Suíte Familiar', description: 'Duas camas de casal e uma de solteiro, para até 4 pessoas.', price: 1300.00, capacity: 4, minCapacity: 2, available: 2, bathrooms: 1, beds: '2 Camas Casal' }
    ]
  },
  {
    id: 6,
    mainImageUrl: mainImageBH,
    title: 'Tripz Belo Horizonte: Encanto Mineiro',
    description: 'Descubra a capital de Minas Gerais no nosso charmoso hotel em Belo Horizonte. Ideal para explorar a rica cultura local, a deliciosa gastronomia mineira e os principais pontos turísticos. Conforto e conveniência esperam por você no coração da cidade.',
    location: 'Belo Horizonte, Minas Gerais',
    price: 1000.00, // Preço médio para filtro
    mapUrl: 'https://www.google.com/maps/place/Belo+Horizonte,+MG',
    totalRooms: 130, // NOVO
    totalBathrooms: 130, // NOVO
    parking: true, // NOVO
    elevators: 4, // NOVO
    hasRestaurant: true, // NOVO
    hasWifi: true, // NOVO
    leisureFacilities: ['Piscina', 'Academia','Sala de Cinema', 'Salão de Eventos', 'Área Kids'], // NOVO
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
      { id: 'h6g11', url: ImageBanheiroBH, alt: 'Hotel Tripz BH - Banheiro' },
      { id: 'h6g12', url: ImageAreaKidsBH, alt: 'Hotel Tripz BH - Area Kids' }
    ],
    roomOptions: [
      { type: 'Quarto Casal Standard', description: 'Ideal para uma estadia confortável e econômica para um ou dois.', price: 850.00, capacity: 2, minCapacity: 1, available: 12, bathrooms: 1, beds: '1 Cama Queen' },
      { type: 'Quarto Família Plus', description: 'Comodidade para até 4 pessoas.', price: 1600.00, capacity: 4, minCapacity: 2, available: 4, bathrooms: 1, beds: '1 Cama Casal, 2 solteiros' }
    ]
  },
];


// HotelsPage agora recebe as funções de salvar do App.js
function HotelsPage({ onSaveHotel, isHotelSaved }) {
  const [filterParams, setFilterParams] = useState({
    destination: '',
    checkInDate: null,
    checkOutDate: null,
    guestsInfo: { rooms: 1, adults: 2, children: 0, label: "1 Quarto, 2 adultos (Casal)" },
    searchType: 'oneHotel',
    priceRange: 5000, // Valor inicial do filtro de preço aqui também
    page: 1 // Adicionado: estado para a página atual na paginação
  });
  const [selectedHotel, setSelectedHotel] = useState(null); // Estado para o hotel selecionado
  const [selectedRoomForPayment, setSelectedRoomForPayment] = useState(null); // NOVO: Estado para a reserva de pagamento

  const hotelsPerPage = 2;


  // === ESTADOS PARA O MODAL DA GALERIA ===
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [initialImageId, setInitialImageId] = useState(null);
  // ===========================================

  // Função para lidar com a submissão da busca da SearchHotelsBar
  const handleSearchSubmit = (params) => {
    setFilterParams({ ...params, page: 1 }); // Sempre reseta para a página 1 ao buscar
    setSelectedHotel(null); // Limpa o hotel selecionado
    setSelectedRoomForPayment(null); // Limpa qualquer reserva em andamento
  };

  const filteredHotels = allHotelsData.filter(hotel => {
    const processedHotelLocation = removeAccents(hotel.location).toLowerCase();
    const processedHotelTitle = removeAccents(hotel.title).toLowerCase();

    // Lógica de filtro principal baseada no destino
    const destinationMatch = filterParams.destination
      ? processedHotelLocation.includes(removeAccents(filterParams.destination).toLowerCase()) ||
        processedHotelTitle.includes(removeAccents(filterParams.destination).toLowerCase())
      : true; // Se nenhum destino for inserido, todos os hotéis são considerados

    // Lógica de filtro de datas (simplificada, apenas para demonstração)
    const checkInMatch = filterParams.checkInDate
      ? true // Em um app real, você compararia as datas de disponibilidade do hotel
      : true;

    const checkOutMatch = filterParams.checkOutDate
      ? true // Em um app real, você compararia as datas de disponibilidade do hotel
      : true;

    // Lógica de filtro de hóspedes atualizada:
    // Verifica se *qualquer* roomOption do hotel pode acomodar o número de hóspedes.
    const totalGuests = filterParams.guestsInfo.adults + filterParams.guestsInfo.children;
    const guestsMatch = hotel.roomOptions.some(room =>
      totalGuests >= (room.minCapacity || 1) && totalGuests <= room.capacity
    );

    // Lógica de filtro por preço
    const priceMatch = hotel.price <= filterParams.priceRange;


    return destinationMatch && checkInMatch && checkOutMatch && guestsMatch && priceMatch; // Inclui priceMatch
  });


  // Lógica de Paginação atualizada e simplificada
  const indexOfLastHotel = filterParams.page * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotelsPaginated = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);

  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

  const paginate = (pageNumber) => {
    setFilterParams(prevParams => ({ ...prevParams, page: pageNumber }));
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll para o topo
  };

  const handleImageClick = (imagesArray, clickedImageId) => {
    setModalImages(imagesArray);
    setInitialImageId(clickedImageId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalImages([]);
    setInitialImageId(null);
  };

  // Função para lidar com o clique no botão "Ver Detalhes" do HotelCard
  const handleHotelDetailsClick = (hotelId) => {
    const hotelFound = allHotelsData.find(hotel => hotel.id === hotelId);
    setSelectedHotel(hotelFound);
    setSelectedRoomForPayment(null); // Garante que não haja reserva ativa ao ver detalhes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Função para lidar com o clique no botão "Reservar" de um quarto específico (vindo de HotelDetailsPage)
  const handleReserveRoom = (hotel, room) => {
    setSelectedHotel(hotel); // Mantém o hotel atual
    setSelectedRoomForPayment(room); // Define o quarto a ser pago
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll para o topo
  };

  // Função para voltar da página de detalhes do hotel OU da página de pagamento para a lista de hotéis
  const handleBackToHotelList = () => {
    setSelectedHotel(null);
    setSelectedRoomForPayment(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Função para voltar DA PÁGINA DE PAGAMENTO para a página de detalhes do hotel
  const handleBackToHotelDetailsFromPayment = () => {
    setSelectedRoomForPayment(null); // Limpa apenas a reserva do quarto, permanece nos detalhes do hotel
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Função para quando o pagamento é concluído (simulado)
  const handlePaymentComplete = () => {
    alert('Pagamento concluído com sucesso! Redirecionando para a lista de hotéis.');
    setSelectedHotel(null); // Volta para a lista principal de hotéis
    setSelectedRoomForPayment(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <section id="hotels-section" className="bg-white min-h-screen">
      {/* Barra de Busca sempre visível */}
      <SearchHotelsBar onSearch={handleSearchSubmit} className="mt-8" />

      <div className="container mx-auto px-6 py-8">
        {/* Lógica de Renderização de Páginas dentro de HotelsPage */}
        {selectedRoomForPayment && selectedHotel ? ( // Se há um quarto selecionado para pagamento
          <PaymentPage
            hotel={selectedHotel}
            room={selectedRoomForPayment}
            onBackToHotelDetails={handleBackToHotelDetailsFromPayment}
            onCompletePayment={handlePaymentComplete}
          />
        ) : selectedHotel ? ( // Se há um hotel selecionado (mas não um quarto para pagamento)
          <HotelDetailsPage
            hotel={selectedHotel}
            onBack={handleBackToHotelList} // Para voltar para a lista de hotéis
            onReserveRoom={handleReserveRoom} 
          />
        ) : (
          // Renderiza a lista de hotéis (estado padrão)
          <>
            <p className="explore text-center text-lg font-medium text-gray-700 mb-8">
              Explore uma seleção de hotéis incríveis e encontre a hospedagem perfeita para sua próxima aventura!
            </p>

            {/* Listagem de Hotéis */}
            {filteredHotels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {currentHotelsPaginated.map(hotel => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    onImageClick={handleImageClick}
                    onSaveTravel={onSaveHotel}
                    isHotelSaved={isHotelSaved}
                    onDetailsClick={handleHotelDetailsClick}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center text-lg">
                Nenhum hotel encontrado com os critérios de busca.
              </p>
            )}

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-4 py-2 rounded-md ${filterParams.page === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    {number}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {isModalOpen && (
        <ImageModal
          images={modalImages}
          initialImageId={initialImageId}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}

export default HotelsPage;