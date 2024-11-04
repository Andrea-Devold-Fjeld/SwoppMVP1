import {setTransporterRole} from "@/hooks/AccountHooks.jsx";


export default function TransporterRegistered() {
    setTransporterRole();
    return (
        <>
            <div>
                <h1>Transporter Registered</h1>
            </div>
        </>
    )
}