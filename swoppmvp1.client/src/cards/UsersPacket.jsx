import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {useState} from "react";
import Modal from 'react-bootstrap/Modal';

export default function UsersPacket({packet, onDeletePacket}) {
    const [show, setShow] = useState(false);
    const handleClick = () => {
        console.log("Update packet");
    }
    
    const handleDelete = () => {
        console.log("Delete packet");
    }
    
    
    return (
        <>    
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
                <Button variant={"danger"} onClick={() => setShow(true)}>Delete Packet</Button>
            </Card.Body>
        </Card> 
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete packet {packet.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this packet?</p>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => onDeletePacket(packet.id)}>Delete</Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </>
    )
}