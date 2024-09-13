using Microsoft.AspNetCore.Identity;

namespace SwoppMVP1.Server.Model
{
    public class UserModel : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

}
