using System.Collections.Generic;

namespace ViagemImpacta.Data
{
    public class AppDbContext
    {

        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Models.Hotel> Hoteis { get; set; } = null!;
        public DbSet<Model.Produto> Produtos { get; set; } = null!;
        public DbSet<Model.Cliente> Clientes { get; set; } = null!;
        public DbSet<Model.Venda> Vendas { get; set; } = null!;


    }
}
