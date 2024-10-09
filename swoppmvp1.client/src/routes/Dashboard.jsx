import {checkTransporterRole, setTransporterRole} from "@/hooks/AccountHooks.jsx";
import {useState, useCallback} from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [transporterClaim, setTransporterClaim] = useState(false)
    const transporter = checkTransporterRole().then((res) => setTransporterClaim(res.valueOf()));
    console.log(transporterClaim);
    const navigate = useNavigate();

    
    return (
        <div className={"content"}>
            <h2>Test hooks</h2>
            <h4>CheckTransporterClaim</h4>
            {transporterClaim.toString()}
            <div>
                <button disabled={transporterClaim} >Register as transporter</button>
            </div>

</div>
)
}