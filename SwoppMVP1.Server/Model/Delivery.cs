namespace SwoppMVP1.Server.Model;

public class Delivery
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public List<Packet>? Packets { get; set; }
    public bool Delivered { get; set; }
}