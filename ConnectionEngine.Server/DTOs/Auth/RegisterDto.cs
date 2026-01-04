namespace ConnectionEngine.Server.DTOs.Auth
{
      public record RegisterDto(
            string Email,
            string Password
        );
    public class Verify2FADto
    {
        public string Email { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
    }


}
