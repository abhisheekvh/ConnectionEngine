using ConnectionEngine.Server.DTOs.User;
using ConnectionEngine.Server.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace ConnectionEngine.Server.Data
{
    public class AppDbContext:IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<UserLocation> UserLocations { get; set; }
        public DbSet<UserPreferences> UserPreferences { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // ApplicationUser → UserProfile (1:1)
            builder.Entity<ApplicationUser>()
                .HasOne(u => u.UserProfile)
                .WithOne(p => p.User)
                .HasForeignKey<UserProfile>(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // UserProfile → UserLocation (1:1)
            builder.Entity<UserProfile>()
                .HasOne(p => p.Location)
                .WithOne(l => l.UserProfile)
                .HasForeignKey<UserLocation>(l => l.UserProfileId)
                .OnDelete(DeleteBehavior.Cascade);

            // UserProfile → UserPreferences (1:1)
            builder.Entity<UserProfile>()
                .HasOne(p => p.Preferences)
                .WithOne(pr => pr.UserProfile)
                .HasForeignKey<UserPreferences>(pr => pr.UserProfileId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserProfile>()
                .HasIndex(p => p.UserId).IsUnique();
            builder.Entity<UserLocation>()
                .HasIndex(l => new { l.Lattitude, l.Longitude });

            builder.Entity<UserPreferences>()
                    .HasIndex(p => new { p.MinPreferredAge, p.MaxPreferredAge });
        }
    }

}
