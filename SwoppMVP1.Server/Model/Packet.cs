﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SwoppMVP1.Server.Model;
[Serializable]
[Table("Packets")]
public class Packet
{
    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    public string UserId { get; set; }
    public DateTime Timestamp { get; set; }
    public string? Message { get; set; }
    public string? OriginAddress { get; set; }
    public string? OriginAddressNr { get; set; }
    public string? OriginPostNr { get; set; }
    public string? DestinationAddress { get; set; }
    public string? DestinationAddressNr { get; set; }
    public string? DestinationPostNr { get; set; }
    public string? OriginGeolocation { get; set; }
    public string? DestinationGeolocation { get; set; }
    public double? OriginLatitude { get; set; }
    public double? OriginLongitude { get; set; }
    public double? DestinationLatitude { get; set; }
    public double? DestinationLongitude { get; set; }
    public double? Height { get; set; }
    public double? Width { get; set; }
    public double? Depth { get; set; }
    public double? Weight { get; set; }
    public bool Available { get; set; }
    public Guid? DeliveryId  { get; set; }
    public virtual Delivery? Delivery { get; set; }
}