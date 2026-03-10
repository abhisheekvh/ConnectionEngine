using ConnectionEngine.Server.DTOs.User;
using Microsoft.AspNetCore.Identity;

namespace ConnectionEngine.Server.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public UserProfile? UserProfile { get; set; }
    }
}
