using System.ComponentModel.DataAnnotations;

namespace SwoppMVP1.Server.Model
{   
    //Model that are used when an user attempts to login
    public class AccountLoginRequestModel
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }

        [Required]
        public string Expire { get; set; }
    }
}
