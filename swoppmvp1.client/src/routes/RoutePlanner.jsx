import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState, useEffect} from "react";
import {bothGeoLocationHook, geoLocationHook} from "@/hooks/GeolocationHooks.jsx";
import Directions from "@/routes/Directions.jsx";
import {getPackets} from "@/hooks/PacketHooks.jsx";
import {useAuth} from "@/hooks/AuthProvider.jsx";
import DeliverPacket from "@/routes/DeliverPacket.jsx";
import { useOutletContext } from "react-router-dom";

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
    //const [api_key, setApiKey] = useState("");
    const [packet, setPacket] = useState("");
    const [error, setError] = useState({});
    
    const { api_key } = useOutletContext();

    useEffect(() => {
        getPackets(auth)
            .then((response) => {
                console.log(response);
                setPackets(response);
            })
    }, []);
    const auth = useAuth();
    

    //const [geoLocation, setGeolocation] = useState([]);
    const [submit, setSubmit] = useState(false);
    //regex for address validation
    //[a-åA-Å]\b\s{1,4}\d{1,4}
    //[a-åA-Å] - address must start with a letter
    //\b - address must contain a word boundary
    //\s{1,4} - address must contain a space between 1-4 characters
    //\d{1,4} - address must contain a digit between 1-4 characters

    //regex for post number validation
    //[0-9]{4}   
    console.log(input);
    function handleInput(e) {
        const {name, value} = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }))
        
    }
    function validateAddress(address) {
        const regex = /[a-åA-Å]\b\s{1,4}\d{1,4}/;
        return regex.test(address);
    }
    function validatePostNr(postNr) {
        const regex = /[0-9]{4}/;
        return regex.test(postNr);
    }
    
    const findFormErrors = () => {
        const {formOriginAddress, formOrginAddressNr, formOrginPostNr, formDestinationAddress, formDestinationAddressNr, formDestinationPostNr} = input;
        const newErrors = {};
        // origin address errors
        if (!formOriginAddress || formOriginAddress === "") newErrors.formOriginAddress = "Origin address is required!";
        else if (!validateAddress(formOriginAddress)) newErrors.formOriginAddress = "Invalid address!";
        // origin postal number errors
        if (!formOrginPostNr || formOrginPostNr === "") newErrors.formOrginPostNr = "Origin postal number is required!";
        else if (!validatePostNr(formOrginPostNr)) newErrors.formOrginPostNr = "Invalid postal number!";
        // destination address errors
        if (!formDestinationAddress || formDestinationAddress === "") newErrors.formDestinationAddress = "Destination address is required!";
        else if (!validateAddress(formDestinationAddress)) newErrors.formDestinationAddress = "Invalid address!";
        // destination postal number errors
        if (!formDestinationPostNr || formDestinationPostNr === "") newErrors.formDestinationPostNr = "Destination postal number is required!";
        else if (!validatePostNr(formDestinationPostNr)) newErrors.formDestinationPostNr = "Invalid postal number!";
        return newErrors;
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
        e.preventDefault();
        console.log(input);
        const findErrors = findFormErrors();
        if (Object.keys(findErrors).length > 0) {
            setError(findErrors);
            return;
        }
        const geo = bothGeoLocationHook(api_key, input.formOriginAddress, input.formOrginAddressNr, input.formOrginPostNr, input.formDestinationAddress, input.formDestinationAddressNr, input.formDestinationPostNr)
            .then((response) => {
                if (response.status === "REQUEST_DENIED" || response.status === "REQUEST_DENIED") {
                    console.log("Request denied");
                    //alert("Request denied");
                } else {
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
                <Directions api_key={api_key} geoLocation={geoLocation} packets={packets} handleStateChange={handleOnStateChange}/>
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
                    <Form.Control.Feedback type={"invalid"}>{error.formOriginAddress}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formOrignPostNr"}>
                    <Form.Label>Origin Postal Number</Form.Label>
                    <Form.Control 
                        type={"text"} 
                        placeholder={"Enter origin postal number"}
                        name={"formOrginPostNr"}
                        onChange={handleInput} />
                    <Form.Control.Feedback type={"invalid"}>{error.formOrginPostNr}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formDestinationAddress"}>
                    <Form.Label>Destination Address</Form.Label>
                    <Form.Control 
                        type={"text"} 
                        placeholder={"Enter destination address"}
                        name={"formDestinationAddress"}
                        onChange={handleInput} />
                    <Form.Control.Feedback type={"invalid"}>{error.formDestinationAddress}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formDestinationPostNr"}>
                    <Form.Label>Destination Postal Number</Form.Label>
                    <Form.Control 
                        type={"text"} 
                        placeholder={"Enter destination postal number"}
                        name={"formDestinationPostNr"}
                        onChange={handleInput} />
                    <Form.Control.Feedback type={"invalid"}>{error.formDestinationPostNr}</Form.Control.Feedback>
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