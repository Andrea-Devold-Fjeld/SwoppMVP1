namespace SwoppMVP1.Server.Service;

public interface IJwtTokenManager
{
    public string Authenticate(string username, string password);
}