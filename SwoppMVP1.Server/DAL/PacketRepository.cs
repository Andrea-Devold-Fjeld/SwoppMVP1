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

    public async Task<Packet?> GetPacketAsync(Guid id)
    {
        return await _context.Packets.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<IEnumerable<Packet>> GetPacketsAsync(IEnumerable<Guid> ids)
    {
        return await _context.Packets.Where(x => ids.Contains(x.Id)).ToListAsync();
    }

    public async Task CreatePacketAsync(Packet packet)
    {
        _context.Packets.Add(packet);
        await _context.SaveChangesAsync();
    }

    public async Task UpdatePacketAsync(Packet packet)
    {
        _context.Packets.Update(packet);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> DeletePacketAsync(Guid id)
    {
        var packet = await _context.Packets.FirstOrDefaultAsync(x => x.Id == id);
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

    public async Task<bool> SetPacketAvailabilityAsync(Guid id, bool availability)
    {
        var packet = await _context.Packets.FirstOrDefaultAsync(x => x.Id == id);
        packet.Available = availability;
        _context.Packets.Update(packet);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<Packet>> GetPacketsByUserIdAsync(string userId)
    {
        return await _context.Packets.Where(x => x.UserId == userId).ToListAsync();
    }

    public async Task<IEnumerable<Packet>> GetAvailablePacketsAsync()
    {
        return await _context.Packets.Where(x => x.Available == true).ToListAsync();
    }



    public async Task<IEnumerable<PacketDTO>> GetPacketsByDeliveryId(Guid deliveryId)
    {
        return await _context.Packets.Where(x => x.DeliveryId == deliveryId)
            .Select(
            e => new PacketDTO()
            {
                Id = e.Id,
                UserId = e.UserId,
                Timestamp = e.Timestamp,
                Message = e.Message,
                originAddress = e.originAddress,
                destinationAddress = e.destinationAddress,
                Weight = e.Weight,
                Height = e.Height,
                Depth = e.Depth,
                Width = e.Width,
                Available = e.Available
            }).ToListAsync();
        
    }
}