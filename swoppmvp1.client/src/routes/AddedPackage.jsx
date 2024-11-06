import {addPacketToDelivery} from "@/hooks/DeliveryHooks.jsx";
import {useNavigate} from "react-router-dom";


export default function AddedPackage({deliveryId, packetId}) {
    const navigate = useNavigate();
    console.log("In added package");
    console.log("Delivery ID: ", deliveryId);
    console.log("Packet ID: ", packetId);
    addPacketToDelivery(packetId, deliveryId).then(navigate("/delivery"));
    return(
        <div>
            <h1>Added Package</h1>
        </div>
    )
}