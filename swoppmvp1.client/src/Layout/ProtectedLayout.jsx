import {Outlet, Navigate} from 'react-router-dom'
import {useAuth} from "@/hooks/AuthProvider.jsx";
import ProtectedNavigation from "@/Navigation/ProtectedNavigation.jsx";
import {checkTransporterRole, setTransporterRole} from "@/hooks/AccountHooks.jsx";
import {useState, useEffect} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigate} from "react-router-dom";

export default function ProtectedLayout() {
    const [ transporter, setTransporter ] = useState(false);
    const [api_key, setApiKey] = useState("");
    const [loading, setLoading] = useState(true);
    console.log("Google Maps API Key: ", api_key);
    const user = useAuth();
    const navigate = useNavigate();
    if ( user.token === "") {
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
            if(response.value === "false") {
                console.log("User is not a transporter");
                
            }
            else if(response.value === "true") {
                console.log("User is a transporter");
                setTransporter(true);
                
            }
        })
        .catch((error) => {
            console.error("Error checking transporter role:", error);
        });


    useEffect(() => {
        try {
            console.log("In useEffect in protected layout");
            fetch("/GoogleMapsApiKey/GetGoogleMapsApiKey")
                .then((response) => {
                    console.log("Response: ", response);
                    response.json();
                }).then((data) => {
                console.log("Data: ", data);
                setApiKey(data);
                setLoading(false);
            })
                .catch((error) => {
                    console.error("Error fetching Google Maps API Key:", error);
                });
        }catch (e) {
            console.log("Error fetching Google Maps API Key:", e);
        }
    }, []);
    
                  



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
            {loading ? (<p>...loading</p>) : (
            <div>
                <Outlet context={{transporter, handleUpdateTransporter, api_key}} />
            </div>
            )}
        </div>
    )
}

/*
useEffect(() => {
        try {
            console.log("In useEffect in protected layout");
            fetch("/GoogleMapsApiKey/GetGoogleMapsApiKey")
                .then((response) => {
                    console.log("Response: ", response);
                    response.json();
                }).then((data) => {
                    console.log("Data: ", data);
                    //setApiKey(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching Google Maps API Key:", error);
                });
        }catch (e) {
            console.log("Error fetching Google Maps API Key:", e);
        }
    }, []);
 */