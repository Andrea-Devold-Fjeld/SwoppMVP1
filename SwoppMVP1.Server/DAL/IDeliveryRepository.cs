using SwoppMVP1.Server.Model;

namespace SwoppMVP1.Server.DAL;

public interface IDeliveryRepository
{
    Task<IEnumerable<Delivery>> GetAllDeliveriesAsync();
    Task<Delivery?> GetDeliveryByIdAsync(string deliveryId);
    Task<IEnumerable<Delivery>> GetAllDeliveriesByUserIdAsync(string userId);
    Task<bool> AddDeliveryAsync(Delivery delivery);
    Task<bool> UpdateDeliveryAsync(Delivery delivery);
    Task<bool> DeleteDeliveryAsync(string deliveryId);
    Task<bool> AddPacketToDeliverAsync(string deliverId, string packet);
    Task<bool> UpdatePacketToDeliverAsync(string deliverId, Packet packet);
    Task<bool> DeletePacketAsync( string deliverId, Packet packet);
    Task<IEnumerable<Packet>?> GetAllPacketsInDeliveryAsync(string deliveryId);
    Task<IEnumerable<DeliveryDTO>> GetDeliveriesWithPacketsAsync();

}