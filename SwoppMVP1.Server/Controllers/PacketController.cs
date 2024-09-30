using System.Security.Claims;
using System.Security.Principal;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SwoppMVP1.Server.DAL;
using SwoppMVP1.Server.Model;

namespace SwoppMVP1.Server.Controllers;

public class PacketController : Controller
{
    private readonly IPacketRepository _repository;
    private readonly IPrincipal _user;
    private readonly UserManager<IdentityUser> _manager;

    public PacketController(IPacketRepository repository, IPrincipal user, UserManager<IdentityUser> manager)
    {
        _repository = repository;
        _user = user;
        _manager = manager;
    }
    //I dont have authorize yet on these method
    [HttpGet]
    [Route("[controller]/[action]")]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IEnumerable<Packet>> GetPackets()
    {
        return await _repository.GetPacketsAsync();
    }

    [HttpGet]
    [Authorize]
    [Route("[controller]/[action]")]
    [Produces("application/json")]
    public async Task<IEnumerable<Packet>> GetPacketsByUserId()
    {
        var userId = _user?.Identity?.Name;
        var userTest = User.FindFirst(ClaimTypes.NameIdentifier);
        Console.WriteLine(userTest);
        var user = _manager.Users.FirstOrDefault(u => u.Id == userId);
        //var getuser = _manager.GetUserAsync(_user.Identity?).GetAwaiter().GetResult();
        return await _repository.GetPacketsByUserIdAsync(userTest.Value);
    }
    
    [HttpPost]
    [Route("[controller]/[action]")]
    [Produces("application/json")]
    public async Task<bool> AddPacket(Packet packet)
    {
        try
        {
            await _repository.CreatePacketAsync(packet);
            return true;
        }
        catch (Exception e)
        {
            //#TODO better errorhandling
            return false;
        }
    }

    [HttpGet]
    [Route("[controller]/[action]")]
    [Produces("application/json")]
    public async Task<IEnumerable<Packet>> GetAvailablePackets()
    {
        return await _repository.GetAvailablePacketsAsync();
    }

    [HttpPost]
    [Route("[controller]/[action]")]
    [Produces("application/json")]
    public async Task<bool> SetAvailablePacketWithId(Guid Id, bool available)
    {
        return await _repository.SetPacketAvailabilityAsync(Id, available);
    }

    [HttpPost]
    [Route("[controller]/[action]")]
    [Produces("application/json")]
    public async Task<bool> UpdatePacket(Packet packet)
    {
        try
        {
            await _repository.UpdatePacketAsync(packet);
            return true;
        }
        catch (Exception e)
        {
            //#TODO better errorhandling
            return false;
        }
    }

    [HttpDelete]
    [Route("[controller]/[action]")]
    [Produces("application/json")]
    public async Task<bool> DeletePacket(Guid packetId)
    {
        return await _repository.DeletePacketAsync(packetId);
    }
    
}