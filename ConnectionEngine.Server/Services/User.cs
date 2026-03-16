using ConnectionEngine.Server.Data;
using ConnectionEngine.Server.DTOs.User;
using ConnectionEngine.Server.Repositories;
using ConnectionEngine.Server.Services;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ConnectionEngine.Server.Services
{
    public class User : IUser
    {
        private readonly AppDbContext _context;
        private readonly IUserRepository _userRepository;

        public User(AppDbContext context, IUserRepository userRepository)
        {
            _context = context;
            _userRepository = userRepository;
        }
        public async Task<Guid> CreateUserProfile(UserProfile userProfile, string userId, CancellationToken token)
        {
            return await _userRepository.CreateUserProfile(userProfile, userId, token);
        }
        public async Task UpdateUserLocation(UserLocation location, string userId, CancellationToken token)
        {
            await _userRepository.UpdateUserLocation(location, userId, token);
        }
        public async Task UpdateUserPreference(UserPreferences preferences, string userId, CancellationToken token)
        {
            await _userRepository.UpdateUserPreference(preferences, userId, token);

        }
    }
}
