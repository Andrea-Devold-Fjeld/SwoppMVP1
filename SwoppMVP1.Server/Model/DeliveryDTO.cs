namespace SwoppMVP1.Server.Model;

[Serializable]
public class DeliveryDTO
{
    public string DeliveryId { get; set; }
    public string UserId { get; set; }
    public ICollection<PacketDTO> Packets { get; set; } = new List<PacketDTO>();
    public bool Delivered { get; set; }
}