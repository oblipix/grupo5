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
        public DbSet<ReservationBook> ReservationBooks { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Reservation> Reservations { get; set; } = null!;
        public DbSet<Payment> Payments { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração explícita da relação Many-to-Many
            // O EF Core cria uma tabela de junção "HotelReservationBook" automaticamente
            modelBuilder.Entity<ReservationBook>()
                .HasMany(p => p.Hotels)
                .WithMany()
                .UsingEntity(j => j.ToTable("ReservationBookHotels")); // Se Hotel não tiver uma coleção de ReservationBook, essa é a forma mais simples.

            modelBuilder.Entity<ReservationBook>(entity =>
            {
                entity.HasKey(e => e.ReservationBookId);
                entity.Property(e => e.Title).HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(1000);
                entity.Property(e => e.Destination).HasMaxLength(100);
                entity.Property(e => e.FinalPrice).HasColumnType("decimal(18,2)");
            });

            // Hotel configuration
            modelBuilder.Entity<Hotel>(entity =>
            {
                entity.HasKey(e => e.HotelId);
                entity.Property(e => e.Name).HasMaxLength(200).IsRequired();
                entity.Property(e => e.HotelAddress).HasMaxLength(300);
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
        }
    }
}
