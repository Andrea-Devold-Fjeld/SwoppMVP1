import {createDelivery} from "@/hooks/DeliveryHooks.jsx";
import {useState} from "react";

export default function CreateDelivery({ packetid}) {
    const [deliveryCreatet, setDeliveryCreated] = useState(false);
    const [loading, setLoading] = useState(true);

    if (loading) {
        createDelivery(packetid).then(response => {
            if (response) {
                console.log("Delivery created");
                setDeliveryCreated(true);
                
            }else {
                console.log("Error creating delivery");
            }
            setLoading(false);
        })
    }

    return (
        <>
            {deliveryCreatet ? <h1>Delivery created</h1> : <h1>Creating delivery</h1>}
        </>
    )
}