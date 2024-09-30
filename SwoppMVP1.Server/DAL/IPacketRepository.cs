using SwoppMVP1.Server.Model;

namespace SwoppMVP1.Server.DAL;

public interface IPacketRepository
{
    Task<IEnumerable<Packet>> GetPacketsAsync();
    Task<Packet?> GetPacketAsync(Guid id);
    Task<IEnumerable<Packet>> GetPacketsByUserIdAsync(string userId);
    
    Task<bool> SetPacketAvailabilityAsync(Guid packetId, bool isAvailable);
    Task<IEnumerable<Packet>> GetPacketsAsync(IEnumerable<Guid> ids);
    Task CreatePacketAsync(Packet packet);
    Task UpdatePacketAsync(Packet packet);
    Task<bool> DeletePacketAsync(Guid id);
    Task<IEnumerable<Packet>> GetAvailablePacketsAsync();
    Task<IEnumerable<PacketDTO>> GetPacketsByDeliveryId(Guid deliveryId);
}