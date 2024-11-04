import {addPacketToDelivery} from "@/hooks/DeliveryHooks.jsx";
import {useNavigate} from "react-router-dom";


export default function AddedPackage(deliveryId, packetId) {
    const navigate = useNavigate();
    
    addPacketToDelivery(deliveryId, packetId).then(navigate("/delivery"));
    return(
        <div>
            <h1>Added Package</h1>
        </div>
    )
}