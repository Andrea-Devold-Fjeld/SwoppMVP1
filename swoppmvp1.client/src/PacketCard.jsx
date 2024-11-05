import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import RegisterTransporter from "@/routes/RegisterTransporter.jsx";
import { useState } from 'react';
import DeliverPacket from "@/routes/DeliverPacket.jsx";


export default function PacketCard({packet, role, delivery}) {
    const [showDeliverPacket, setShowDeliverPacket] = useState(false);

    const navigate = useNavigate();
    console.log("Role: ", role);
    console.log("Packet: ", packet);
    const handleClick = () => {
        if(role){
            setShowDeliverPacket(true);
            console.log("Deliver packet");
            
        }else{
            navigate("/registerTransporter");
        }
    }
    return (
        <>
            {showDeliverPacket ? (
                <DeliverPacket packet={packet} />
            ) : (
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Packet</Card.Title>
                        <Card.Text>
                            <p>Origin Address: {packet.originAddress}</p>
                            <p>Destination Address: {packet.destinationAddress}</p>
                            <p>Message: {packet.message}</p>
                            <p>Height: {packet.height}</p>
                            <p>Width: {packet.width}</p>
                            <p>Depth: {packet.depth}</p>
                            <p>Weight: {packet.weight}</p>
                        </Card.Text>
                        <Button variant="primary" onClick={handleClick}>
                            {role ? 'Deliver packet' : 'Register as transporter'}
                        </Button>
                    </Card.Body>
                </Card>
                )}
        </>
    )
}