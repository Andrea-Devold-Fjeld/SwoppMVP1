using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SwoppMVP1.Server.DAL;
using SwoppMVP1.Server.Model;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;


namespace SwoppMVP1.Server.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _config;
        private readonly ApplicationDbContext _context;


        public AccountController(IConfiguration config, UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager, ApplicationDbContext context, RoleManager<IdentityRole> roleManager)
        {
            _config = config;
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
            _roleManager = roleManager;
        }

        [HttpPost]
        [Authorize]
        [Route("api/account/setTransporterRole")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IdentityResult> setTransporterRole(IdentityUser request)
        {
            /*
            var user = await _userManager.FindByNameAsync(request.UserName);
            var roles = await _userManager.GetRolesAsync(user);
            var check = _signInManager.IsSignedIn(User);
            var claim = new Claim("Transporter", user.Id);
      
            IdentityRole newRole = new IdentityRole("Transporter");
            var response = _roleManager.AddClaimAsync(newRole, claim);
            _context.SaveChanges();
            return response.Result;
            */
            return null;
        }
            
        
        [HttpPost]
        [AllowAnonymous]
        [Route("api/account/login")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<AccountLoginResponseModel> Login(AccountLoginRequestModel request)
        {
            
            var result = await _signInManager.PasswordSignInAsync(request.Username, request.Password, false, false);

            if (result.Succeeded)
            {
                var user = await _userManager.FindByNameAsync(request.Username);
                var userId = user.Id;
                var roles = await _userManager.GetRolesAsync(user);

                //logging out the user to be certain no existing session is active
                await _signInManager.SignOutAsync();
                
                var token = GenerateEncodedToken(userId, "", request.Expire, roles);

                return new AccountLoginResponseModel
                {
                    Token = token,
                    Expire = request.Expire
                };

            }
            else
            {
                return new AccountLoginResponseModel
                {
                    Token = "",
                    Expire = DateTime.Now
                };
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("api/account/register")]
        [Produces("application/json")]
        public async Task<string> Register(RegisterRequest request)
        {
            var user = new IdentityUser
            {
                UserName = request.Email,
                NormalizedUserName = request.Email.ToUpperInvariant(),
                Email = request.Email,
                NormalizedEmail = request.Email.ToUpperInvariant(),
                PasswordHash = request.Password
            };
            var createUser = await _userManager.CreateAsync(user, request.Password);

            if (createUser.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);
                return string.Format("{0},{1}", user.Id, user.UserName);
            }
            return string.Format("Not succesfull");
        }

        private string GenerateEncodedToken(string userId, string device, DateTime expire, IList<string> roles)
        {
            //initialize a list of claims for the JWT
            List<Claim> claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.Ticks.ToString(), ClaimValueTypes.Integer64),
                new Claim(ClaimTypes.System, device)
            };

            //If user has any roles add them to the claim list
            if (roles?.Any() == true)
            {
                foreach (var role in roles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role));
                }
            }
            if (Equals(_config.GetValue<string>("Token"), ""))
            {
                throw new Exception("Token key is missing in appsettings.json");
            }
            
            var token = new JwtSecurityToken(
                claims: claims,
                expires: expire,
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                    _config.GetValue<string>("Token"))), SecurityAlgorithms.HmacSha256Signature)
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}

