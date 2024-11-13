namespace SwoppMVP1.Server.Model;

public class Message
{
    public Guid Id { get; set; }
    public string UserId { get; set; }
    public string Text { get; set; }
    public DateTime Timestamp { get; set; }
    public bool Read { get; set; }

    
}