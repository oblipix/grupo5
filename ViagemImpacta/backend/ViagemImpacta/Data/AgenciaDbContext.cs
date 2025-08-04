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

        public DbSet<Promotion> Promotions { get; set; } = null!;
        public DbSet<RoomsPromotional> RoomsPromotional { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuração da chave primária para RoomsPromotional
            modelBuilder.Entity<RoomsPromotional>()
                .HasKey(rp => rp.RoomPromotionalId);

            // Configuração para armazenar lista de URLs de imagem como string delimitada
            modelBuilder.Entity<Hotel>()
                .Property(h => h.ImageUrls)
                .HasConversion(
                    v => v != null && v.Any() ? string.Join('|', v.Where(url => !string.IsNullOrWhiteSpace(url))) : "", // Converter lista para string separada por |
                    v => string.IsNullOrWhiteSpace(v) ? new List<string>() : v.Split('|', StringSplitOptions.RemoveEmptyEntries).ToList() // Converter string de volta para lista
                );

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
                    Description = "Luxuoso hotel localizado na praia de Copacabana, com suítes de alto padrão, spa e várias opções de lazer.",
                    ImageUrls = new List<string>
                    {
                        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
                        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
                        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
                        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"
                    }
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
                    Description = "Hotel aconchegante em Gramado, ideal para famílias, com quartos confortáveis e vista para as montanhas.",
                    ImageUrls = new List<string>
                    {
                        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
                        "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=800",
                        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
                        "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800"
                    }
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
                    Description = "Resort all-inclusive na costa da Bahia com múltiplas opções de lazer, esportes aquáticos e entretenimento.",
                    ImageUrls = new List<string>
                    {
                        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
                        "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
                        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
                        "https://images.unsplash.com/photo-1544986581-efac024faf62?w=800"
                    }
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
                    Description = "Pousada rústica e charmosa em Jericoacoara, próxima à praia e às dunas, ambiente descontraído.",
                    ImageUrls = new List<string>
                    {
                        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
                        "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800",
                        "https://images.unsplash.com/photo-1502780402662-acc01917152e?w=800",
                        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
                    }
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
                    Description = "Hotel boutique no coração de São Paulo, design sofisticado e localização privilegiada nos Jardins.",
                    ImageUrls = new List<string>
                    {
                        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
                        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
                        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
                        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"
                    }
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
                    Description = "Pousada exclusiva em Fernando de Noronha com vista deslumbrante para o mar e acesso às melhores praias.",
                    ImageUrls = new List<string>
                    {
                        "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
                        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
                        "https://images.unsplash.com/photo-1502780402662-acc01917152e?w=800",
                        "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800"
                    }
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
                    Description = "Hotel de luxo localizado dentro do Parque Nacional do Iguaçu, com vista privilegiada para as Cataratas.",
                    ImageUrls = new List<string>
                    {
                        "https://images.unsplash.com/photo-1544986581-efac024faf62?w=800",
                        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
                        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
                        "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800"
                    }
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
                    Description = "Pousada charmosa na Praia da Pipa, ambiente rústico e aconchegante com vista para o mar.",
                    ImageUrls = new List<string>
                    {
                        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
                        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
                        "https://images.unsplash.com/photo-1502780402662-acc01917152e?w=800",
                        "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800"
                    }
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
                    Description = "Resort all-inclusive em ilha privativa na Bahia, com múltiplas opções de lazer e esportes.",
                    ImageUrls = new List<string>
                    {
                        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
                        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
                        "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
                        "https://images.unsplash.com/photo-1544986581-efac024faf62?w=800"
                    }
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
                    Description = "Pousada rural em Monte Verde, ambiente familiar com vista para as montanhas e trilhas ecológicas.",
                    ImageUrls = new List<string>
                    {
                        "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=800",
                        "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800",
                        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
                        "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800"
                    }
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
                    Description = "Hotel design icônico em São Paulo, arquitetura futurista com vista panorâmica da cidade.",
                    ImageUrls = new List<string>
                    {
                        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
                        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
                        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
                        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"
                    }
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
                    Description = "Pousada ecológica em Ubatuba, localizada na Vila de Picinguaba com acesso a praias preservadas.",
                    ImageUrls = new List<string>
                    {
                        "https://images.unsplash.com/photo-1502780402662-acc01917152e?w=800",
                        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
                        "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
                        "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800"
                    }
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
                    Description = "Hotel boutique no Pelourinho, arquitetura colonial preservada no coração histórico de Salvador.",
                    ImageUrls = new List<string>
                    {
                        "https://images.unsplash.com/photo-1544986581-efac024faf62?w=800",
                        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
                        "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800",
                        "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=800"
                    }
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

            // Dados de usuários para teste - População expandida
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
                },
                new User
                {
                    UserId = 4,
                    Email = "ana.costa@email.com",
                    Password = "123456",
                    FirstName = "Ana",
                    LastName = "Costa",
                    Cpf = "111.222.333-44",
                    Phone = "(11) 98765-1111",
                    Role = Models.Enums.Roles.User,
                    BirthDate = DateOnly.FromDateTime(new DateTime(1992, 3, 25)),
                    CreatedAt = DateTime.Now,
                    Active = true
                },
                new User
                {
                    UserId = 5,
                    Email = "bruno.ferreira@email.com",
                    Password = "123456",
                    FirstName = "Bruno",
                    LastName = "Ferreira",
                    Cpf = "222.333.444-55",
                    Phone = "(21) 97654-2222",
                    Role = Models.Enums.Roles.User,
                    BirthDate = DateOnly.FromDateTime(new DateTime(1987, 7, 12)),
                    CreatedAt = DateTime.Now,
                    Active = true
                },
                new User
                {
                    UserId = 6,
                    Email = "carla.mendes@email.com",
                    Password = "123456",
                    FirstName = "Carla",
                    LastName = "Mendes",
                    Cpf = "333.444.555-66",
                    Phone = "(31) 96543-3333",
                    Role = Models.Enums.Roles.User,
                    BirthDate = DateOnly.FromDateTime(new DateTime(1983, 11, 8)),
                    CreatedAt = DateTime.Now,
                    Active = true
                },
                new User
                {
                    UserId = 7,
                    Email = "diego.almeida@email.com",
                    Password = "123456",
                    FirstName = "Diego",
                    LastName = "Almeida",
                    Cpf = "444.555.666-77",
                    Phone = "(41) 95432-4444",
                    Role = Models.Enums.Roles.User,
                    BirthDate = DateOnly.FromDateTime(new DateTime(1995, 1, 30)),
                    CreatedAt = DateTime.Now,
                    Active = true
                },
                new User
                {
                    UserId = 8,
                    Email = "elena.barbosa@email.com",
                    Password = "123456",
                    FirstName = "Elena",
                    LastName = "Barbosa",
                    Cpf = "555.666.777-88",
                    Phone = "(51) 94321-5555",
                    Role = Models.Enums.Roles.User,
                    BirthDate = DateOnly.FromDateTime(new DateTime(1989, 9, 18)),
                    CreatedAt = DateTime.Now,
                    Active = true
                },
                new User
                {
                    UserId = 9,
                    Email = "felipe.cardoso@email.com",
                    Password = "123456",
                    FirstName = "Felipe",
                    LastName = "Cardoso",
                    Cpf = "666.777.888-99",
                    Phone = "(61) 93210-6666",
                    Role = Models.Enums.Roles.User,
                    BirthDate = DateOnly.FromDateTime(new DateTime(1986, 4, 22)),
                    CreatedAt = DateTime.Now,
                    Active = true
                },
                new User
                {
                    UserId = 10,
                    Email = "gabriela.dias@email.com",
                    Password = "123456",
                    FirstName = "Gabriela",
                    LastName = "Dias",
                    Cpf = "777.888.999-00",
                    Phone = "(71) 92109-7777",
                    Role = Models.Enums.Roles.User,
                    BirthDate = DateOnly.FromDateTime(new DateTime(1991, 6, 14)),
                    CreatedAt = DateTime.Now,
                    Active = true
                },
                new User
                {
                    UserId = 11,
                    Email = "hugo.esteves@email.com",
                    Password = "123456",
                    FirstName = "Hugo",
                    LastName = "Esteves",
                    Cpf = "888.999.000-11",
                    Phone = "(81) 91098-8888",
                    Role = Models.Enums.Roles.User,
                    BirthDate = DateOnly.FromDateTime(new DateTime(1984, 10, 5)),
                    CreatedAt = DateTime.Now,
                    Active = true
                },
                new User
                {
                    UserId = 12,
                    Email = "isis.fonseca@email.com",
                    Password = "123456",
                    FirstName = "Isis",
                    LastName = "Fonseca",
                    Cpf = "999.000.111-22",
                    Phone = "(85) 90987-9999",
                    Role = Models.Enums.Roles.User,
                    BirthDate = DateOnly.FromDateTime(new DateTime(1993, 2, 27)),
                    CreatedAt = DateTime.Now,
                    Active = true
                },
                new User
                {
                    UserId = 13,
                    Email = "jorge.gomes@email.com",
                    Password = "123456",
                    FirstName = "Jorge",
                    LastName = "Gomes",
                    Cpf = "000.111.222-33",
                    Phone = "(11) 89876-0000",
                    Role = Models.Enums.Roles.User,
                    BirthDate = DateOnly.FromDateTime(new DateTime(1988, 8, 16)),
                    CreatedAt = DateTime.Now,
                    Active = true
                },
                new User
                {
                    UserId = 14,
                    Email = "karla.henrique@email.com",
                    Password = "123456",
                    FirstName = "Karla",
                    LastName = "Henrique",
                    Cpf = "111.222.333-44",
                    Phone = "(21) 88765-1111",
                    Role = Models.Enums.Roles.User,
                    BirthDate = DateOnly.FromDateTime(new DateTime(1996, 12, 3)),
                    CreatedAt = DateTime.Now,
                    Active = true
                },
                new User
                {
                    UserId = 15,
                    Email = "lucas.izidoro@email.com",
                    Password = "123456",
                    FirstName = "Lucas",
                    LastName = "Izidoro",
                    Cpf = "222.333.444-55",
                    Phone = "(31) 87654-2222",
                    Role = Models.Enums.Roles.User,
                    BirthDate = DateOnly.FromDateTime(new DateTime(1982, 5, 11)),
                    CreatedAt = DateTime.Now,
                    Active = true
                },
                new User
                {
                    UserId = 16,
                    Email = "mariana.jorge@email.com",
                    Password = "123456",
                    FirstName = "Mariana",
                    LastName = "Jorge",
                    Cpf = "333.444.555-66",
                    Phone = "(41) 86543-3333",
                    Role = Models.Enums.Roles.User,
                    BirthDate = DateOnly.FromDateTime(new DateTime(1994, 7, 29)),
                    CreatedAt = DateTime.Now,
                    Active = true
                },
                new User
                {
                    UserId = 17,
                    Email = "nicolas.klein@email.com",
                    Password = "123456",
                    FirstName = "Nicolas",
                    LastName = "Klein",
                    Cpf = "444.555.666-77",
                    Phone = "(51) 85432-4444",
                    Role = Models.Enums.Roles.User,
                    BirthDate = DateOnly.FromDateTime(new DateTime(1981, 9, 7)),
                    CreatedAt = DateTime.Now,
                    Active = true
                },
                new User
                {
                    UserId = 18,
                    Email = "olivia.lima@email.com",
                    Password = "123456",
                    FirstName = "Olivia",
                    LastName = "Lima",
                    Cpf = "555.666.777-88",
                    Phone = "(61) 84321-5555",
                    Role = Models.Enums.Roles.User,
                    BirthDate = DateOnly.FromDateTime(new DateTime(1997, 1, 15)),
                    CreatedAt = DateTime.Now,
                    Active = true
                },
                new User
                {
                    UserId = 19,
                    Email = "pedro.moreira@email.com",
                    Password = "123456",
                    FirstName = "Pedro",
                    LastName = "Moreira",
                    Cpf = "666.777.888-99",
                    Phone = "(71) 83210-6666",
                    Role = Models.Enums.Roles.User,
                    BirthDate = DateOnly.FromDateTime(new DateTime(1980, 11, 23)),
                    CreatedAt = DateTime.Now,
                    Active = true
                },
                new User
                {
                    UserId = 20,
                    Email = "quincy.nunes@email.com",
                    Password = "123456",
                    FirstName = "Quincy",
                    LastName = "Nunes",
                    Cpf = "777.888.999-00",
                    Phone = "(81) 82109-7777",
                    Role = Models.Enums.Roles.User,
                    BirthDate = DateOnly.FromDateTime(new DateTime(1985, 3, 9)),
                    CreatedAt = DateTime.Now,
                    Active = true
                }
            );

            // Dados de reservas - População realística 50-55% ocupação próximos 60 dias
            // Primeiro vamos manter as reservas existentes e adicionar novas
            modelBuilder.Entity<Reservation>().HasData(
                // Reservas existentes mantidas
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
                    IsConfirmed = true, // CONFIRMADA
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
                },

                // NOVAS RESERVAS ADICIONAIS - População realística para próximos 60 dias
                new Reservation
                {
                    ReservationId = 9,
                    UserId = 4,
                    RoomId = 3, // Standard Copacabana
                    HotelId = 1,
                    CheckIn = new DateTime(2025, 8, 6),
                    CheckOut = new DateTime(2025, 8, 9),
                    TotalPrice = 1800.00m,
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Final de semana Rio"
                },
                new Reservation
                {
                    ReservationId = 10,
                    UserId = 5,
                    RoomId = 4, // Família vista mar Copacabana
                    HotelId = 1,
                    CheckIn = new DateTime(2025, 8, 22),
                    CheckOut = new DateTime(2025, 8, 26),
                    TotalPrice = 4800.00m,
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Férias família Copacabana"
                },
                new Reservation
                {
                    ReservationId = 11,
                    UserId = 6,
                    RoomId = 6, // Chalé família Gramado
                    HotelId = 2,
                    CheckIn = new DateTime(2025, 8, 16),
                    CheckOut = new DateTime(2025, 8, 19),
                    TotalPrice = 3000.00m,
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Meio de semana Gramado"
                },
                new Reservation
                {
                    ReservationId = 12,
                    UserId = 7,
                    RoomId = 7, // Quarto standard Gramado
                    HotelId = 2,
                    CheckIn = new DateTime(2025, 8, 28),
                    CheckOut = new DateTime(2025, 8, 31),
                    TotalPrice = 2100.00m,
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Final agosto Gramado"
                },
                new Reservation
                {
                    ReservationId = 13,
                    UserId = 8,
                    RoomId = 9, // Villa vista mar Salvador
                    HotelId = 3,
                    CheckIn = new DateTime(2025, 8, 8),
                    CheckOut = new DateTime(2025, 8, 12),
                    TotalPrice = 10000.00m,
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Villa Salvador agosto"
                },
                new Reservation
                {
                    ReservationId = 14,
                    UserId = 9,
                    RoomId = 11, // Quarto duplo Salvador
                    HotelId = 3,
                    CheckIn = new DateTime(2025, 8, 26),
                    CheckOut = new DateTime(2025, 8, 29),
                    TotalPrice = 1500.00m,
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Final agosto Salvador"
                },
                new Reservation
                {
                    ReservationId = 15,
                    UserId = 10,
                    RoomId = 12, // Cobertura Salvador
                    HotelId = 3,
                    CheckIn = new DateTime(2025, 9, 5),
                    CheckOut = new DateTime(2025, 9, 9),
                    TotalPrice = 9200.00m,
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Cobertura setembro Salvador"
                },
                new Reservation
                {
                    ReservationId = 16,
                    UserId = 11,
                    RoomId = 15, // Villa familiar Jericoacoara
                    HotelId = 4,
                    CheckIn = new DateTime(2025, 8, 14),
                    CheckOut = new DateTime(2025, 8, 18),
                    TotalPrice = 3600.00m,
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Villa família Jericoacoara"
                },
                new Reservation
                {
                    ReservationId = 17,
                    UserId = 12,
                    RoomId = 16, // Bangalô Jericoacoara
                    HotelId = 4,
                    CheckIn = new DateTime(2025, 9, 3),
                    CheckOut = new DateTime(2025, 9, 7),
                    TotalPrice = 2800.00m,
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Bangalô setembro Jericoacoara"
                },
                new Reservation
                {
                    ReservationId = 18,
                    UserId = 13,
                    RoomId = 18, // Loft empresarial Fasano SP
                    HotelId = 5,
                    CheckIn = new DateTime(2025, 8, 7),
                    CheckOut = new DateTime(2025, 8, 11),
                    TotalPrice = 8000.00m,
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Loft negócios SP"
                },
                new Reservation
                {
                    ReservationId = 19,
                    UserId = 14,
                    RoomId = 19, // Quarto superior Fasano SP
                    HotelId = 5,
                    CheckIn = new DateTime(2025, 8, 19),
                    CheckOut = new DateTime(2025, 8, 22),
                    TotalPrice = 5400.00m,
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Superior SP agosto"
                },
                new Reservation
                {
                    ReservationId = 20,
                    UserId = 15,
                    RoomId = 20, // Penthouse Fasano SP
                    HotelId = 5,
                    CheckIn = new DateTime(2025, 9, 10),
                    CheckOut = new DateTime(2025, 9, 13),
                    TotalPrice = 9000.00m,
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Penthouse setembro SP"
                },
                new Reservation
                {
                    ReservationId = 21,
                    UserId = 16,
                    RoomId = 1, // Suíte presidencial Copacabana
                    HotelId = 1,
                    CheckIn = new DateTime(2025, 9, 20),
                    CheckOut = new DateTime(2025, 9, 24),
                    TotalPrice = 6000.00m,
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Presidencial setembro"
                },
                new Reservation
                {
                    ReservationId = 22,
                    UserId = 17,
                    RoomId = 3, // Standard Copacabana
                    HotelId = 1,
                    CheckIn = new DateTime(2025, 9, 12),
                    CheckOut = new DateTime(2025, 9, 15),
                    TotalPrice = 1800.00m,
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Standard setembro Rio"
                },
                new Reservation
                {
                    ReservationId = 23,
                    UserId = 18,
                    RoomId = 5, // Suíte romântica Gramado
                    HotelId = 2,
                    CheckIn = new DateTime(2025, 9, 18),
                    CheckOut = new DateTime(2025, 9, 21),
                    TotalPrice = 3600.00m,
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Romance setembro Gramado"
                },
                new Reservation
                {
                    ReservationId = 24,
                    UserId = 19,
                    RoomId = 8, // Quarto familiar Gramado
                    HotelId = 2,
                    CheckIn = new DateTime(2025, 9, 26),
                    CheckOut = new DateTime(2025, 9, 29),
                    TotalPrice = 3300.00m,
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Família final setembro"
                },
                new Reservation
                {
                    ReservationId = 25,
                    UserId = 20,
                    RoomId = 13, // Quarto família Salvador
                    HotelId = 3,
                    CheckIn = new DateTime(2025, 9, 25),
                    CheckOut = new DateTime(2025, 9, 28),
                    TotalPrice = 2340.00m,
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Família Salvador setembro"
                },
                new Reservation
                {
                    ReservationId = 26,
                    UserId = 4,
                    RoomId = 14, // Suíte rústica Jericoacoara
                    HotelId = 4,
                    CheckIn = new DateTime(2025, 9, 8),
                    CheckOut = new DateTime(2025, 9, 12),
                    TotalPrice = 1800.00m,
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Rústica setembro Jericoacoara"
                },
                new Reservation
                {
                    ReservationId = 27,
                    UserId = 5,
                    RoomId = 17, // Suíte executiva Fasano SP
                    HotelId = 5,
                    CheckIn = new DateTime(2025, 9, 23),
                    CheckOut = new DateTime(2025, 9, 26),
                    TotalPrice = 7500.00m,
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Executiva final setembro SP"
                },
                new Reservation
                {
                    ReservationId = 28,
                    UserId = 6,
                    RoomId = 2, // Quarto luxo Copacabana
                    HotelId = 1,
                    CheckIn = new DateTime(2025, 10, 1),
                    CheckOut = new DateTime(2025, 10, 4),
                    TotalPrice = 2700.00m,
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Luxo outubro Rio"
                },
                new Reservation
                {
                    ReservationId = 29,
                    UserId = 7,
                    RoomId = 6, // Chalé família Gramado
                    HotelId = 2,
                    CheckIn = new DateTime(2025, 10, 2),
                    CheckOut = new DateTime(2025, 10, 6),
                    TotalPrice = 4000.00m,
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Chalé outubro Gramado"
                },
                new Reservation
                {
                    ReservationId = 30,
                    UserId = 8,
                    RoomId = 10, // Villa familiar Salvador
                    HotelId = 3,
                    CheckIn = new DateTime(2025, 10, 3),
                    CheckOut = new DateTime(2025, 10, 7),
                    TotalPrice = 11200.00m,
                    IsConfirmed = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Description = "Villa outubro Salvador"
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
