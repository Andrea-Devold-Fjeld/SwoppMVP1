import {useAuth} from "@/hooks/AuthProvider.jsx";

import {useNavigate} from "react-router-dom";

export default function Logout(){
    const auth = useAuth();
    auth.logOut();
    const navigate = useNavigate();
    navigate("/home");
    
    return (
        <>
            <h1>Logging out...</h1>
        </>
    )
}