import {useState, useCallback, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import UserDetails from "@/cards/UserDetail.jsx";
import PacketDetails from "@/routes/PacketDetails.jsx";
import DeliveryDetails from "@/routes/DeliveryDetails.jsx";
import {useAuth} from "@/hooks/AuthProvider.jsx";
import {useOutletContext} from "react-router-dom";


export default function Dashboard() {
    const context = useOutletContext();
    const {transporter, handleUpdateTransporter} = useOutletContext();

    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const transporterClaim = transporter;
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(false);
    }, []);

    
    return (
        <>
            {loading ? (<p>...loading</p>) : (
                <>
                    {transporterClaim ?
                        <>
                            <div className={"profile"}>
                                <UserDetails transporter={transporterClaim}/>
                                <PacketDetails auth={auth}/>
                                <DeliveryDetails auth={auth} />
                            </div>
                        </>
                        :
                        <>
                            <div className={"profile"}>
                                <UserDetails/>
                                <PacketDetails auth={auth}/>
                            </div>
                        </>
                    }
                </>
            )}
        </>

    )
}

/*
 {loading ? (<p>...loading</p>) : (
                <>
                    {transporterClaim ? 
                        <>
                            <div className={"profile"}>
                                <UserDetails transporter={transporterClaim}/>
                                <PacketDetails auth={auth}/>
                                <DeliveryDetails auth={auth} />
                            </div>
                        </> 
                        :
                        <>
                            <div className={"profile"}>
                                <UserDetails/>
                                <PacketDetails auth={auth}/>
                            </div>
                        </>
                    }
                </>
            )}
 */