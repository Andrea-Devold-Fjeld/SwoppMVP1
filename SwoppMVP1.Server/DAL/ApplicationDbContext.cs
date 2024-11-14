using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SwoppMVP1.Server.Model;

namespace SwoppMVP1.Server.DAL
{
    public class ApplicationDbContext : IdentityDbContext
    {
        //private static string host = Environment.GetEnvironmentVariable("_DB_HOST");
        //private static string user = Environment.GetEnvironmentVariable("_DB_USER");
        //private static string password = Environment.GetEnvironmentVariable("_DB_PASSWORD");
        //private static string database = Environment.GetEnvironmentVariable("_DB_DATABASE");
        //private readonly string connectionString = $"Server={host}; User ID={user}; Password={password}; Database={database}";
        static readonly string connectionString = "Server=localhost; User ID=root; Password=swopp; Database=swopp";

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
        
        public DbSet<Packet> Packets { get; set; }
        public DbSet<Delivery> Deliveries { get; set; }
   

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Delivery>()
                .HasMany(e => e.Packets)
                .WithOne(e => e.Delivery)
                .HasForeignKey(e => e.DeliveryId)
                .IsRequired(false);
            base.OnModelCreating(builder);
        }
    }
}
