/* eslint-disable no-undef */


/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TravelSection from './components/TravelSection';
import HeroSwiper from './components/HeroSwiper';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import TravelCard from './components/TravelCard';

import HotelsPage from './components/HotelsPage';
import HotelDetailsPage from './components/HotelDetailsPage';
import EventBlogSection from './components/EventBlogSection';
import EventReservationForm from './components/EventReservationForm';
import PromotionDetailsPage from './components/PromotionDetailsPage';
import PurchasePage from './components/PurchasePage';

import InstitutionalPage from './components/InstitutionalPage';
import BlogSection from './components/BlogSection';
import BlogPostCard from './components/BlogPostCard';
import BlogPostDetailsPage from './components/BlogPostDetailsPage';

import HotelsSearchForm from './components/HotelsSearchForm';
import MyTravelsPage from './components/MyTravelsPage';

import RecommendedHotelsSection from './components/RecommendedHotelsSection';
import RecommendedHotelDetailsPage from './components/RecommendedHotelDetailsPage';
import NewsletterSection from './components/NewsletterSection';
import HotelsMapSection from './components/HotelsMapSection';

import { useJsApiLoader } from '@react-google-maps/api';


// fotos para promoçoes section
import ImageNatalRS from './assets/images/natal1RS.png';
import ImageAnoNovoRJ from './assets/images/anonovoRJ.png';
import ImageCarnavelPe from './assets/images/carnavalPE.png';


// Importe imagens para o blog
import BlogMala from './assets/images/blog-images/mala.jpg';
import BlogEconomia from './assets/images/blog-images/economia.jpg';
import BlogPet from './assets/images/blog-images/pet.jpg';
import BlogViagem from './assets/images/blog-images/viagem.jpg';

// --- TODAS AS IMPORTAÇÕES DE IMAGENS DE HOTÉIS ---
import mainImageRio from './assets/images/entradaprincipalRJ.png';
import ImageCorredor from './assets/images/corredorRJ.png';
import ImagePiscina from './assets/images/piscinaRJ.png';
import ImageQuartoCasal from './assets/images/quartoCasalRJ.png';
import ImageRestaurante from './assets/images/restauranteRJ.png';
import ImageJardim from './assets/images/jardimRJ.png';
import ImageQuartoFamilia from './assets/images/quartoFamiliaRJ.png';
import ImageEstacionamento from './assets/images/estacionamentoRJ.png';
import ImageSalaCinema from './assets/images/salacinemaRJ.png';
import ImageSalaArtes from './assets/images/saladeartesRJ.png';
import ImageLavanderia from './assets/images/lavanderiaRJ.png';
import ImageAcademia from './assets/images/academiaRJ.png';
import ImageBanheiro from './assets/images/banheiroRJ.png';
import ImageSuitePremium from './assets/images/suitepremiumRJ.png';
import ImageSalaJogos from './assets/images/saladejogosRJ.png';
import ImageSauna from './assets/images/saunaRJ.png';
import ImageSpa from './assets/images/spaRJ.png';

import mainImageRS from './assets/images/entradaprincipalRS.png';
import ImageCorredorRS from './assets/images/corredorRS.png';
import ImagePiscinaRS from './assets/images/piscinaRS.png';
import ImageQuartoCasalRS from './assets/images/quartoCasalRS.png';
import ImageRestauranteRS from './assets/images/restauranteRS.png';
import ImageJardimRS from './assets/images/jardimRS.png';
import ImageQuartoFamiliaRS from './assets/images/quartoFamiliaRS.png';
import ImageEstacionamentoRS from './assets/images/estacionamentoRS.png';
import ImageSalaCinemaRS from './assets/images/salacinemaRS.png';
import ImageSalaArtesRS from './assets/images/saladeartesRS.png';
import ImageLavanderiaRS from './assets/images/lavanderiaRS.png';
import ImageAcademiaRS from './assets/images/academiaRS.png';
import ImageBanheiroRS from './assets/images/banheiroRS.png';
import ImageChaleRS from './assets/images/chaleRS.png';


import mainImagePE from './assets/images/entradaprincipalPE.png';
import ImageCorredorPE from './assets/images/corredorPE.png';
import ImagePiscinaPE from './assets/images/piscinaPE.png';
import ImageQuartoCasalPE from './assets/images/quartoCasalPE.png';
import ImageRestaurantePE from './assets/images/restaurantePE.png';
import ImageJardimPE from './assets/images/jardimPE.png';
import ImageQuartoFamiliaPE from './assets/images/quartoFamiliaPE.png';
import ImageEstacionamentoPE from './assets/images/estacionamentoPE.png';
import ImageSalaCinemaPE from './assets/images/salacinemaPE.png';
import ImageSalaArtesPE from './assets/images/saladeartesPE.png';
import ImageLavanderiaPE from './assets/images/lavanderiaPE.png';
import ImageAcademiaPE from './assets/images/academiaPE.png';
import ImageBanheiroPE from './assets/images/banheiroPE.png';
import ImageJaguzzaPE from './assets/images/areajaguzzaPE.png';
import ImageBarzinhoPE from './assets/images/barzinhoPE.png';


import mainImageGA from './assets/images/entradaprincipalGA.png';
import ImageCorredorGA from './assets/images/corredorGA.png';
import ImagePiscinaGA from './assets/images/piscinaGA.png';
import ImageQuartoCasalGA from './assets/images/quartoCasalGA.png';
import ImageRestauranteGA from './assets/images/restauranteGA.png';
import ImageJardimGA from './assets/images/jardimGA.png';
import ImageQuartoFamiliaGA from './assets/images/quartoFamiliaGA.png';
import ImageEstacionamentoGA from './assets/images/estacionamentoGA.png';
import ImageSalaCinemaGA from './assets/images/salacinemaGA.png';
import ImageSalaArtesGA from './assets/images/saladeartesGA.png';
import ImageLavanderiaGA from './assets/images/lavanderiaGA.png';
import ImageAcademiaGA from './assets/images/academiaGA.png';
import ImageBanheiroGA from './assets/images/banheiroGA.png';
import ImageRedariosGA from './assets/images/redariosGA.png';


import mainImageBSB from './assets/images/entradaprincipalBSB.png';
import ImageCorredorBSB from './assets/images/corredorBSB.png';
import ImagePiscinaBSB from './assets/images/piscinaBSB.png';
import ImageQuartoCasalBSB from './assets/images/quartoCasalBSB.png';
import ImageRestauranteBSB from './assets/images/restauranteBSB.png';
import ImageJardimBSB from './assets/images/jardimBSB.png';
import ImageQuartoFamiliaBSB from './assets/images/quartoFamiliaBSB.png';
import ImageEstacionamentoBSB from './assets/images/estacionamentoBSB.png';
import ImageSalaCinemaBSB from './assets/images/salacinemaBSB.png';
import ImageSalaArtesBSB from './assets/images/saladeartesBSB.png';
import ImageLavanderiaBSB from './assets/images/lavanderiaBSB.png';
import ImageAcademiaBSB from './assets/images/academiaBSB.png';
import ImageBanheiroBSB from './assets/images/banheiroBSB.png';
import ImageSpaBSB from './assets/images/spaBSB.png';


import mainImageBH from './assets/images/entradaprincipalBH.png';
import ImageCorredorBH from './assets/images/corredorBH.png';
import ImagePiscinaBH from './assets/images/piscinaBH.png';
import ImageQuartoCasalBH from './assets/images/quartoCasalBH.png';
import ImageRestauranteBH from './assets/images/restauranteBH.png';
import ImageJardimBH from './assets/images/jardimBH.png';
import ImageQuartoFamiliaBH from './assets/images/quartoFamiliaBH.png';
import ImageEstacionamentoBH from './assets/images/estacionamentoBH.png';
import ImageSalaCinemaBH from './assets/images/salacinemaBH.png';
import ImageSalaArtesBH from './assets/images/saladeartesBH.png';
import ImageLavanderiaBH from './assets/images/lavanderiaBH.png';
import ImageAcademiaBH from './assets/images/academiaBH.png';
import ImageBanheiroBH from './assets/images/banheiroBH.png';
import ImageAreaKidsBH from './assets/images/kidsBH.png';

const MAPS_API_KEY = import.meta.env.VITE_Maps_API_KEY;

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
        lat: -22.9068, // Latitude do Rio de Janeiro
        lng: -43.1729, // Longitude do Rio de Janeiro
        markerColor: '#EF4444', // Cor vermelha (Tailwind red-500)
        price: 1500.00, // Preço médio para filtro
        rating: 4.8, // NOVO: Avaliação média
        mapUrl: 'https://maps.google.com/?cid=5826605051265667662&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ',
        totalRooms: 150,
        totalBathrooms: 150,
        parking: true,
        elevators: 4,
        hasRestaurant: true,
        hasWifi: true,
        leisureFacilities: ['Piscina', 'Academia', 'Sala de Cinema', 'Spa', 'Sauna', 'Salão de Jogos'],
        galleryImages: [
            { id: 'h1m1', url: ImageCorredor, alt: 'Hotel Tripz Rio de Janeiro - Corredor' },
            { id: 'h1g1', url: ImagePiscina, alt: 'Hotel Tripz Rio de Janeiro - Piscina' },
            { id: 'h1g2', url: ImageQuartoCasal, alt: 'Hotel Tripz Rio de Janeiro - Quarto Casal' },
            { id: 'h1g3', url: ImageRestaurante, alt: 'Hotel Tripz Rio de Janeiro - Restaurante' },
            { id: 'h1g4', url: ImageJardim, alt: 'Hotel Tripz Rio de Janeiro - Jardim' },
            { id: 'h1g5', url: ImageQuartoFamilia, alt: 'Hotel Tripz Rio de Janeiro - Quarto Família' },
            { id: 'h1g6', url: ImageEstacionamento, alt: 'Hotel Tripz Rio de Janeiro - Estacionamento' },
            { id: 'h1g7', url: ImageSalaCinema, alt: 'Hotel Tripz Rio de Janeiro - Sala de Cinema' },
            { id: 'h1g8', url: ImageSalaArtes, alt: 'Hotel Tripz Rio de Janeiro - Sala de Artes' },
            { id: 'h1g9', url: ImageLavanderia, alt: 'Hotel Tripz Rio de Janeiro - Lavanderia' },
            { id: 'h1g10', url: ImageAcademia, alt: 'Hotel Tripz Rio de Janeiro - Academia' },
            { id: 'h1g11', url: ImageBanheiro, alt: 'Hotel Tripz Rio de Janeiro - Banheiro' },
            { id: 'h1g12', url: ImageSuitePremium, alt: 'Hotel Tripz Rio de Janeiro - Suíte Premium' },
            { id: 'h1g13', url: ImageSalaJogos, alt: 'Hotel Tripz Rio de Janeiro - Sala de Jogos' },
            { id: 'h1g14', url: ImageSauna, alt: 'Hotel Tripz Rio de Janeiro - Sauna' },
            { id: 'h1g15', url: ImageSpa, alt: 'Hotel Tripz Rio de Janeiro - Spa' },
        ],
        roomOptions: [
            { type: 'Quarto Casal Padrão', description: 'Conforto para um ou dois, vista para o mar.', price: 1200.00, capacity: 2, minCapacity: 1, available: 5, bathrooms: 1, beds: '1 Cama King' },
            { type: 'Quarto Família Plus', description: 'Comodidade para até 4 pessoas.', price: 1600.00, capacity: 4, minCapacity: 2, available: 4, bathrooms: 1, beds: '1 Cama Casal, 3 solteiros' },
            { type: 'Suíte Premium', description: 'Luxo e exclusividade para até 2 pessoas.', price: 3500.00, capacity: 2, minCapacity: 1, available: 1, bathrooms: 2, beds: '1 Cama King' },
        ],
        feedbacks: [
            { id: 1, rating: 5, comment: 'Vista espetacular e serviço impecável! Voltarei com certeza.', guestName: 'Ana Paula S.' },
            { id: 2, rating: 4, comment: 'Localização perfeita, mas o café da manhã poderia ter mais variedade.', guestName: 'Carlos M.' },
            { id: 3, rating: 5, comment: 'Experiência luxuosa, cada detalhe pensado para o conforto.', guestName: 'Beatriz L.' },
        ]
    },
    {
        id: 2,
        mainImageUrl: mainImageRS,
        title: 'Tripz Gramado: Charme Serrano',
        description: 'Viva a magia da Serra Gaúcha no nosso aconchegante refúgio em Gramado! Desfrute de trilhas ecológicas, uma culinária regional de dar água na boca e a tranquilidade das montanhas, perfeito para uma escapada romântica ou em família.',
        location: 'Gramado, Brasil',
        lat: -29.3797, // Latitude de Gramado
        lng: -50.8732, // Longitude de Gramado
        markerColor: '#3B82F6', // Cor azul (Tailwind blue-500)
        price: 1100.00,
        rating: 4.9,
        mapUrl: 'https://maps.google.com/?cid=12041541218583555750&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ',
        totalRooms: 80,
        totalBathrooms: 85,
        parking: true,
        elevators: 4,
        hasRestaurant: true,
        hasWifi: true,
        leisureFacilities: ['Piscina Aquecida', 'Sala de Cinema', 'Lareira Comunal', 'Jardim Amplo', 'Trilhas'],
        galleryImages: [
            { id: 'h2m1', url: ImageCorredorRS, alt: 'Hotel Tripz RS - Corredor' },
            { id: 'h2g1', url: ImagePiscinaRS, alt: 'Hotel Tripz RS - Piscina' },
            { id: 'h2g2', url: ImageQuartoCasalRS, alt: 'Hotel Tripz RS - Quarto Casal' },
            { id: 'h2g3', url: ImageRestauranteRS, alt: 'Hotel Tripz RS - Restaurante' },
            { id: 'h2g4', url: ImageJardimRS, alt: 'Hotel Tripz RS - Jardim' },
            { id: 'h2g5', url: ImageQuartoFamiliaRS, alt: 'Hotel Tripz RS - Quarto Família' },
            { id: 'h2g6', url: ImageEstacionamentoRS, alt: 'Hotel Tripz RS - Estacionamento' },
            { id: 'h2g7', url: ImageSalaCinemaRS, alt: 'Hotel Tripz RS - Sala de Cinema' },
            { id: 'h2g8', url: ImageSalaArtesRS, alt: 'Hotel Tripz RS - Sala de Artes' },
            { id: 'h2g9', url: ImageLavanderiaRS, alt: 'Hotel Tripz RS - Lavanderia' },
            { id: 'h2g10', url: ImageAcademiaRS, alt: 'Hotel Tripz RS - Academia' },
            { id: 'h2g11', url: ImageBanheiroRS, alt: 'Hotel Tripz RS - Banheiro' },
            { id: 'h2g12', url: ImageChaleRS, alt: 'Hotel Tripz RS - Chalé com Lareira' },
        ],
        roomOptions: [
            { type: 'Quarto Casal Standard', description: 'Aconchegante para um ou duas pessoas.', price: 900.00, capacity: 2, minCapacity: 1, available: 8, bathrooms: 1, beds: '1 Cama Queen' },
            { type: 'Quarto Família Confort', description: 'Ideal para famílias, até 3 pessoas.', price: 1300.00, capacity: 3, minCapacity: 2, available: 4, bathrooms: 1, beds: '1 Cama Casal + 1 Solteiro' },
            { type: 'Chalé com Lareira', description: 'Charme rústico e conforto, perfeito para um ou dois casais.', price: 1800.00, capacity: 2, minCapacity: 1, available: 2, bathrooms: 1, beds: '1 Cama King' }
        ],
        feedbacks: [
            { id: 1, rating: 5, comment: 'Lugar mágico, perfeito para o Natal. Super acolhedor!', guestName: 'Maria C.' },
            { id: 2, rating: 5, comment: 'O chalé com lareira é um sonho! Atendimento excelente.', guestName: 'Fernando B.' },
            { id: 3, rating: 4, comment: 'A cidade é linda e o hotel complementa a experiência.', guestName: 'Julia P.' },
        ]
    },
    {
        id: 3,
        mainImageUrl: mainImagePE,
        title: 'Tripz Recife: Urbano e Conectado',
        description: 'Hospede-se no coração pulsante de Recife! Nosso hotel moderno é ideal para viajantes a negócios e turistas que desejam explorar a cidade, com fácil acesso aos principais pontos e toda a comodidade que você precisa.',
        location: 'Recife, Pernambuco',
        lat: -8.0578,
        lng: -34.8820,
        markerColor: '#22C55E',
        price: 900.00,
        rating: 4.2,
        mapUrl: 'https://maps.google.com/?cid=4368198245613338580&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ',
        totalRooms: 120,
        totalBathrooms: 125,
        parking: true,
        elevators: 4,
        hasRestaurant: true,
        hasWifi: true,
        leisureFacilities: ['Piscina', 'Sala de Cinema', 'Academia', 'Bar', 'Jaguzza'],
        galleryImages: [
            { id: 'h3m1', url: ImageCorredorPE, alt: 'Hotel Tripz Recife - Corredor' },
            { id: 'h3g1', url: ImagePiscinaPE, alt: 'Hotel Tripz Recife - Piscina' },
            { id: 'h3g2', url: ImageQuartoCasalPE, alt: 'Hotel Tripz Recife - Quarto Casal' },
            { id: 'h3g3', url: ImageRestaurantePE, alt: 'Hotel Tripz Recife - Restaurante' },
            { id: 'h3g4', url: ImageJardimPE, alt: 'Hotel Tripz Recife - Jardim' },
            { id: 'h3g5', url: ImageQuartoFamiliaPE, alt: 'Hotel Tripz Recife - Quarto Família' },
            { id: 'h3g6', url: ImageEstacionamentoPE, alt: 'Hotel Tripz Recife - Estacionamento' },
            { id: 'h3g7', url: ImageSalaCinemaPE, alt: 'Hotel Tripz Recife - Sala de Cinema' },
            { id: 'h3g8', url: ImageSalaArtesPE, alt: 'Hotel Tripz Recife - Sala de Artes' },
            { id: 'h3g9', url: ImageLavanderiaPE, alt: 'Hotel Tripz Recife - Lavanderia' },
            { id: 'h3g10', url: ImageAcademiaPE, alt: 'Hotel Tripz Recife - Academia' },
            { id: 'h3g11', url: ImageBanheiroPE, alt: 'Hotel Tripz Recife - Banheiro' },
            { id: 'h3g12', url: ImageJaguzzaPE, alt: 'Hotel Tripz Recife - Jaguzza' },
            { id: 'h3g13', url: ImageBarzinhoPE, alt: 'Hotel Tripz Recife - Barzinho' },
        ],
        roomOptions: [
            { type: 'Quarto Casal Padrão', description: 'Conforto e praticidade para um ou dois.', price: 750.00, capacity: 2, minCapacity: 1, available: 10, bathrooms: 1, beds: '1 Cama Casal' },
            { type: 'Quarto Casal Superior', description: 'Vista para a cidade, ideal para lazer para um ou dois.', price: 1000.00, capacity: 2, minCapacity: 1, available: 6, bathrooms: 1, beds: '1 Cama Casal' },
            { type: 'Quarto Família Premium', description: 'Amplo e moderno, para até 4 pessoas.', price: 1500.00, capacity: 4, minCapacity: 2, available: 3, bathrooms: 2, beds: '2 Camas Casal' }
        ],
        feedbacks: [
            { id: 1, rating: 4, comment: 'Bom para viagens de trabalho, bem localizado.', guestName: 'Roberto S.' },
            { id: 2, rating: 3, comment: 'Esperava mais da piscina, mas os quartos são bons.', guestName: 'Fernanda D.' },
        ]
    },
    {
        id: 4,
        mainImageUrl: mainImageGA,
        title: 'Tripz Garanhuns: Paraíso do Agreste',
        description: 'Descubra a tranquilidade em Garanhuns! Nosso refúgio oferece o ambiente perfeito para relaxar e se conectar com a natureza, com paisagens exuberantes e um clima agradável. Ideal para quem busca sossego e atividades ao ar livre.',
        location: 'Garanhus, Pernambuco',
        lat: -8.8913,
        lng: -36.4942,
        markerColor: '#A855F7',
        price: 800.00,
        rating: 4.7,
        mapUrl: 'https://maps.google.com/?cid=5826605051265667662&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlS`eYXJjaFRleHQ',
        totalRooms: 70,
        totalBathrooms: 70,
        parking: true,
        elevators: 4,
        hasRestaurant: true,
        hasWifi: false,
        leisureFacilities: ['Jardins', 'Sala de Cinema', 'Piscina', 'Redário'],
        galleryImages: [
            { id: 'h4m1', url: ImageCorredorGA, alt: 'Hotel Tripz Garanhus - Corredor' },
            { id: 'h4g1', url: ImagePiscinaGA, alt: 'Hotel Tripz Garanhus - Piscina' },
            { id: 'h4g2', url: ImageQuartoCasalGA, alt: 'Hotel Tripz Garanhus - Quarto Casal' },
            { id: 'h4g3', url: ImageRestauranteGA, alt: 'Hotel Tripz Garanhus - Restaurante' },
            { id: 'h4g4', url: ImageJardimGA, alt: 'Hotel Tripz Garanhus - Jardim' },
            { id: 'h4g5', url: ImageQuartoFamiliaGA, alt: 'Hotel TripzGaranhus - Quarto Família' },
            { id: 'h4g6', url: ImageEstacionamentoGA, alt: 'Hotel Tripz Garanhus - Estacionamento' },
            { id: 'h4g7', url: ImageSalaCinemaGA, alt: 'Hotel Tripz Garanhus - Sala de Cinema' },
            { id: 'h4g8', url: ImageSalaArtesGA, alt: 'Hotel Tripz Garanhus - Sala de Artes' },
            { id: 'h4g9', url: ImageLavanderiaGA, alt: 'Hotel Tripz Garanhus - Lavanderia' },
            { id: 'h4g10', url: ImageAcademiaGA, alt: 'Hotel Tripz GA - Academia' },
            { id: 'h4g11', url: ImageBanheiroGA, alt: 'Hotel Tripz GA - Banheiro' },
            { id: 'h4g12', url: ImageRedariosGA, alt: 'Hotel Tripz Garanhus - Redários' },
        ],
        roomOptions: [
            { type: 'Quarto Casal Standard', description: 'Básico e confortável para um ou dois.', price: 650.00, capacity: 2, minCapacity: 1, available: 7, bathrooms: 1, beds: '1 Cama Queen' },
            { type: 'Suíte Familiar', description: 'Duas camas de casal, para até 4 pessoas.', price: 1300.00, capacity: 4, minCapacity: 2, available: 2, bathrooms: 1, beds: '2 Camas Casal' }
        ],
        feedbacks: [
            { id: 1, rating: 5, comment: 'Paz e tranquilidade em meio à natureza. Recomendo para recarregar as energias!', guestName: 'Mariana S.' },
            { id: 2, rating: 4, comment: 'Lugar encantador, mas o Wi-Fi podia ser melhor.', guestName: 'Lucas F.' },
        ]
    },
    {
        id: 5,
        mainImageUrl: mainImageBSB,
        title: 'Tripz Brasilia',
        description: 'Um refúgio tropical com praias privativas, esportes aquáticos e bangalôs sobre a água.',
        location: 'Brasília',
        lat: -15.7797,
        lng: -47.9297,
        markerColor: '#EAB308',
        price: 1300.00,
        rating: 4.5,
        mapUrl: 'https://maps.google.com/?cid=8323902137611668004&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ',
        totalRooms: 100,
        totalBathrooms: 100,
        parking: true,
        elevators: 4,
        hasRestaurant: true,
        hasWifi: true,
        leisureFacilities: ['Piscina', 'Academia', 'Sala de Cinema', 'Bar na piscina', 'Spa'],
        galleryImages: [
            { id: 'h5m1', url: ImageCorredorBSB, alt: 'Hotel Tripz Brasília - Corredor' },
            { id: 'h5g1', url: ImagePiscinaBSB, alt: 'Hotel Tripz Brasília - Piscida' },
            { id: 'h5g2', url: ImageQuartoCasalBSB, alt: 'Hotel Tripz Brasília - Quarto Casal' },
            { id: 'h5g3', url: ImageRestauranteBSB, alt: 'Hotel Tripz Brasília - Restaurante' },
            { id: 'h5g4', url: ImageJardimBSB, alt: 'Hotel Tripz Brasília - Jardim' },
            { id: 'h5g5', url: ImageQuartoFamiliaBSB, alt: 'Hotel Tripz Brasília - Quarto Família' },
            { id: 'h5g6', url: ImageEstacionamentoBSB, alt: 'Hotel Tripz Brasília - Estacionamento' },
            { id: 'h5g7', url: ImageSalaCinemaBSB, alt: 'Hotel Tripz Brasília - Sala de Cinema' },
            { id: 'h5g8', url: ImageSalaArtesBSB, alt: 'Hotel Tripz Brasília - Sala de Artes' },
            { id: 'h5g9', url: ImageLavanderiaBSB, alt: 'Hotel Tripz Brasília - Lavanderia' },
            { id: 'h5g10', url: ImageAcademiaBSB, alt: 'Hotel Tripz Brasília - Academia' },
            { id: 'h5g11', url: ImageBanheiroBSB, alt: 'Hotel Tripz Brasília - Banheiro' },
            { id: 'h5g12', url: ImageSpaBSB, alt: 'Hotel Tripz Brasília - Spa' }
        ],
        roomOptions: [
            { type: 'Quarto Casal Standard', description: 'Básico e confortável para um ou dois.', price: 650.00, capacity: 2, minCapacity: 1, available: 7, bathrooms: 1, beds: '1 Cama Queen' },
            { type: 'Quarto Duplo Superior', description: 'Duas camas de solteiro, para amigos ou família (até 2 pessoas).', price: 1400.00, capacity: 2, minCapacity: 1, available: 6, bathrooms: 1, beds: '2 Camas Solteiro' },
            { type: 'Suíte Presidencial Luxo', description: 'Amplo espaço, vista panorâmica e serviço exclusivo para um ou dois.', price: 2500.00, capacity: 2, minCapacity: 1, available: 1, bathrooms: 2, beds: '1 Cama King' }
        ],
        feedbacks: [
            { id: 1, rating: 5, comment: 'Hotel impecável e moderno, ideal para quem visita a capital. Recomendo!', guestName: 'Pedro H.' },
            { id: 2, rating: 4, comment: 'Bom custo-benefício. A piscina é ótima.', guestName: 'Clara G.' },
        ]
    },
    {
        id: 6,
        mainImageUrl: mainImageBH,
        title: 'Tripz Belo Horizonte: Encanto Mineiro',
        description: 'Descubra a capital de Minas Gerais no nosso charmoso hotel em Belo Horizonte. Ideal para explorar a rica cultura local, a deliciosa gastronomia mineira e os principais pontos turísticos. Conforto e conveniência esperam por você no coração da cidade.',
        location: 'Belo Horizonte, Minas Gerais',
        lat: -19.9190,
        lng: -43.9388,
        markerColor: '#F97316',
        price: 1000.00,
        rating: 4.6,
        mapUrl: 'https://www.google.com/maps/place/Belo+Horizonte,+MG',
        totalRooms: 130,
        totalBathrooms: 130,
        parking: true,
        elevators: 4,
        hasRestaurant: true,
        hasWifi: true,
        leisureFacilities: ['Piscina', 'Academia', 'Sala de Cinema', 'Salão de Eventos', 'Área Kids'],
        galleryImages: [
            { id: 'h6m1', url: ImageCorredorBH, alt: 'Hotel Tripz BH - Corredor' },
            { id: 'h6g1', url: ImagePiscinaBH, alt: 'Hotel Tripz BH - Piscina' },
            { id: 'h6g2', url: ImageQuartoCasalBH, alt: 'Hotel Tripz BH - Quarto Casal' },
            { id: 'h6g3', url: ImageRestauranteBH, alt: 'Hotel Tripz BH - Restaurante' },
            { id: 'h6g4', url: ImageJardimBH, alt: 'Hotel Tripz BH - Jardim' },
            { id: 'h6g5', url: ImageQuartoFamiliaBH, alt: 'Hotel Tripz BH - Quarto Família' },
            { id: 'h6g6', url: ImageEstacionamentoBH, alt: 'Hotel Tripz BH - Estacionamento' },
            { id: 'h6g7', url: ImageSalaCinemaBH, alt: 'Hotel Tripz BH - Sala de Cinema' },
            { id: 'h6g8', url: ImageSalaArtesBH, alt: 'Hotel Tripz BH - Sala de Artes' },
            { id: 'h6g9', url: ImageLavanderiaBH, alt: 'Hotel Tripz BH - Lavanderia' },
            { id: 'h6g10', url: ImageAcademiaBH, alt: 'Hotel Tripz BH - Academia' },
            { id: 'h6g11', url: ImageBanheiroBH, alt: 'Hotel Tripz BH - Banheiro' },
            { id: 'h6g12', url: ImageAreaKidsBH, alt: 'Hotel Tripz BH - Area Kids' }
        ],
        roomOptions: [
            { type: 'Quarto Casal Standard', description: 'Ideal para uma estadia confortável e econômica para um ou dois.', price: 850.00, capacity: 2, minCapacity: 1, available: 12, bathrooms: 1, beds: '1 Cama Queen' },
            { type: 'Quarto Família Plus', description: 'Comodidade para até 4 pessoas.', price: 1600.00, capacity: 4, minCapacity: 2, available: 4, bathrooms: 1, beds: '1 Cama Casal, 2 solteiros' }
        ],
        feedbacks: [
            { id: 1, rating: 5, comment: 'Localização excelente para explorar BH e o hotel é muito confortável.', guestName: 'Paula R.' },
            { id: 2, rating: 4, comment: 'Culinária mineira do restaurante é sensacional!', guestName: 'Thiago B.' },
        ]
    },
];

const allPromotionalTravels = [
    {
        id: 13,
        title: 'Carnaval Tripz Folia em Recife!',
        description: 'Sinta a energia contagiante do Carnaval em Recife! Nosso Hotel Tripz, com sua arquitetura moderna e vibrante, é o cenário perfeito para você se jogar no frevo. Garanta pacotes exclusivos e esteja no coração da festa mais democrática do Brasil.',
        imageUrl: ImageCarnavelPe,
        type: 'Nacional',
        status: 'Em Andamento',
        eventDate: '15/02/2027',
        priceFrom: 2500.00,
        priceTo: 1999.00,
        packagePrices: { casal: 3800.00, solteiro: 1999.00, familia: 5500.00 },
        reviews: [
            { rating: 5, comment: 'Energia incrível! O hotel estava perfeito para o Carnaval. Voltarei!', guestName: 'Maria S.' },
            { rating: 4, comment: 'Adorei a localização e a estrutura. A festa foi sensacional.', guestName: 'João P.' },
            { rating: 5, comment: 'Recife é demais no Carnaval, e o Tripz tornou a experiência ainda melhor.', guestName: 'Ana L.' },
        ]
    },
    {
        id: 16,
        title: 'Réveillon Tripz: Brilho e Emoção em Copacabana!',
        description: 'Prepare-se para a maior festa de Réveillon do mundo! O Hotel Tripz em Copacabana te coloca no centro da celebração. Com um telão exclusivo no jardim, uma cascata de fogos de artifício no céu e a energia da praia mais famosa do Brasil, sua virada de ano será inesquecível.',
        imageUrl: ImageAnoNovoRJ,
        type: 'Nacional',
        status: 'Em Andamento',
        eventDate: '31/12/2026',
        priceFrom: 4000.00,
        priceTo: 3200.00,
        packagePrices: { casal: 6000.00, solteiro: 3200.00, familia: 8500.00 },
        reviews: [
            { rating: 5, comment: 'Melhor Réveillon da vida! A vista dos fogos foi espetacular e a festa do hotel, impecável.', guestName: 'Paula G.' },
            { rating: 5, comment: 'Experiência única. Tudo muito bem organizado e seguro.', guestName: 'Ricardo F.' },
            { rating: 4, comment: 'Incrível! Poderia ter mais opções de comida no buffet, mas a festa foi nota 10.', guestName: 'Camila B.' },
        ]
    },
    {
        id: 18,
        title: 'Natal Mágico na Montanha - Tripz Garanhuns!',
        description: 'Viva a magia do Natal em Garanhuns! Nosso hotel de arquitetura em madeira se transforma num refúgio aconchegante com decorações festivas, ceia especial e um clima europeu que encanta a todos. Perfeito para um Natal inesquecível em família.',
        imageUrl: ImageNatalRS,
        type: 'Nacional',
        status: 'Em Andamento',
        eventDate: '24/12/2025',
        priceFrom: 2100.00,
        priceTo: 1850.00,
        packagePrices: { casal: 3600.00, solteiro: 1850.00, familia: 5200.00 },
        reviews: [
            { rating: 5, comment: 'Natal mais lindo que já tive! A decoração estava deslumbrante e a ceia maravilhosa.', guestName: 'Aline V.' },
            { rating: 5, comment: 'O clima natalino no hotel é super acolhedor. Me senti em um filme.', guestName: 'Bruno F.' },
            { rating: 4, comment: 'Tudo muito bom, só achei que poderia ter mais atividades para crianças pequenas.', guestName: 'Carla A.' },
        ]
    },
];

const blogPosts = [
    {
        id: 1,
        title: '10 Dicas Essenciais para Arrumar a Mala Perfeita',
        description: 'Descubra como otimizar espaço e evitar excesso de bagagem com estas dicas de ouro.',
        imageUrl: BlogMala,
        category: 'Planejamento',
        fullContent: '<p>Arrumar a mala pode ser um desafio, mas com algumas estratégias simples, você pode otimizar o espaço e garantir que não esqueça nada essencial. Comece fazendo uma lista de tudo o que você realmente precisa, priorizando itens versáteis e que combinem entre si. </p><p>Uma técnica popular é a de enrolar as roupas. Roupas enroladas ocupam menos espaço e tendem a amassar menos. Use organizadores de mala ou sacos a vácuo para comprimir itens e separar categorias. Não se esqueça de itens de higiene personalizadas em embalagens pequenas e de levar uma troca de roupa na bagagem de mão, por segurança.</p><p>Para economizar espaço, vista as peças mais volumosas, como casacos e botas, no dia da viagem. Use os sapatos para guardar meias ou outros pequenos objetos. E o mais importante: tente levar apenas o necessário, evitando o "e se..." que geralmente leva a excesso de peso!</p>'
    },
    {
        id: 2,
        title: 'Viajar com Economia: Guia Completo para Orçamentos Pequenos',
        description: 'Explore o mundo sem esvaziar a carteira! Dicas de passagens, hospedagem e alimentação barata.',
        imageUrl: BlogEconomia,
        category: 'Economia',
        fullContent: '<p>Viajar com um orçamento limitado é totalmente possível! A chave está no planejamento inteligente e na flexibilidade. Primeiramente, seja flexível com as datas e destinos. Voos e hospedagens em baixa temporada ou em dias de semana costumam ser mais baratos. Considere destinos menos óbvios, que ofereçam custo de vida mais baixo.</p><p>Para transporte, utilize milhas, passagens promocionais ou considere viajar de ônibus ou trem. Em relação à hospedagem, hostels, pousadas simples ou aluguel de quartos via plataformas como Airbnb podem ser mais econômicos que hotéis tradicionais. Se for cozinhar algumas refeições, isso economiza bastante.</p><p>Na alimentação, explore mercados locais, feiras de rua e restaurantes frequentados por moradores. Evite restaurantes em pontos turísticos muito caros. Andar a pé ou usar transporte público também é uma ótima maneira de economizar e conhecer melhor o lugar. Lembre-se, uma viagem econômica não significa abrir mão da experiência, mas sim priorizar o que realmente importa para você!</p>'
    },
    {
        id: 3,
        title: 'Seu Pet na Aventura: Viajando com Animais de Estimação',
        description: 'Tudo o que você precisa saber para levar seu amigo de quatro patas na próxima viagem.',
        imageUrl: BlogPet,
        category: 'Dicas',
        fullContent: '<p>Levar seu pet em viagens pode ser uma experiência maravilhosa para ambos, mas exige planejamento. O primeiro passo é verificar as regras da companhia aérea ou terrestre para transporte de animais, incluindo tipo de caixa de transporte, documentação necessária (carteira de vacinação, atestado de saúde) e taxas.</p><p>No destino, pesquise por hotéis, pousadas ou aluguéis de temporada que sejam realmente pet-friendly. Muitos lugares aceitam animais, mas impõem restrições de tamanho ou raça, e podem cobrar taxas adicionais. Verifique também se há parques ou áreas onde seu pet possa se exercitar.</p><p>Durante a viagem, leve brinquedos familiares, a ração habitual e potes para água e comida. Mantenha seu pet hidratado e faça paradas regulares se for uma viagem de carro. Um colar de identificação com seu telefone é indispensável. Com preparação, a viagem do seu pet será tão prazerosa quanto a sua!</p>'
    },
    {
        id: 4,
        title: 'Segurança em Viagens Internacionais: O que Você Precisa Saber',
        description: 'Dicas cruciais para manter sua segurança e tranquilidade em destinos estrangeiros.',
        imageUrl: BlogViagem,
        category: 'Segurança',
        fullContent: '<p>Viajar para o exterior é emocionante, mas a segurança deve ser sempre uma prioridade. Antes de viajar, pesquise sobre o destino: costumes locais, áreas a evitar, e se há alguma instabilidade política ou social. Cadastre-se no serviço de registro de brasileiros no exterior do seu país (consulado), se aplicável, para ser localizado em caso de emergência.</p><p>Durante a viagem, evite exibir objetos de valor, use doleiras ou cintos de dinheiro para guardar documentos e grandes quantias de dinheiro. Tenha cópias digitais de todos os documentos importantes. Preferia usar caixas eletrônicos em locais seguros e movimentados, e informe seu banco sobre a viagem para evitar bloqueios no cartão.</p><p>No transporte, use serviços de táxi ou aplicativos conhecidos. À noite, evite andar sozinho em ruas desertas. Confie na sua intuição. E o mais importante: faça um seguro viagem abrangente, que cubra desde emergências médicas até extravio de bagagem. Estar preparado é a melhor forma de aproveitar sua viagem com tranquilidade!</p>'
    },
];
function App() {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: MAPS_API_KEY,
    });
    
    const [selectedPackageId, setSelectedPackageId] = useState(null);
    const [selectedFlightId, setSelectedFlightId] = useState(null);
    const [selectedPromotionId, setSelectedPromotionId] = useState(null);
    const [currentPage, setCurrentPage] = useState('home');
    const [savedUserTravels, setSavedUserTravels] = useState([]);
    const [savedUserHotels, setSavedUserHotels] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeFilterButton, setActiveFilterButton] = useState('');
    const [showEventReservationForm, setShowEventReservationForm] = useState(false);
    const [promotionToPurchase, setPromotionToPurchase] = useState(null);
    const [selectedBlogPostId, setSelectedBlogPostId] = useState(null);
    const [selectedBlogCategory, setSelectedBlogCategory] = useState(null);
    const [selectedRecommendedHotelId, setSelectedRecommendedHotelId] = useState(null);
    const [selectedHotelIdFromMap, setSelectedHotelIdFromMap] = useState(null);

    const [loggedInUser, setLoggedInUser] = useState({
        name: 'Cliente Tripz',
        email: 'cliente@tripz.com.br',
        phone: '(81) 99876-5432',
        address: 'Rua das Viagens, 100',
        city: 'Recife',
        state: 'PE',
        zipCode: '50000-000',
        avatar: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Avatar',
        points: 1250,
    });

    const [userVisitedHotels, setUserVisitedHotels] = useState([
        allHotelsData[0], // Exemplo: Rio de Janeiro
        allHotelsData[2], // Exemplo: Recife
    ]);

    const [hotelSearchFilters, setHotelSearchFilters] = useState({
        destination: '',
        checkInDate: '',
        checkOutDate: '',
        guests: 2,
        roomType: '',
        minRating: 0,
        maxPrice: 5000,
        selectedAmenities: [],
    });
    const [filteredHotels, setFilteredHotels] = useState(allHotelsData);
    React.useEffect(() => {
        let tempHotels = [...allHotelsData];
        if (hotelSearchFilters.destination) {
            const normalizedDestination = removeAccents(hotelSearchFilters.destination).toLowerCase();
            tempHotels = tempHotels.filter(hotel =>
                removeAccents(hotel.location).toLowerCase().includes(normalizedDestination) ||
                removeAccents(hotel.title).toLowerCase().includes(normalizedDestination)
            );
        }
        if (hotelSearchFilters.minRating > 0) {
            tempHotels = tempHotels.filter(hotel => hotel.rating >= hotelSearchFilters.minRating);
        }
        if (hotelSearchFilters.maxPrice) {
            tempHotels = tempHotels.filter(hotel => hotel.price <= hotelSearchFilters.maxPrice);
        }
        if (hotelSearchFilters.roomType || hotelSearchFilters.guests > 0) {
            tempHotels = tempHotels.filter(hotel =>
                hotel.roomOptions.some(room => {
                    const roomTypeMatches = hotelSearchFilters.roomType ? room.type === hotelSearchFilters.roomType : true;
                    const capacityMatches = hotelSearchFilters.guests ? hotelSearchFilters.guests <= room.capacity : true;
                    return roomTypeMatches && capacityMatches;
                })
            );
        }
        if (hotelSearchFilters.selectedAmenities && hotelSearchFilters.selectedAmenities.length > 0) {
            tempHotels = tempHotels.filter(hotel =>
                hotelSearchFilters.selectedAmenities.every(amenity =>
                    hotel.leisureFacilities && hotel.leisureFacilities.includes(amenity)
                )
            );
        }
        setFilteredHotels(tempHotels);
    }, [hotelSearchFilters]);

    const handleHotelSearch = (filters) => {
        setHotelSearchFilters(filters);
        setCurrentPage('hotels');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const convertDdMmYyyyToYyyyMmDd = (dateString) => {
        if (!dateString) return null;
        const parts = dateString.split('/');
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
        }
        return dateString;
    };

    const handleHotelSelectFromMap = (hotel) => {
        setSelectedHotelIdFromMap(hotel.id);
        setCurrentPage('mapHotelDetails');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleReserveRoom = (hotel, room) => {
        alert(`Redirecionando para reserva do quarto ${room.type} no hotel ${hotel.title}`);
    };

    const handlePromotionClick = (promotionId) => {
        setSelectedPromotionId(promotionId);
        setCurrentPage('promotionDetails');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNavigateToPurchase = (promotionData) => {
        setPromotionToPurchase(promotionData);
        setCurrentPage('purchase');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
const handleSaveTravel = (travelToSave) => {
        const isAlreadySaved = savedUserTravels.some(saved => saved.id === travelToSave.id);
        if (isAlreadySaved) {
            setSavedUserTravels(prevSaved => prevSaved.filter(saved => saved.id !== travelToSave.id));
        } else {
            const travelWithStatus = { ...travelToSave, status: 'Salva', type: travelToSave.type || 'Internacional' };
            setSavedUserTravels(prevSaved => [...prevSaved, travelWithStatus]);
        }
    };

    const isTravelSaved = (travelId) => {
        return savedUserTravels.some(saved => saved.id === travelId);
    };

    const handleSaveHotel = (hotelToSave) => {
        const isHotelAlreadySaved = savedUserHotels.some(saved => saved.id === hotelToSave.id);
        if (isHotelAlreadySaved) {
            setSavedUserHotels(prevSaved => prevSaved.filter(saved => saved.id !== hotelToSave.id));
        } else {
            setSavedUserHotels(prevSaved => [...prevSaved, hotelToSave]);
        }
    };

    const isHotelSaved = (hotelId) => {
        return savedUserHotels.some(saved => saved.id === hotelId);
    };

    const handleRemoveSavedHotel = (hotelId) => {
        setSavedUserHotels(prevSaved => prevSaved.filter(hotel => hotel.id !== hotelId));
        alert('Hotel removido da sua lista de desejos.');
    };

    const handleBackToList = () => {
        if (currentPage === 'mapHotelDetails') {
            setCurrentPage('home');
            setSelectedHotelIdFromMap(null);
        } else if (currentPage === 'promotionDetails' || currentPage === 'purchase') {
            setCurrentPage('home');
            setSelectedPromotionId(null);
            setPromotionToPurchase(null);
        } else if (currentPage === 'institutional') {
            setCurrentPage('home');
        } else if (currentPage === 'blogPostDetails' || currentPage === 'blogCategory') {
            setCurrentPage('home');
            setSelectedBlogPostId(null);
            setSelectedBlogCategory(null);
        } else if (currentPage === 'hotels') {
            setCurrentPage('home');
        } else if (currentPage === 'recommendedHotelDetails') {
            setCurrentPage('home');
            setSelectedRecommendedHotelId(null);
        }
        else {
            setCurrentPage('home');
            setActiveFilterButton('');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNavigateToHome = () => {
        setCurrentPage('home');
        setActiveFilterButton('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNavigateToMyTravels = () => {
        if (!isLoggedIn) {
            setCurrentPage('login');
        } else {
            setCurrentPage('myTravels');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLoginSuccess = (userData) => {
        setIsLoggedIn(true);
        setLoggedInUser(userData);
        setCurrentPage('myTravels');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setLoggedInUser({});
        setSavedUserHotels([]);
        setCurrentPage('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        alert('Você foi desconectado com sucesso!');
    };

    const handleSelectPromos = () => {
        setActiveFilterButton('promos');
        setCurrentPage('home');
        setTimeout(() => document.getElementById('viagens-promocao')?.scrollIntoView({ behavior: 'smooth' }), 0);
    };

    const handleSelectRecommended = () => {
        setActiveFilterButton('recommended');
        setCurrentPage('home');
        setTimeout(() => document.getElementById('recomendado-viajantes')?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    const handleNavigateToHotels = () => {
        setCurrentPage('hotels');
        setActiveFilterButton('hotels');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNavigateToInstitutional = () => {
        setCurrentPage('institutional');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBlogPostClick = (postId) => {
        setSelectedBlogPostId(postId);
        setCurrentPage('blogPostDetails');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRecommendedHotelDetailsClick = (hotelId) => {
        setSelectedRecommendedHotelId(hotelId);
        setCurrentPage('recommendedHotelDetails');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleOpenEventReservationForm = () => setShowEventReservationForm(true);
    const handleCloseEventReservationForm = () => setShowEventReservationForm(false);
    
    // ✅ NOVAS FUNÇÕES DE NAVEGAÇÃO PARA O FOOTER
    const handleNavigateToEvents = () => {
        setCurrentPage('events');
        setActiveFilterButton('events');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNavigateToBlog = () => {
        setCurrentPage('home');
        setTimeout(() => document.getElementById('dicas-de-viagem')?.scrollIntoView({ behavior: 'smooth' }), 0);
    };

    const currentMapHotel = allHotelsData.find(h => h.id === selectedHotelIdFromMap);
    const selectedPromotionData = allPromotionalTravels.find(promo => promo.id === selectedPromotionId);
    const currentRecommendedHotel = allHotelsData.find(h => h.id === selectedRecommendedHotelId);
    const filteredBlogPosts = selectedBlogCategory ? blogPosts.filter(post => post.category === selectedBlogCategory) : blogPosts;

    return (
        <div className="min-h-screen flex flex-col">
            <Header
                onNavigateToHome={handleNavigateToHome}
                onNavigateToHotels={handleNavigateToHotels}
                onNavigateToInstitutional={handleNavigateToInstitutional}
                onNavigateToMyTravels={handleNavigateToMyTravels}
                currentPage={currentPage}
            />
            <main className="flex-grow">
                <HeroSwiper />
                {currentPage !== 'login' && currentPage !== 'register' && currentPage !== 'myTravels' && currentPage !== 'institutional' && (
                    <section className="bg-white rounded-t-[50px] shadow-md -mt-5 md:-mt-10 relative z-10 py-4 px-6">
                        <div className="container mx-auto flex flex-wrap justify-center gap-4">
                            <a href="#viagens-promocao" onClick={handleSelectPromos} className={`btn-common-style ${activeFilterButton === 'promos' ? 'btn-active-style' : 'btn-hover-style'} flex items-center`}>Promoção</a>
                            <a href="#recomendado-viajantes" onClick={handleSelectRecommended} className={`btn-common-style ${activeFilterButton === 'recommended' ? 'btn-active-style' : 'btn-hover-style'} flex items-center`}>Recomendado por Viajantes</a>
                            <button onClick={handleNavigateToHotels} className={`reset-btn-style btn-common-style ${activeFilterButton === 'hotels' ? 'btn-active-style' : 'btn-hover-style'} flex items-center`}>Hotéis</button>
                            <button onClick={handleNavigateToEvents} className={`reset-btn-style btn-common-style ${activeFilterButton === 'events' ? 'btn-active-style' : 'btn-hover-style'} flex items-center`}>Eventos</button>
                        </div>
                    </section>
                )}
                {currentPage === 'home' && (
                    <section className="px-6 -mt-10 md:-mt-16 relative z-0">
                        <div className="container mx-auto max-w-full">
                            <HotelsSearchForm onSearch={handleHotelSearch} allHotelsData={allHotelsData} />
                        </div>
                    </section>
                )}
                
                {currentPage === 'login' ? <LoginPage onNavigateToRegister={() => setCurrentPage('register')} onLoginSuccess={handleLoginSuccess} />
                : currentPage === 'register' ? <RegisterPage onNavigateToLogin={() => setCurrentPage('login')} />
                : currentPage === 'myTravels' ? <MyTravelsPage user={loggedInUser} onBack={handleBackToList} onLogout={handleLogout} savedHotels={savedUserHotels} visitedHotels={userVisitedHotels} onRemoveSavedHotel={(id) => setSavedUserHotels(savedUserHotels.filter(h => h.id !== id))} />
                : currentPage === 'mapHotelDetails' && currentMapHotel ? <HotelDetailsPage hotel={currentMapHotel} onBack={handleBackToList} onReserveRoom={handleReserveRoom} />
                : currentPage === 'hotels' ? <HotelsPage hotels={filteredHotels} onSaveHotel={handleSaveHotel} isHotelSaved={isHotelSaved} onBackToList={handleBackToList} />
                : currentPage === 'events' ? <EventBlogSection onOpenReservationForm={handleOpenEventReservationForm} />
                : currentPage === 'promotionDetails' && selectedPromotionData ? <PromotionDetailsPage promotionData={selectedPromotionData} onBack={handleBackToList} onNavigateToPurchase={(data) => { setPromotionToPurchase(data); setCurrentPage('purchase'); }} />
                : currentPage === 'purchase' && promotionToPurchase ? <PurchasePage promotionData={promotionToPurchase} onBack={() => setCurrentPage('promotionDetails')} />
                : currentPage === 'institutional' ? <InstitutionalPage />
                : currentPage === 'blogPostDetails' && selectedBlogPostId ? <BlogPostDetailsPage postId={selectedBlogPostId} allBlogPosts={blogPosts} onBack={handleBackToList} onCategoryClick={(cat) => { setSelectedBlogCategory(cat); setCurrentPage('blogCategory'); }} />
                : currentPage === 'blogCategory' && selectedBlogCategory ? (
                    <div className="container mx-auto py-8 px-6">
                        <h1 className="text-3xl font-bold mb-6">Categoria: "{selectedBlogCategory}"</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredBlogPosts.map(post => <BlogPostCard key={post.id} post={post} onCardClick={handleBlogPostClick} />)}
                        </div>
                    </div>
                )
                : currentPage === 'recommendedHotelDetails' && currentRecommendedHotel ? <RecommendedHotelDetailsPage hotel={currentRecommendedHotel} onBack={handleBackToList} />
                : (
                    <>
                        <TravelSection id="viagens-promocao" title="Nossas Promoções" travels={allPromotionalTravels} onCardClick={handlePromotionClick} onSaveTravel={handleSaveTravel} isTravelSaved={isTravelSaved} CardComponent={TravelCard} />
                        <RecommendedHotelsSection id="recomendado-viajantes" hotels={allHotelsData} onHotelClick={handleRecommendedHotelDetailsClick} />
                        <BlogSection id="dicas-de-viagem" title="Dicas de Viagem: Prepare sua Aventura!" posts={blogPosts} onCardClick={handleBlogPostClick} />
                        <HotelsMapSection hotels={allHotelsData} onHotelSelect={handleHotelSelectFromMap} isLoaded={isLoaded} />
                        <NewsletterSection />
                    </>
                )}
            </main>
            {showEventReservationForm && <EventReservationForm onClose={handleCloseEventReservationForm} />}
            
            <Footer 
                isLoaded={isLoaded}
                onNavigateToHotels={handleNavigateToHotels}
                onSelectPromos={handleSelectPromos}
                onNavigateToEvents={handleNavigateToEvents}
                onNavigateToMyTravels={handleNavigateToMyTravels}
                onNavigateToInstitutional={handleNavigateToInstitutional}
                onNavigateToBlog={handleNavigateToBlog}
            />
        </div>
    );
}

export default App;