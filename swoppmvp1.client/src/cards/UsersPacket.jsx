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
                    Origin Address: {packet.originAddress}
                </Card.Text>
                <Card.Text>
                    Destination Address: {packet.destinationAddress}
                </Card.Text>
                <Card.Text>
                    Message: {packet.message}
                </Card.Text>
                <Card.Text>
                    Height: {packet.height}
                </Card.Text>
                <Card.Text>
                    Width: {packet.width}
                </Card.Text>
                <Card.Text>
                    Depth: {packet.depth}
                </Card.Text>
                <Card.Text>
                    Weight: {packet.weight}
                </Card.Text>
                <Button variant="primary" onClick={handleClick}>
                    Update Packet
                </Button>
                <Button onClick={handleDelete}>Delete Packet</Button>
            </Card.Body>
        </Card> 
    )
}