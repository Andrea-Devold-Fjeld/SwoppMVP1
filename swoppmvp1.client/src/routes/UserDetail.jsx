import {Button} from "react-bootstrap";
import RegisterTransporter from "@/routes/RegisterTransporter.jsx";
export default function UserDetail({transporter}) {
    const handleRegisterTransporter = () => {
        console.log("Registering as transporter");
        // setTransporter(true);
        return (
            <RegisterTransporter />
        )
    }
    return (
        <>
            <div id={"user-detail"}>
                <h3>User details</h3>
                <p>
                    {transporter ? "You are registerd as transporter" : <Button onClick={handleRegisterTransporter}>Register as transporter</Button> }
                </p>
            </div>
        </>
    )
}