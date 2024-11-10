using Microsoft.AspNetCore.Mvc;

namespace SwoppMVP1.Server.Controllers;

public class GoogleMapsApiKey : Controller
{
    [HttpGet]
    [Route("[controller]/[action]")]
    public string? GetGoogleMapsApiKey()
    {
        return Environment.GetEnvironmentVariable("VITE_GOOGLE_MAPS_API_KEY");
    }
    
}