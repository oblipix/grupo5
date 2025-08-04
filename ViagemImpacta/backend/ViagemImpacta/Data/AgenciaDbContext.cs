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
                    Password = "$2a$11$zMC5qcoZXYNaPQasD9OkkOp14kasuLjc3XPDJPH9m2PDZEji0n8Oi", //senha: admin
                    FirstName = "Administrador",
                    LastName = "Tripz",
                    Phone = "+5581954320943",
                    Cpf = "123987345-09",
                    CreatedAt = DateTime.Now,
                    Active = true,
                    Role = Roles.Admin,
                },
                new User
                {
                    UserId = 2,
                    Email = "maia@tripz.com",
                    Password = "$2a$12$gJ9mxxNfkiJldbOPnghtuOLv7GFz9.VWUZsHmV.y9abuaruVjc7Am", //senha: equipetripz
                    FirstName = "Maia",
                    LastName = "",
                    Phone = "+5581954320943",
                    Cpf = "123987345-09",
                    CreatedAt = DateTime.Now,
                    Active = true,
                    Role = Roles.Attendant,
                }
            );
        }
    }
}
