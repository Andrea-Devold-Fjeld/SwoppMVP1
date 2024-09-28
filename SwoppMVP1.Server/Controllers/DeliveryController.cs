using System.Net;
using Microsoft.AspNetCore.Mvc;
using SQLitePCL;
using SwoppMVP1.Server.DAL;
using SwoppMVP1.Server.Model;

namespace SwoppMVP1.Server.Controllers;

public class DeliveryController
{
    private readonly IDeliveryRepository _repository;
    private readonly IPacketRepository _packetRepository;
    private readonly ApplicationDbContext _context;

    public DeliveryController(IDeliveryRepository repository, ApplicationDbContext context, IPacketRepository packetRepository)
    {
        _repository = repository;
        _context = context;
        _packetRepository = packetRepository;
    }

    [HttpGet]
    [Route("api/[controller]/[action]")]
    public async Task<IEnumerable<Delivery>> GetDeliveries()
    {
        return await _repository.GetAllDeliveriesAsync();

    }

    [HttpGet]
    [Route("api/[controller]/[action]")]
    public async Task<IEnumerable<Delivery>> GetDeliveriesWithPackets()
    {
        var deliveries = await _repository.GetDeliveriesWithPacketsAsync();
        var deliveriesWithPackets = deliveries.ToList();
        foreach (var delivery in deliveriesWithPackets)
        {
           var packets = await _packetRepository.GetPacketsByDeliveryId(delivery.DeliveryId);
           delivery.Packets = (ICollection<Packet>)packets;
        }
        
        return deliveriesWithPackets;
    }

    [HttpGet]
    [Route("api/[controller]/[action]")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IEnumerable<Delivery?>> GetDeliveryByUserId(Guid id)
    {
        IEnumerable<Delivery> deliveries = await _repository.GetAllDeliveriesByUserIdAsync(id);
        var deliveryByUserId = deliveries.ToList();
        if (deliveryByUserId.Any())
        {
            return await _repository.GetAllDeliveriesByUserIdAsync(id);
        }
        else
        {
            return deliveryByUserId;
        }
        
    }

    [HttpPost]
    [Route("api/[controller]/[action]")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<HttpResponseMessage> AddDelivery(Delivery? delivery)
    {
        if (delivery is not null)
        {
            await _repository.AddDeliveryAsync(delivery);
            await _context.SaveChangesAsync();
            return new HttpResponseMessage(HttpStatusCode.Created);

        }
        return new HttpResponseMessage(HttpStatusCode.BadRequest);        
    }

    [HttpGet]
    [Route("api/[controller]/[action]")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<HttpResponseMessage> AddPacketToDelivery(Guid packetId, Guid deliveryId)
    {
        // #TODO does not work have to fix!!!!
        var delivery = await _repository.GetDeliveryByIdAsync(deliveryId);
        if (delivery is not null)
        {
            var packet = await _packetRepository.GetPacketAsync(packetId);
            if (packet is null) return new HttpResponseMessage(HttpStatusCode.NotFound);
            await _repository.AddPacketToDeliverAsync(delivery.DeliveryId, packetId);
            await _context.SaveChangesAsync();
            return new HttpResponseMessage(HttpStatusCode.Created);
        }
        return new HttpResponseMessage(HttpStatusCode.BadRequest);
    }
}