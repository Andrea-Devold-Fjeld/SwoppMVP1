import {useState, useEffect, useRef} from "react";
import {getPackets} from "@/hooks/PacketHooks.jsx";
import PacketTable from "@/tables/PacketTable.jsx";
import PacketMarker from "@/routes/PacketMarker.jsx";
import DeliverPacket from "@/routes/DeliverPacket.jsx";
import {useAuth} from "@/hooks/AuthProvider.jsx";
import {useOutletContext} from "react-router-dom";
import GoogleMapModal from "@/modal/GoogleMapModal.jsx";
import Button from "react-bootstrap/Button";


export default function AllPackets() {
    const [packets, setPackets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [delivery, setDelivery] = useState(false);
    const [packet, setPacket] = useState("");
    const [show, setShow] = useState(false);
    const isSendt = useRef(false);
    //const [api_key, setApiKey] = useState("");
    const {  api_key } = useOutletContext();
    const auth = useAuth();
    console.log(loading);
    console.log("In all packets", show)
    useEffect(() => {
        console.log("In useEffect in protected layout");
        if (!isSendt.current) {
            getPackets(auth).then(
                (response) => {
                    console.log(response);
                    setLoading(false);
                    setPackets(response);
                    console.log(packets);
                }
            )
        }
    },[auth]);
    
    const handleClose = (state) => {
        setShow(state);
    }
    const handleStateChange = (state) => {
        console.log("State change in PacketCard: ", state);
        setDelivery(state);
        setPacket(state.packetId);
    }
    //  <PacketMarker api_key={api_key} children={packets} onStateChange={handleStateChange}/>}
    return (
        <div className={"dashboard"}>{ delivery ? 
            <>
                <h1>Delivering packet</h1> 
                <DeliverPacket packet={packet} />
            </>:
            <>
                <div id={"map-markers"}>
                    {loading ? (
                        <h1>Loading...</h1>
                    ) : (
                        <>
                            <Button onClick={() => setShow(true)}>Show Map</Button>
                            <GoogleMapModal 
                                show={show} 
                                handleClose={handleClose} 
                                api_key={api_key} 
                                packets={packets} 
                            handleStateChange={handleStateChange}/>
                        </>
                    )}
                </div>
                <div id={"all-packets-map"}>
                    <div id={"all-packets"}>
                        {loading ?
                            <h1>Loading...</h1> :
                            <PacketTable
                                stateChanger={setLoading}
                                loading={loading}
                                packets={packets}
                                onStateChange={handleStateChange}/>
                        }

                    </div>

                </div>
            </>
        }
        </div>
    )
}
