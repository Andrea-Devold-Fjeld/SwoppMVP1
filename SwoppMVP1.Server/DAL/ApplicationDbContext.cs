using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SwoppMVP1.Server.Model;

namespace SwoppMVP1.Server.DAL
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
        
        public DbSet<Packet> Packets { get; set; }
        public DbSet<Delivery> Deliveries { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Packet>()
                .Navigation(p => p.Delivery)
                .UsePropertyAccessMode(PropertyAccessMode.Property);
            builder.Entity<Delivery>()
                .Navigation(p => p.Packets)
                .UsePropertyAccessMode(PropertyAccessMode.Property);
            base.OnModelCreating(builder);
        }
    }
}
