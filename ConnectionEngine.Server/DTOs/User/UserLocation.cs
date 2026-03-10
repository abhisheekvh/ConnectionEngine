using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConnectionEngine.Server.DTOs.User
{
    public class UserLocation
    {
        [Key]
        public Guid Id { get; set; }=Guid.NewGuid();
        [Required]
        public Guid UserProfileId { get; set; }
        public double Lattitude { get; set; }
        public double Longitude { get; set; }

        public DateTime UpdatedAt { get; set; }=DateTime.Now;
        [ForeignKey(nameof(UserProfileId))]
        public UserProfile? UserProfile { get; set; }
    }
}
