using Microsoft.EntityFrameworkCore;
using SwoppMVP1.Server.Model;

namespace SwoppMVP1.Server.DAL;

public class PacketRepository : IPacketRepository
{
    private readonly ApplicationDbContext _context;

    public PacketRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<Packet>> GetPacketsAsync()
    {
        return await _context.Packets.ToListAsync();
    }

    public async Task<Packet?> GetPacketAsync(string id)
    {
        return await _context.Packets.FirstOrDefaultAsync(x => x.Id.ToString() == id);
    }

    public async Task<IEnumerable<Packet>> GetPacketsAsync(IEnumerable<string> ids)
    {
        return await _context.Packets.Where(x => ids.Contains(x.Id.ToString())).ToListAsync();
    }

    public async Task CreatePacketAsync(Packet packet)
    {
        Console.WriteLine("packetId: " + packet.Id);
        Console.WriteLine("packetUserId: " + packet.UserId);
        Console.WriteLine("packetTimestamp: " + packet.Timestamp);
        Console.WriteLine("packetOriginAddress: " + packet.OriginAddress);
        Console.WriteLine("packetDestinationAddress: " + packet.DestinationAddress);
        _context.Packets.Add(packet);
        await _context.SaveChangesAsync();
    }

    public async Task UpdatePacketAsync(Packet packet)
    {
        _context.Packets.Update(packet);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> DeletePacketAsync(string id)
    {
        var packet = await _context.Packets.FirstOrDefaultAsync(x => x.Id.ToString() == id);
        if (packet != null)
        {
            _context.Packets.Remove(packet);
            await _context.SaveChangesAsync();
            return true;
        }
        else
        {
            return false;
        }
    }

    public async Task<bool> SetPacketAvailabilityAsync(string id, bool availability)
    {
        var packet = await _context.Packets.FirstOrDefaultAsync(x => x.Id.ToString() == id);
        packet.Available = availability;
        _context.Packets.Update(packet);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<Packet>> GetPacketsByUserIdAsync(string userId)
    {
        return await _context.Packets.Where(x => x.UserId.ToString() == userId).ToListAsync();
    }

    public async Task<IEnumerable<Packet>> GetAvailablePacketsAsync()
    {
        return await _context.Packets.Where(x => x.Available == true).ToListAsync();
    }



    public async Task<IEnumerable<PacketDTO>> GetPacketsByDeliveryId(string deliveryId)
    {
        return await _context.Packets.Where(x => x.DeliveryId.ToString() == deliveryId)
            .Select(
            e => new PacketDTO()
            {
                Id = e.Id,
                UserId = e.UserId,
                Timestamp = e.Timestamp,
                Message = e.Message,
                OriginAddress = e.OriginAddress,
                DestinationAddress = e.DestinationAddress,
                Weight = e.Weight,
                Height = e.Height,
                Depth = e.Depth,
                Width = e.Width,
                Available = e.Available
            }).ToListAsync();
        
    }
}