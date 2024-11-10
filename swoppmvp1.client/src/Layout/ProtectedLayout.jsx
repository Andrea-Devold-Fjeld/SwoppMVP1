import {Outlet, Navigate} from 'react-router-dom'
import {useAuth} from "@/hooks/AuthProvider.jsx";
import ProtectedNavigation from "@/Navigation/ProtectedNavigation.jsx";
import {checkTransporterRole, setTransporterRole} from "@/hooks/AccountHooks.jsx";
import {useState, useEffect} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigate} from "react-router-dom";

export default function ProtectedLayout() {
    const [ transporter, setTransporter ] = useState(false);
    const user = useAuth();
    const navigate = useNavigate();
    if (!user || !user.token) {
        console.log("User or token does not exist");
        navigate("/login");
    }
    //useEffect(() => {
    //     {
             console.log("In useEffect in protected layout");
             //if (user && user.token) {
                console.log("In useEffect in protected layout, user and token exists");
                 checkTransporterRole(user)
                     .then((response) => {
                         console.log("response in useffect in protected layout",response);
                         setTransporter(response.value);
                     })
                     .catch((error) => {
                         console.error("Error checking transporter role:", error);
                     });
             //}
             
    //    }        
    //}, [user]);



    const handleUpdateTransporter = (updateTransporterClaim) => {
        console.log("In handleUpdateTransporter in protected layout", updateTransporterClaim);
        setTransporterRole(user)
            .then((response) => {
                console.log("response in handleUpdateTransporter in protected layout", response);
                if(response.status === 200) {
                    setTransporter(updateTransporterClaim);
                }else {
                    console.log("Error updating transporter role");
                }
            })
            .catch((error) => {
                console.error("Error updating transporter role:", error);
            });
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