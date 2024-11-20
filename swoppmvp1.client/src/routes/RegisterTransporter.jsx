import {setTransporterRole} from "@/hooks/AccountHooks.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TransporterRegistered from "@/routes/TransporterRegistered.jsx";
import {useAuth} from "@/hooks/AuthProvider.jsx";
import {useOutletContext} from "react-router-dom";
import Button from 'react-bootstrap/Button';
export default function RegisterTransporter() {
    const [isRegistered, setIsRegistered] = useState(false);
    const {handleUpdateTransporter} = useOutletContext();
    const navigate = useNavigate();
    const auth = useAuth();
    const handleClick = () => {
        setTransporterRole(auth)
            .then((response) => {
                console.log(response);
                handleUpdateTransporter(true);
            })
    }
    return (
        <div className={"dashboard"}>  
            <div>
                <h1>Register Transporter</h1>
                <Button onClick={handleClick}>Register as Transporter</Button>
            </div>
            {isRegistered && <TransporterRegistered /> }
        </div>
    )
}