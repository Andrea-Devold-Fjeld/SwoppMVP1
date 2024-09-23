using Microsoft.AspNetCore.Identity;

namespace SwoppMVP1.Server.DAL;

public class UserClaim : IdentityUserClaim<string>
{
    public bool TransporterClaim { get; set; }
    
}