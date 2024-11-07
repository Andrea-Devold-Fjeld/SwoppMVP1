import {getPackets} from "@/hooks/PacketHooks.jsx";
import {checkTransporterRole} from "@/hooks/AccountHooks.jsx";
import {useState} from "react";
import PacketCard from "@/PacketCard.jsx";


export default function PacketTable({stateChanger ,loading, packets, onStateChange}) {
    const [transporter, setTransporter] = useState(false);
    const [deliverButton, setDeliverButton] = useState(false);
    
    console.log("Packets: ", packets);
    checkTransporterRole().then(
        (response) => {
            setTransporter(response);
            console.log("Transporter: ", transporter);
        }
    )
    
    return (
        <>
            {packets.map((packet) => {
                return( 
                    <PacketCard 
                        key={packet.id} 
                        packet={packet} 
                        role={transporter} 
                        delivery={deliverButton}
                        onStateChange={onStateChange}
                    />)
                
            })}
        </>
    )
}

