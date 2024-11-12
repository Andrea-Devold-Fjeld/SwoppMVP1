import React, {useState, useMemo} from 'react';
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
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
    const {api_key} = useOutletContext();
    
    //regex for address validation
    //[a-åA-Å]\b\s{1,4}\d{1,4}
    //[a-åA-Å] - address must start with a letter
    //\b - address must contain a word boundary
    //\s{1,4} - address must contain a space between 1-4 characters
    //\d{1,4} - address must contain a digit between 1-4 characters
    
    //regex for post number validation
    //[0-9]{4}

    const addressValidation = (input) => /[a-åA-Å]\b\s{1,4}\d{1,4}/.test(input);
    const postNrValidation = (input) => /[0-9]{4}/.test(input);
    const validateMessage = (input) => /\w{1,255}/.test(input);
    const validateTitle = (input) => /\w{1,255}/.test(input);
    const handleChange = async (e) => {
        console.log("handleChange", e.target.value);
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value
        });
        if ( error[e.target.name] ) setError({
            ...error,
            [e.target.name]: null
        })

    }
    
    const getGeolocation = async () => {
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

    const findFormErrors = () => {
        const {originAddress, 
            originPostNr, 
            destinationAddress, 
            destinationPostNr, 
            height, 
            width, 
            depth, 
            weight, 
            message, 
            title} = inputValue;
        console.log("In findFormErrors", inputValue);
        const newErrors = {};
        if (!originAddress || originAddress === '') newErrors.originAddress = 'Cannot be blank!';
        if (!addressValidation(originAddress)) newErrors.originAddress = 'Please enter a valid address';
        if (!originPostNr || originPostNr === '') newErrors.originPostNr = 'Cannot be blank!';
        if (!postNrValidation(originPostNr)) newErrors.originPostNr = 'Please enter a valid post number';
        if (!destinationAddress || destinationAddress === '') newErrors.destinationAddress = 'Cannot be blank!';
        if (!addressValidation(destinationAddress)) newErrors.destinationAddress = 'Please enter a valid address';
        if (!destinationPostNr || destinationPostNr === '') newErrors.destinationPostNr = 'Cannot be blank!';
        if (!postNrValidation(destinationPostNr)) newErrors.destinationPostNr = 'Please enter a valid post number';
        if (!height || height === '') newErrors.height = 'Cannot be blank!';
        if (parseFloat(height) <= 0) newErrors.height = 'Height must be greater than 0';
        if (isNaN(parseFloat(height))) newErrors.height = 'Height must be a number';
        if (!width || width === '') newErrors.width = 'Cannot be blank!';
        if (parseFloat(width) <= 0) newErrors.width = 'Width must be greater than 0';
        if (isNaN(parseFloat(width))) newErrors.width = 'Width must be a number';
        if (!depth || depth === '') newErrors.depth = 'Cannot be blank!';
        if (parseFloat(depth) <= 0) newErrors.depth = 'Depth must be greater than 0';
        if (isNaN(parseFloat(depth))) newErrors.depth = 'Depth must be a number';
        if (!weight || weight === '') newErrors.weight = 'Cannot be blank!';
        if (parseFloat(weight) <= 0) newErrors.weight = 'Weight must be greater than 0';
        if (isNaN(parseFloat(weight))) newErrors.weight = 'Weight must be a number';
        if (!message || message === '') newErrors.message = 'Cannot be blank!';
        if (validateMessage(message) === false) newErrors.message = 'Message must be between 1-255 characters';
        if (!title || title === '') newErrors.title = 'Cannot be blank!';
        if (validateTitle(title) === false) newErrors.title = 'Title must be between 1-255 characters';
        return newErrors;
    }
    
    const handleSubmit = async (e) => {
        console.log("In handleSubmit", inputValue);
        e.preventDefault();
        const form = e.currentTarget;
        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
        }else {
            try {
                const lala = await getGeolocation(packet)
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
                        setPacket(data);
                        console.log("finally", response);
                        handleSendt();
                    })
            }catch (e) {
                console.log("Error in handleSubmit", e);
            }
           

            //console.log("lala", lala);
        }


        
    }
    console.log("In AddPacketForm error", error);

    const memoizedForm = useMemo(() => (
            <Form class={"add-packet-form"} onSubmit={handleSubmit}>
                <Form.Group className={"mb-3"} controlId={"formBasicTitle"}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control isInvalid={!!error.title} type={"text"} placeholder={"Enter title"} name={"title"} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formBasicAddress"}>
                    <Form.Label>Origin Address</Form.Label>
                    <Form.Control isInvalid={!!error.originAddress} type={"text"} placeholder={"Enter address"} name={"originAddress"} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formBasicPostNr"}>
                    <Form.Label>Origin Post Number</Form.Label>
                    <Form.Control isInvalid={!!error.originPostNr} type={"number"} placeholder={"Enter post number"} name={"originPostNr"} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formBasicAddress"}>
                    <Form.Label>Destination Address</Form.Label>
                    <Form.Control isInvalid={!!error.destinationAddress} type={"text"} placeholder={"Enter address"} name={"destinationAddress"} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formBasicPostNr"}>
                    <Form.Label>Destination Post Number</Form.Label>
                    <Form.Control isInvalid={!!error.destinationPostNr} type={"number"} placeholder={"Enter post number"} name={"destinationPostNr"} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formBasicMessage"}>
                    <Form.Label>Message</Form.Label>
                    <Form.Control isInvalid={!!error.message} type={"textbox"} placeholder={"Enter message"} name={"message"} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formBasicHeight"}>
                    <Form.Label>Height</Form.Label>
                    <Form.Control isInvalid={!!error.height} type={"text"} placeholder={"Enter height"} name={"height"} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formBasicWidth"}>
                    <Form.Label>Width</Form.Label>
                    <Form.Control isInvalid={!!error.width} type={"text"} placeholder={"Enter width"} name={"width"} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formBasicDepth"}>
                    <Form.Label>Depth</Form.Label>
                    <Form.Control isInvalid={!!error.depth} type={"text"} placeholder={"Enter depth"} name={"depth"} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formBasicWeight"}>
                    <Form.Label>Weight</Form.Label>
                    <Form.Control isInvalid={!!error.weight} type={"text"} placeholder={"Enter weight"} name={"weight"} onChange={handleChange}/>
                </Form.Group>
                <Button type={"submit"}>Add Packet</Button>
            </Form>
            
    ), [error, handleChange, handleSubmit ]);
    return (
        <>
            {sendt ? (<PackageReg packet={packet} />) : memoizedForm}
        </>
    );   
    
}

