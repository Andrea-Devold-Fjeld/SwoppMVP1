namespace SwoppMVP1.Server.Model;

[Serializable]
public class AddPacketDTO
{
    public string? Title { get; set; }
    public string? Message { get; set; }
    public string? OriginAddress { get; set; }
    public string? DestinationAddress { get; set; }
    public double? OriginLatitude { get; set; }
    public double? OriginLongitude { get; set; }
    public double? DestinationLatitude { get; set; }
    public double? DestinationLongitude { get; set; }
    public double? Height { get; set; }
    public double? Width { get; set; }
    public double? Depth { get; set; }
    public double? Weight { get; set; }
}