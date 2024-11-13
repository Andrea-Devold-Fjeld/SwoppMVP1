import { useState, useEffect, useRef } from 'react';
import {deletePacket, getPacketByUserId} from "@/hooks/PacketHooks.jsx";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import UsersPacket from "@/cards/UsersPacket.jsx";

export default function PacketDetails({auth}) {
    const [packet, setPacket] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const isDeletePacket = useRef(false);
    const [deleted, setDeleted] = useState(false);
    useEffect(() => {
        getPacketByUserId(auth)
            .then((response) => {
                console.log("IN packet details",response);
                setPacket(response);
                setLoading(false);
            })
    }, []);
    
    
    
    const handleDeletePacket = async (packetId) => {
                 deletePacket(packetId, auth).then(
                    (response) => {
                        console.log(response);
                        setLoading(false);
                        setDeleted(true);
                        console.log(packet);
                        setPacket((prevPackets) => prevPackets.filter(packet => packet.id !== packetId));

                    }
                )
            
    }
        
    return (
        <>
            <div>
            <h3>My packets</h3>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                packet.length > 0 ? (
                    <div id="packet-user-details">
                        {packet.map((packet) => (
                            <UsersPacket key={packet.id} packet={packet} onDeletePacket={handleDeletePacket}/>
                        ))}
                        <Button onClick={() => navigate("/addPacket")}>Add new packet</Button>
                    </div>
                ) : (
                    <div>
                        <h1>No packets found</h1>
                        <Button onClick={() => navigate("/addPacket")}>Add new packet</Button>
                    </div>
                )
            )}
            </div>
        </>
    )
}

/*
{packet.map((packet) => (
                            <PacketCard key={packet.id} packet={packet} />
                        ))}
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                packet > 0 ? (
                    <div id="packet-user-details">
                        {packet.map((packet) => (
                            <PacketCard key={packet.id} packet={packet} />
                        ))}
                        <Button onClick={() => navigate("/addPacket")}>Add new packet</Button>
                    </div>
                ) : (
                    <div>
                        <h1>No packets found</h1>
                        <Button onClick={() => navigate("/addPacket")}>Add new packet</Button>
                    </div>
                )
            )}
        </>
 */