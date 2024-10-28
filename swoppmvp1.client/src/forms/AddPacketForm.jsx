import React, {useState} from 'react';
import {bothGeoLocationHook} from "@/hooks/GeolocationHooks.jsx";
import {useNavigate} from "react-router-dom";
import Test from "@/routes/Test.jsx";


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
    
     

    
    async function handleSubmit(e) {
        e.preventDefault();
        const packet = {};
        
        const response = getGeolocation(packet)
            .then((response) => {
                console.log("finally", response);
                packet.OriginAddress = response[0].results[0].formatted_address;
                packet.OriginLatitude = response[0].results[0].geometry.location.lat;
                packet.OriginLongitude = response[0].results[0].geometry.location.lng;
                packet.DestinationAddress = response[1].results[0].formatted_address;
                packet.DestinationLatitude = response[1].results[0].geometry.location.lat;
                packet.DestinationLongitude = response[1].results[0].geometry.location.lng;
                
            })
            .finally(() => console.log("finally"));

        packet["Height"] = parseFloat(inputValue.height);
        packet["Width"] = parseFloat(inputValue.width);
        packet["Depth"] = parseFloat(inputValue.depth);
        packet["Weight"] = parseFloat(inputValue.weight);


        console.log(packet);
  
        setLi(<Test children={packet}/>);

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor={"originAdress"}>Origin Address</label>
                <input type={"text"} id={"originAdress"} name={"originAddress"} onChange={handleChange}/>
                <label htmlFor={"originAdressNr"}>Origin Address Number</label>
                <input type={"number"} id={"originAdressNr"} name={"originAddressNr"} onChange={handleChange}/>
                <label htmlFor={"originPostNr"}>Origin Post Number</label>
                <input type={"number"} id={"originPostNr"} name={"originPostNr"}  onChange={handleChange}/>
                <label htmlFor={"destinationAddress"}>Destination Address</label>
                <input type={"text"} id={"destinationAddress"} name={"destinationAddress"} onChange={handleChange}/>
                <label htmlFor={"destinationAdressNr"}>Destination Address Number</label>
                <input type={"number"} id={"destinationAdressNr"} name={"destinationAddressNr"}  onChange={handleChange}/>
                <label htmlFor={"destinationPostNr"}>Destination Post Number</label>
                <input type={"number"} id={"destinationPostNr"} name={"detinationPostNr"} onChange={handleChange}/>
                <label htmlFor={"height"}>Height</label>
                <input type={"number"} id={"height"}  onChange={handleChange} name={"height"}/>
                <label htmlFor={"width"}>Width</label>
                <input type={"number"} id={"width"} name={"width"} onChange={handleChange}/>
                <label htmlFor={"depth"}>Depth</label>
                <input type={"number"} id={"depth"} name={"depth"} onChange={handleChange}/>
                <label htmlFor={"weight"}>Weight</label>
                <input type={"number"} id={"weight"} name={"weight"} onChange={handleChange}/>
                <input type={"submit"} value={"Add Packet"} />
            </form>
            {li}
        </>
    )
}

