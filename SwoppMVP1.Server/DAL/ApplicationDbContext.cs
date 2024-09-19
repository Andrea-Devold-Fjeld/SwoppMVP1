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
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            //options.UseLazy
        }
    }
}
