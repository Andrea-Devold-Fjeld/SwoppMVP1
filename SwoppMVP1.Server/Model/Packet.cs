using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SwoppMVP1.Server.Model;
[Table("Packets")]
public class Packet
{
    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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
    public string? DeliveryId  { get; set; }
    public virtual Delivery? Delivery { get; set; }
}