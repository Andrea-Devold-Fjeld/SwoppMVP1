import {getPacketById} from "@/hooks/PacketHooks.jsx";
import {checkTransporterRole} from "@/hooks/AccountHooks.jsx";
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";

export default function Packet() {
    const { id } = useParams();
    const [packet, setPacket] = useState({});
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(true);
    
    useEffect(() => {
        getPacketById(id)
            .then((response) => {
                console.log(response);
                setPacket(response);
                setLoading(false);
            })
        
    }, [id])

    const updatePacketStatus = () => {
        console.log("Update packet status");
    };
    return (
        <>
            <div>
                <h3>Packet details</h3>
                {loading ? (
                    <h1>Loading...</h1>
                ) : (
                    <div id="packet-details">
                        <p>Packet ID: {packet.id}</p>
                        <p>Packet status: {packet.delivered ? 'Delivered' : 'Not delivered'}</p>
                        <p>Packet available: {(packet.available === 1) ? 
                            <p>"Packet available" {role === "transporter" ? <Button onClick={updatePacketStatus} variant="primary">Update packet status</Button> : null}</p>
                            : "Packet not available"}
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}