import {addPacket} from "@/hooks/PacketHooks.jsx";
import { useEffect, useState} from "react";
import {useAuth} from "@/hooks/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";

export default function Test({children}) {
    const [response, setResponse] = useState(null);
    console.log("TEST children", children);
    const auth = useAuth();
    console.log(auth.token);
    console.log(children);
    const navigate = useNavigate();
    useEffect(() => {
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
    },[]);

    /*
    console.log("loading", loading);
    if(loading) {
        console.log("Test.jsx", children);
        console.log("in use effect");
        const response = await addPacket(children);
        console.log(response);
    }
    
     */

    
    return (
        <>
            <h4>Test</h4>
            <p>Packet registered</p>
        </>
    )
    
     
}
//export default Test;