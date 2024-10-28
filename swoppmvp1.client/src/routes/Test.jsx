import {addPacket} from "@/hooks/PacketHooks.jsx";
import { useEffect, useState} from "react";
import {useAuth} from "@/hooks/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import {bothGeoLocationHook, geoLocationHook} from "@/hooks/GeolocationHooks.jsx";

export default function Test({children}) {
    /*
    const [response, setResponse] = useState(null);
    console.log(children);
    console.log(JSON.stringify(children));
    const auth = useAuth();
    
     */
    const navigate = useNavigate();
    if(children.OriginLatitude === undefined || children.DestinationLatitude === undefined) return ;
    useEffect(  () => {
        addPacket(children)
            .then((response) => {
                if (response.status === 401) {
                    navigate("/login")
                }
            });
        /*
        console.log(children)
        try {
            setResponse(fetch("/packet/addpacket", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${auth.token}`
                },
                body: JSON.stringify(children)
            }).catch((err) => {
                console.log(err);
                navigate("/login)")
            }));
            //return response.json();
        } catch (err) {
            console.log(err);
        }   
         */
    },[]);
    
     
    
    return (
        <>
            <h4>Test</h4>
            <p>Packet registered</p>
        </>
    )
    
     
}
//export default Test;