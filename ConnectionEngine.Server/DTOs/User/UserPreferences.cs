using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConnectionEngine.Server.DTOs.User
{
    public class UserPreferences
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid UserProfileId { get; set; }

        [Required]
        [MaxLength(20)]
        public required string InterestedIn { get; set; }  // e.g., Male, Female, Everyone

        [Range(18, 120, ErrorMessage = "Minimum preferred age must be between 18 and 120.")]
        public int MinPreferredAge { get; set; } = 18;

        [Range(18, 120, ErrorMessage = "Maximum preferred age must be between 18 and 120.")]
        public int MaxPreferredAge { get; set; } = 40;

        [Range(1, 500, ErrorMessage = "Max distance must be between 1 and 500 km.")]
        public int MaxDistanceKm { get; set; } = 50;

        public bool ShowMeOnApp { get; set; } = true;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

 
        [ForeignKey(nameof(UserProfileId))]
        public UserProfile UserProfile { get; set; }
    }
}
