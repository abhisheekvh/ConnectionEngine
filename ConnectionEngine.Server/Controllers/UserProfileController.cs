using ConnectionEngine.Server.Data;
using ConnectionEngine.Server.DTOs.User;
using ConnectionEngine.Server.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ConnectionEngine.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UserProfileController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IUser _userService;

        public UserProfileController(AppDbContext context, IUser _userService)
        {
            _context = context;
            this._userService = _userService;
        }

        [HttpPost("createprofile")]
        public async Task<IActionResult> CreateProfile([FromBody] UserProfile userProfile, CancellationToken token)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            userProfile.UserId = userId;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var id = await _userService.CreateUserProfile(userProfile, userId, token);

            return Ok(new
            {
                message = "User profile created",
                profileId = id
            });
        }

      
        [HttpPost("location")]
        public async Task<IActionResult> UpdateLocation(UserLocation location, CancellationToken token)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            await _userService.UpdateUserLocation(location, userId, token);

            return Ok(new
            {
                message = "Location updated"
            });
        }

        
        [HttpPost("preferences")]
        public async Task<IActionResult> UpdatePreferences(UserPreferences preferences, CancellationToken token)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            await _userService.UpdateUserPreference(preferences, userId, token);

            return Ok(new
            {
                message = "Preferences updated"
            });
        }
    }
}