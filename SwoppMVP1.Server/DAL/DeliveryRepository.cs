using Microsoft.EntityFrameworkCore;
using SwoppMVP1.Server.Model;

namespace SwoppMVP1.Server.DAL;

public class DeliveryRepository : IDeliveryRepository
{
    private readonly ApplicationDbContext _context;
    private IDeliveryRepository _deliveryRepositoryImplementation;

    public DeliveryRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<Delivery>> GetAllDeliveriesAsync()
    {
        return await _context.Deliveries.ToListAsync();
    }

    public async Task<IEnumerable<DeliveryDTO>> GetDeliveriesWithPacketsAsync()
    {
        return await _context.Deliveries.Include(p => p.Packets).Select(
            e => new DeliveryDTO()
            {
                DeliveryId = e.DeliveryId.ToString(),
                UserId = e.UserId,
                Delivered =  e.Delivered
            }).ToListAsync();
    }
    public async Task<Delivery?> GetDeliveryByIdAsync(string deliveryId)
    {
        return await _context.Deliveries.Where(x => x.DeliveryId.ToString() == deliveryId).FirstOrDefaultAsync();
    }

    public Task<IEnumerable<Delivery>> GetAllDeliveriesByUserIdAsync(Guid userId)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<Delivery>> GetAllDeliveriesByUserIdAsync(string userId)
    {
        return await _context.Deliveries.Where(x => x.UserId == userId)
            .Include(p => p.Packets).ToListAsync();
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

    public async Task<bool> DeleteDeliveryAsync(string deliveryId)
    {
        var delivery = await _context.Deliveries.Where(x => x.DeliveryId.ToString() == deliveryId).FirstOrDefaultAsync();
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




    public async Task<bool> AddPacketToDeliverAsync(string deliveryId, string packetId)
    {
        var delivery = await _context.Deliveries.Where(x => x.DeliveryId.ToString() == deliveryId).Include(delivery => delivery.Packets).FirstOrDefaultAsync();
        var packet = await _context.Packets.Where(x => x.Id.ToString() == packetId).FirstOrDefaultAsync();
        if (packet != null)
        {
            Console.WriteLine(packet.Id.ToString());
            if (delivery != null)
            {
                delivery.Packets.Add(packet);
                await _context.SaveChangesAsync();
                return true;
            }
        }

        return false;
        /*
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
        */
    }
    

    public async Task<bool> UpdatePacketToDeliverAsync(string deliveryId, Packet packet)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> DeletePacketAsync(string deliveryId, Packet packet)
    {
        var delivery = await _context.Deliveries.Where(x => x.DeliveryId.ToString() == deliveryId).Include(delivery => delivery.Packets).FirstOrDefaultAsync();
        if (delivery != null)
        {
            delivery.Packets.Remove(packet);
        }

        return false;
    }

    public async Task<IEnumerable<Packet>?> GetAllPacketsInDeliveryAsync(string deliveryId)
    {
        var deliveries = await _context.Deliveries.Where(x => x.DeliveryId.ToString() == deliveryId).Include(delivery => delivery.Packets).FirstOrDefaultAsync();
        return deliveries != null ? deliveries.Packets : null;
    }
    
}