

// Importa as imagens necessárias, ajustando o caminho para sair da pasta 'data'
import ImageNatalRS from '../assets/images/natal1RS.png';
import ImageAnoNovoRJ from '../assets/images/anonovoRJ.png';
import ImageCarnavelPe from '../assets/images/carnavalPE.png';

// Exporta a constante com o nome 'allPromotionalTravels'
export const allPromotionalTravels = [
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
            { rating: 5, comment: 'Melhor Réveillon da vida! A vista dos fogos foi espetacular.', guestName: 'Paula G.' },
            { rating: 5, comment: 'Experiência única. Tudo muito bem organizado e seguro.', guestName: 'Ricardo F.' },
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
            { rating: 5, comment: 'Natal mais lindo que já tive! A decoração estava deslumbrante.', guestName: 'Aline V.' },
            { rating: 5, comment: 'O clima natalino no hotel é super acolhedor. Me senti em um filme.', guestName: 'Bruno F.' },
        ]
    },
];
