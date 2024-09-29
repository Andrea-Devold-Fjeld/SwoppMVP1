using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
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
        private readonly IConfiguration _config;
        private readonly ApplicationDbContext _context;


        public AccountController(IConfiguration config, UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager, ApplicationDbContext context, RoleManager<IdentityRole> roleManager)
        {
            _config = config;
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
        }
        
        /**
         * Method to check if a given user has the transporter claim
         */
        [HttpGet]
        [AllowAnonymous]
        [Route("[controller]/[action]")]
        [Produces("application/json")]
        public async Task<Claim?> GetCheckTransporterRole(Guid userId)
        {
            var claimType = "Transporter";
            var claimValue = "true";
            
            //Get user with usermanager
            var user = await _userManager.FindByIdAsync(userId.ToString());
            
            //check if user exist
            if (user == null) return new Claim("Transporter", "false");
            {
                //Get the claims of the user and check if the user has the transporter claim
                var userClaim = await _userManager.GetClaimsAsync(user);
                foreach (var claim in userClaim)
                {
                    if (claim.Type == claimType && claim.Value == claimValue)
                    {
                        return claim;
                    }
                }
            }
            //If not return false
            return new Claim("Transporter", "false");

        }
        
        /**
         * Method to give a user with userId the transporter claim,
         * return IdentityResult.success if succesfull and IdentityResult.Feiled if not
         * #TODO check if there is better return values
         */
        [HttpPost]
        [Authorize]
        [Route("[controller]/[action]")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IdentityResult> SetTransporterRole(Guid userId)
        {
            //Find user and check if exists
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user != null)
            {
                try
                {
                    //#TODO make a tranpsorter claim object
                    Claim claim = new Claim("Transporter", "true");
                    await _userManager.AddClaimAsync(user, claim);
                    await _context.SaveChangesAsync(default(CancellationToken));
                    return IdentityResult.Success;
                }
                catch (Exception ex)
                {
                    return IdentityResult.Failed();
                }

            }
            return IdentityResult.Failed();
        }
            
        /**
         * Login method that return a JWT token that are used to authorize further request
         */
        [Authorize]  //"Bearer " + token
        [HttpPost]
        [AllowAnonymous]
        [Route("[controller]/[action]")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<AccountLoginResponseModel> Login([FromBody] AccountLoginRequestModel request)
        {
            Console.WriteLine(request.Username + ":" + request.Password + ":" + request.Expire);
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
        
        /**
         * Method to register new users
         */
        [HttpPost]
        [AllowAnonymous]
        [Route("[controller]/[action]")]
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
                await _context.SaveChangesAsync();
                //await _signInManager.SignInAsync(user, false);
                return string.Format("{0},{1}", user.Id, user.UserName);
            }
            return string.Format("Not succesfull");
        }
        /**
         * Private method to generate a JWT token
         */
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

