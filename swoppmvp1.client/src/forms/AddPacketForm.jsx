import React, {useState} from 'react';
import {bothGeoLocationHook} from "@/hooks/GeolocationHooks.jsx";
import {useNavigate} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PackageReg from "@/routes/PackageReg.jsx";
import {useOutletContext} from "react-router-dom";
export default function AddPacketForm({children}) {
    const [inputValue, setInputValue] = useState({});
    const [packet, setPacket] = useState({});
    const [sendt, setSendt] = useState(false);
    const [li , setLi] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
    const {api_key} = useOutletContext();


    const handleChange = async (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value
        });

    }
    
    const getGeolocation = async (packet) => {
        console.log("getGeolocation", inputValue);
        return await bothGeoLocationHook(
            api_key,
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
        /*
        "title": "lala",
  "message": "lala",
  "originAddress": "Erleds vei 58 ",
  "destinationAddress": "kristin vei 50",
  "originLatitude": 10.9,
  "originLongitude": 80.8,
  "destinationLatitude": 11.0,
  "destinationLongitude": 81.0,
  "height": 1,
  "width": 1,
  "depth": 10,
  "weight": 1
}
originAddress":"Rosenkrantz' gate 12, 0159 Oslo, Norge",
"originLatitude":59.91406689999999,
"originLongitude":10.7393236,
"destinationAddress":"Erlends v. 58, 0669 Oslo, Norge",
"destinationLatitude":59.9166902,
"destinationLongitude":10.8385654,
"height":null,
"width":null,
"depth":null,
"weight":null,
"title":"Rosen"
         */
        const lala = getGeolocation(packet)
            .then((response) => {
                const data ={
                    originAddress: response[0].results[0].formatted_address,
                    originLatitude: response[0].results[0].geometry.location.lat,
                    originLongitude: response[0].results[0].geometry.location.lng,
                    destinationAddress: response[1].results[0].formatted_address,
                    destinationLatitude: response[1].results[0].geometry.location.lat,
                    destinationLongitude: response[1].results[0].geometry.location.lng,
                    height: parseFloat(inputValue.height),
                    width: parseFloat(inputValue.width),
                    depth: parseFloat(inputValue.depth),
                    weight: parseFloat(inputValue.weight),
                    message: inputValue.message,
                    title: inputValue.title
                }
                setInputValue({
                    ...inputValue,
                    originAddress: data.originAddress,
                    originLatitude: data.originLatitude,
                    originLongitude: data.originLongitude,
                    destinationAddress: data.destinationAddress,
                    destinationLatitude: data.destinationLatitude,
                    destinationLongitude: data.destinationLongitude,
                    height: data.height,
                    width: data.width,
                    depth: data.depth,
                    weight: data.weight,
                    message: data.message,
                    title: data.title
                })
                console.log("finally", response);
                
                return data;
                
            })
            .then((data) => {
                console.log("data", data);
                setPacket(data)
                setSendt(true);
                console.log("InputValue", inputValue);
                return data;
            
            })

        console.log("lala", lala);
        
    }

    return (
        <>
            {sendt ? (<PackageReg packet={inputValue} />) : 
            <Form class={"add-packet-form"} onSubmit={handleSubmit}>
                <Form.Group className={"mb-3"} controlId={"formBasicTitle"}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type={"text"} placeholder={"Enter title"} name={"title"} onChange={handleChange}/>
                </Form.Group>
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
            }
        </>
    )
}

