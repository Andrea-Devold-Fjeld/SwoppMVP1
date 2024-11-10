using Microsoft.AspNetCore.Mvc;

namespace SwoppMVP1.Server.Controllers;

public class GoogleMapsApiKey : Controller
{
    [HttpGet]
    [Route("[controller]/[action]")]
    [Produces("application/json")]
    public async Task<string?> GetGoogleMapsApiKey()
    {
        var api = Environment.GetEnvironmentVariable("VITE_GOOGLE_MAPS_API_KEY");
        Console.WriteLine("api: " + api);
        return api;
    }
    
}