namespace ConnectionEngine.Server.DTOs.Auth
{
    public record LoginDto(string Email, string Password, string Otp);
}
