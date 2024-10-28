namespace SwoppMVP1.Server.Model;
[Serializable]
public class PacketDTO
{
    public Guid Id { get; set; }
    public string UserId { get; set; }
    public DateTime Timestamp { get; set; }
    public string? Message { get; set; }
    public string? OriginAddress { get; set; }
    public string? DestinationAddress { get; set; }
    public string? OriginGeolocation { get; set; }
    public string? DestinationGeolocation { get; set; }
    public double? OriginLatitude { get; set; }
    public double? OriginLongitude { get; set; }
    public double? DestinationLatitude { get; set; }
    public double? DestinationLongitude { get; set; }
    /*
     * Depth
: 
9
DestinationAddress
: 
"Norge"
DestinationLatitude
: 
60.47202399999999
DestinationLongitude
: 
8.468945999999999
Height
: 
9
OriginAddress
: 
"Norge"
OriginLatitude
: 
60.47202399999999
OriginLongitude
: 
8.468945999999999
Weight
: 
9
Width
: 
9
     */
    public double? Height { get; set; }
    public double? Width { get; set; }
    public double? Depth { get; set; }
    public double? Weight { get; set; }
    public bool? Available { get; set; }
    public string? DeliveryId  { get; set; }
    public virtual DeliveryDTO? Delivery { get; set; }
}