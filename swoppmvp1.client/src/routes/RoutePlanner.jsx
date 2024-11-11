import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState, useEffect} from "react";
import {bothGeoLocationHook, geoLocationHook} from "@/hooks/GeolocationHooks.jsx";
import Directions from "@/routes/Directions.jsx";
import {getPackets} from "@/hooks/PacketHooks.jsx";
import {useAuth} from "@/hooks/AuthProvider.jsx";
import DeliverPacket from "@/routes/DeliverPacket.jsx";
import {useOutletContext} from "react-router-dom";

export default function RoutePlanner(){
    const [input, setInput] = useState({
        formOriginAddress: "",
        formOrginAddressNr: "",
        formOrginPostNr: "",
        formDestinationAddress: "",
        formDestinationAddressNr: "",
        formDestinationPostNr: ""
    })
    const [loading, setLoading] = useState(true);
    const [geoLocation, setGeolocation] = useState({});
    const [packets, setPackets] = useState([]);
    const [delivery, setDelivery] = useState(false);
    const [packet, setPacket] = useState("");
    
    const {api_key} = useOutletContext();

    const auth = useAuth();
    
    useEffect(() => {
        getPackets(auth)
            .then((response) => {
                console.log(response);
                setPackets(response);
            })
    }, []);
    /*
            originLat: 0,
        originLng: 0,
        destinationLat: 0,
        destinationLng: 0
     */
    //const [geoLocation, setGeolocation] = useState([]);
    const [submit, setSubmit] = useState(false);
    
    console.log(input);
    function handleInput(e) {
        const {name, value} = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    
    async function geo(){
        const origin = await geoLocationHook(api_key,input.formOriginAddress, input.formOrginAddressNr, input.formOrginPostNr);
        const destination = await geoLocationHook(api_key,input.formDestinationAddress, input.formDestinationAddressNr, input.formDestinationPostNr);
        
        return [origin, destination];
    }
    
    const handleOnStateChange = (state) => {
        console.log("State change in RoutePlanner: ", state);
        setDelivery(state);
        setPacket(state.packetId);
    }
    
    const handleSubmit = ((e) => {
        console.log("handleSubmit e:" + e);
        
        if(loading) {
            e.preventDefault();
            console.log(input);
            const geo = bothGeoLocationHook(api_key, input.formOriginAddress, input.formOrginAddressNr, input.formOrginPostNr, input.formDestinationAddress, input.formDestinationAddressNr, input.formDestinationPostNr)
                .then((response) => {
                    if(response.status === "REQUEST_DENIED" || response.status === "REQUEST_DENIED") {
                        console.log("Request denied");
                        alert("Request denied");
                    }
                    else {
                        console.log("RESPONSE", response);
                        setGeolocation({
                            originLat: parseFloat(response[0].results[0].geometry.location.lat.toString()),
                            originLng: parseFloat(response[0].results[0].geometry.location.lng.toString()),
                            destinationLat: parseFloat(response[1].results[0].geometry.location.lat.toString()),
                            destinationLng: parseFloat(response[1].results[0].geometry.location.lng.toString())
                        });
                        setSubmit(true);
                    }
                })
                .finally(() => {
                    console.log("finally", geo);
                    setLoading(false);
                })

            console.log("GEO", geo);
            console.log("GEOLOCATION", geoLocation);
        }
            
                    /*
                    if(response[1].status === "OK") {
                        setGeolocation((prev) => ({
                            ...prev,
                            destinationLat: response[1].results[0].geometry.location.lat,
                            destinationLng: response[1].results[0].geometry.location.lng
                        }))
                    }}
                    
                     */
        
            
    })
  
     
    return(
        <>
            {delivery ?
            <>
                <h1>Delivering packet</h1>
                <DeliverPacket packet={packet} />
            </>:
            <>
            {submit ? (
            <div>
                <Directions geoLocation={geoLocation} packets={packets} handleStateChange={handleOnStateChange}/>
            </div> ):(
        <div id={"routePlanner"}>
            <Form>
                <Form.Group className={"mb-3"} controlId={"formOrignAddress"}>
                    <Form.Label>Origin Address</Form.Label>
                    <Form.Control 
                        type={"text"} 
                        placeholder={"Enter origin address"} 
                        name={"formOriginAddress"}
                        onChange={handleInput} />
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formOrignAddressNr"}>
                    <Form.Label>Origin Address Number</Form.Label>
                    <Form.Control 
                        type={"text"} 
                        placeholder={"Enter origin address number"}
                        name={"formOrginAddressNr"}
                        onChange={handleInput} />
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formOrignPostNr"}>
                    <Form.Label>Origin Postal Number</Form.Label>
                    <Form.Control 
                        type={"text"} 
                        placeholder={"Enter origin postal number"}
                        name={"formOrginPostNr"}
                        onChange={handleInput} />
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formDestinationAddress"}>
                    <Form.Label>Destination Address</Form.Label>
                    <Form.Control 
                        type={"text"} 
                        placeholder={"Enter destination address"}
                        name={"formDestinationAddress"}
                        onChange={handleInput} />
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formDestinationAddressNr"}>
                    <Form.Label>Destination Address Number</Form.Label>
                    <Form.Control 
                        type={"text"} 
                        placeholder={"Enter destination address number"}
                        name={"formDestinationAddressNr"}
                        onChange={handleInput} />
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formDestinationPostNr"}>
                    <Form.Label>Destination Postal Number</Form.Label>
                    <Form.Control 
                        type={"text"} 
                        placeholder={"Enter destination postal number"}
                        name={"formDestinationPostNr"}
                        onChange={handleInput} />
                </Form.Group>
                <Button variant={"primary"} type={"submit"} onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
            )}
            </>
            }
        </>
    )
}