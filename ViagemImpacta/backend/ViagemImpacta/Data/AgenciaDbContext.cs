using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Models;
using ViagemImpacta.Models.Enums;

namespace ViagemImpacta.Data
{
    public class AgenciaDbContext : DbContext
    {
        public AgenciaDbContext(DbContextOptions<AgenciaDbContext> options) : base(options) { }

        public DbSet<Hotel> Hotels { get; set; } = null!;
        public DbSet<Room> Rooms { get; set; } = null!;
        public DbSet<Review> Reviews { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Reservation> Reservations { get; set; } = null!;
        public DbSet<Payment> Payments { get; set; } = null!;
        public DbSet<Travellers> Travellers { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {


            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Hotel>().HasData(
                new Hotel
                {
                    HotelId = 1,
                    Name = "Hotel Copacabana Palace",
                    City = "Rio de Janeiro",
                    Stars = 5,
                    HotelAddress = "Av. Atlântica, 1702",
                    Phone = "(21) 2548-7070",
                    Wifi = true,
                    Parking = true,
                    Pool = true,
                    Gym = true,
                    Restaurant = true,
                    Bar = true,
                    RoomService = true,
                    Accessibility = true,
                    WarmPool = false,
                    Theater = false,
                    Garden = true,
                    PetFriendly = true,
                    BreakfastIncludes = true,
                    Description = "Luxuoso hotel localizado na praia de Copacabana, com suítes de alto padrão, spa e várias opções de lazer."
                },
                new Hotel
                {
                    HotelId = 2,
                    Name = "Hotel Serra Gaúcha",
                    City = "Gramado",
                    Stars = 4,
                    HotelAddress = "Rua das Hortênsias, 1000",
                    Phone = "(54) 3286-1234",
                    Wifi = true,
                    Parking = true,
                    Pool = true,
                    Gym = false,
                    Restaurant = true,
                    Bar = false,
                    RoomService = true,
                    Accessibility = true,
                    WarmPool = true,
                    Theater = false,
                    Garden = true,
                    PetFriendly = false,
                    BreakfastIncludes = true,
                    Description = "Hotel aconchegante em Gramado, ideal para famílias, com quartos confortáveis e vista para as montanhas."
                },
                new Hotel
                {
                    HotelId = 3,
                    Name = "Resort Costa do Sauípe",
                    City = "Salvador",
                    Stars = 5,
                    HotelAddress = "Costa do Sauípe, s/n",
                    Phone = "(71) 3645-8000",
                    Wifi = true,
                    Parking = true,
                    Pool = true,
                    Gym = true,
                    Restaurant = true,
                    Bar = true,
                    RoomService = true,
                    Accessibility = true,
                    WarmPool = true,
                    Theater = true,
                    Garden = true,
                    PetFriendly = false,
                    BreakfastIncludes = true,
                    Description = "Resort all-inclusive na costa da Bahia com múltiplas opções de lazer, esportes aquáticos e entretenimento."
                },
                new Hotel
                {
                    HotelId = 4,
                    Name = "Pousada Vila Chico",
                    City = "Jericoacoara",
                    Stars = 3,
                    HotelAddress = "Rua do Forró, 150",
                    Phone = "(88) 3669-2288",
                    Wifi = true,
                    Parking = false,
                    Pool = false,
                    Gym = false,
                    Restaurant = false,
                    Bar = true,
                    RoomService = false,
                    Accessibility = false,
                    WarmPool = false,
                    Theater = false,
                    Garden = false,
                    PetFriendly = true,
                    BreakfastIncludes = true,
                    Description = "Pousada rústica e charmosa em Jericoacoara, próxima à praia e às dunas, ambiente descontraído."
                },
                new Hotel
                {
                    HotelId = 5,
                    Name = "Hotel Fasano São Paulo",
                    City = "São Paulo",
                    Stars = 5,
                    HotelAddress = "Rua Vittorio Fasano, 88",
                    Phone = "(11) 3896-4000",
                    Wifi = true,
                    Parking = true,
                    Pool = true,
                    Gym = true,
                    Restaurant = true,
                    Bar = true,
                    RoomService = true,
                    Accessibility = true,
                    WarmPool = false,
                    Theater = false,
                    Garden = false,
                    PetFriendly = false,
                    BreakfastIncludes = false,
                    Description = "Hotel boutique no coração de São Paulo, design sofisticado e localização privilegiada nos Jardins."
                },
                new Hotel
                {
                    HotelId = 6,
                    Name = "Pousada Maravilha",
                    City = "Fernando de Noronha",
                    Stars = 4,
                    HotelAddress = "Vila do Trinta, s/n",
                    Phone = "(81) 3619-0028",
                    Wifi = true,
                    Parking = false,
                    Pool = true,
                    Gym = false,
                    Restaurant = true,
                    Bar = true,
                    RoomService = true,
                    Accessibility = false,
                    WarmPool = false,
                    Theater = false,
                    Garden = true,
                    PetFriendly = false,
                    BreakfastIncludes = true,
                    Description = "Pousada exclusiva em Fernando de Noronha com vista deslumbrante para o mar e acesso às melhores praias."
                },
                new Hotel
                {
                    HotelId = 7,
                    Name = "Hotel Belmond das Cataratas",
                    City = "Foz do Iguaçu",
                    Stars = 5,
                    HotelAddress = "Parque Nacional do Iguaçu, s/n",
                    Phone = "(45) 2102-7000",
                    Wifi = true,
                    Parking = true,
                    Pool = true,
                    Gym = true,
                    Restaurant = true,
                    Bar = true,
                    RoomService = true,
                    Accessibility = true,
                    WarmPool = true,
                    Theater = false,
                    Garden = true,
                    PetFriendly = false,
                    BreakfastIncludes = true,
                    Description = "Hotel de luxo localizado dentro do Parque Nacional do Iguaçu, com vista privilegiada para as Cataratas."
                },
                new Hotel
                {
                    HotelId = 8,
                    Name = "Pousada Toca da Coruja",
                    City = "Pipa",
                    Stars = 4,
                    HotelAddress = "Rua da Praia, 1000",
                    Phone = "(84) 3246-2226",
                    Wifi = true,
                    Parking = true,
                    Pool = true,
                    Gym = false,
                    Restaurant = true,
                    Bar = true,
                    RoomService = false,
                    Accessibility = false,
                    WarmPool = false,
                    Theater = false,
                    Garden = true,
                    PetFriendly = true,
                    BreakfastIncludes = true,
                    Description = "Pousada charmosa na Praia da Pipa, ambiente rústico e aconchegante com vista para o mar."
                },
                new Hotel
                {
                    HotelId = 9,
                    Name = "Hotel Transamérica Comandatuba",
                    City = "Una",
                    Stars = 5,
                    HotelAddress = "Ilha de Comandatuba, s/n",
                    Phone = "(73) 3686-8000",
                    Wifi = true,
                    Parking = true,
                    Pool = true,
                    Gym = true,
                    Restaurant = true,
                    Bar = true,
                    RoomService = true,
                    Accessibility = true,
                    WarmPool = true,
                    Theater = true,
                    Garden = true,
                    PetFriendly = false,
                    BreakfastIncludes = true,
                    Description = "Resort all-inclusive em ilha privativa na Bahia, com múltiplas opções de lazer e esportes."
                },
                new Hotel
                {
                    HotelId = 10,
                    Name = "Pousada Quintal da Montanha",
                    City = "Monte Verde",
                    Stars = 3,
                    HotelAddress = "Estrada Monte Verde, km 5",
                    Phone = "(35) 3438-1234",
                    Wifi = true,
                    Parking = true,
                    Pool = false,
                    Gym = false,
                    Restaurant = true,
                    Bar = false,
                    RoomService = false,
                    Accessibility = false,
                    WarmPool = false,
                    Theater = false,
                    Garden = true,
                    PetFriendly = true,
                    BreakfastIncludes = true,
                    Description = "Pousada rural em Monte Verde, ambiente familiar com vista para as montanhas e trilhas ecológicas."
                },
                new Hotel
                {
                    HotelId = 11,
                    Name = "Hotel Unique",
                    City = "São Paulo",
                    Stars = 5,
                    HotelAddress = "Av. Brigadeiro Luís Antônio, 4700",
                    Phone = "(11) 3055-4700",
                    Wifi = true,
                    Parking = true,
                    Pool = true,
                    Gym = true,
                    Restaurant = true,
                    Bar = true,
                    RoomService = true,
                    Accessibility = true,
                    WarmPool = false,
                    Theater = false,
                    Garden = false,
                    PetFriendly = false,
                    BreakfastIncludes = false,
                    Description = "Hotel design icônico em São Paulo, arquitetura futurista com vista panorâmica da cidade."
                },
                new Hotel
                {
                    HotelId = 12,
                    Name = "Pousada Picinguaba",
                    City = "Ubatuba",
                    Stars = 4,
                    HotelAddress = "Vila de Picinguaba, s/n",
                    Phone = "(12) 3836-9105",
                    Wifi = true,
                    Parking = true,
                    Pool = true,
                    Gym = false,
                    Restaurant = true,
                    Bar = true,
                    RoomService = false,
                    Accessibility = false,
                    WarmPool = false,
                    Theater = false,
                    Garden = true,
                    PetFriendly = false,
                    BreakfastIncludes = true,
                    Description = "Pousada ecológica em Ubatuba, localizada na Vila de Picinguaba com acesso a praias preservadas."
                },
                new Hotel
                {
                    HotelId = 13,
                    Name = "Hotel Villa Bahia",
                    City = "Salvador",
                    Stars = 4,
                    HotelAddress = "Largo do Cruzeiro de São Francisco, 16",
                    Phone = "(71) 3322-4271",
                    Wifi = true,
                    Parking = false,
                    Pool = false,
                    Gym = false,
                    Restaurant = true,
                    Bar = true,
                    RoomService = true,
                    Accessibility = false,
                    WarmPool = false,
                    Theater = false,
                    Garden = false,
                    PetFriendly = false,
                    BreakfastIncludes = true,
                    Description = "Hotel boutique no Pelourinho, arquitetura colonial preservada no coração histórico de Salvador."
                }
            );
            modelBuilder.Entity<Room>().HasData(
                // Hotel Copacabana Palace (5 estrelas) - Rio de Janeiro
                new Room
                {
                    RoomId = 1,
                    HotelId = 1,
                    TypeName = Models.Enums.RoomType.Suite,
                    TotalRooms = 8,
                    Capacity = 2,
                    AverageDailyPrice = 1500.00m,
                    Description = "Suíte presidencial com vista panorâmica para Copacabana, cama king size, sala de estar, varanda privativa."
                },
                new Room
                {
                    RoomId = 2,
                    HotelId = 1,
                    TypeName = Models.Enums.RoomType.Luxo,
                    TotalRooms = 15,
                    Capacity = 2,
                    AverageDailyPrice = 900.00m,
                    Description = "Quarto luxo com vista para o mar, cama queen size, ar-condicionado, minibar premium."
                },
                new Room
                {
                    RoomId = 3,
                    HotelId = 1,
                    TypeName = Models.Enums.RoomType.Standard,
                    TotalRooms = 25,
                    Capacity = 2,
                    AverageDailyPrice = 650.00m,
                    Description = "Quarto standard confortável com ar-condicionado, TV LED, WiFi gratuito."
                },
                new Room
                {
                    RoomId = 4,
                    HotelId = 1,
                    TypeName = Models.Enums.RoomType.Suite,
                    TotalRooms = 5,
                    Capacity = 4,
                    AverageDailyPrice = 2200.00m,
                    Description = "Suíte familiar com duas camas de casal, sala de estar ampla, cozinha compacta."
                },

                // Hotel Serra Gaúcha (4 estrelas) - Gramado
                new Room
                {
                    RoomId = 5,
                    HotelId = 2,
                    TypeName = Models.Enums.RoomType.Suite,
                    TotalRooms = 6,
                    Capacity = 2,
                    AverageDailyPrice = 1200.00m,
                    Description = "Suíte romântica com lareira, hidromassagem, vista para as montanhas."
                },
                new Room
                {
                    RoomId = 6,
                    HotelId = 2,
                    TypeName = Models.Enums.RoomType.Luxo,
                    TotalRooms = 12,
                    Capacity = 3,
                    AverageDailyPrice = 800.00m,
                    Description = "Quarto luxo familiar com cama de casal + cama auxiliar, varanda com vista jardim."
                },
                new Room
                {
                    RoomId = 7,
                    HotelId = 2,
                    TypeName = Models.Enums.RoomType.Standard,
                    TotalRooms = 20,
                    Capacity = 2,
                    AverageDailyPrice = 550.00m,
                    Description = "Quarto standard aconchegante com decoração regional gaúcha."
                },
                new Room
                {
                    RoomId = 8,
                    HotelId = 2,
                    TypeName = Models.Enums.RoomType.Luxo,
                    TotalRooms = 8,
                    Capacity = 4,
                    AverageDailyPrice = 1100.00m,
                    Description = "Quarto familiar luxo com duas camas de casal, área de estar, frigobar."
                },

                // Resort Costa do Sauípe (5 estrelas) - Salvador
                new Room
                {
                    RoomId = 9,
                    HotelId = 3,
                    TypeName = Models.Enums.RoomType.Suite,
                    TotalRooms = 10,
                    Capacity = 2,
                    AverageDailyPrice = 1800.00m,
                    Description = "Suíte master com acesso direto à praia privativa, deck exclusivo, serviço de mordomo."
                },
                new Room
                {
                    RoomId = 10,
                    HotelId = 3,
                    TypeName = Models.Enums.RoomType.Suite,
                    TotalRooms = 6,
                    Capacity = 4,
                    AverageDailyPrice = 2800.00m,
                    Description = "Villa familiar com piscina privativa, duas suítes, cozinha gourmet, jardim privativo."
                },
                new Room
                {
                    RoomId = 11,
                    HotelId = 3,
                    TypeName = Models.Enums.RoomType.Luxo,
                    TotalRooms = 30,
                    Capacity = 2,
                    AverageDailyPrice = 1200.00m,
                    Description = "Quarto luxo com vista para o mar, varanda ampla, all-inclusive premium."
                },
                new Room
                {
                    RoomId = 12,
                    HotelId = 3,
                    TypeName = Models.Enums.RoomType.Luxo,
                    TotalRooms = 20,
                    Capacity = 3,
                    AverageDailyPrice = 1500.00m,
                    Description = "Quarto luxo família com cama king + auxiliar, vista jardim tropical."
                },
                new Room
                {
                    RoomId = 13,
                    HotelId = 3,
                    TypeName = Models.Enums.RoomType.Standard,
                    TotalRooms = 40,
                    Capacity = 2,
                    AverageDailyPrice = 900.00m,
                    Description = "Quarto standard com all-inclusive, ar-condicionado, TV por assinatura."
                },

                // Pousada Vila Chico (3 estrelas) - Jericoacoara
                new Room
                {
                    RoomId = 14,
                    HotelId = 4,
                    TypeName = Models.Enums.RoomType.Suite,
                    TotalRooms = 3,
                    Capacity = 2,
                    AverageDailyPrice = 450.00m,
                    Description = "Suíte rústica com rede na varanda, decoração regional, vista para as dunas."
                },
                new Room
                {
                    RoomId = 15,
                    HotelId = 4,
                    TypeName = Models.Enums.RoomType.Standard,
                    TotalRooms = 12,
                    Capacity = 2,
                    AverageDailyPrice = 280.00m,
                    Description = "Quarto simples e aconchegante com ventilador, mosquiteiro, decoração local."
                },
                new Room
                {
                    RoomId = 16,
                    HotelId = 4,
                    TypeName = Models.Enums.RoomType.Standard,
                    TotalRooms = 8,
                    Capacity = 4,
                    AverageDailyPrice = 380.00m,
                    Description = "Quarto familiar com duas camas de casal, área externa com rede."
                },

                // Hotel Fasano São Paulo (5 estrelas) - São Paulo
                new Room
                {
                    RoomId = 17,
                    HotelId = 5,
                    TypeName = Models.Enums.RoomType.Suite,
                    TotalRooms = 8,
                    Capacity = 2,
                    AverageDailyPrice = 2500.00m,
                    Description = "Suíte executiva com design italiano, sala de reuniões, vista para os Jardins."
                },
                new Room
                {
                    RoomId = 18,
                    HotelId = 5,
                    TypeName = Models.Enums.RoomType.Luxo,
                    TotalRooms = 20,
                    Capacity = 2,
                    AverageDailyPrice = 1800.00m,
                    Description = "Quarto luxo business com mesa de trabalho, WiFi alta velocidade, minibar premium."
                },
                new Room
                {
                    RoomId = 19,
                    HotelId = 5,
                    TypeName = Models.Enums.RoomType.Standard,
                    TotalRooms = 35,
                    Capacity = 2,
                    AverageDailyPrice = 1200.00m,
                    Description = "Quarto standard sofisticado com design contemporâneo, tecnologia de ponta."
                },
                new Room
                {
                    RoomId = 20,
                    HotelId = 5,
                    TypeName = Models.Enums.RoomType.Suite,
                    TotalRooms = 4,
                    Capacity = 4,
                    AverageDailyPrice = 3500.00m,
                    Description = "Suíte penthouse com terraço privativo, cozinha gourmet, sala de estar ampla."
                },

                // Pousada Maravilha (4 estrelas) - Fernando de Noronha
                new Room
                {
                    RoomId = 21,
                    HotelId = 6,
                    TypeName = Models.Enums.RoomType.Suite,
                    TotalRooms = 4,
                    Capacity = 2,
                    AverageDailyPrice = 1600.00m,
                    Description = "Bangalô exclusivo com vista para o Morro do Pico, deck privativo, hidromassagem externa."
                },
                new Room
                {
                    RoomId = 22,
                    HotelId = 6,
                    TypeName = Models.Enums.RoomType.Luxo,
                    TotalRooms = 8,
                    Capacity = 2,
                    AverageDailyPrice = 1100.00m,
                    Description = "Quarto luxo com vista mar, decoração sustentável, varanda com rede."
                },
                new Room
                {
                    RoomId = 23,
                    HotelId = 6,
                    TypeName = Models.Enums.RoomType.Standard,
                    TotalRooms = 12,
                    Capacity = 2,
                    AverageDailyPrice = 800.00m,
                    Description = "Quarto standard ecológico com energia solar, vista jardim."
                },
                new Room
                {
                    RoomId = 24,
                    HotelId = 6,
                    TypeName = Models.Enums.RoomType.Luxo,
                    TotalRooms = 6,
                    Capacity = 3,
                    AverageDailyPrice = 1350.00m,
                    Description = "Quarto família com cama king + auxiliar, vista privilegiada para a Baía do Sancho."
                },

                // Hotel Belmond das Cataratas (7) - Foz do Iguaçu
                new Room
                {
                    RoomId = 25,
                    HotelId = 7,
                    TypeName = Models.Enums.RoomType.Suite,
                    TotalRooms = 5,
                    Capacity = 2,
                    AverageDailyPrice = 3200.00m,
                    Description = "Suíte vista Cataratas com varanda privativa, serviço de concierge exclusivo."
                },
                new Room
                {
                    RoomId = 26,
                    HotelId = 7,
                    TypeName = Models.Enums.RoomType.Luxo,
                    TotalRooms = 15,
                    Capacity = 2,
                    AverageDailyPrice = 2100.00m,
                    Description = "Quarto luxo com vista para o parque nacional e acesso ao spa."
                },
                new Room
                {
                    RoomId = 27,
                    HotelId = 7,
                    TypeName = Models.Enums.RoomType.Standard,
                    TotalRooms = 25,
                    Capacity = 3,
                    AverageDailyPrice = 1400.00m,
                    Description = "Quarto standard com vista jardim e acesso às trilhas ecológicas."
                },
                new Room
                {
                    RoomId = 28,
                    HotelId = 7,
                    TypeName = Models.Enums.RoomType.Suite,
                    TotalRooms = 3,
                    Capacity = 4,
                    AverageDailyPrice = 4500.00m,
                    Description = "Suíte presidencial com vista panorâmica das Cataratas e área de estar ampla."
                },

                // Pousada Toca da Coruja (8) - Pipa
                new Room
                {
                    RoomId = 29,
                    HotelId = 8,
                    TypeName = Models.Enums.RoomType.Suite,
                    TotalRooms = 4,
                    Capacity = 2,
                    AverageDailyPrice = 850.00m,
                    Description = "Bangalô rústico com vista para o mar, decoração local e varanda com rede."
                },
                new Room
                {
                    RoomId = 30,
                    HotelId = 8,
                    TypeName = Models.Enums.RoomType.Luxo,
                    TotalRooms = 8,
                    Capacity = 2,
                    AverageDailyPrice = 650.00m,
                    Description = "Quarto luxo com varanda e vista para a praia de Pipa."
                },
                new Room
                {
                    RoomId = 31,
                    HotelId = 8,
                    TypeName = Models.Enums.RoomType.Standard,
                    TotalRooms = 12,
                    Capacity = 3,
                    AverageDailyPrice = 480.00m,
                    Description = "Quarto standard aconchegante com decoração regional."
                },
                new Room
                {
                    RoomId = 32,
                    HotelId = 8,
                    TypeName = Models.Enums.RoomType.Luxo,
                    TotalRooms = 6,
                    Capacity = 4,
                    AverageDailyPrice = 750.00m,
                    Description = "Chalé familiar com duas camas de casal e área externa."
                },

                // Hotel Transamérica Comandatuba (9) - Una
                new Room
                {
                    RoomId = 33,
                    HotelId = 9,
                    TypeName = Models.Enums.RoomType.Suite,
                    TotalRooms = 8,
                    Capacity = 2,
                    AverageDailyPrice = 2800.00m,
                    Description = "Bangalô à beira-mar com piscina privativa e serviço all-inclusive premium."
                },
                new Room
                {
                    RoomId = 34,
                    HotelId = 9,
                    TypeName = Models.Enums.RoomType.Luxo,
                    TotalRooms = 20,
                    Capacity = 2,
                    AverageDailyPrice = 1900.00m,
                    Description = "Quarto luxo com vista para o mar e acesso a todas as facilidades do resort."
                },
                new Room
                {
                    RoomId = 35,
                    HotelId = 9,
                    TypeName = Models.Enums.RoomType.Standard,
                    TotalRooms = 30,
                    Capacity = 3,
                    AverageDailyPrice = 1300.00m,
                    Description = "Quarto standard com all-inclusive e vista jardim tropical."
                },
                new Room
                {
                    RoomId = 36,
                    HotelId = 9,
                    TypeName = Models.Enums.RoomType.Suite,
                    TotalRooms = 6,
                    Capacity = 4,
                    AverageDailyPrice = 3500.00m,
                    Description = "Villa familiar com duas suítes, cozinha e área de lazer privativa."
                },

                // Pousada Quintal da Montanha (10) - Monte Verde
                new Room
                {
                    RoomId = 37,
                    HotelId = 10,
                    TypeName = Models.Enums.RoomType.Suite,
                    TotalRooms = 3,
                    Capacity = 2,
                    AverageDailyPrice = 420.00m,
                    Description = "Chalé rústico com lareira, vista para as montanhas e trilhas próximas."
                },
                new Room
                {
                    RoomId = 38,
                    HotelId = 10,
                    TypeName = Models.Enums.RoomType.Standard,
                    TotalRooms = 10,
                    Capacity = 2,
                    AverageDailyPrice = 300.00m,
                    Description = "Quarto standard aconchegante com decoração rural."
                },
                new Room
                {
                    RoomId = 39,
                    HotelId = 10,
                    TypeName = Models.Enums.RoomType.Luxo,
                    TotalRooms = 6,
                    Capacity = 3,
                    AverageDailyPrice = 500.00m,
                    Description = "Quarto família com vista panorâmica das montanhas."
                },
                new Room
                {
                    RoomId = 40,
                    HotelId = 10,
                    TypeName = Models.Enums.RoomType.Standard,
                    TotalRooms = 8,
                    Capacity = 4,
                    AverageDailyPrice = 450.00m,
                    Description = "Chalé familiar com duas camas de casal e área de convivência."
                },

                // Hotel Unique (11) - São Paulo
                new Room
                {
                    RoomId = 41,
                    HotelId = 11,
                    TypeName = Models.Enums.RoomType.Suite,
                    TotalRooms = 6,
                    Capacity = 2,
                    AverageDailyPrice = 2900.00m,
                    Description = "Suíte design com vista 360° da cidade e decoração futurista."
                },
                new Room
                {
                    RoomId = 42,
                    HotelId = 11,
                    TypeName = Models.Enums.RoomType.Luxo,
                    TotalRooms = 18,
                    Capacity = 2,
                    AverageDailyPrice = 2000.00m,
                    Description = "Quarto luxo com design exclusivo e vista panorâmica de São Paulo."
                },
                new Room
                {
                    RoomId = 43,
                    HotelId = 11,
                    TypeName = Models.Enums.RoomType.Standard,
                    TotalRooms = 30,
                    Capacity = 2,
                    AverageDailyPrice = 1500.00m,
                    Description = "Quarto standard com design moderno e tecnologia avançada."
                },
                new Room
                {
                    RoomId = 44,
                    HotelId = 11,
                    TypeName = Models.Enums.RoomType.Suite,
                    TotalRooms = 4,
                    Capacity = 4,
                    AverageDailyPrice = 4200.00m,
                    Description = "Suíte presidencial com terraço privativo e vista espetacular da cidade."
                },

                // Pousada Picinguaba (12) - Ubatuba
                new Room
                {
                    RoomId = 45,
                    HotelId = 12,
                    TypeName = Models.Enums.RoomType.Suite,
                    TotalRooms = 4,
                    Capacity = 2,
                    AverageDailyPrice = 780.00m,
                    Description = "Bangalô ecológico com vista para a mata atlântica e praia."
                },
                new Room
                {
                    RoomId = 46,
                    HotelId = 12,
                    TypeName = Models.Enums.RoomType.Luxo,
                    TotalRooms = 8,
                    Capacity = 2,
                    AverageDailyPrice = 580.00m,
                    Description = "Quarto luxo sustentável com varanda e vista para o mar."
                },
                new Room
                {
                    RoomId = 47,
                    HotelId = 12,
                    TypeName = Models.Enums.RoomType.Standard,
                    TotalRooms = 15,
                    Capacity = 3,
                    AverageDailyPrice = 420.00m,
                    Description = "Quarto standard ecológico com materiais sustentáveis."
                },
                new Room
                {
                    RoomId = 48,
                    HotelId = 12,
                    TypeName = Models.Enums.RoomType.Luxo,
                    TotalRooms = 6,
                    Capacity = 4,
                    AverageDailyPrice = 680.00m,
                    Description = "Chalé família com vista para a praia de Picinguaba."
                },

                // Hotel Villa Bahia (13) - Salvador
                new Room
                {
                    RoomId = 49,
                    HotelId = 13,
                    TypeName = Models.Enums.RoomType.Suite,
                    TotalRooms = 3,
                    Capacity = 2,
                    AverageDailyPrice = 920.00m,
                    Description = "Suíte colonial com decoração histórica no coração do Pelourinho."
                },
                new Room
                {
                    RoomId = 50,
                    HotelId = 13,
                    TypeName = Models.Enums.RoomType.Luxo,
                    TotalRooms = 8,
                    Capacity = 2,
                    AverageDailyPrice = 680.00m,
                    Description = "Quarto luxo com arquitetura colonial preservada."
                },
                new Room
                {
                    RoomId = 51,
                    HotelId = 13,
                    TypeName = Models.Enums.RoomType.Standard,
                    TotalRooms = 12,
                    Capacity = 2,
                    AverageDailyPrice = 520.00m,
                    Description = "Quarto standard com charme histórico e localização privilegiada."
                },
                new Room
                {
                    RoomId = 52,
                    HotelId = 13,
                    TypeName = Models.Enums.RoomType.Luxo,
                    TotalRooms = 5,
                    Capacity = 3,
                    AverageDailyPrice = 780.00m,
                    Description = "Quarto família com vista para o centro histórico de Salvador."
                }
            );

            // Dados de usuários para teste
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    UserId = 1,
                    Email = "joao.silva@email.com",
                    Password = "123456", // Em produção seria hash
                    FirstName = "João",
                    LastName = "Silva",
                    Cpf = "123.456.789-00",
                    Phone = "(11) 99999-1111",
                    Role = Models.Enums.Roles.User,
                    BirthDate = DateOnly.FromDateTime(new DateTime(1985, 5, 15)),
                    CreatedAt = DateTime.Now,
                    Active = true
                },
                new User
                {
                    UserId = 2,
                    Email = "maria.santos@email.com",
                    Password = "123456",
                    FirstName = "Maria",
                    LastName = "Santos",
                    Cpf = "987.654.321-00",
                    Phone = "(21) 88888-2222",
                    Role = Models.Enums.Roles.User,
                    BirthDate = DateOnly.FromDateTime(new DateTime(1990, 8, 20)),
                    CreatedAt = DateTime.Now,
                    Active = true
                },
                new User
                {
                    UserId = 3,
                    Email = "carlos.oliveira@email.com",
                    Password = "123456",
                    FirstName = "Carlos",
                    LastName = "Oliveira",
                    Cpf = "456.789.123-00",
                    Phone = "(71) 77777-3333",
                    Role = Models.Enums.Roles.User,
                    BirthDate = DateOnly.FromDateTime(new DateTime(1978, 12, 10)),
                    CreatedAt = DateTime.Now,
                    Active = true
                }
            );

            // Dados de reservas para teste de disponibilidade por datas
            modelBuilder.Entity<Reservation>().HasData(
                new Reservation
                {
                    ReservationId = 1,
                    UserId = 1,
                    RoomId = 1, // Suíte presidencial Copacabana
                    HotelId = 1,
                    CheckIn = new DateTime(2025, 8, 15),
                    CheckOut = new DateTime(2025, 8, 20),
                    TotalPrice = 7500.00m, // 5 diárias x 1500
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Reserva para lua de mel"
                },
                new Reservation
                {
                    ReservationId = 2,
                    UserId = 2,
                    RoomId = 5, // Suíte romântica Gramado
                    HotelId = 2,
                    CheckIn = new DateTime(2025, 8, 10),
                    CheckOut = new DateTime(2025, 8, 13),
                    TotalPrice = 3600.00m, // 3 diárias x 1200
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Fim de semana romântico"
                },
                new Reservation
                {
                    ReservationId = 3,
                    UserId = 3,
                    RoomId = 10, // Villa familiar Salvador
                    HotelId = 3,
                    CheckIn = new DateTime(2025, 9, 1),
                    CheckOut = new DateTime(2025, 9, 7),
                    TotalPrice = 16800.00m, // 6 diárias x 2800
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Férias em família"
                },
                new Reservation
                {
                    ReservationId = 4,
                    UserId = 1,
                    RoomId = 14, // Suíte rústica Jericoacoara
                    HotelId = 4,
                    CheckIn = new DateTime(2025, 8, 25),
                    CheckOut = new DateTime(2025, 8, 30),
                    TotalPrice = 2250.00m, // 5 diárias x 450
                    IsConfirmed = false,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Viagem de aventura"
                },
                new Reservation
                {
                    ReservationId = 5,
                    UserId = 2,
                    RoomId = 17, // Suíte executiva Fasano SP
                    HotelId = 5,
                    CheckIn = new DateTime(2025, 8, 5),
                    CheckOut = new DateTime(2025, 8, 8),
                    TotalPrice = 7500.00m, // 3 diárias x 2500
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Viagem de negócios"
                },
                new Reservation
                {
                    ReservationId = 6,
                    UserId = 3,
                    RoomId = 21, // Bangalô Noronha
                    HotelId = 6,
                    CheckIn = new DateTime(2025, 9, 15),
                    CheckOut = new DateTime(2025, 9, 22),
                    TotalPrice = 11200.00m, // 7 diárias x 1600
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Lua de mel em paraíso"
                },
                // Reservas que conflitam com datas específicas para teste
                new Reservation
                {
                    ReservationId = 7,
                    UserId = 1,
                    RoomId = 2, // Quarto luxo Copacabana
                    HotelId = 1,
                    CheckIn = new DateTime(2025, 8, 12),
                    CheckOut = new DateTime(2025, 8, 18),
                    TotalPrice = 5400.00m, // 6 diárias x 900
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Conferência no Rio"
                },
                new Reservation
                {
                    ReservationId = 8,
                    UserId = 2,
                    RoomId = 8, // Quarto familiar Gramado
                    HotelId = 2,
                    CheckIn = new DateTime(2025, 8, 20),
                    CheckOut = new DateTime(2025, 8, 25),
                    TotalPrice = 5500.00m, // 5 diárias x 1100
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Férias com crianças"
                }
            );


            base.OnModelCreating(modelBuilder);

            // Hotel configuration
            modelBuilder.Entity<Hotel>(entity =>
            {
                entity.HasKey(e => e.HotelId);
                entity.Property(e => e.Name).HasMaxLength(200).IsRequired();
                entity.Property(e => e.City).HasMaxLength(100).IsRequired();
                entity.Property(e => e.HotelAddress).HasMaxLength(300);
                entity.Property(e => e.Phone).HasMaxLength(20);
            });

            // Room configuration
            modelBuilder.Entity<Room>(entity =>
            {
                entity.HasKey(e => e.RoomId);
                entity.Property(e => e.AverageDailyPrice).HasColumnType("decimal(18,2)");

                // Relacionamento com Hotel
                entity.HasOne(e => e.Hotel)
                    .WithMany(h => h.Rooms)
                    .HasForeignKey(e => e.HotelId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // User configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserId);
                entity.Property(e => e.Email).HasMaxLength(100).IsRequired();
                entity.Property(e => e.FirstName).HasMaxLength(50).IsRequired();
                entity.Property(e => e.LastName).HasMaxLength(50).IsRequired();
                entity.Property(e => e.Cpf).HasMaxLength(14);
                entity.Property(e => e.Phone).HasMaxLength(15);
            });

            // Reservation configuration
            modelBuilder.Entity<Reservation>(entity =>
            {
                entity.HasKey(e => e.ReservationId);
                entity.Property(e => e.TotalPrice).HasColumnType("decimal(18,2)");
                entity.Property(e => e.Description).HasMaxLength(500);

                // Relacionamentos
                entity.HasOne(e => e.User)
                    .WithMany(u => u.Reservations)
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Room)
                    .WithMany()
                    .HasForeignKey(e => e.RoomId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Hotel)
                    .WithMany()
                    .HasForeignKey(e => e.HotelId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Travellers configuration
            modelBuilder.Entity<Travellers>(entity =>
            {
                entity.HasKey(e => e.TravellersId);
                entity.Property(e => e.FirstName).HasMaxLength(50).IsRequired();
                entity.Property(e => e.LastName).HasMaxLength(50).IsRequired();
                entity.Property(e => e.Cpf).HasMaxLength(11).IsRequired();

                // Relacionamento com Reservation
                entity.HasOne(e => e.Reservation)
                    .WithMany(r => r.Travellers)
                    .HasForeignKey(e => e.ReservationId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
