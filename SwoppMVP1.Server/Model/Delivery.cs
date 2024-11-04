using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace SwoppMVP1.Server.Model;
[Table("Deliveries")]
public class Delivery
{
    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid DeliveryId { get; set; }
    public virtual IdentityUser User { get; set; }
    public required string UserId { get; set; }
    public ICollection<Packet> Packets { get; set; } = new List<Packet>();
    public bool Delivered { get; set; }
}