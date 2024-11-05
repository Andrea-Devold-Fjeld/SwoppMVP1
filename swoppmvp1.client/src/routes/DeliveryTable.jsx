import {checkTransporterRole} from "@/hooks/AccountHooks.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import DeliveryCard from "@/routes/DeliveryCard.jsx";

export default function DeliveryTable({deliveris, packetid}) {
    const [transporter, setTransporter] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    if(loading){
        checkTransporterRole().then(
            (response) => {
                setTransporter(response);
                console.log("Transporter: ", transporter);
                setLoading(false);
                
                if(!response) {
                    navigate("/registerTransporter");
                }
            }
        )
    }
    
   
    return (
        deliveris.map((deliveris) => {
            return (<DeliveryCard key={deliveris.id} deliveris={deliveris} role={transporter}/>)
        })
    )
    }
    