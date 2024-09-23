using Microsoft.AspNetCore.Mvc;
using SwoppMVP1.Server.DAL;
using SwoppMVP1.Server.Model;

namespace SwoppMVP1.Server.Controllers;

public class DeliveryController
{
    private readonly IDeliveryRepository _repository;

    public DeliveryController(IDeliveryRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    [Route("api/[controller]/[action]")]
    public async Task<IEnumerable<Delivery>> GetDeliveries()
    {
        return await _repository.GetAllDeliveriesAsync();
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
}