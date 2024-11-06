import {checkTransporterRole} from "@/hooks/AccountHooks.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import DeliveryCard from "@/routes/DeliveryCard.jsx";
import PacketCard from "@/PacketCard.jsx";

export default function DeliveryTable({deliveris, packetid}) {
    const [transporter, setTransporter] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    console.log("DeliveryTable: ", packetid)

    if(loading){
        console.log("In delivery table");
        checkTransporterRole().then(
            (response) => {
                console.log(response);
                if(response.value === "true") {
                    setTransporter(true);
                    console.log("Transporter: ", transporter);
                    setLoading(false);
                }
                
                if(response.value === "false") {
                    navigate("/registerTransporter");
                }
            }
        )
    }
    
   
    return (
        <>
            {deliveris.map((delivery) => {
                return(
                    <DeliveryCard key={deliveris.deliveryId} deliveris={delivery} packetId={packetid}
                    />)

            })}
        </>
    )
    }
    