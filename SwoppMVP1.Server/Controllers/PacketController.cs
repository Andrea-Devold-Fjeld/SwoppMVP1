using System.Security.Claims;
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
    private readonly UserManager<IdentityUser> _userManager;

    public PacketController(IPacketRepository repository, UserManager<IdentityUser> userManager)
    {
        _repository = repository;
        _userManager = userManager;
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
    [Route("[controller]/[action]")]
    [Produces("application/json")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IEnumerable<Packet>> GetPacketsByUserId()
    {
        var identifier = User.FindFirst(ClaimTypes.NameIdentifier);
        if (identifier != null)
        {
            var packets = await _repository.GetPacketsByUserIdAsync(identifier.Value);
            Console.WriteLine(packets);
            return packets;
        }
        return new List<Packet>();
    }
    
    [HttpPost]
    [Route("[controller]/[action]")]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [Authorize]
    public async Task<bool> AddPacket([FromBody]AddPacketDTO packetDto)
    {
        Console.WriteLine(ModelState.IsValid);
        if(!ModelState.IsValid) return false;
        try
        {
            var identifier = User.FindFirst(ClaimTypes.NameIdentifier); 
            var user = await _userManager.FindByIdAsync(identifier.Value); 
            if (user == null) return false;
    
            var packet = new Packet
            {
                Title = packetDto.Title,
                UserId = user.Id,
                Timestamp = DateTime.Now,
                OriginAddress = packetDto.OriginAddress,
                DestinationAddress = packetDto.DestinationAddress,
                Weight = packetDto.Weight,
                Height = packetDto.Height,
                Width = packetDto.Width,
                Depth = packetDto.Depth,
                Message = packetDto.Message,
                OriginLatitude = packetDto.OriginLatitude,
                OriginLongitude = packetDto.OriginLongitude,
                DestinationLatitude = packetDto.DestinationLatitude,
                DestinationLongitude = packetDto.DestinationLongitude,
                Available = true
            };
            await _repository.CreatePacketAsync(packet);
            return true;
            /*

            packet.UserId = user.Id;
            packet.Timestamp = DateTime.Now;
            await _repository.CreatePacketAsync(packet);
            return true;
            */
            
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
    
    [HttpGet]
    [Route("[controller]/[action]")]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [AllowAnonymous]
    public async Task<Packet?> GetPacketById(string Id)
    {
        return await _repository.GetPacketAsync(Id);
    }

    [HttpPost]
    [Route("[controller]/[action]")]
    [Produces("application/json")]
    public async Task<bool> SetAvailablePacketWithId(string Id, bool available)
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
    public async Task<bool> DeletePacket(string packetId)
    {
        return await _repository.DeletePacketAsync(packetId);
    }
    
}