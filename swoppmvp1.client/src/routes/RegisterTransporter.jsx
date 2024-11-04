import {setTransporterRole} from "@/hooks/AccountHooks.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TransporterRegistered from "@/routes/TransporterRegistered.jsx";
export default function RegisterTransporter() {
    const [isRegistered, setIsRegistered] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        setIsRegistered(true);
    }
    return (
        <>  
            <div>
                <h1>Register Transporter</h1>
                <button onClick={handleClick}>Register as Transporter</button>
            </div>
            {isRegistered && <TransporterRegistered /> }
        </>
    )
}