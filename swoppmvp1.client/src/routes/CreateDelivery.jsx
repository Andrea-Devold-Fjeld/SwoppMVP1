import {createDelivery} from "@/hooks/DeliveryHooks.jsx";
import {useState} from "react";
import {useAuth} from "@/hooks/AuthProvider.jsx";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function CreateDelivery({ packetid}) {
    const [deliveryCreatet, setDeliveryCreated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [inputValue, setInputValue] = useState({});
    const auth = useAuth();

    const handleChange = (e) => {
        console.log("Handle change", e.target.value);
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value
        });
    }
    
    const handleSubmit = () => {
        console.log("Handle submit", inputValue);
        createDelivery(packetid, auth, inputValue).then(response => {
            if (response) {
                console.log("Delivery created");
                setDeliveryCreated(true);

            }else {
                console.log("Error creating delivery");
            }
            setLoading(false);
        })
    }
    if (loading) {
        
    }

    return (
        <div className={"dashboard"}>
            {deliveryCreatet ? 
                <div>
                    <h1>Delivery created</h1>
                </div>
                : 
                <div>
                    <h1>Creating delivery</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name={"deliveryTitle"} placeholder={"Input delivery name"} onChange={handleChange}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">Create delivery</Button>
                    </Form>
                </div>
            }
        </div>
    )
}