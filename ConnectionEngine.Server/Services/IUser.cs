using ConnectionEngine.Server.DTOs.User;

namespace ConnectionEngine.Server.Services
{
    
        public interface IUser
        {
            Task<Guid> CreateUserProfile(UserProfile userProfile, string userId, CancellationToken token);
            Task UpdateUserLocation(UserLocation location, string userId, CancellationToken token);
            Task UpdateUserPreference(UserPreferences preferences, string userId, CancellationToken token);
        }
    
}
