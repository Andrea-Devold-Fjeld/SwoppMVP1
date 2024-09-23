using Microsoft.AspNetCore.Identity;
using Microsoft.Build.Framework;

namespace SwoppMVP1.Server.Model;

public class AccountRegisterRequestModel : IdentityUser
{
    [Required]
    public string Username { get; set; }
    [Required]
    public string Password { get; set; }
}