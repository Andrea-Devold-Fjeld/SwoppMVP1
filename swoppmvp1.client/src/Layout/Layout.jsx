import {Outlet} from 'react-router-dom'
import Navigation from "@/Navigation/Navigation.jsx";
import {useAuth} from "@/hooks/AuthProvider.jsx";
import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
export default function Layout({children}) {
    const user = useAuth();
    const [api_key, setApiKey] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        if(user.token) navigate("/dashboard")
    },[user.token])
    
    try {
        fetch("/GoogleMapsApiKey/GetGoogleMapsApiKey")
            .then((response) => response.json())
            .then((data) => {
                setApiKey(data);
            })
            .catch((error) => {
                console.error("Error fetching Google Maps API Key:", error);
            });
    }catch (e) {
        console.log("Error fetching Google Maps API Key:", e);
    }
    return (
        <>
            <div className={"sticky-top"} id={"nav"}>
                <Navigation />
            </div>
            <div id={"content"}>
                <Outlet />
            </div>
        </>
    )
}