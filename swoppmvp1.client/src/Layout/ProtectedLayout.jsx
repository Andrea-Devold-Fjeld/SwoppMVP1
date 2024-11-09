import {Outlet, Navigate} from 'react-router-dom'
import {useAuth} from "@/hooks/AuthProvider.jsx";
import ProtectedNavigation from "@/Navigation/ProtectedNavigation.jsx";
import {checkTransporterRole} from "@/hooks/AccountHooks.jsx";
import {useState, useEffect} from "react";
import {useOutletContext} from "react-router-dom";

export default function ProtectedLayout() {
    const [ transporter, setTransporter ] = useState(false);
    const user = useAuth();


    useEffect(() => {
         {
             if (user && user.token) {

                 checkTransporterRole(user)
                     .then((response) => {
                         console.log(response);
                         setTransporter(response.value);
                     })
                     .catch((error) => {
                         console.error("Error checking transporter role:", error);
                     });
             }
             
        }        
    }, [user]);

    if (!user || !user.token) return <Navigate to="/login" />;

    const handleUpdateTransporter = (updateTransporterClaim) => {
        setTransporter(updateTransporterClaim);
    }
    return (
        <div>
            <div className={"nav"}>
                <ProtectedNavigation />
            </div>
            <div>
                <Outlet context={{transporter, handleUpdateTransporter}} />
            </div>
        </div>
    )
}