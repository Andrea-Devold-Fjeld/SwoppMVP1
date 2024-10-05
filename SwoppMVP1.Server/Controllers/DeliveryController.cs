using System.Data.Common;
using System.Net;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SQLitePCL;
using SwoppMVP1.Server.DAL;
using SwoppMVP1.Server.Model;

namespace SwoppMVP1.Server.Controllers;

public class DeliveryController : Controller
{
    private readonly IDeliveryRepository _repository;
    private readonly IPacketRepository _packetRepository;
    private readonly ApplicationDbContext _context;
    private readonly UserManager<IdentityUser> _userManager;

    public DeliveryController(IDeliveryRepository repository, ApplicationDbContext context, IPacketRepository packetRepository, UserManager<IdentityUser> userManager)
    {
        _repository = repository;
        _context = context;
        _packetRepository = packetRepository;
        _userManager = userManager;
    }
    
    [Authorize]
    [HttpGet]
    [Route("[controller]/[action]")]
    public async Task<IEnumerable<Delivery>> GetDeliveries()
    {
        return await _repository.GetAllDeliveriesAsync();

    }
    [Authorize]
    [HttpGet]
    [Route("[controller]/[action]")]
    public async Task<IEnumerable<DeliveryDTO>> GetDeliveriesWithPackets()
    {
        //#TODO this works now but i have to fix somethings with the packet object
        var deliveries = await _repository.GetDeliveriesWithPacketsAsync();
        var deliveriesWithPackets = deliveries.ToList();
        foreach (var delivery in deliveriesWithPackets)
        {
           var packets = await _packetRepository.GetPacketsByDeliveryId(delivery.DeliveryId.ToString());
           delivery.Packets = (ICollection<PacketDTO>)packets;
        }
        
        return deliveriesWithPackets;
    }
    
    [Authorize]
    [HttpGet]
    [Route("[controller]/[action]")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IEnumerable<Delivery?>> GetDeliveryByUserId()
    {
        var identifier = User.FindFirst(ClaimTypes.NameIdentifier);
        IEnumerable<Delivery> deliveries = await _repository.GetAllDeliveriesByUserIdAsync(identifier.Value);
        var deliveryByUserId = deliveries.ToList();
        if (deliveryByUserId.Any())
        {
            return await _repository.GetAllDeliveriesByUserIdAsync(identifier.Value);
        }
        else
        {
            return deliveryByUserId;
        }
        
    }
    [Authorize(Policy = "TransporterOnly")]
    [HttpPost]
    [Route("[controller]/[action]")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<HttpResponseMessage> AddDelivery(Delivery? delivery)
    {
        var identifier = User.FindFirst(ClaimTypes.NameIdentifier);
        var claim = User.Claims.FirstOrDefault(x => x.Type == "Transporter"); 
        if (claim?.Value != "true") return new HttpResponseMessage(HttpStatusCode.Forbidden);

        if (delivery is null) return new HttpResponseMessage(HttpStatusCode.BadRequest);
        
        await _repository.AddDeliveryAsync(delivery);
        await _context.SaveChangesAsync();
        return new HttpResponseMessage(HttpStatusCode.Created);
    }
    
    [Authorize(Policy = "TransporterOnly")]
    [HttpGet]
    [Route("api/[controller]/[action]")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<HttpResponseMessage> AddPacketToDelivery(string packetId, string deliveryId)
    {
        var identifier = User.FindFirst(ClaimTypes.NameIdentifier);
        var claim = User.Claims.FirstOrDefault(x => x.Type == "Transporter"); 
        if (claim?.Value != "true") return new HttpResponseMessage(HttpStatusCode.Forbidden);
        
        // #TODO does not work have to fix!!!!
        var delivery = await _repository.GetDeliveryByIdAsync(deliveryId);
        if (delivery is null) return new HttpResponseMessage(HttpStatusCode.BadRequest);
        
        var packet = await _packetRepository.GetPacketAsync(packetId);
        if (packet is null) return new HttpResponseMessage(HttpStatusCode.NotFound);
        
        await _repository.AddPacketToDeliverAsync(delivery.DeliveryId.ToString(), packetId);
        await _context.SaveChangesAsync();
        return new HttpResponseMessage(HttpStatusCode.Created);
    }
}