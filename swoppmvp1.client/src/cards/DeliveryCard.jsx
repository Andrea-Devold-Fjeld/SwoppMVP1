import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import TransporterRegistered from "@/routes/TransporterRegistered.jsx";
import AddedPackage from "@/routes/AddedPackage.jsx";
import {useState} from "react";

export default function DeliveryCard({deliveris, packetId}) {
    const [addPacket, setAddPacket] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    
    console.log("In delivery card");
    console.log("DeliveyCard: ", packetId)
    const handleClick = () => {
          setAddPacket(true);
          setIsRegistered(true);
    }
    return(
    <Card>
        <Card.Body>
            <Card.Title>Delivery</Card.Title>
            <Card.Text>
                <p>Delivery ID: {deliveris.id}</p>
                <p>Delivery status:  {deliveris.delivered ? 'Delivered' : 'Not delivered'}</p>
            </Card.Text>
            <Button variant="primary" onClick={handleClick}>
                Add packet to delivery  
            </Button>
            {isRegistered && <AddedPackage deliveryId={deliveris.deliveryId} packetId={packetId}/> }

        </Card.Body>
    </Card>
        )
}