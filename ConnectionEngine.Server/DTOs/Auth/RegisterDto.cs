namespace ConnectionEngine.Server.DTOs.Auth
{
      
    public class RegisterDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; }= string.Empty;
    }
    public class Verify2FADto
    {
        public string Email { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
    }


}
