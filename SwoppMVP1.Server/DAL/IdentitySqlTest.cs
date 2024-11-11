using System.Data.Common;
using Microsoft.EntityFrameworkCore.Migrations;
//using System.Data.Entity.Migrations.History;


namespace SwoppMVP1.Server.DAL;

/*
public class IdentitySqlTest
{
    public class MySqlHistoryContext : HistoryContext
    {
        public MySqlHistoryContext(
            DbConnection existingConnection,
            string defaultSchema)
            : base(existingConnection, defaultSchema)
        {
        }
 
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<HistoryRow>().Property(h => h.MigrationId).HasMaxLength(100).IsRequired();
            modelBuilder.Entity<HistoryRow>().Property(h => h.ContextKey).HasMaxLength(200).IsRequired();
        }
    }
    
}
*/