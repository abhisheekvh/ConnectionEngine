using ConnectionEngine.Server.Data;
using ConnectionEngine.Server.DTOs.User;
using Microsoft.EntityFrameworkCore;

namespace ConnectionEngine.Server.Repositories
{
    public class UserRepository:IUserRepository
    {
        private readonly AppDbContext _context;
        public UserRepository(AppDbContext context) => this._context = context;
        
        public async Task<Guid> CreateUserProfile(UserProfile userProfile, string userId, CancellationToken token)
        {
            var exists = await _context.UserProfiles.AnyAsync(x => x.UserId == userId, token);

            if (exists)
                throw new InvalidOperationException("User profile already exists");

            var profile = new UserProfile
            {
                UserId = userId,
                Name = userProfile.Name,
                Age = userProfile.Age,
                Gender = userProfile.Gender,
                Bio = userProfile.Bio,
                City = userProfile.City,
                Country = userProfile.Country,
                CreatedAt = DateTime.UtcNow,
                IsProfileCompleted = true
            };

            _context.UserProfiles.Add(profile);

            await _context.SaveChangesAsync(token);

            return profile.Id;
        }
        public async Task UpdateUserLocation(UserLocation location, string userId, CancellationToken token)
        {
            var profileId = await _context.UserProfiles
               .Where(x => x.UserId == userId)
               .Select(x => x.Id)
               .FirstOrDefaultAsync(token);

            if (profileId == Guid.Empty)
            {
               
            }
            var userLocation = await _context.UserLocations
                .SingleOrDefaultAsync(x => x.UserProfileId == profileId, token);
            if (userLocation == null)
            {
                location.UserProfileId = profileId;
                location.UpdatedAt = DateTime.UtcNow;
                _context.UserLocations.Add(location);
            }
            else
            {
                userLocation.Lattitude = location.Lattitude;
                userLocation.Longitude = location.Longitude;
                userLocation.UpdatedAt = DateTime.UtcNow;
            }
            await _context.SaveChangesAsync(token);
        }
        public async Task UpdateUserPreference(UserPreferences preferences, string userId, CancellationToken token)
        {
            var profileId = await _context.UserProfiles
                .Where(x => x.UserId == userId)
                .Select(x => x.Id)
                .FirstOrDefaultAsync(token);

            if (profileId == Guid.Empty)
                throw new InvalidOperationException("User profile not found");

            var pref = await _context.UserPreferences
                .FirstOrDefaultAsync(x => x.UserProfileId == profileId, token);

            if (pref == null)
            {
                preferences.UserProfileId = profileId;
                preferences.UpdatedAt = DateTime.UtcNow;

                _context.UserPreferences.Add(preferences);
            }
            else
            {
                pref.InterestedIn = preferences.InterestedIn;
                pref.MinPreferredAge = preferences.MinPreferredAge;
                pref.MaxPreferredAge = preferences.MaxPreferredAge;
                pref.MaxDistanceKm = preferences.MaxDistanceKm;
                pref.ShowMeOnApp = preferences.ShowMeOnApp;
                pref.UpdatedAt = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync(token);
        }
    }
}
