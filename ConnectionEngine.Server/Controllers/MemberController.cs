using ConnectionEngine.Server.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace ConnectionEngine.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class MemberController : ControllerBase
    {
        
            private readonly AppDbContext _context;

            public MemberController(AppDbContext context)
            {
                _context = context;
            }

            [HttpGet("profile")]
            public IActionResult Profile()
            {

                var userId = User.FindFirstValue(ClaimTypes.Email) 
                          ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub);

                if (userId == null)
                    return Unauthorized();

                return Ok(new
                {
                    userId
                });
            }
        }
    }

