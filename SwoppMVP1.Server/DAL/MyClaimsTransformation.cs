using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

namespace SwoppMVP1.Server.DAL;

public class MyClaimsTransformation : IClaimsTransformation
{
    public Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
    {
        ClaimsIdentity identity = new ClaimsIdentity();
        var claimType = "transporter";
        if (!principal.HasClaim(claim => claim.Type == claimType))
        {
            identity.AddClaim(new Claim(claimType, "transporterClaim"));
        }
        
        principal.AddIdentity(identity);
        return Task.FromResult(principal);
    }
}