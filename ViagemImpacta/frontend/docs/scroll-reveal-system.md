# 🎭 Sistema de Animações de Scroll (Scroll Reveal)

## 📱 Funcionalidade Implementada

Foi criado um sistema completo de **animações de scroll reveal** que faz elementos aparecerem gradualmente conforme o usuário scrolla pela página, evitando carregamento visual excessivo e criando uma experiência mais fluida.

## 🎯 **Características Principais**

- ✨ **Lazy Animation**: Elementos só animam quando entram na viewport
- 📱 **Mobile Optimized**: Animações adaptadas para dispositivos móveis
- ⚡ **Performance Smart**: Detecta automaticamente a performance do dispositivo
- 🎛️ **Acessibilidade**: Respeita `prefers-reduced-motion`
- 🔄 **Intersection Observer**: Usa API nativa para máxima performance
- 📊 **Staggered Animations**: Cards aparecem em sequência
- 🎨 **Multiple Effects**: Vários tipos de animação

## 📁 **Arquivos Criados**

### 1. Hooks
```
src/hooks/useIntersectionObserver.js    - Hook base para detecção de viewport
src/hooks/useScrollAnimations.js        - Hook para controle global de animações
```

### 2. Componentes Base
```
src/components/common/ScrollReveal.jsx   - Componente principal de reveal
src/components/common/AnimatedSection.jsx - Seções com animação
src/components/common/AnimatedHotelCard.jsx - Cards de hotel animados
```

### 3. Exemplos e Templates
```
src/components/common/PageAnimations.jsx - Exemplos prontos para usar
```

## 🎬 **Tipos de Animação Disponíveis**

### Básicas
- **`fadeUp`** - Surge de baixo com fade
- **`fadeIn`** - Aparece no lugar com scale
- **`slideLeft`** - Desliza da direita
- **`slideRight`** - Desliza da esquerda
- **`zoomIn`** - Cresce do centro
- **`flip`** - Rotaciona enquanto aparece

### Especiais
- **`cardPop`** - Para cards com efeito 3D
- **`titleSlide`** - Para títulos com blur
- **`hero`** - Para seções de destaque
- **`image`** - Para imagens com zoom

## 🚀 **Como Usar**

### 1. Animação Simples
```jsx
import ScrollReveal from './components/common/ScrollReveal';

<ScrollReveal animation="fadeUp" delay={200}>
  <div className="meu-card">
    Conteúdo que aparece ao scroll
  </div>
</ScrollReveal>
```

### 2. Cards em Sequência
```jsx
import { ScrollRevealCards } from './components/common/ScrollReveal';

<ScrollRevealCards staggerDelay={150}>
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</ScrollRevealCards>
```

### 3. Seção Completa
```jsx
import { AnimatedContentSection } from './components/common/PageAnimations';

<AnimatedContentSection 
  title="Nossos Hotéis"
  description="Descubra os melhores destinos"
>
  {hotelCards}
</AnimatedContentSection>
```

### 4. Grid de Hotéis
```jsx
import { AnimatedHotelGrid } from './components/common/AnimatedHotelCard';

<AnimatedHotelGrid staggerDelay={100}>
  {hotelCards.map(hotel => (
    <HotelCard key={hotel.id} hotel={hotel} />
  ))}
</AnimatedHotelGrid>
```

### 5. Elementos Específicos
```jsx
import { AnimatedTitle, AnimatedTextBlock, AnimatedImage } from './components/common/AnimatedSection';

<AnimatedTitle level="h2">Título Animado</AnimatedTitle>
<AnimatedTextBlock>Texto que aparece suavemente</AnimatedTextBlock>
<AnimatedImage src="/imagem.jpg" alt="Imagem com zoom" />
```

## ⚙️ **Configuração Avançada**

### Hook de Controle Global
```jsx
import { useScrollAnimations } from './hooks/useScrollAnimations';

function App() {
  const { isEnabled, performance, config, toggleAnimations } = useScrollAnimations();
  
  // Configurações automáticas baseadas na performance do dispositivo
  console.log(config); // { duration: 700, delay: 150, stagger: 200, easing: '...' }
  
  return (
    <div className={`app ${!isEnabled ? 'reduced-animations' : ''}`}>
      {/* Seu conteúdo */}
    </div>
  );
}
```

### Customização de Threshold
```jsx
<ScrollReveal 
  animation="fadeUp"
  threshold={0.3}    // 30% do elemento visível para triggerar
  delay={300}        // Delay em ms
  duration={800}     // Duração em ms
>
  Conteúdo
</ScrollReveal>
```

## 📱 **Otimizações para Mobile**

O sistema detecta automaticamente:
- **Dispositivos de baixa performance**: Animações simplificadas
- **Conexões lentas**: Reduz complexidade
- **Preferência do usuário**: Respeita `prefers-reduced-motion`
- **Memória limitada**: Ajusta configurações

## 🎛️ **Modos de Performance**

### Automático (Padrão)
- Detecta hardware e conexão
- Ajusta animações automaticamente

### Manual
```jsx
const { setPerformanceMode } = useScrollAnimations();

// Forçar modo específico
setPerformanceMode('low');    // Animações mínimas
setPerformanceMode('medium'); // Animações balanceadas  
setPerformanceMode('high');   // Animações completas
```

## 🎨 **Classes CSS Disponíveis**

```css
/* Estados */
.scroll-reveal                 /* Estado inicial (invisível) */
.scroll-reveal-visible         /* Estado final (visível) */

/* Animações */
.scroll-reveal-fadeUp          /* Surge de baixo */
.scroll-reveal-slideLeft       /* Desliza da direita */
.scroll-reveal-zoomIn          /* Cresce do centro */
.scroll-reveal-cardPop         /* Efeito 3D para cards */

/* Performance */
.scroll-reveal-performance-low    /* Animações simples */
.scroll-reveal-performance-high   /* Animações completas */
.reduced-animations               /* Sem animações */
```

## 🔧 **Customização**

### Criar Nova Animação
```css
/* No CSS */
.scroll-reveal-minhaNova {
  transform: rotateX(90deg) scale(0.5);
  filter: blur(5px);
}

.scroll-reveal-minhaNova.scroll-reveal-visible {
  transform: rotateX(0deg) scale(1);
  filter: blur(0);
}
```

```jsx
// No componente
<ScrollReveal animation="minhaNova">
  Conteúdo com animação customizada
</ScrollReveal>
```

## 🎉 **Pronto para Usar!**

Agora você pode:

1. **Envolver qualquer componente** com `<ScrollReveal>`
2. **Usar templates prontos** para seções comuns
3. **Cards aparecem em sequência** automaticamente
4. **Performance otimizada** para todos os dispositivos
5. **Acessibilidade garantida** para todos os usuários

### Exemplo Rápido
```jsx
// Antes (sem animação)
<div className="hotel-card">Hotel Card</div>

// Depois (com animação)
<ScrollReveal animation="cardPop">
  <div className="hotel-card">Hotel Card</div>
</ScrollReveal>
```

O sistema funciona automaticamente em qualquer página do seu projeto! 🚀✨

## 🌟 **Páginas Implementadas**

O sistema de scroll reveal foi implementado em todas as páginas principais do projeto:

### 1. **HomePage** (`/`)
- Seções principais animadas com `fadeUp`
- Cards de hotéis com `cardPop` staggered
- Grid de recomendações com sequência de aparição

### 2. **HotelsPage** (`/hoteis`)
- Grid de hotéis com animação escalonada
- Cards individuais com efeito `cardPop`
- Seções de filtros com `slideLeft`

### 3. **MyTravelsPage** (`/minhas-viagens`)
- Cards de viagens com animação sequencial
- Histórico de reservas com `fadeUp`
- Seções de informações com `slideRight`

### 4. **InstitutionalPage** (`/institucional`)
- Seções de conteúdo com `fadeUp`
- Imagens da empresa com `zoomIn`
- Texto institucional com `slideLeft`

### 5. **ContactPage** (`/contato`)
- Formulário de contato com `fadeIn`
- Informações de contato com `slideRight`
- Mapa/endereço com `zoomIn`

### 6. **PromotionsPage** (`/promocoes`)
- Grid de promoções com animação escalonada
- Cards de ofertas com `cardPop` staggered
- Seções de filtros e categorias

### 7. **PromotionDetailsPage** (`/promocoes/:id`)
- Detalhes da promoção com `hero`
- Galeria de imagens com `image`
- Informações adicionais com `fadeUp`

**Todas as páginas** agora oferecem uma experiência visual fluida e responsiva! 📱✨
