import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import RegisterTransporter from "@/routes/RegisterTransporter.jsx";
import { useState } from 'react';
import DeliverPacket from "@/routes/DeliverPacket.jsx";


export default function PacketCard({packet, role, delivery, onStateChange}) {
    const [showDeliverPacket, setShowDeliverPacket] = useState(false);

    const navigate = useNavigate();
    const handleClick = () => {
        if(role){
            setShowDeliverPacket(true);
            console.log("Deliver packet");
            onStateChange({packetId: packet.id, status: "Delivered"});
            
        }else{
            navigate("/registerTransporter");
        }
    }
    return (
        <><div>
            {showDeliverPacket ? (
                <DeliverPacket packet={packet} />
            ) : (
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Packet</Card.Title>
                        <Card.Text>
                            Origin Address: {packet.originAddress} <br />
                            Destination Address: {packet.destinationAddress} <br/>
                            Message: {packet.message}<br/>
                            Height: {packet.height}<br/>
                            Width: {packet.width}<br/>
                            Depth: {packet.depth}<br/>
                            Weight: {packet.weight}
                        </Card.Text>
                        <Button variant="primary" onClick={handleClick}>
                            {role ? 'Deliver packet' : 'Register as transporter'}
                        </Button>
                    </Card.Body>
                </Card>
            )}
        </div>
        </>
    )
}