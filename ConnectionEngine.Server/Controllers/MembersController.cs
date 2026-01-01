using ConnectionEngine.Server.Data;
using ConnectionEngine.Server.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ConnectionEngine.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppUser>>> GetMembers()
        {
            var members = await context.Users.AsNoTracking().ToListAsync();
            return members;
        }
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<AppUser>> GetMember(Guid id)
        {
            var member= await context.Users.AsNoTracking().SingleOrDefaultAsync(x => x.Id==id);
            if(member!=null)
            {
                return member;
            }
            return NotFound();
        }
    }
}
