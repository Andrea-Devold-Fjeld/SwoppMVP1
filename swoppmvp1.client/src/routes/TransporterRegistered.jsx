import {setTransporterRole} from "@/hooks/AccountHooks.jsx";
import {useOutletContext} from "react-router-dom";

export default function TransporterRegistered() {
    const {handleUpdateTransporter} = useOutletContext();
    return (
        <>
            <div>
                <h1>Transporter Registered</h1>
            </div>
        </>
    )
}