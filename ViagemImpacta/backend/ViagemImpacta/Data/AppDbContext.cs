using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Models;

namespace ViagemImpacta.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Hotel> Hotels { get; set; } = null!;
        //public DbSet<Room> Rooms { get; set; } = null!;
        //public DbSet<Review> Reviews { get; set; } = null!;
        public DbSet<TravelPackage> TravelPackages { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        //public DbSet<Reservation> Reservations { get; set; } = null!;
        //public DbSet<Payment> Payments { get; set; } = null!;
    }
}
