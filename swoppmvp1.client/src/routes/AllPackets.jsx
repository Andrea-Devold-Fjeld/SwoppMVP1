import {useState, useEffect} from "react";
import {getPackets} from "@/hooks/PacketHooks.jsx";
import PacketTable from "@/tables/PacketTable.jsx";
import PacketMarker from "@/routes/PacketMarker.jsx";
import DeliverPacket from "@/routes/DeliverPacket.jsx";



export default function AllPackets() {
    const [packets, setPackets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [delivery, setDelivery] = useState(false);
    const [packet, setPacket] = useState("");
    console.log(loading);
    if(loading){
        getPackets().then(
            (response) => {
                console.log(response);
                setLoading(false);
                setPackets(response);
                console.log(packets);
            }
        )
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
            <div id={"mao"}>
                {loading ? <h1>Loading...</h1> : <PacketMarker children={packets} />}
            </div>
                </>
            }
</>
    )
}
