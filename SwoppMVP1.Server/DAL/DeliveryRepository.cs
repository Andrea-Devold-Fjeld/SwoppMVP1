using SwoppMVP1.Server.Model;

namespace SwoppMVP1.Server.DAL;

public class DeliveryRepository : IDeliveryRepository
{
    private readonly ApplicationDbContext _context;

    public DeliveryRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    public Task<IEnumerable<Delivery>> GetAllDeliveriesAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Delivery?> GetDeliveryByIdAsync(Guid deliveryId)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Delivery>> GetAllDeliveriesByUserIdAsync(Guid userId)
    {
        throw new NotImplementedException();
    }

    public Task<bool> AddDeliveryAsync(Delivery delivery)
    {
        throw new NotImplementedException();
    }

    public Task<bool> UpdateDeliveryAsync(Delivery delivery)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteDeliveryAsync(Guid deliveryId)
    {
        throw new NotImplementedException();
    }

    public Task<bool> AddPacketToDeliverAsync(Packet packet)
    {
        throw new NotImplementedException();
    }

    public Task<bool> UpdatePacketToDeliverAsync(Packet packet)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeletePacketAsync(Packet packet)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Packet>> GetAllPacketsInDeliveryAsync(Guid deliveryId)
    {
        throw new NotImplementedException();
    }
}