namespace SwoppMVP1.Server.Model;

[Serializable]
public class DeliveryDTO
{
    public Guid DeliveryId { get; set; }
    public Guid UserId { get; set; }
    public ICollection<PacketDTO> Packets { get; set; } = new List<PacketDTO>();
    public bool Delivered { get; set; }
}