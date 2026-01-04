using Microsoft.AspNetCore.Identity;

namespace ConnectionEngine.Server.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public bool Is2FAEnabled { get; set; }
    }
}
