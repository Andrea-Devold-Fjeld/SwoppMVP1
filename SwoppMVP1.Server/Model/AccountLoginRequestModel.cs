using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace SwoppMVP1.Server.Model
{   
    //Model that are used when an user attempts to login
    [Serializable]
    public class AccountLoginRequestModel
    {

        public string Username { get; set; }

        public string Password { get; set; }

        public string Expire { get; set; }
    }
}
