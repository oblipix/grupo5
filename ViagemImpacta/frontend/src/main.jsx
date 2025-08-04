/* eslint-disable react-refresh/only-export-components */
// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Provedores de Contexto Globais
import { AuthProvider } from './components/context/AuthContext.jsx';
import { ModalProvider } from './components/context/ModalContext.jsx';



// Estilos Globais
import './index.css';

// Componente de Layout Principal
import App from './App.jsx';

// Importação de todas as Páginas
import HomePage from './components/pages/HomePage.jsx'; 
import LoginPage from './components/pages/LoginPage.jsx';
import RegisterPage from './components/pages/RegisterPage.jsx';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './components/pages/ResetPasswordPage.jsx';
import InstitutionalPage from './components/pages/InstitutionalPage.jsx';
import HotelsPage from './components/pages/HotelsPage.jsx';
import HotelDetailsPage from './components/pages/HotelDetailsPage.jsx';
import PackagesPage from './components/pages/PackagesPage.jsx';
import PackageDetails from './components/pages/PackageDetails.jsx';
import PurchasePage from './components/pages/PurchasePage.jsx';
import PaymentPage from './components/pages/PaymentPage.jsx';
import MyTravelsPage from './components/pages/MyTravelsPage.jsx';
import MyHotelsPage from './components/pages/MyHotelsPage.jsx';
import ErrorPage from './components/pages/ErrorPage.jsx'; // Importando a página de erro 404
// IMPORT DE EVENTOS COMENTADO
// import EventBlogSection from './components/blog/EventBlogSection.jsx'; // Sua página de Eventos
import BlogPostDetailsPage from './components/pages/BlogPostDetailsPage.jsx'; // Detalhes de post de blog
import RecommendedHotelDetailsPage from './components/pages/RecommendedHotelDetailsPage.jsx';
import RecommendedPage from './components/pages/RecommendedPage.jsx'; // Nova página de recomendados
import PromotionsPage from './components/pages/PromotionsPage.jsx'; // Nova página de promoções com ofertas especiais
import PromotionDetailsPage from './components/pages/PromotionDetailsPage.jsx'; // Detalhes de promoção
import ContactPage from './components/pages/ContactPage.jsx';
import PaymentSuccessPage from './components/pages/PaymentSuccessPage.jsx';
import ConfirmReservation from './components/pages/ConfirmReservation.jsx'; // Página de confirmação de reserva
// Removida a importação de BlogPage, pois BlogSection estará na HomePage.
// import BlogPage from './components/pages/BlogPage.jsx'; 


// Componente que agrupa os provedores e o layout principal
const AppLayout = () => (
    <ModalProvider>
        <App />
    </ModalProvider>
);

// Configuração de todas as rotas da aplicação
const router = createBrowserRouter([
    {
        element: (
            <AuthProvider>
                <AppLayout />
            </AuthProvider>
        ),
        children: [
            { path: '/', element: <HomePage /> }, 
            { path: '/login', element: <LoginPage /> },
            { path: '/register', element: <RegisterPage /> },
            { path: '/forgot-password', element: <ForgotPasswordPage /> },
            { path: '/reset-password/:token', element: <ResetPasswordPage /> },
            { path: '/institucional', element: <InstitutionalPage /> },
            { path: '/recomendados', element: <RecommendedPage /> }, // Nova rota para página de recomendados
            { path: '/hoteis', element: <HotelsPage /> },
            { path: '/hoteis/:hotelId', element: <HotelDetailsPage /> },
            { path: '/promocoes', element: <PromotionsPage /> }, // Nova rota para promoções
            { path: '/promocao/:id', element: <PromotionDetailsPage /> }, // Detalhes de promoção
            { path: '/packages', element: <PackagesPage /> },
            { path: '/packages/:packageId', element: <PackageDetails /> },
            { path: '/purchase/:packageId', element: <PurchasePage /> },
            { path: '/payment', element: <PaymentPage /> },
            { path: '/minhas-viagens', element: <MyTravelsPage /> },
            { path: '/meus-hoteis', element: <MyHotelsPage /> },
            // ROTA DE EVENTOS COMENTADA
            // { path: '/evento', element: <EventBlogSection /> }, // Rota para Eventos
            { path: '/blog/:id', element: <BlogPostDetailsPage /> }, // Rota para Detalhes de um Post de Blog
            { path: '/recommended-hotel/:hotelId', element: <RecommendedHotelDetailsPage /> },
            { path: '/contato', element: <ContactPage /> },
            { path: '/payment-success', element: <PaymentSuccessPage /> }, // Rota para página de pagamento com sucesso
            // Removida a rota '/blog' que renderizava BlogPage/BlogSection, pois BlogSection já está na HomePage.
            // { path: '/blog', element: <BlogPage /> }, 
            { path: '/confirm-reservation', element: <ConfirmReservation /> }, // Rota para confirmação de reserva
            // Rota de fallback para lidar com 404 - Deve ser a última rota
            { path: '*', element: <ErrorPage /> }
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);