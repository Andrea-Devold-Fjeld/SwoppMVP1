import {Button} from "react-bootstrap";
import RegisterTransporter from "@/routes/RegisterTransporter.jsx";
import {useOutletContext} from "react-router-dom";
import {useState} from "react";
import TransporterRegistered from "@/routes/TransporterRegistered.jsx";

export default function UserDetail({transporter}) {
    const [isRegistered, setIsRegistered] = useState(false);
    console.log("In user detail", transporter);
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