import {useState, useEffect} from "react";
import {getPackets} from "@/hooks/PacketHooks.jsx";
import PacketTable from "@/tables/PacketTable.jsx";
import PacketMarker from "@/routes/PacketMarker.jsx";



export default function AllPackets() {
    const [packets, setPackets] = useState([]);
    const [loading, setLoading] = useState(true);
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

    return (
        <>
            <div>
                <h1>All Packets</h1>
            </div>
            <div id={"loading"}>
                {loading ? <h1>Loading...</h1> : <PacketTable stateChanger={setLoading} loading={loading} packets={packets} />}
                
            </div>
            <div id={"mao"}>
                {loading ? <h1>Loading...</h1> : <PacketMarker children={packets} />}
            </div>
        </>
    )
}
