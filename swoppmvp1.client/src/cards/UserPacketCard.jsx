
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
export default function UserPacketCard({packet}) {
    
    return (
        <>
            <div className={"packet-card"}>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{packet.title}</Card.Title>
                        <Card.Text>
                            <p>Origin Address: {packet.originAddress}</p>
                            <p>Destination Address: {packet.destinationAddress}</p>
                            <p>Message: {packet.message}</p>
                            <p>Height: {packet.height}</p>
                            <p>Width: {packet.width}</p>
                            <p>Depth: {packet.depth}</p>
                            <p>Weight: {packet.weight}</p>
                        </Card.Text>
                    </Card.Body>  
                    <Button variant={"primary"}>Set availability</Button>
                    <Button variant={"primary"}>Delete</Button>
                </Card>
            </div>
        </>
    )
}