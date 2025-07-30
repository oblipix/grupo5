
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isLoggedIn, currentUser } = useAuth();
  const [countdown, setCountdown] = useState(30); // Aumentado para 30 segundos
  const [confetti, setConfetti] = useState([]);
  const confettiContainerRef = useRef(null);

  // Verificar autenticação, mas permitir que a página seja carregada mesmo sem autenticação
  useEffect(() => {
    // Se tiver um session_id do Stripe, mostramos a página mesmo sem login
    // Isso permite que o usuário veja a mensagem de sucesso mesmo se perder a sessão
    const hasStripeSession = !!searchParams.get('session_id');
    
    if (!isLoggedIn && !hasStripeSession) {
      navigate('/login');
      return;
    }
  }, [isLoggedIn, navigate, searchParams]);

  // Removido o redirecionamento automático para a página de profile
  // Mantendo o contador apenas como efeito visual
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const sessionId = searchParams.get('session_id');

  // Função para criar confetes
  const createConfetti = () => {
    const colors = ['#3b82f6', '#fcd34d', '#34d399', '#f87171', '#a78bfa', '#60a5fa'];
    const confettiCount = 150;
    const confettiItems = [];

    for (let i = 0; i < confettiCount; i++) {
      confettiItems.push({
        id: i,
        x: Math.random() * 100,
        y: -20 - Math.random() * 80,
        size: 5 + Math.random() * 7,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        speed: 1 + Math.random() * 3
      });
    }

    setConfetti(confettiItems);
  };

  // Iniciar a animação de confetes quando o componente for montado
  useEffect(() => {
    createConfetti();
    
    // Atualização da animação dos confetes
    const animationInterval = setInterval(() => {
      setConfetti(prev => {
        if (prev.length === 0) return [];
        
        return prev.map(confetti => {
          // Mover confete para baixo
          const newY = confetti.y + confetti.speed;
          const newRotation = confetti.rotation + 2;
          
          // Se o confete sair da tela, reposicioná-lo no topo
          if (newY > 120) {
            return {
              ...confetti,
              y: -20,
              x: Math.random() * 100,
              rotation: Math.random() * 360
            };
          }
          
          // Caso contrário, apenas atualizar sua posição
          return {
            ...confetti,
            y: newY,
            rotation: newRotation
          };
        });
      });
    }, 50);
    
    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 overflow-hidden relative">
      {/* Container para os confetes */}
      <div ref={confettiContainerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {confetti.map(item => (
          <div
            key={item.id}
            className="absolute"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              width: `${item.size}px`,
              height: `${item.size * 1.5}px`,
              backgroundColor: item.color,
              transform: `rotate(${item.rotation}deg)`,
              opacity: 0.8,
            }}
          />
        ))}
      </div>
      
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl p-8 text-center z-10 backdrop-blur-sm bg-white/90">
        {/* Mascote do Tripz (versão super feliz celebrando) */}
        <div className="mb-8 relative">
          {/* Raios de celebração ao redor do mascote */}
          <div className="absolute inset-0 z-0">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M50 0 L52 12 L48 12 Z" fill="#fcd34d" className="animate-ping" style={{ animationDuration: '3s' }} />
              <path d="M100 50 L88 52 L88 48 Z" fill="#f87171" className="animate-ping" style={{ animationDuration: '2.5s' }} />
              <path d="M50 100 L52 88 L48 88 Z" fill="#60a5fa" className="animate-ping" style={{ animationDuration: '2.7s' }} />
              <path d="M0 50 L12 52 L12 48 Z" fill="#34d399" className="animate-ping" style={{ animationDuration: '3.2s' }} />
              <path d="M85 15 L75 20 L80 25 Z" fill="#a78bfa" className="animate-ping" style={{ animationDuration: '4s' }} />
              <path d="M15 85 L20 75 L25 80 Z" fill="#f87171" className="animate-ping" style={{ animationDuration: '3.5s' }} />
              <path d="M85 85 L80 75 L75 80 Z" fill="#fcd34d" className="animate-ping" style={{ animationDuration: '2.8s' }} />
              <path d="M15 15 L25 20 L20 25 Z" fill="#60a5fa" className="animate-ping" style={{ animationDuration: '3.7s' }} />
            </svg>
          </div>
          
          <div className="w-48 h-48 mx-auto flex items-center justify-center relative z-10 animate-bounce-very-slow">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Corpo do mascote (mala de viagem) */}
              <rect x="20" y="35" width="60" height="50" rx="5" ry="5" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
              
              {/* Detalhes da mala */}
              <rect x="30" y="45" width="40" height="30" rx="2" ry="2" fill="#60a5fa" stroke="#1e40af" strokeWidth="1" />
              
              {/* Braços celebrando (novos) */}
              <path d="M20 45 Q10 35 5 45" fill="none" stroke="#1e40af" strokeWidth="2" strokeLinecap="round" />
              <path d="M80 45 Q90 35 95 45" fill="none" stroke="#1e40af" strokeWidth="2" strokeLinecap="round" />
              
              {/* Bandeirinhas nas mãos (novas) */}
              <polygon points="5,45 5,35 15,40 5,45" fill="#f87171" stroke="#1e40af" strokeWidth="0.5" />
              <polygon points="95,45 95,35 85,40 95,45" fill="#34d399" stroke="#1e40af" strokeWidth="0.5" />
              
              {/* Alça da mala */}
              <path d="M40 35 Q50 15 60 35" fill="none" stroke="#1e40af" strokeWidth="3" />
              
              {/* Rosto animado - olhos super felizes */}
              <circle cx="40" cy="60" r="5" fill="white" /> {/* Olho esquerdo */}
              <circle cx="60" cy="60" r="5" fill="white" /> {/* Olho direito */}
              <path d="M38 60 Q40 56 42 60" fill="#1e40af" /> {/* Pupila esquerda (agora são arcos) */}
              <path d="M58 60 Q60 56 62 60" fill="#1e40af" /> {/* Pupila direita (agora são arcos) */}
              
              {/* Sobrancelhas super felizes */}
              <path d="M33 53 Q40 46 47 53" fill="none" stroke="#1e40af" strokeWidth="2" />
              <path d="M53 53 Q60 46 67 53" fill="none" stroke="#1e40af" strokeWidth="2" />
              
              {/* Bochechas mais coradas */}
              <circle cx="33" cy="67" r="4" fill="#f87171" opacity="0.7" />
              <circle cx="67" cy="67" r="4" fill="#f87171" opacity="0.7" />
              
              {/* Boca super sorridente com dentes */}
              <path d="M35 70 Q50 85 65 70" fill="white" stroke="#1e40af" strokeWidth="1" />
              <path d="M42 70 L42 76" stroke="#1e40af" strokeWidth="0.5" />
              <path d="M50 70 L50 78" stroke="#1e40af" strokeWidth="0.5" />
              <path d="M58 70 L58 76" stroke="#1e40af" strokeWidth="0.5" />
              
              {/* Chapéu de festa */}
              <polygon points="50,20 35,35 65,35" fill="#a78bfa" stroke="#1e40af" strokeWidth="1" />
              <circle cx="50" cy="15" r="5" fill="#f87171" />
              <path d="M40 35 L50 20" stroke="#fcd34d" strokeWidth="1" strokeDasharray="2,1" />
              <path d="M60 35 L50 20" stroke="#fcd34d" strokeWidth="1" strokeDasharray="2,1" />
              
              {/* Adesivos de viagem na mala - coloridos e mais vibrantes */}
              <path d="M25 45 L27 48 L31 48 L28 51 L29 55 L25 53 L21 55 L22 51 L19 48 L23 48 Z" fill="#fcd34d" />
              <path d="M75 50 L77 53 L81 53 L78 56 L79 60 L75 58 L71 60 L72 56 L69 53 L73 53 Z" fill="#a78bfa" />
              <path d="M30 80 L32 83 L36 83 L33 86 L34 90 L30 88 L26 90 L27 86 L24 83 L28 83 Z" fill="#34d399" />
              
              {/* Nota musical flutuando (nova) */}
              <path d="M75 30 L77 20 L82 22 L80 32 Z" fill="#1e40af" />
              <circle cx="77" cy="32" r="3" fill="#1e40af" />
              
              {/* Balãozinho de celebração (novo) */}
              <path d="M20 25 Q17 15 25 15 Q30 15 27 25 Z" fill="#f87171" stroke="#1e40af" strokeWidth="0.5" />
              <line x1="22" y1="25" x2="20" y2="32" stroke="#1e40af" strokeWidth="0.5" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-extrabold text-blue-800 mb-4 animate-bounce-slow">
          Uhuuul! Tudo Pronto Para Sua Viagem!
        </h1>
        
        <p className="text-xl text-gray-700 mb-6">
          Olá, <span className="font-bold text-blue-600">{currentUser?.FirstName || currentUser?.firstName || 'Viajante Especial'}</span>! 
          Sua reserva foi confirmada com sucesso e mal podemos esperar para fazer parte da sua próxima aventura! 
          Agora é só fazer as malas, relaxar e contar os dias para viver momentos incríveis.
        </p>
        
        <p className="text-lg text-blue-600 italic mb-6">
          "Cada viagem é uma nova história para contar, e estamos honrados em fazer parte deste capítulo especial da sua vida."
        </p>
        
        <div className="mb-8 p-6 bg-blue-50 rounded-2xl border border-blue-200">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-lg text-blue-800 font-medium">
              Acabamos de enviar um presente para sua caixa de entrada!
            </p>
          </div>
          <p className="text-gray-700 mb-3">
            Enviamos todos os detalhes da sua reserva para:
          </p>
          <p className="text-blue-600 font-bold text-lg mt-2 mb-3">
            {currentUser?.Email || currentUser?.email || 'Seu e-mail cadastrado'}
          </p>
          <p className="text-sm text-gray-600">
            Fique tranquilo, nossa equipe já está preparando tudo para sua chegada. Se precisar de qualquer coisa, estamos à disposição!
          </p>
          
          {sessionId && (
            <div className="mt-4 p-3 bg-white/70 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Código de confirmação:</p>
              <p className="text-sm font-mono text-gray-700 break-all">{sessionId}</p>
              <p className="text-xs text-gray-500 mt-2">Guarde este código para referência futura, mas não se preocupe - já está tudo registrado no seu perfil!</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="group bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-6 rounded-xl hover:shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 font-medium text-lg relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Voltar para Página Inicial
            </span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          </button>
          
          <button
            onClick={() => navigate('/minhas-viagens')}
            className="group bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-6 rounded-xl hover:shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 font-medium text-lg relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              Ver Minhas Reservas
            </span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          </button>
          
          <button
            onClick={() => navigate('/hoteis')}
            className="group bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 py-4 px-6 rounded-xl border border-blue-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 font-medium text-lg"
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              Explorar Novos Destinos
            </span>
          </button>
        </div>

        {/* Contador sem redirecionamento automático */}
        <div className="mt-6 px-6 py-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-blue-800 font-medium mb-2">Aproveite e explore mais sobre sua viagem!</p>
          <div className="flex items-center justify-center mb-2">
            <div className="h-2 w-full bg-white rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${(30-countdown)*100/30}%` }}
              />
            </div>
          </div>
          <p className="text-sm text-blue-600">
            Você tem {countdown} segundos para conferir todas as informações acima.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
