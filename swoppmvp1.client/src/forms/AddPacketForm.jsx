import React, {useState} from 'react';
import {bothGeoLocationHook} from "@/hooks/GeolocationHooks.jsx";
import {useNavigate} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function AddPacketForm({children}) {
    const [inputValue, setInputValue] = useState({});
    const [sendt, setSendt] = useState(false);
    const [li , setLi] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);



    const handleChange = async (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value
        });

    }
    
    const getGeolocation = async (packet) => {
        console.log("getGeolocation", inputValue);
        return await bothGeoLocationHook(
            inputValue.originAddress,
            inputValue.originAddressNr,
            inputValue.originPostNr,
            inputValue.destinationAddress,
            inputValue.destinationAddressNr,
            inputValue.destinationPostNr
        );
    }
    
     
    const handleSendt = () => {
        setSendt(true);
    }

    
    function handleSubmit(e) {
        e.preventDefault();
        const packet = {};
        
        getGeolocation(packet)
            .then((response) => {
                console.log("finally", response);
                packet["OriginAddress"] = response[0].results[0].formatted_address;
                packet["OriginLatitude"] = response[0].results[0].geometry.location.lat;
                packet.OriginLongitude = response[0].results[0].geometry.location.lng;
                packet.DestinationAddress = response[1].results[0].formatted_address;
                packet.DestinationLatitude = response[1].results[0].geometry.location.lat;
                packet.DestinationLongitude = response[1].results[0].geometry.location.lng;
                packet["Height"] = parseFloat(inputValue.height);
                packet["Width"] = parseFloat(inputValue.width);
                packet["Depth"] = parseFloat(inputValue.depth);
                packet["Weight"] = parseFloat(inputValue.weight);
                packet["Message"] = inputValue.message;
                
            })
            .then(() => {
                console.log("packet", packet);
                setLi(<p>Packet added</p>);
            })

            .finally(() => console.log("finally"));
        console.log(packet);

    }

    return (
        <>
            <Form class={"add-packet-form"} onSubmit={handleSubmit}>
                <Form.Group className={"mb-3"} controlId={"formBasicAddress"}>
                    <Form.Label>Origin Address</Form.Label>
                    <Form.Control type={"text"} placeholder={"Enter address"} name={"originAddress"} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formBasicPostNr"}>
                    <Form.Label>Origin Post Number</Form.Label>
                    <Form.Control type={"number"} placeholder={"Enter post number"} name={"originPostNr"} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formBasicAddress"}>
                    <Form.Label>Destination Address</Form.Label>
                    <Form.Control type={"text"} placeholder={"Enter address"} name={"destinationAddress"} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formBasicPostNr"}>
                    <Form.Label>Destination Post Number</Form.Label>
                    <Form.Control type={"number"} placeholder={"Enter post number"} name={"destinationPostNr"} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formBasicMessage"}>
                    <Form.Label>Message</Form.Label>
                    <Form.Control type={"textbox"} placeholder={"Enter message"} name={"message"} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formBasicHeight"}>
                    <Form.Label>Height</Form.Label>
                    <Form.Control type={"text"} placeholder={"Enter height"} name={"height"} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formBasicWidth"}>
                    <Form.Label>Width</Form.Label>
                    <Form.Control type={"text"} placeholder={"Enter width"} name={"width"} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formBasicDepth"}>
                    <Form.Label>Depth</Form.Label>
                    <Form.Control type={"text"} placeholder={"Enter depth"} name={"depth"} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formBasicWeight"}>
                    <Form.Label>Weight</Form.Label>
                    <Form.Control type={"text"} placeholder={"Enter weight"} name={"weight"} onChange={handleChange}/>
                </Form.Group>
                <Button type={"submit"}>Add Packet</Button>
            </Form>
            {li}
        </>
    )
}

