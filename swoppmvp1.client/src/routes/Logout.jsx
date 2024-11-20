import {useAuth} from "@/hooks/AuthProvider.jsx";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function Logout(){
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    useEffect(() => {
        auth.logOut();
    }, []);
    //auth.logOut();
    
    const navigate = useNavigate();
    useEffect(() => {
        if(auth.token === ""){
            navigate("/")

        }

    }, []);
    
    return (
        <div className={"dashboard"}>
            <h1>Logging out...</h1>
        </div>
    )
}