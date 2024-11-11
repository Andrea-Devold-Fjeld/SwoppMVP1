import {Outlet} from 'react-router-dom'
import Navigation from "@/Navigation/Navigation.jsx";
import {useAuth} from "@/hooks/AuthProvider.jsx";
import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'

async function fetchApiKey(){
    try {
        console.log("Fetching Google Maps API Key");
        const response = fetch("/GoogleMapsApiKey/GetGoogleMapsApiKey", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        console.log("Response: ", response);
        if (!response.ok) {
            console.log("Error fetching Google Maps API Key");
        }
        const text = (await response).json();
        console.log("Data: ", text);
        return text;
    }catch (e) {
        console.log("Error fetching Google Maps API Key:", e);
    }
}
export default function Layout({children}) {
    const user = useAuth();
    const [api_key, setApiKey] = useState("");
    const [loading, setLoading] = useState(true);
    
    
    const navigate = useNavigate();
    useEffect(()=>{
        if(user.token !== "") {
            navigate("/dashboard")
        }
    },[user.token])
    

        useEffect(() => {
            try {
            console.log("In useEffect in protected layout");
            fetchApiKey()
                .then((data) => {
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
       
    
    return (
        <>
            <div className={"sticky-top navigation"} id={"nav"}>
                <Navigation />
            </div>
            {loading ? (<p>...loading</p>) : (
            <div className={"content"} id={"content"}>
                <Outlet context={{api_key}}/>
            </div>
            )}
        </>
    )
}