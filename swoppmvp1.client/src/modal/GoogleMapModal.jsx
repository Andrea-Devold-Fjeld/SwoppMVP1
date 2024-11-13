import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import GoogleMapsAdvancedMarkers from "@/Maps/GoogleMapsAdvancedMarkers.jsx";

export default function GoogleMapModal({show, handleClose, api_key, packets}) {
    return (
        <Modal show={show} onHide={() => handleClose(false)} fullscreen={"md-down"} size={"lg"}>
            <Modal.Header closeButton>
                <Modal.Title>Google Maps</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <GoogleMapsAdvancedMarkers api_key={api_key} onStateChange={handleClose} packets={packets}/>
            </Modal.Body>
        </Modal>
    )
}