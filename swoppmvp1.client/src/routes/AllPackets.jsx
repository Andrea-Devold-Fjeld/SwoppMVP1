import {useState, useEffect} from "react";
import {getPackets} from "@/hooks/PacketHooks.jsx";
import PacketTable from "@/tables/PacketTable.jsx";
import PacketMarker from "@/routes/PacketMarker.jsx";
import DeliverPacket from "@/routes/DeliverPacket.jsx";
import {useAuth} from "@/hooks/AuthProvider.jsx";
import {useOutletContext} from "react-router-dom";


export default function AllPackets() {
    const [packets, setPackets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [delivery, setDelivery] = useState(false);
    const [packet, setPacket] = useState("");
    const [api_key, setApiKey] = useState("");
    const { transporter } = useOutletContext();
    const auth = useAuth();
    console.log(loading);
    if(loading){
        getPackets(auth).then(
            (response) => {
                console.log(response);
                setLoading(false);
                setPackets(response);
                console.log(packets);
            }
        )
 
        console.log("In useEffect in protected layout");
        fetch("/GoogleMapsApiKey/GetGoogleMapsApiKey")
            .then((response) => {
                console.log("Response: ", response);
                response.json();
            }).then((data) => {
                console.log("Data: ", data);
                setApiKey(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching Google Maps API Key:", error);
            });

        const auth = useAuth();
    }
    const handleStateChange = (state) => {
        console.log("State change in PacketCard: ", state);
        setDelivery(state);
        setPacket(state.packetId);
    }
    return (
        <>{ delivery ? 
            <>
                <h1>Delivering packet</h1> 
                <DeliverPacket packet={packet} />
            </>:
            <>
            <div>
                <h1>All Packets</h1>
            </div>
            <div id={"loading"}>
                {loading ? 
                    <h1>Loading...</h1> : 
                    <PacketTable 
                        stateChanger={setLoading} 
                        loading={loading} 
                        packets={packets} 
                        onStateChange={handleStateChange}/>
                }
                
            </div>
            <div id={"map"}>
                {loading ? <h1>Loading...</h1> : <PacketMarker api_key={api_key} children={packets} onStateChange={handleStateChange}/>}
            </div>
                </>
            }
</>
    )
}
