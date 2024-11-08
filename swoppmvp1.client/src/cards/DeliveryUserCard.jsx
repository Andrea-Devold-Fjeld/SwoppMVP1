import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

export default function DeliveryUserCard({delivery}) {
    
    const updateDeliveryStatus = () => {
        console.log("Update delivery status");  
    }
    
    const deleteDelivery = () => {
        console.log("Delete delivery");
    }
    return (
        <Card>
            <Card.Body>
                <Card.Title>Delivery</Card.Title>
                <Card.Text>
                    <p>Delivery ID: {delivery.id}</p>
                    <p>Delivery status:  {delivery.delivered ? 'Delivered' : 'Not delivered'}</p>
                </Card.Text>
                    <ul>
                    {delivery.packets.map((packet) => (
                        <li key={packet.id}>
                            <Link to={`/packet/${packet.id}`}>Packet id: {packet.id}</Link>
                        </li>
                    ))}
                    </ul>
                <Button onClick={updateDeliveryStatus} variant="primary">
                    Update delivery status
                </Button>
                <Button onClick={deleteDelivery} variant="primary">
                    Delete delivery
                </Button>
            </Card.Body>
        </Card>
    )
}