
import React, { useState, useEffect, Component } from 'react';
import {geoLocationHook} from "@/hooks/GeolocationHooks.jsx";
import {addPacket} from "@/hooks/PacketHooks.jsx";
import { useNavigate } from "react-router-dom";
import PackageReg from "@/routes/PackageReg.jsx";
import { useForm } from "react-hook-form";
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
    
    const getGeolocation = async () => {
        const originGeo = await geoLocationHook(inputValue.originAddress, inputValue.originAdressNr, inputValue.originPostNr)
        const destinationGeo = await geoLocationHook(inputValue.destinationAddress, inputValue.destinationAdressNr, inputValue.destinationPostNr)
        setInputValue({
            ...inputValue,
            originLatitude: originGeo.results[0].geometry.location.lat,
            originLongitude: originGeo.results[0].geometry.location.lng,
            destinationLatitude: destinationGeo.results[0].geometry.location.lat,
            destinationLongitude: destinationGeo.results[0].geometry.location.lng
        });
        
        console.log(inputValue)
    }
    
     
    /*
    function onSubmit(data) {
        console.log(data);
        
    }
    
    
     */
    /*
    async function handleSubmit(e) {
        e.preventDefault();
        const originGeo = await geoLocationHook(inputValue.originAddress, inputValue.originAdressNr, inputValue.originPostNr)
        const destinationGeo = await geoLocationHook(inputValue.destinationAddress, inputValue.destinationAdressNr, inputValue.destinationPostNr)
        setInputValue({
            ...inputValue,
            originLatitude: originGeo.results[0].geometry.location.lat,
            originLongitude: originGeo.results[0].geometry.location.lng,
            destinationLatitude: destinationGeo.results[0].geometry.location.lat,
            destinationLongitude: destinationGeo.results[0].geometry.location.lng
        });
        const response = await addPacket(inputValue).then((res) => setResponse(res));
        console.log(response)

    }
    
     */
    
    function handleSubmit(e) {
        e.preventDefault();
        const packet = [];

            console.log("in use effect");
            const originGeo = geoLocationHook(inputValue.originAddress, inputValue.originAdressNr, inputValue.originPostNr)
                //.then((response) => response.json())
                .then((data) => {
                    packet["originLatitude"] = data.results[0].geometry.location.lat.toString();
                    packet["originLongitude"] = data.results[0].geometry.location.lng.toString();
                    packet["originAddress"] = data.results[0].formatted_address;
                }).finally(() => {console.log(packet)});
        const destinationGeo = geoLocationHook(inputValue.destinationAddress, inputValue.destinationAdressNr, inputValue.destinationPostNr)
            //.then((response) => response.json())
            .then((data) => {
                packet["destinationLatitude"] = data.results[0].geometry.location.lat.toString();
                packet["destinationLongitude"] = data.results[0].geometry.location.lng.toString();
                packet["destinationAddress"] = data.results[0].formatted_address;
            }).finally(() => {console.log(packet)});
            
            packet["height"] = inputValue.height;
            packet["width"] = inputValue.width;
            packet["depth"] = inputValue.depth;
            packet["weight"] = inputValue.weight;
            

            console.log(packet);
            console.log("packet " + typeof packet);
            /*
            if(loading){
                setLoading(false);
                setLi(<Test children={packet} />); 

            }
            
             */
            setLi(<Test children={packet} />);
            //navigate("/dashboard")
 
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

/*
Id
string($uuid)
(query)
Id
UserId
string($uuid)
(query)
UserId
Timestamp
string($date-time)
(query)
Timestamp
Message
string
(query)
Message
originAddress
string
(query)
originAddress
destinationAddress
string
(query)
destinationAddress
originGeolocation
string
(query)
originGeolocation
destinationGeolocation
string
(query)
destinationGeolocation
originLatitude
number($double)
(query)
originLatitude
originLongitude
number($double)
(query)
originLongitude
destinationLatitude
number($double)
(query)
destinationLatitude
destinationLongitude
number($double)
(query)
destinationLongitude
Height
number($double)
(query)
Height
Width
number($double)
(query)
Width
Depth
number($double)
(query)
Depth
Weight
number($double)
(query)
Weight

 */