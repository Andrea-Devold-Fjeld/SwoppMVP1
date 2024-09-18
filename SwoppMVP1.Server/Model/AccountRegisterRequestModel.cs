using Microsoft.AspNetCore.Identity;

namespace SwoppMVP1.Server.Model;

public class AccountRegisterRequestModel : IdentityUser
{
    public string Username { get; set; }
    public string Password { get; set; }
}