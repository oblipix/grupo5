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
        public DbSet<PasswordResetToken> PasswordResetTokens { get; set; }

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
                }
            );
            modelBuilder.Entity<Room>().HasData(
    new Room
    {
        RoomId = 1,
        HotelId = 1, // Hotel Copacabana Palace
       
        Capacity = 2,
        AverageDailyPrice = 1200.00m,
        Description = "Suíte luxo com vista para o mar, cama king size, ar-condicionado e varanda."
    },
    new Room
    {
        RoomId = 2,
        HotelId = 1, // Hotel Copacabana Palace
       
        Capacity = 2,
        AverageDailyPrice = 800.00m,
        Description = "Quarto standard confortável, cama queen size, ar-condicionado."
    },
    new Room
    {
        RoomId = 3,
        HotelId = 2, // Hotel Serra Gaúcha
       
        Capacity = 4,
        AverageDailyPrice = 950.00m,
        Description = "Quarto familiar amplo, duas camas de casal, vista para o jardim."
    },
    new Room
    {
        RoomId = 4,
        HotelId = 2, // Hotel Serra Gaúcha
        
        Capacity = 2,
        AverageDailyPrice = 1100.00m,
        Description = "Suíte luxo com lareira, cama king size, varanda privativa."
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

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    UserId = 1,
                    Email = "admin@tripz.com",
                    Password = "$2a$11$zMC5qcoZXYNaPQasD9OkkOp14kasuLjc3XPDJPH9m2PDZEji0n8Oi",
                    FirstName = "Tripz",
                    LastName = "Admin",
                    Phone = "+5581954320943",
                    Cpf = "123987345-09",
                    CreatedAt = DateTime.Now,
                    Active = true,
                    Role = Roles.Admin,
                }
            );
        }
    }
}
