namespace SwoppMVP1.Server.Model;

public class Messages
{
    public required string packetId { get; set; }
    public required string deliveryId { get; set; }
    public required string UserId { get; set; }
    public List<Message> Message { get; set; } = new List<Message>();
}