import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import TransporterRegistered from "@/routes/TransporterRegistered.jsx";
import AddedPackage from "@/routes/AddedPackage.jsx";

export default function DeliveryCard({deliveris, packetId}) {
    const [addPacket, setAddPacket] = useState(false);

    const handleClick = () => {
          setAddPacket(true);
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
            {isRegistered && <AddedPackage /> }

        </Card.Body>
    </Card>
        )
}