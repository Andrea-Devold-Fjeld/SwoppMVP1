import Button from 'react-bootstrap/Button';
import PacketTable from "@/tables/PacketTable.jsx";
import DeliveryTable from "@/routes/DeliveryTable.jsx";
import {getDeliveriesByUserId} from "@/hooks/DeliveryHooks.jsx";
import { useState } from 'react';

export default function DeliverPacket({packet}) {
    const [delivery, setDelivery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [createDelivery, setCreateDelivery] = useState(false);
    
    if(loading){
        getDeliveriesByUserId().then(
            (response) => {
                console.log(response);
                setLoading(false);
                setDelivery(response);
                console.log(delivery);
    })}
    
    const handleClick = () => {
        console.log("Create new delivery");
        setCreateDelivery(true);
    }
    return (
        <>
            {createDelivery ? <PacketTable packet={packet} />:
                (
                    <>
                    <div>
                        <h1>Deliver Packet</h1>
                    </div>
                <div>
                <h2>Packet ID: {packet.id}</h2>
                <h2>Packet Status: {packet.status}</h2>
</div>
    <div>
        <h2>New delivery</h2>
        <Button variant="primary" onClick={handleClick}>Create new deliver</Button>
    </div>
    <div>
        <h2>Add to existing delivery</h2>
        {loading ? <h1>Loading...</h1> : <DeliveryTable  deliveris={delivery} packetid={packet.id} />}
    </div>
                    </>
                )}
            
            
        </>
    )
    
}