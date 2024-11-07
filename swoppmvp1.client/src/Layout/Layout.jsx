import {Outlet} from 'react-router-dom'
import Navigation from "@/Navigation/Navigation.jsx";
import {useAuth} from "@/hooks/AuthProvider.jsx";
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
export default function Layout({children}) {
    const user = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        if(user.token) navigate("/dashboard")
    },[user.token])
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