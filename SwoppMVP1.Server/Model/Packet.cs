namespace SwoppMVP1.Server.Model;

public class Packet
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public DateTime Timestamp { get; set; }
    public string? Message { get; set; }
    public string? originAddress { get; set; }
    public string? destinationAddress { get; set; }
    public string? originGeolocation { get; set; }
    public string? destinationGeolocation { get; set; }
    public double? originLatitude { get; set; }
    public double? originLongitude { get; set; }
    public double? destinationLatitude { get; set; }
    public double? destinationLongitude { get; set; }
    public double Height { get; set; }
    public double Width { get; set; }
    public double Depth { get; set; }
    public double Weight { get; set; }
    public bool Available { get; set; }
}