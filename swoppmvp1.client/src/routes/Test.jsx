import {addPacket} from "@/hooks/PacketHooks.jsx";
import { useNavigate } from "react-router-dom";
/*
export default function Test({children, stateChanger, sendt}) {
    /*
    const [response, setResponse] = useState(null);
    console.log(children);
    console.log(JSON.stringify(children));
    const auth = useAuth();
    
     */
    const navigate = useNavigate();
    console.log(children)
    console.log("OriginLatitude", children.OriginLatitude)
    console.log("DestinationLatitude", children.DestinationLatitude)
    console.log("addPacket")
    if(!sendt) {
        console.log("sendt")
        stateChanger();
        addPacket(children)
            .then((response) => console.log("addpacket response: ", response));
    }
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
    
    
     /*
    
    return (
        <>
            <h4>Test</h4>
            <p>Packet registered</p>
        </>
    )
    
     
}
//export default Test;

      */