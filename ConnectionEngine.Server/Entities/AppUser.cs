namespace ConnectionEngine.Server.Entities
{
    public class AppUser
    {
        public Guid Id { get; set; } = Guid.CreateVersion7();
    }
}
