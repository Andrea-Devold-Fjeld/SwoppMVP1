import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import DeliveryCard from "@/cards/DeliveryCard.jsx";
import { useOutletContext } from 'react-router-dom';

export default function DeliveryTable({deliveries, packetid}) {
    const { project } = useOutletContext();
    console.log("Testing outlet context", project.transporter)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    console.log("DeliveryTable: ", packetid)

    //if(loading){
        /*
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
            
         */
        //)
    //}
    
   
    return (
        <>
            {deliveries.map((delivery) => {
                return(
                    <DeliveryCard key={deliveris.deliveryId} deliveris={delivery} packetId={packetid}
                    />)

            })}
        </>
    )
}
    