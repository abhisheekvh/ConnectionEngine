using ConnectionEngine.Server.Entities;
using ConnectionEngine.Server.Enums;
using System.ComponentModel.DataAnnotations;

namespace ConnectionEngine.Server.DTOs.User
{
    public class UserProfile
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string? UserId { get; set; }   // FK to ApplicationUser

        [Required]
        [MaxLength(100)]
        public string? Name { get; set; }

        [Range(18, 120)]
        public int Age { get; set; }

        [Required]
        public Gender Gender { get; set; }

        [MaxLength(500)]
        public string? Bio { get; set; }

        public string? City { get; set; }

        public string? Country { get; set; }

        public bool IsProfileCompleted { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation
        public ApplicationUser User { get; set; }

        public UserLocation? Location { get; set; }

        public UserPreferences? Preferences { get; set; }
    }
}
