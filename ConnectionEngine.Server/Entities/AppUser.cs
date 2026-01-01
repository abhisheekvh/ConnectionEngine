namespace ConnectionEngine.Server.Entities
{
    public class AppUser
    {
        //Guid
        public Guid Id { get; set; } = Guid.CreateVersion7();
        public required string DisplayName { get; set; }
        public required string Email { get; set; }
    }
}
