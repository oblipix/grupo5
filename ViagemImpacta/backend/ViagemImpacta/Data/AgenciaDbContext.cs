using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Models;

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
                entity.Property(e => e.Name).HasMaxLength(100).IsRequired();
                entity.Property(e => e.AverageDailyPrice).HasColumnType("decimal(18,2)");
                entity.Property(e => e.Available).HasDefaultValue(true);
                
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
                entity.Property(e => e.SpecialRequests).HasMaxLength(500);
                
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
