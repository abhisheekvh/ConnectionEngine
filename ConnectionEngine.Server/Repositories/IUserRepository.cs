using ConnectionEngine.Server.DTOs.User;

namespace ConnectionEngine.Server.Repositories
{
    public interface IUserRepository
    {
        Task<Guid> CreateUserProfile(UserProfile userProfile, string userId, CancellationToken token);
        Task UpdateUserLocation(UserLocation location, string userId, CancellationToken token);
        Task UpdateUserPreference(UserPreferences preferences, string userId, CancellationToken token);
    }
}
