using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Models;

namespace ViagemImpacta.Data
{
    public class AgenciaDbContext : DbContext
    {
        public AgenciaDbContext(DbContextOptions<AgenciaDbContext> options) : base(options) { }

        public DbSet<Hotel> Hotels { get; set; } = null!;
        public DbSet<TravelPackage> TravelPackages { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        
        // ✅ Descomente conforme implementar as entidades
        // public DbSet<Room> Rooms { get; set; } = null!;
        // public DbSet<Review> Reviews { get; set; } = null!;
        // public DbSet<Reservation> Reservations { get; set; } = null!;
        // public DbSet<Payment> Payments { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // ✅ Configuração explícita dos relacionamentos

            // TravelPackage configuration
            modelBuilder.Entity<TravelPackage>(entity =>
            {
                entity.HasKey(e => e.TravelPackageId);
                entity.Property(e => e.Title).HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(1000);
                entity.Property(e => e.Destination).HasMaxLength(100);
                entity.Property(e => e.Price).HasColumnType("decimal(18,2)");
            });

            // Hotel configuration
            modelBuilder.Entity<Hotel>(entity =>
            {
                entity.HasKey(e => e.HotelId);
                entity.Property(e => e.Name).HasMaxLength(200).IsRequired();
                entity.Property(e => e.Location).HasMaxLength(300);
                entity.Property(e => e.Phone).HasMaxLength(20);
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

            // ✅ Relacionamento Many-to-Many entre TravelPackage e Hotel
            modelBuilder.Entity<TravelPackage>()
                .HasMany(tp => tp.Hotels)
                .WithMany()
                .UsingEntity(j => j.ToTable("TravelPackageHotels"));

            // ✅ Seed Data - Dados iniciais
            SeedData(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            // ✅ Seed Hotels
            var hotels = new List<Hotel>
            {
                new Hotel { HotelId = 1, Name = "Hotel Copacabana Palace", Location = "Rio de Janeiro, RJ", Phone = "(21) 2548-7070", Stars = 5, Wifi = true, Parking = true, Gym = true, Restaurant = true, Image = "copacabana-palace.jpg" },
                new Hotel { HotelId = 2, Name = "Grand Hyatt São Paulo", Location = "São Paulo, SP", Phone = "(11) 2838-1234", Stars = 5, Wifi = true, Parking = true, Gym = true, Restaurant = true, Image = "grand-hyatt-sp.jpg" },
                new Hotel { HotelId = 3, Name = "Belmond Hotel das Cataratas", Location = "Foz do Iguaçu, PR", Phone = "(45) 2102-7000", Stars = 5, Wifi = true, Parking = true, Gym = true, Restaurant = true, Image = "belmond-cataratas.jpg" },
                new Hotel { HotelId = 4, Name = "Pousada Maravilha", Location = "Fernando de Noronha, PE", Phone = "(81) 3619-0028", Stars = 4, Wifi = true, Parking = false, Gym = false, Restaurant = true, Image = "pousada-maravilha.jpg" },
                new Hotel { HotelId = 5, Name = "Hotel Fasano Salvador", Location = "Salvador, BA", Phone = "(71) 3206-6000", Stars = 5, Wifi = true, Parking = true, Gym = true, Restaurant = true, Image = "fasano-salvador.jpg" },
                new Hotel { HotelId = 6, Name = "Casa Grande Hotel Resort", Location = "Gramado, RS", Phone = "(54) 3295-1100", Stars = 4, Wifi = true, Parking = true, Gym = true, Restaurant = true, Image = "casa-grande-gramado.jpg" },
                new Hotel { HotelId = 7, Name = "Tivoli Ecoresort Praia do Forte", Location = "Praia do Forte, BA", Phone = "(71) 3676-4000", Stars = 5, Wifi = true, Parking = true, Gym = true, Restaurant = true, Image = "tivoli-praia-forte.jpg" },
                new Hotel { HotelId = 8, Name = "Hotel Emiliano", Location = "São Paulo, SP", Phone = "(11) 3069-4369", Stars = 5, Wifi = true, Parking = true, Gym = true, Restaurant = true, Image = "emiliano-sp.jpg" },
                new Hotel { HotelId = 9, Name = "Pousada Etnia", Location = "Trancoso, BA", Phone = "(73) 3668-1137", Stars = 4, Wifi = true, Parking = true, Gym = false, Restaurant = true, Image = "pousada-etnia.jpg" },
                new Hotel { HotelId = 10, Name = "Hotel Villa Bahia", Location = "Salvador, BA", Phone = "(71) 3322-4271", Stars = 4, Wifi = true, Parking = false, Gym = false, Restaurant = true, Image = "villa-bahia.jpg" },
                new Hotel { HotelId = 11, Name = "Pousada do Toby", Location = "Búzios, RJ", Phone = "(22) 2623-1424", Stars = 4, Wifi = true, Parking = true, Gym = false, Restaurant = true, Image = "pousada-toby.jpg" },
                new Hotel { HotelId = 12, Name = "Amazonia Golf Resort", Location = "Manaus, AM", Phone = "(92) 3215-7000", Stars = 4, Wifi = true, Parking = true, Gym = true, Restaurant = true, Image = "amazonia-golf.jpg" }
            };

            modelBuilder.Entity<Hotel>().HasData(hotels);

            // ✅ Seed Travel Packages
            var packages = new List<TravelPackage>
            {
                new TravelPackage
                {
                    TravelPackageId = 1,
                    Title = "Rio de Janeiro Clássico",
                    Description = "Explore a Cidade Maravilhosa com hospedagem no icônico Copacabana Palace. Inclui city tour, Cristo Redentor e Pão de Açúcar.",
                    Destination = "Rio de Janeiro",
                    Price = 2850.00m,
                    Active = true,
                    Promotion = false,
                    StartDate = DateTime.Now.AddDays(30),
                    EndDate = DateTime.Now.AddDays(35),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new TravelPackage
                {
                    TravelPackageId = 2,
                    Title = "São Paulo Business & Lazer",
                    Description = "Conheça a metrópole brasileira com conforto no Grand Hyatt. Inclui tours gastronômicos e culturais.",
                    Destination = "São Paulo",
                    Price = 1750.00m,
                    Active = true,
                    Promotion = true,
                    StartDate = DateTime.Now.AddDays(45),
                    EndDate = DateTime.Now.AddDays(48),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new TravelPackage
                {
                    TravelPackageId = 3,
                    Title = "Cataratas do Iguaçu Luxo",
                    Description = "Experimente uma das maravilhas naturais do mundo com hospedagem exclusiva no Belmond Hotel das Cataratas.",
                    Destination = "Foz do Iguaçu",
                    Price = 3200.00m,
                    Active = true,
                    Promotion = false,
                    StartDate = DateTime.Now.AddDays(60),
                    EndDate = DateTime.Now.AddDays(64),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new TravelPackage
                {
                    TravelPackageId = 4,
                    Title = "Fernando de Noronha Exclusivo",
                    Description = "Paraíso ecológico com hospedagem na Pousada Maravilha. Inclui mergulho e trilhas ecológicas.",
                    Destination = "Fernando de Noronha",
                    Price = 4500.00m,
                    Active = true,
                    Promotion = false,
                    StartDate = DateTime.Now.AddDays(90),
                    EndDate = DateTime.Now.AddDays(97),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new TravelPackage
                {
                    TravelPackageId = 5,
                    Title = "Salvador Cultural",
                    Description = "Mergulhe na cultura baiana com hospedagem no Fasano Salvador. City tour pelo Pelourinho incluído.",
                    Destination = "Salvador",
                    Price = 2100.00m,
                    Active = true,
                    Promotion = true,
                    StartDate = DateTime.Now.AddDays(75),
                    EndDate = DateTime.Now.AddDays(79),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new TravelPackage
                {
                    TravelPackageId = 6,
                    Title = "Gramado Romântico",
                    Description = "Charme da Serra Gaúcha no Casa Grande Hotel Resort. Inclui degustações e passeios românticos.",
                    Destination = "Gramado",
                    Price = 1890.00m,
                    Active = true,
                    Promotion = false,
                    StartDate = DateTime.Now.AddDays(50),
                    EndDate = DateTime.Now.AddDays(54),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new TravelPackage
                {
                    TravelPackageId = 7,
                    Title = "Praia do Forte All Inclusive",
                    Description = "Resort all inclusive no Tivoli Ecoresort. Inclui todas as refeições e atividades aquáticas.",
                    Destination = "Praia do Forte",
                    Price = 3800.00m,
                    Active = true,
                    Promotion = true,
                    StartDate = DateTime.Now.AddDays(40),
                    EndDate = DateTime.Now.AddDays(47),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new TravelPackage
                {
                    TravelPackageId = 8,
                    Title = "São Paulo Premium",
                    Description = "Experiência premium no Hotel Emiliano. Inclui jantares em restaurantes estrelados.",
                    Destination = "São Paulo",
                    Price = 2950.00m,
                    Active = true,
                    Promotion = false,
                    StartDate = DateTime.Now.AddDays(35),
                    EndDate = DateTime.Now.AddDays(38),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new TravelPackage
                {
                    TravelPackageId = 9,
                    Title = "Trancoso Boutique",
                    Description = "Charme e sofisticação na Pousada Etnia. Inclui passeios pela Costa do Descobrimento.",
                    Destination = "Trancoso",
                    Price = 3150.00m,
                    Active = true,
                    Promotion = false,
                    StartDate = DateTime.Now.AddDays(80),
                    EndDate = DateTime.Now.AddDays(86),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new TravelPackage
                {
                    TravelPackageId = 10,
                    Title = "Salvador Histórico",
                    Description = "Imersão na história brasileira no Hotel Villa Bahia. City tour pelo centro histórico incluído.",
                    Destination = "Salvador",
                    Price = 1680.00m,
                    Active = true,
                    Promotion = true,
                    StartDate = DateTime.Now.AddDays(55),
                    EndDate = DateTime.Now.AddDays(59),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new TravelPackage
                {
                    TravelPackageId = 11,
                    Title = "Búzios Charmoso",
                    Description = "Relax e charme na Pousada do Toby. Inclui passeios de barco pelas praias mais belas.",
                    Destination = "Búzios",
                    Price = 2240.00m,
                    Active = true,
                    Promotion = false,
                    StartDate = DateTime.Now.AddDays(65),
                    EndDate = DateTime.Now.AddDays(70),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new TravelPackage
                {
                    TravelPackageId = 12,
                    Title = "Amazônia Aventura",
                    Description = "Aventura na floresta amazônica no Amazonia Golf Resort. Inclui pesca esportiva e trilhas ecológicas.",
                    Destination = "Manaus",
                    Price = 2780.00m,
                    Active = true,
                    Promotion = false,
                    StartDate = DateTime.Now.AddDays(100),
                    EndDate = DateTime.Now.AddDays(107),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                }
            };

            modelBuilder.Entity<TravelPackage>().HasData(packages);
        }
    }
}
