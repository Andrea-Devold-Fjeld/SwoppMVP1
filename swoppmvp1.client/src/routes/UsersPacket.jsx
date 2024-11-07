import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function UsersPacket({packet}) {
    
    const handleClick = () => {
        console.log("Update packet");
    }
    
    const handleDelete = () => {
        console.log("Delete packet");
    }
    return (
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
                    Update Packet
                </Button>
                <Button onClick={handleDelete}>Delete Packet</Button>
            </Card.Body>
        </Card> 
    )
}