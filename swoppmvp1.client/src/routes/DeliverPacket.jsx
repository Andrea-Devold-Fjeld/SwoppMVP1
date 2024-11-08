import Button from 'react-bootstrap/Button';
import DeliveryTable from "@/tables/DeliveryTable.jsx";
import {getDeliveriesByUserId} from "@/hooks/DeliveryHooks.jsx";
import { useState } from 'react';
import CreateDelivery from "@/routes/CreateDelivery.jsx";
import {useAuth} from "@/hooks/AuthProvider.jsx";
export default function DeliverPacket({packet}) {
    const [delivery, setDelivery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [createDelivery, setCreateDelivery] = useState(false);
    
    const auth = useAuth();
    console.log("Deliver packet: ", packet);
    console.log("Deliver packet id: ", packet.id);
    if(loading){
        getDeliveriesByUserId(auth).then(
            (response) => {
                console.log("Get deliveries by userId", response);
                setLoading(false);
                console.log(delivery);
                setDelivery(response);
    })}
    
    const handleClick = () => {
        console.log("Create new delivery");
        setCreateDelivery(true);
        
    }
    return (
        <>
            {createDelivery ? <><CreateDelivery packetid={packet} /> </> :
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
        {loading ? <h1>Loading...</h1> : <DeliveryTable  deliveris={delivery} packetid={packet} />}
    </div>
                    </>
                )}
            
            
        </>
    )
    
}