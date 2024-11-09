import {useState} from "react";
import PacketCard from "@/cards/PacketCard.jsx";
import {useOutletContext} from "react-router-dom";

export default function PacketTable({stateChanger ,loading, packets, onStateChange}) {
    const [deliverButton, setDeliverButton] = useState(false);

    const context = useOutletContext();
    const project = context ? context.project : null;

    const transporter = project ? project.transporter : false;

    console.log("Packets: ", packets);

    
    return (
        <>
            <div className={"packet-table"}>
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
            </div>
        </>
    )
}

