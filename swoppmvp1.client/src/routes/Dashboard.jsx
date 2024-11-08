import {checkTransporterRole} from "@/hooks/AccountHooks.jsx";
import {useState, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import UserDetails from "@/cards/UserDetail.jsx";
import PacketDetails from "@/routes/PacketDetails.jsx";
import DeliveryDetails from "@/routes/DeliveryDetails.jsx";
import {useAuth} from "@/hooks/AuthProvider.jsx";

export default function Dashboard() {
    const [transporterClaim, setTransporterClaim] = useState(false)
    const auth = useAuth();

    const transporter = checkTransporterRole().then((res) => setTransporterClaim(res.valueOf()));
    console.log(transporterClaim);
    const navigate = useNavigate();

    
    return (
        <>
            {transporterClaim ? 
            <>
                <div className={"profile"}>
                    <UserDetails transporter={transporterClaim}/>
                    <PacketDetails auth={auth}/>
                    <DeliveryDetails auth={auth} />
                </div>
            </> :
                <>
                    <div className={"profile"}>
                        <UserDetails/>
                        <PacketDetails auth={auth}/>
                    </div>
                </>
                    }
                </>

                )
            }