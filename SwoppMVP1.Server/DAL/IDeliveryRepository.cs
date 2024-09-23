﻿using SwoppMVP1.Server.Model;

namespace SwoppMVP1.Server.DAL;

public interface IDeliveryRepository
{
    Task<IEnumerable<Delivery>> GetAllDeliveriesAsync();
    Task<Delivery?> GetDeliveryByIdAsync(Guid deliveryId);
    Task<IEnumerable<Delivery>> GetAllDeliveriesByUserIdAsync(Guid userId);
    Task<bool> AddDeliveryAsync(Delivery delivery);
    Task<bool> UpdateDeliveryAsync(Delivery delivery);
    Task<bool> DeleteDeliveryAsync(Guid deliveryId);
    Task<bool> AddPacketToDeliverAsync(Guid deliverId, Packet packet);
    Task<bool> UpdatePacketToDeliverAsync(Guid deliverId, Packet packet);
    Task<bool> DeletePacketAsync( Guid deliverId, Packet packet);
    Task<IEnumerable<Packet>> GetAllPacketsInDeliveryAsync(Guid deliveryId);
}