using SwoppMVP1.Server.Model;

namespace SwoppMVP1.Server.DAL;

public interface IPacketRepository
{
    Task<IEnumerable<Packet>> GetPacketsAsync();
    Task<Packet?> GetPacketAsync(string id);
    Task<IEnumerable<Packet>> GetPacketsByUserIdAsync(string userId);
    
    Task<bool> SetPacketAvailabilityAsync(string packetId, bool isAvailable);
    Task<IEnumerable<Packet>> GetPacketsAsync(IEnumerable<string> ids);
    Task CreatePacketAsync(Packet packet);
    Task UpdatePacketAsync(Packet packet);
    Task<bool> DeletePacketAsync(string id);
    Task<IEnumerable<Packet>> GetAvailablePacketsAsync();
    Task<IEnumerable<PacketDTO>> GetPacketsByDeliveryId(string deliveryId);
}