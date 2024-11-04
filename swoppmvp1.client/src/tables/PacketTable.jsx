import {getPackets} from "@/hooks/PacketHooks.jsx";
import {checkTransporterRole} from "@/hooks/AccountHooks.jsx";
import {useState} from "react";
import PacketCard from "@/PacketCard.jsx";


export default function PacketTable({stateChanger ,loading, packets}) {
    const [transporter, setTransporter] = useState(false);
    
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
                return( <PacketCard key={packet.id} packet={packet} role={transporter}/>)
                
            })}
        </>
    )
}

/*
<>
            <div>
                <h1>All Packets</h1>
            </div>
            
            <>
                <div id={"packetTable"}>
                    <table>
                        <thead>
                        <tr>
                            <th>Origin Address</th>
                            <th>Destination Address</th>
                            <th>Origin Latitude</th>
                            <th>Origin Longitude</th>
                            <th>Destination Latitude</th>
                            <th>Destination Longitude</th>
                            <th>Height</th>
                            <th>Width</th>
                            <th>Depth</th>
                            <th>Weight</th>
                        </tr>
                        </thead>
                        <tbody>
                        {packets.map((packet) => {
                            return (
                                <tr key={packet.id}>
                                    <td>{packet.originAddress}</td>
                                    <td>{packet.destinationAddress}</td>
                                    <td>{packet.originLatitude}</td>
                                    <td>{packet.originLongitude}</td>
                                    <td>{packet.destinationLatitude}</td>
                                    <td>{packet.destinationLongitude}</td>
                                    <td>{packet.height}</td>
                                    <td>{packet.width}</td>
                                    <td>{packet.depth}</td>
                                    <td>{packet.weight}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </>
        </>
 */