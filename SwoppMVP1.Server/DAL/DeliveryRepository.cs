using Microsoft.EntityFrameworkCore;
using SwoppMVP1.Server.Model;

namespace SwoppMVP1.Server.DAL;

public class DeliveryRepository : IDeliveryRepository
{
    private readonly ApplicationDbContext _context;

    public DeliveryRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<Delivery>> GetAllDeliveriesAsync()
    {
        return await _context.Deliveries.ToListAsync();
    }

    public async Task<Delivery?> GetDeliveryByIdAsync(Guid deliveryId)
    {
        return await _context.Deliveries.Where(x => x.Id == deliveryId).FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Delivery>> GetAllDeliveriesByUserIdAsync(Guid userId)
    {
        return await _context.Deliveries.Where(x => x.UserId == userId).ToListAsync();
    }

    public async Task<bool> AddDeliveryAsync(Delivery delivery)
    {
        try
        {
            await _context.Deliveries.AddAsync(delivery);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            return false;
        }

    }

    public async Task<bool> UpdateDeliveryAsync(Delivery delivery)
    {
        try
        {
            // #TODO check if this is asunc or not
            _context.Update(delivery);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            return false;
        }

    }

    public async Task<bool> DeleteDeliveryAsync(Guid deliveryId)
    {
        var delivery = await _context.Deliveries.Where(x => x.Id == deliveryId).FirstOrDefaultAsync();
        if (delivery != null)
        {
            _context.Remove(delivery);
            await _context.SaveChangesAsync();
            return true;
        }
        else
        {
            return false;
        }
    }

    public async Task<bool> AddPacketToDeliverAsync(Guid deliveryId, Packet packet)
    {
        var delivery = await _context.Deliveries.Where(x => x.Id == deliveryId).Include(delivery => delivery.Packets).FirstOrDefaultAsync();
        if (delivery != null)
        {
            if (!IsInitialized(delivery.Packets))
            {
                List<Packet> packets = new List<Packet>();
                packets.Add(packet);
                delivery.Packets = packets;
                _context.Deliveries.Update(delivery);
                await _context.SaveChangesAsync();
                return true;
            }

            delivery.Packets.Add(packet);
            _context.Update(delivery);
            await _context.SaveChangesAsync();
            return true;

        }

        return false;
    }
    

    public async Task<bool> UpdatePacketToDeliverAsync(Guid deliveryId, Packet packet)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> DeletePacketAsync(Guid deliveryId, Packet packet)
    {
        var delivery = await _context.Deliveries.Where(x => x.Id == deliveryId).Include(delivery => delivery.Packets).FirstOrDefaultAsync();
        if (delivery != null)
        {
            if (IsInitialized(delivery.Packets))
            {
                delivery.Packets.Remove(packet);
                _context.Deliveries.Update(delivery);
                await _context.SaveChangesAsync();
                return true;
            }
        }

        return false;
    }

    public async Task<IEnumerable<Packet>> GetAllPacketsInDeliveryAsync(Guid deliveryId)
    {
        var deliveries = await _context.Deliveries.Where(x => x.Id == deliveryId).Include(delivery => delivery.Packets).FirstOrDefaultAsync();
        if (deliveries != null)
        {
            if (IsInitialized(deliveries.Packets))
            {
                return deliveries.Packets;
            }
        }

        return null;
    }

    public bool IsInitialized(List<Packet> packets)
    {
        if ((packets != null) && (!packets.Any()))
        {
            return true;
        }

        return false;
    }
}