using ConnectionEngine.Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace ConnectionEngine.Server.Data
{
    public class AppDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<AppUser> Users { get; set; }
    }

}
