using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SwoppMVP1.Server.DAL;
using SwoppMVP1.Server.Model;

namespace SwoppMVP1.Server.Controllers;

public class PacketController : Controller
{
    private readonly IPacketRepository _repository;

    public PacketController(IPacketRepository repository)
    {
        _repository = repository;
    }
    //I dont have authorize yet on these method
    [HttpGet]
    [Route("api/[controller]/[action]")]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IEnumerable<Packet>> GetPackets()
    {
        return await _repository.GetPacketsAsync();
    }

    [HttpGet]
    [Route("api/[controller]/[action]")]
    [Produces("application/json")]
    public async Task<IEnumerable<Packet>> GetPacketsByUserId(Guid userId)
    {
        return await _repository.GetPacketsByUserIdAsync(userId);
    }
    
    [HttpPost]
    [Route("api/[controller]/[action]")]
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
    [Route("api/[controller]/[action]")]
    [Produces("application/json")]
    public async Task<IEnumerable<Packet>> GetAvailablePackets()
    {
        return await _repository.GetAvailablePacketsAsync();
    }

    [HttpPost]
    [Route("api/[controller]/[action]")]
    [Produces("application/json")]
    public async Task<bool> SetAvailablePacketWithId(Guid Id, bool available)
    {
        return await _repository.SetPacketAvailabilityAsync(Id, available);
    }

    [HttpPost]
    [Route("api/[controller]/[action]")]
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
    [Route("api/[controller]/[action]")]
    [Produces("application/json")]
    public async Task<bool> DeletePacket(Guid packetId)
    {
        return await _repository.DeletePacketAsync(packetId);
    }
    
}