import {Button} from "react-bootstrap";
import RegisterTransporter from "@/routes/RegisterTransporter.jsx";
import {useOutletContext} from "react-router-dom";
import {useState} from "react";
import TransporterRegistered from "@/routes/TransporterRegistered.jsx";

export default function UserDetail() {
    const {transporter} = useOutletContext();
    const [isRegistered, setIsRegistered] = useState(false);
    const handleRegisterTransporter = () => {
        console.log("Register transporter");
        setIsRegistered(true);
        // setTransporter(true);

    }
    return (
        <>
            <div id={"user-detail"}>
                <h3>User details</h3>
                {isRegistered && <TransporterRegistered />}
                <p>
                    {transporter ? "You are registerd as transporter" : <Button onClick={handleRegisterTransporter}>Register as transporter</Button> }
                </p>
            </div>
        </>
    )
}