// src/data/blog-posts.js

// Importe as imagens para o blog (ajustando o caminho para sair da pasta 'data')
import BlogMala from '../assets/images/blog-images/mala.jpg';
import BlogEconomia from '../assets/images/blog-images/economia.jpg';
import BlogPet from '../assets/images/blog-images/pet.jpg';
import BlogViagem from '../assets/images/blog-images/viagem.jpg';

// Exporta a constante com o nome 'blogPosts'
export const blogPosts = [
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
